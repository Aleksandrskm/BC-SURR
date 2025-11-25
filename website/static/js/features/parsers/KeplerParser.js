export class KeplerParser{
    constructor(){}
    #parseNumber(s) {
        // Удаляем номер параметра (например, '4.' в начале)
        s = s.replace(/^\d+\./, '');
        // Заменяем запятые на точки для десятичных разделителей
        s = s.replace(/,/g, '.');
        // Удаляем научную нотацию (+00 или -00 в конце)
        s = s.replace(/[+-]\d{2}$/, '');
        return parseFloat(s);
    }
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
    parseKeplerianString(keplerStr) {
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

}