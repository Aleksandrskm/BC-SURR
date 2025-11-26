import {KeplerParser} from "../../features/parsers/KeplerParser.js";
import {splitKeplerLines} from "../../utils/splitKeplerLines.js";
import {renderKeplerTextareas} from "./KeplerTextareaList.js";
import {viewKeplerIntermediateParameters} from "./KeplerIntermediateParameters.js";
import {renderBcName} from "../ContentBcFile.js";
export class KeplerView{

    /**
     * создает адресную фразу кеплеровской строки.
     * @param {Array} dataParts - данные кеплеровской строки.
     * @param {Number} i - номер строки.
     */
    #createAddressPart(dataParts,i){
        const addressPart = dataParts[0].split(':')[0].split(',');
        const adresPart = dataParts[0].split(',');
        console.log(dataParts[0],addressPart,adresPart[0])
        return `
            <div class="data-group">
            <br>
            <div class="data-header">КА  ${i}:</div>
                <div class="data-header">Адресная фраза- Общие данные:</div>
                <div class="data-value">${dataParts[0]}</div>
                <div class="data-description">
                <br>
                    <div class="data-header-min">Состав адресной фразы:</div>
                    <span>Имя формы: ${adresPart[0].substring(0, 4)}; </span>
                    <span>Номер КА: ${adresPart[0].substring(5) || 'не указан'}; </span>
                    <span>Номер решения НУ: ${adresPart[1] || 'не указан'}; </span>
                    <span>Номер модификатора НУ: ${adresPart[2] || 'не указан'}; </span>
                    <span>Номер типа НУ: ${adresPart[3] || 'не указан'}; </span>
                    <span>Номер БЦ,производившего решение: ${adresPart[4] || 'не указан'}; </span>
                </div>
            </div>`;
    }

    /**
     * создает первую фразу кеплеровской строки.
     * @param {Array} dataParts - данные кеплеровской строки.
     */
    #createFirstPhrase(dataParts){
        const firstPhrase = dataParts[1].split(',');
        return `
            <div class="data-group">
             <br>
                <div class="data-header">Фраза 1 - Основные параметры</div>
                <div class="data-value">${dataParts[1]}</div>
                <div class="data-description">
                <br>
                    <div class="data-header-min">Состав фразы:</div>
                    <span>Номер КА: ${firstPhrase[0].split('.')[1] || 'не указан'}; </span>
                    <span>Номер системы координат: ${firstPhrase[1] || 'не указан'}; </span>
                    <span>Номер витка: ${firstPhrase[2] || 'не указан'}; </span>
                </div>
            </div>`;
    }

    /**
     * создает вторую фразу кеплеровской строки.
     * @param {Array} dataParts - данные кеплеровской строки.
     */
    #createSecondPhrase(dataParts){
        const secondPhrase = dataParts[2].split('.');
        return `
            <div class="data-group">
             <br>
                <div class="data-header">Фраза 2 - Дата задания параметров:</div>
                <div class="data-value">${dataParts[2]}</div>
                 <div class="data-header-min">Состав фразы:</div>
                  <span>дд.мм.гггг; </span>
            </div>`;

    }

    /**
     * создает фразу времени кеплеровской строки.
     * @param {Array} dataParts - данные кеплеровской строки.
     */
    #createTimePhrase(dataParts){
        const timePhrase = dataParts[3].split('.');
        return `
            <div class="data-group">
             <br>
                <div class="data-header">Фраза 3 - Время задания параметров:</div>
                <div class="data-value">${dataParts[3]}</div>
                <div class="data-description">
                 <div class="data-header-min">Состав фразы:</div>
                 <span>UTC +00:00:00; </span>
            </div>`;
    }

    /**
     * создает ВКП фразу кеплеровской строки.
     * @param {Array} dataParts - данные кеплеровской строки.
     * @param {Element} htmlOutput - элемент для записи данных.
     */
    #createVkpPhrase(dataParts,htmlOutput){
        const vkpLabels = [
            'X координата (км)', 'Y координата (км)', 'Z координата (км)',
            'Vx скорость (км/с)', 'Vy скорость (км/с)', 'Vz скорость (км/с)'
        ];

        for (let i = 4; i <= 9; i++) {
            if (dataParts[i]) {
                const value = dataParts[i].substring(2);
                let axis=''
                let lat=0;
                let long=0;
                let typeVkp=`Расстояние по оси`
                if (i===4 ||  i===7){
                    axis='X'
                    typeVkp=`Расстояние по оси`;
                }
                else if (i===5 || i===8){
                    axis='Y';
                    long=90;
                    typeVkp=`Расстояние по оси`;
                }
                else if (i===6 ||  i===9){
                    axis='Z';
                    lat=90;
                    typeVkp=`Расстояние по оси`;
                }
                if (i>6)
                {
                    typeVkp=`Проекция скорости по оси`;
                }
                console.log(typeVkp,'typeVkp')
                htmlOutput += `
                    <div class="data-group">
                     <br>
                        <div class="data-header">Фраза ${i} - ВКП(Вектор состояния космического аппарата)</div>
                        <div class="data-value">${dataParts[i]}</div>
                        <div class="data-description">
                            <span>${vkpLabels[i-4]}:</span>
                            <span>${value}</span>
                        </div>
                         <div class="data-header-min">Состав фразы:</div>
                         <span>${typeVkp} ${axis} Центр Земли - точка (${lat};${long}) (ш;д) градусов на поверхности Земли;</span>
                    </div>`;
            }
        }
        return htmlOutput;
    }

    /**
     * создает десятую фразу кеплеровской строки.
     * @param {Array} dataParts - данные кеплеровской строки.
     */
    #createTenPhrase(dataParts){
        if (dataParts[10]) {
            return`
                <div class="data-group">
                <br>
                    <div class="data-header">Фраза 10 - Баллистический коэффициент</div>
                    <div class="data-value">${dataParts[10]}</div>
                    
                </div>`;
        }
    }

    /**
     * создает одиннадцатую фразу кеплеровской строки.
     * @param {Array} dataParts - данные кеплеровской строки.
     */
    #createElevenPhrase(dataParts){
        if (dataParts[11]) {
            return `
                <div class="data-group">
                <br>
                    <div class="data-header">Фраза 11 - Коэффициент светового давления</div>
                    <div class="data-value">${dataParts[11]}</div>
                </div>`;
        }
    }

    /**
     * создает двенадцатую фразу кеплеровской строки.
     * @param {Array} dataParts - данные кеплеровской строки.
     */
    #createTwelvePhrase(dataParts){
        if (dataParts[12]) {
            const logicParts = dataParts[12].split(',');
           return`
                <div class="data-group">
                <br>
                    <div class="data-header">Фраза 12 - Логические шкалы сил</div>
                    <div class="data-value">${dataParts[12]}</div>
                    <div class="data-description">
                        <span>Упрощенная шкала: ${logicParts[0].substring(2) || 'не указана'}</span>
                        <span>Полная шкала: ${logicParts[1] || 'не указана'}</span>
                    </div>
                </div>`;
        }
    }

    /**
     * отображает все фразы кеплеровской строки.
     * @param {String} inputString - данные  значений кеплеровской строки.
     * @param {Number} i - номер строки.
     */
    #renderKeplerData(inputString,i) {
        const outputElement = document.getElementById('convert-kepler');
        if (!outputElement) {
            console.error('Элемент с id="convert-kepler" не найден');
            return;
        }
        try {

            const dataParts = inputString.split(';').filter(part => part.trim());
            let htmlOutput = '<div class="kepler-data">';
            // htmlOutput += '<div>Данные Кеплера:</div>';
            htmlOutput += '<div class="data-container">';
            htmlOutput += this.#createAddressPart(dataParts,i);
            htmlOutput += this.#createFirstPhrase(dataParts);
            htmlOutput += this.#createSecondPhrase(dataParts);
            htmlOutput += this.#createTimePhrase(dataParts);
            htmlOutput = this.#createVkpPhrase(dataParts,htmlOutput);
            htmlOutput += this.#createTenPhrase(dataParts);
            htmlOutput += this.#createElevenPhrase(dataParts);
            htmlOutput += this.#createTwelvePhrase(dataParts);
            htmlOutput += '</div></div>';
            outputElement.innerHTML += htmlOutput;

        } catch (error) {
            outputElement.innerHTML = `<p style="color: red;">Ошибка при обработке данных</p>`;
            console.error('Ошибка парсинга:', error);
        }
    }

    /**
     * отображает все данные кеплеровской строк.
     * @param {String} keplerDatas - данные значений кеплеровской строк.
     */
    static  viewKeplerData(keplerDatas){
        const arrKepler =splitKeplerLines(keplerDatas);
        const parserKepler = new KeplerParser();
        renderKeplerTextareas(arrKepler,'BC-document')
        const keplerStrs=document.querySelectorAll('#BC-document > textarea');
        renderBcName('bc-file',`Содержание файла БЦ(Получено данных КА - ${keplerStrs.length}):`)
        keplerStrs.forEach((keplerStr,i)=>{
            const keplerValue = keplerStr.value;
            const updatedKeplerElements = parserKepler.parseLinesKepler(keplerValue);
            viewKeplerIntermediateParameters(updatedKeplerElements,'#data-kepler')
            KeplerView.#renderKeplerData(keplerValue,i+1);
        })

    }

}