/**
 * Отображает промежуточные параметры кеплеровских строк формата НУ.
 * @param {Object} keplerElements -объект с промежуточными параметрами вычислений кеплеровских значений.
 * @param {String} idElement - id DOM элемента для рендеринга.
 * @param {Number} i - индекс КА.
 */
export function viewKeplerIntermediateParameters(keplerElements,idElement,i){
    const rusNamesKepler={
        e:'Эксцентриситет ',
        a:'Большая полуось (км)',
        i:"Наклонение (рад)",
        raan:'Долгота восходящего узла (рад)',
        argp:'Аргумент перицентра (рад)',
        sat_num:'Номер КА',
        epoch:'Эпоха',
        nu:'Истинная аномалия (рад)',
        bstar:'Коэффициент торможения',
        mean_motion_dot:'Производная среднего движения',
    }
    document.querySelector(idElement).innerHTML+=`<div class="log">КА  ${i+1}:</div>`;
    if (Object.keys(keplerElements).length){
        for (const key in keplerElements) {
            document.querySelector(idElement).innerHTML+=`<div class="log">${rusNamesKepler[key]}: ${keplerElements[key]}</div>`;
        }
        document.querySelector(idElement).innerHTML+=`<br>`;
    }
}