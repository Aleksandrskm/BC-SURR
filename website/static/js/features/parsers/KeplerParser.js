export class KeplerParser{
    constructor(){}

    /**
     * Создает число в заданном диапазоне.
     * @param  { String } s - строка для преобразования в число(Кеплеровский вид).
     */
    #parseNumber(s) {
        // Удаляем номер параметра (например, '4.' в начале)
        s = s.replace(/^\d+\./, '');
        // Заменяем запятые на точки для десятичных разделителей
        s = s.replace(/,/g, '.');
        // Удаляем научную нотацию (+00 или -00 в конце)
        s = s.replace(/[+-]\d{2}$/, '');
        return parseFloat(s);
    }

    /**
     * Преобразует дату в формат пригодный для вида НУ.
     * @param  { Date } date - объект даты Кеплеровской строки для преобразования в вид для НУ.
     */
    #formatDateToCustomString(date) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');
        const milliseconds = String(date.getMilliseconds()).padStart(3, '0');
        // Добавляем три нуля к миллисекундам, чтобы получить микросекунды (6 цифр)
        const microseconds = milliseconds.padEnd(6, '0');
        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}.${microseconds}`;
    }

    /**
     * Парсит Кеплеровскую строку на части для получения промежуточных значений.
     * @param  { String } keplerStr - Кеплеровская строка в виде НУ.
     */
    #parseKeplerianString(keplerStr) {
        /** Парсит строку с кеплеровскими параметрами в указанном формате */
        const parts = keplerStr
            .split(';')
            .map(p => p.trim())
            .filter(p => p);
        if (parts.length < 12) {
            throw new Error('Неверный формат строки - должно быть 12 параметров');
        }

        // Парсинг даты и времени
        const datePart = parts[2].replace(/^2\./, '').trim();
        const timePart = parts[3].replace(/^3\./, '').trim();

        let day, month, year, hour, minute, second, millisecond;
        try {
            [day, month, year] = datePart.split('.').map(Number);
            [hour, minute, second, millisecond] = timePart.split('.').map(Number);
        } catch (e) {
            throw new Error(`Ошибка парсинга даты/времени: ${e}`);
        }
        console.log(`${day} ${month} ${year} ${hour} ${minute} ${second} ${millisecond}`);
        let epoch = new Date(
            year,
            month - 1,
            day,
            hour,
            minute,
            second,
            millisecond
        );
        epoch=this.#formatDateToCustomString(epoch)
        // Парсинг вектора состояния
        let position, velocity;
        try {
            position = [
                this.#parseNumber(parts[4]), // X
                this.#parseNumber(parts[5]), // Y
                this.#parseNumber(parts[6]), // Z
            ];

            velocity = [
                this.#parseNumber(parts[7]), // VX
                this.#parseNumber(parts[8]), // VY
                this.#parseNumber(parts[9]), // VZ
            ];
        } catch (e) {
            throw new Error(`Ошибка парсинга позиции/скорости: ${e}`);
        }

        // Парсинг дополнительных параметров
        let satNum, bstar, meanMotionDot;
        try {
            const satInfo = parts[0].split(':')[1].split(',')[0];
            satNum = parseInt(satInfo, 10);

            bstar = this.#parseNumber(parts[10]);
            meanMotionDot = this.#parseNumber(parts[11].split(',')[0]) * 1e-10;
        } catch (e) {
            throw new Error(`Ошибка парсинга дополнительных параметров: ${e}`);
        }

        return {
            sat_num: satNum,
            epoch: epoch,
            position: position,
            velocity: velocity,
            bstar: bstar,
            mean_motion_dot: meanMotionDot,
        };
    }

    /**
     * Парсит Кеплеровскую строку на части для дальнейшей работы.
     * @param  { Array } position - массив векторов позиций.
     * @param  { Array } velocity - массив векторов скоростей.
     * @param  { Number } mu - коэффициент МЮ для парса значений по векторам.
     */
    #stateVectorToKeplerian(position, velocity, mu =398600.4418) {
        /* Преобразует вектор состояния в кеплеровские элементы */
            // const r = position.map(x => Math.abs(x)); // Убираем отрицательные значения
            // const v = velocity.map(x => Math.abs(x)); // Убираем отрицательные значения
        const r = [...position];
        const v = [...velocity];
        console.log(r);
        console.log(v);
        // Вспомогательные функции
        const cross = (a, b) => [
            a[1] * b[2] - a[2] * b[1],
            a[2] * b[0] - a[0] * b[2],
            a[0] * b[1] - a[1] * b[0]
        ];

        const dot = (a, b) => a.reduce((sum, val, i) => sum + val * b[i], 0);
        const norm = a => Math.sqrt(dot(a, a));
        const normalize = a => {
            const n = norm(a);
            return a.map(x => x / n);
        };

        const h = cross(r, v);
        const n = cross([0, 0, 1], h);
        const hNorm = norm(h);
        const rNorm = norm(r);
        const vNorm = norm(v);

        // Вычисление вектора эксцентриситета
        const e_vec = r.map((ri, i) =>
            ((vNorm ** 2 - mu / rNorm) * ri - dot(r, v) * v[i]) / mu
        );
        const e = norm(e_vec);

        // Большая полуось
        const a = 1 / (2 / rNorm - vNorm ** 2 / mu);

        // Наклонение
        const i = Math.acos(h[2] / hNorm);

        // Долгота восходящего узла
        const raan = (Math.atan2(n[1], n[0]) + 2 * Math.PI) % (2 * Math.PI);

        // Аргумент перицентра
        const e_dot_n = dot(e_vec, n);
        const e_cross_h_cross_n = dot(e_vec, cross(h, n));
        const argp = (Math.atan2(e_cross_h_cross_n, hNorm * e_dot_n) + 2 * Math.PI) % (2 * Math.PI);

        // Истинная аномалия
        const r_dot_e = dot(r, e_vec);
        const r_cross_h_dot_e = dot(r, cross(h, e_vec));
        const nu = (Math.atan2(r_cross_h_dot_e, hNorm * r_dot_e) + 2 * Math.PI) % (2 * Math.PI);

        return {
            a: a,
            e: e,
            i: i,
            raan: raan,
            argp: argp,
            nu: nu
        };
    }

    /**
     * Парсит Кеплеровскую строку для дальнейшего парса в TLE формат.
     * @param  { String } keplerStr - Кеплеровская строка в виде НУ.
     */
    parseLinesKepler(keplerStr){
            const parsed_data = this.#parseKeplerianString(keplerStr);
            const kepler_elements = this.#stateVectorToKeplerian(
                parsed_data.position,
                parsed_data.velocity
            );
            return   {
                ...kepler_elements,
                sat_num: parsed_data.sat_num,
                epoch: parsed_data.epoch,
                bstar: parsed_data.bstar,
                mean_motion_dot: parsed_data.mean_motion_dot,
            };
    }

    // parseKepToObject(keplerStr){
    //     const parts = keplerStr
    //         .split(';')
    //         .map(p => p.trim())
    //         .filter(p => p);
    //
    //     // Удаляем нумерацию параметров (префиксы "1.", "2." и т.д.)
    //     const cleanParts = parts.map(part => {
    //         const dotIndex = part.indexOf('.');
    //         return dotIndex > -1 ? part.substring(dotIndex + 1) : part;
    //     });
    //
    //     // 1. Адресная фраза (НУ01:134,2,0,10,1)
    //     const addressParts = cleanParts[0].includes(':')
    //         ? cleanParts[0].split(':')[1].split(',')
    //         : cleanParts[0].split(',');
    //
    //     const addressPhrase = {
    //         nameForm: cleanParts[0].split(':')[0], // "НУ01"
    //         numKA: addressParts[0] || null,
    //         numCalcNu: addressParts[1] || null,
    //         numModNu: addressParts[2] || null,
    //         numTypeNu: addressParts[3] || null,
    //         numBc: addressParts[4] || null
    //     };
    //
    //     // 2. Первая фраза (124,1,8633)
    //     const firstPhraseParts = cleanParts[1].split(',');
    //     const firstPhrase = {
    //         numKA: firstPhraseParts[0] || null,
    //         numSysCoord: firstPhraseParts[1] || null,
    //         numVitok: firstPhraseParts[2] || null
    //     };
    //
    //     // 3. Вторая фраза - дата (08.09.2024)
    //     const dateParts = cleanParts[2].split('.');
    //     const secondPhrase = {
    //         day: dateParts[0] || null,
    //         month: dateParts[1] || null, // Обратите внимание: в исходных данных месяц и день могут быть перепутаны
    //         yearShort: dateParts[2] || null,
    //         yearAall: dateParts[3] || null,
    //         yearEpoch: dateParts[4] || null // необязательное поле
    //     };
    //
    //     // 4. Третья фраза - время (17.00.05.982)
    //     const timeParts = cleanParts[3].split('.');
    //     const thirdPhrase = {
    //         hours: timeParts[0] || null,
    //         minutes: timeParts[1] || null,
    //         seconds: timeParts[2] || null,
    //         upSeconds: timeParts[3] || null
    //     };
    //
    //     // 5-10. ВКП параметры (-7124.598152+00 ... 7.041458+00)
    //     const vkp = cleanParts.slice(4, 10).map(item => {
    //         const parts = item.split('.');
    //         return {
    //             meaning: parts[0] || null,
    //             additionally: parts[1] || null,
    //             sign: item.startsWith('-') ? '-' : '+'
    //         };
    //     });
    //
    //     // 11-12. Коэффициенты (0.050000+00, 0.0000000+00)
    //     const coefficients = {
    //         ballisticEffect: cleanParts[10] || null,
    //         coefficientLight: cleanParts[11] || null
    //     };
    //
    //     // 13. Логическая шкала (020000000,0)
    //     const logicScaleParts = cleanParts[12] ? cleanParts[12].split(',') : [];
    //     const logicScale = {
    //         simpleScale: logicScaleParts[0] || null,
    //         fullScale: logicScaleParts[1] || null
    //     };
    //
    //     return {
    //         addressPhrase,
    //         firstPhrase,
    //         secondPhrase,
    //         thirdPhrase,
    //         vkp,
    //         coefficients,
    //         logicScale
    //     };
    // }


}