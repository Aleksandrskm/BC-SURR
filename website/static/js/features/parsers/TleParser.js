import {DataTle} from "../../models/DataTle.js";
export class TleParser{
    constructor(){}
    #parseTLELine(line,count_line,tle) {
        let dataTLE;
        dataTLE=line;
        let element='';
        let counter=0;
        if (count_line==0) {
            tle.TLE_NAME=dataTLE;
            tle.NAIM=dataTLE;
            tle.NAIM_RUS= dataTLE.replace('GONETS','Гонец')
        }
        else if (count_line==1) {
            tle.TLE_LINE1=dataTLE;
            for (let i = 0; i < dataTLE.length; i++) {
                if (i==0) {
                    element+=dataTLE[i];
                    element='';
                    counter+=1;
                }
                else if (i>1 && i<7) {
                    if (i==6) {
                        element+=dataTLE[i];
                        tle.KOD_NORAD=element;
                        element='';
                        counter+=1;
                    }
                    else{
                        element+=dataTLE[i];
                    }
                }
                else if(i==7){
                    element+=dataTLE[i];
                    tle.TLE_CLASSIFICATION=element;
                    element='';
                    counter+=1;
                }
                else if (i>7 && i<15) {
                    if (i==14) {
                        element+=dataTLE[i];
                        tle.TLE_INTERNATIONAL_CLASS=(element);
                        element='';
                        counter+=1;
                    }
                    else{
                        element+=dataTLE[i];
                    }
                }
                else if (i>17 && i<20) {
                    if (i==19) {

                        element+=dataTLE[i];
                        // console.log(element)
                        tle.TLE_EPOCH_YEAR=Number(element);
                        element='';
                        counter+=1;
                    }
                    else{
                        element+=dataTLE[i];
                    }
                }
                else if (i>19 && i<32) {
                    // console.log(dataTLE[31])
                    if (i===31) {
                        element+=dataTLE[i];
                        tle.TLE_EPOCH_TIME=+(element);
                        element='';
                        counter+=1;
                    }
                    else{
                        element+=dataTLE[i];
                    }
                }
                else if (i>32 && i<43) {
                    // console.log(element,i)
                    if (i==42) {
                        element+=dataTLE[i];
                        let correctElem
                        // console.log(element[0])
                        if (element[0]==' ') {
                            correctElem=element.replace(/\s/,'0');
                        }
                        tle.TLE_PERV_PROIZV=+correctElem;
                        element='';
                        counter+=1;
                    }
                    else{
                        element+=dataTLE[i];
                    }
                }
                else if (i>43 && i<53) {
                    if (i==52) {
                        let correctElem='';
                        let num='',degree='';
                        if (element[0]==' ') {
                            correctElem=element.replace(/\s/,'0');
                            let indexDegree=element.search(/[-+]/);
                            for (let i = 0; i < indexDegree; i++) {
                                num+=correctElem[i];
                            }
                            for (let index = indexDegree; index < correctElem.length; index++) {
                                degree += correctElem[index];
                            }
                        }
                        element+=dataTLE[i];
                        tle.TLE_VTOR_PROIZV=Math.pow(+num,+degree);
                        element='';
                        counter+=1;
                    }
                    else{
                        element+=dataTLE[i];
                    }
                }
                else if (i>52 && i<62) {
                    if (i==61) {
                        let correctElem='';
                        let num='',degree='';
                        if (element[0]==' ') {
                            correctElem=element.replace(/\s/,'0.');
                            let indexDegree=correctElem.search(/[-+]/);
                            for (let i = 0; i < indexDegree; i++) {
                                num+=correctElem[i];
                            }
                            for (let index = indexDegree; index < correctElem.length; index++) {
                                degree += correctElem[index];
                            }
                        }
                        element+=dataTLE[i];
                        tle.TLE_KOEF_TORM=num*Math.pow(10,+degree);
                        element='';
                        counter+=1;
                    }
                    else{
                        element+=dataTLE[i];
                    }
                }
                else if (i==62) {
                    element+=dataTLE[i];
                    element='';
                    counter+=1;

                }
                else if (i>63 && i<68) {
                    if (i==67) {
                        // console.log(element)
                        element+=dataTLE[i];
                        tle.TLE_ELEMENT_VERSION=+element;
                        element='';
                        counter+=1;
                    }
                    else{
                        element+=dataTLE[i];
                    }
                }
                else if (i==68) {
                    element+=dataTLE[i];
                    tle.TLE_CONTROL_SUM_LINE1=+element;
                    element='';
                    counter+=1;
                }
            }
        }
        else if (count_line==2) {
            tle.TLE_LINE2=dataTLE;
            for (let i = 0; i < dataTLE.length; i++) {
                if (i==0) {
                    element+=dataTLE[i];
                    element='';
                    counter+=1;
                }
                else if (i>1 && i<7) {
                    if (i==6) {
                        element+=dataTLE[i];
                        element='';
                        counter+=1;
                    }
                    else{
                        element+=dataTLE[i];
                    }
                }
                else if (i>8 && i<16) {
                    if (i==15) {
                        element+=dataTLE[i];
                        tle.TLE_NAKLON=+element;
                        element='';
                        counter+=1;
                    }
                    else{
                        element+=dataTLE[i];
                    }
                }
                else if (i>16 && i<25) {
                    if (i==24) {
                        element+=dataTLE[i];
                        tle.TLE_DOLGOTA_UZLA=+element;
                        element='';
                        counter+=1;
                    }
                    else{
                        element+=dataTLE[i];
                    }
                }
                else if (i>25 && i<33) {

                    if (i==32) {
                        element+=dataTLE[i];
                        tle.TLE_ECSCENTR=Number('0.'+element);
                        element='';
                        counter+=1;
                    }
                    else{
                        element+=dataTLE[i];
                    }
                }
                else if (i>33 && i<42) {
                    if (i==41) {
                        element+=dataTLE[i];
                        tle.TLE_PERICENTR=+element;
                        element='';
                        counter+=1;
                    }
                    else{
                        element+=dataTLE[i];
                    }
                }
                else if (i>42 && i<51) {
                    if (i==50) {
                        element+=dataTLE[i];
                        tle.TLE_MEAN_ANOMALY=+element;
                        element='';
                        counter+=1;
                    }
                    else{
                        element+=dataTLE[i];
                    }
                }
                else if (i>51 && i<61) {
                    if (i==60) {
                        element+=dataTLE[i];
                        tle.TLE_MEAN_MOTION=+element;
                        element='';
                        counter+=1;
                    }
                    else{
                        element+=dataTLE[i];
                    }
                }
                else if (i>62 && i<68) {
                    if (i==67) {
                        element+=dataTLE[i];
                        tle.TLE_NOMER_VITKA=+element;
                        element='';
                        counter+=1;
                    }
                    else{
                        element+=dataTLE[i];
                    }
                }
                else if (i==68) {
                    element+=dataTLE[i];
                    tle.TLE_CONTROL_SUM_LINE2=+element;
                    element='';
                    counter+=1;

                }
            }
        }
    }
    #formatBstar(bstarValue) {
        // Ограничиваем значение (0.0 ≤ B* ≤ 0.999999)
        const absBstar = Math.min(0.999999, Math.max(0.0, Math.abs(bstarValue)));

        // Преобразуем в научную нотацию (например, 1.1606e-4 → "1.160600e-4")
        const bstarStr = absBstar.toExponential(6);

        // Разбиваем на мантиссу и экспоненту
        const [mantissaPart, exponentPart] = bstarStr.split('e');
        const exponent = parseInt(exponentPart, 10);

        // Удаляем точку и дополняем нулями до 5 цифр
        const mantissaDigits = mantissaPart.replace('.', '').substring(0, 5).padEnd(5, '0');

        // Вычисляем экспоненту для TLE (B* = mantissa × 10^exponent_TLE)
        const tleExponent = exponent - 1;
        const sign = tleExponent >= 0 ? '+' : '-';

        // Форматируем в "NNNNN±E" (5 цифр + знак + 1 цифра экспоненты)
        return ` ${mantissaDigits}${sign}${Math.abs(tleExponent)}`;
    }
    #convertToEpochTime(dateString) {
        const date = new Date(dateString);
        // Проверка на валидность даты
        if (isNaN(date.getTime())) {
            throw new Error('Invalid date string');
        }
        // Получаем последние две цифры года
        const year = date.getFullYear();
        const shortYear = year.toString().slice(-2).padStart(2, '0');
        // Вычисляем день года (1-366)
        const startOfYear = new Date(year, 0, 1);
        const diff = date - startOfYear;
        const dayOfYear = Math.floor(diff / (1000 * 60 * 60 * 24)) + 1;
        // Вычисляем дробную часть дня
        const millisecondsInDay = 24 * 60 * 60 * 1000;
        const fractionOfDay = (diff % millisecondsInDay) / millisecondsInDay;
        // Форматируем день года с ведущими нулями (всегда 3 цифры)
        const formattedDayOfYear = dayOfYear.toString().padStart(3, '0');
        // Объединяем день года и дробную часть
        const fractionalPart = fractionOfDay.toFixed(8).substring(1); // убираем ведущий "0"
        // Форматируем результат
        return `${shortYear}${formattedDayOfYear}${fractionalPart}`;
    }
    #generateTLEFromKeplerian(keplerParams) {
        /** Генерирует валидный TLE из кеплеровских параметров с проверкой границ */
        let {
            sat_num: satNum,
            epoch, // ожидается строка в формате "2024-09-08 17:00:05.982000"
            a,
            e: eccentricity,
            i: inclination,
            raan,
            argp,
            nu: trueAnomaly,
            bstar = 0.0,
            mean_motion_dot: meanMotionDot = 0.0,
        } = keplerParams;

        // Преобразование строки даты в объект Date
        function parseDateString(dateStr) {
            const [datePart, timePart] = dateStr.split(' ');
            const [year, month, day] = datePart.split('-').map(Number);
            const [hours, minutes, seconds] = timePart.split(':');
            const [sec, millis] = seconds.split('.');

            return new Date(
                year, month - 1, day,
                Number(hours), Number(minutes), Number(sec),
                Number(millis.substring(0, 3)) // берем только миллисекунды
            );
        }

        const epochDate = typeof epoch === 'string' ? parseDateString(epoch) : epoch;

        // Проверка и корректировка параметров
        const checkedSatNum = Math.max(0, Math.min(99999, +(satNum)));
        const checkedEccentricity = Math.max(0.0, Math.min(0.9999999, parseFloat(eccentricity)));

        const checkedInclination = inclination % (2 * Math.PI);
        const checkedRaan = raan % (2 * Math.PI);
        const checkedArgp = argp % (2 * Math.PI);
        const checkedTrueAnomaly = trueAnomaly % (2 * Math.PI);

        // Расчет параметров
        const mu = 398600.4418;
        const nRadPerSec = Math.sqrt(mu / Math.max(a, 1.0));
        let nRevPerDay = (nRadPerSec * 86400) / (2 * Math.PI);
        nRevPerDay = Math.max(0.99, Math.min(12.0, nRevPerDay));

        // Преобразование аномалий
        const E = 2 * Math.atan2(
            Math.sqrt(1 - checkedEccentricity) * Math.sin(checkedTrueAnomaly / 2),
            Math.sqrt(1 + checkedEccentricity) * Math.cos(checkedTrueAnomaly / 2)
        );
        const M = (E - checkedEccentricity * Math.sin(E)) % (2 * Math.PI);

        // Форматирование эпохи для TLE (YYDDD.FFFFFF)
        const epochYD = this.#convertToEpochTime(epoch);
        // Форматирование коэффициента торможения B* в формате "11606-4"

        const formattedBstar = this.#formatBstar(bstar);

        // Форматирование TLE 1 строка
        const tleLine1 =
            `1 ${checkedSatNum.toString().padStart(5, '0')}U 00000    ` +
            `${epochYD.padStart(12, ' ')}  ` +
            `.${Math.abs(Math.floor(meanMotionDot * 1e10)).toString().padStart(8, '0')} ` +
            ` 00000-0 ` +
            `${formattedBstar} 0  0000`;
        let raans=(radToDeg(checkedRaan) % 360);
        raans=(raans <100)? raans>10?`0${raans.toFixed(4)}`:`00${raans.toFixed(4)}`:raans.toFixed(4);
        console.log(meanMotionDot);
        meanMotionDot/=10;
        // Форматирование TLE 2 строка
        const tleLine2 =
            `2 ${checkedSatNum.toString().padStart(5, '0')} ` +
            `${(radToDeg(checkedInclination) % 360).toFixed(4).padStart(8, ' ')}` +
            ` ${raans} ` +
            `${Math.min(9999999, Math.floor(checkedEccentricity * 1e7)).toString().padStart(7, '0')} ` +
            `${(radToDeg(checkedArgp) % 360).toFixed(4).padStart(8, ' ')} ` +
            `${(radToDeg(M) % 360).toFixed(4).padStart(8, ' ')}` +
            `${nRevPerDay.toFixed(7).padStart(11, ' ')}` +
            `${Math.floor(Math.abs(meanMotionDot) * 1e10)} ${''.toString().padStart(5, '0')}`;

        return [tleLine1, tleLine2];
    }
    parseTLEFile(fileReader) {
        let tle= new DataTle();
        const arrClassTlEs=[];
        console.log(fileReader,'fileReader');
        let lines
        if (typeof fileReader == 'string' ) {
            lines = (fileReader).split("\r\n");
        }
        else  lines = fileReader;
        console.log(lines)
        let count_line=0;
        for (const line of lines) {
            if (count_line===3) {
                count_line=0
                arrClassTlEs.push(tle);
                tle=new dataTle();
            }
            this.#parseTLELine(line,count_line,tle);
            count_line++;
        }
        arrClassTlEs.push(tle);
        console.log(arrClassTlEs);
        for(let i=0;i<arrClassTlEs.length;i++){
            arrClassTlEs[i].DATA_BEG=String(new Date().toISOString()).replace('Z','+00:00');
            arrClassTlEs[i].ID=i+1;
        }
        // const dataDocument=document.createElement('div');
        // dataDocument.classList.add('data-doc');
        // arrClassTlEs.forEach(tle=>{
        //     dataDocument.innerHTML+=`<textarea>${tle.NAIM}</textarea>`;
        //     dataDocument.innerHTML+=`<textarea>${tle.TLE_LINE1}</textarea>`;
        //     dataDocument.innerHTML+=`<textarea>${tle.TLE_LINE2}</textarea>`;
        // })
        // if (flag){
        //     document.getElementById('data-document').append(dataDocument);
        // }
        return arrClassTlEs

    }
    getTleLinesFromKepler(keplerValues){
        const objNameTles = {
            0: 'GONETS-M1 1-1',
            1: 'GONETS-M1 1-2',
            2: 'GONETS-M1 1-3',
            3: 'GONETS-M1 1-4',
            4: 'GONETS-M1 1-5',
            5: 'GONETS-M1 1-6',
            6: 'GONETS-M1 1-7',
            7: 'GONETS-M1 2-1',
            8: 'GONETS-M1 2-2',
            9: 'GONETS-M1 2-3',
            10: 'GONETS-M1 2-4',
            11: 'GONETS-M1 2-5',
            12: 'GONETS-M1 2-6',
            13: 'GONETS-M1 2-7',
            14: 'GONETS-M1 3-1',
            15: 'GONETS-M1 3-2',
            16: 'GONETS-M1 3-3',
            17: 'GONETS-M1 3-4',
            18: 'GONETS-M1 3-5',
            19: 'GONETS-M1 3-6',
            20: 'GONETS-M1 3-7',
            21: 'GONETS-M1 4-1',
            22: 'GONETS-M1 4-2',
            23: 'GONETS-M1 4-3',
            24: 'GONETS-M1 4-4',
            25: 'GONETS-M1 4-5',
            26: 'GONETS-M1 4-6',
            27: 'GONETS-M1 4-7'
        };
        let tle=``;
        keplerValues.forEach((keplerStr,index)=>{
            const kepler_str = keplerStr;
            console.log(kepler_str)
            const parsed_data = parseKeplerianString(kepler_str);
            console.log(parsed_data);
            const kepler_elements = stateVectorToKeplerian(
                parsed_data.position,
                parsed_data.velocity
            );
            const updatedKeplerElements = {
                ...kepler_elements,
                sat_num: parsed_data.sat_num,
                epoch: parsed_data.epoch,
                bstar: parsed_data.bstar,
                mean_motion_dot: parsed_data.mean_motion_dot,
            };
            console.log(updatedKeplerElements)
            const [tle1,tle2] = this.#generateTLEFromKeplerian(updatedKeplerElements);
            const nameTLE=objNameTles[index];
            tle+=`${nameTLE}\r\n${tle1}\r\n${tle2}\r\n`;
            console.log(tle);
        })
        return tle
    }
}