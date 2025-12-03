/**
 * Создает текстовые поля с кеплеровскими строками формата НУ.
 * @param {Array} keplerData -массив кеплеровских значений.
 * @param {String} idElement - id DOM элемента для рендеринга.
 */
export function renderKeplerTextareas(keplerData,idElement){
    keplerData.forEach(keplerData=>{
        const bcData=document.createElement("textarea");
        bcData.innerText=keplerData;
        document.getElementById(idElement).append(bcData);
    })
}