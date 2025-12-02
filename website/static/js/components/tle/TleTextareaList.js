/**
 * Создает текстовые поля со строками TLE от 1 до 3.
 * @param {Array} arrTleLines -массив TLE содержащий элементы типа DataTle.
 * @param {String} idElement - id DOM элемента для рендеринга.
 */
export function renderTleTextareas(arrTleLines,idElement){
    const dataDocument=document.createElement('div');
    dataDocument.classList.add('data-doc');
    arrTleLines.forEach(tle=>{
        dataDocument.innerHTML+=`<textarea>${tle.NAIM}</textarea>`;
        dataDocument.innerHTML+=`<textarea>${tle.TLE_LINE1}</textarea>`;
        dataDocument.innerHTML+=`<textarea>${tle.TLE_LINE2}</textarea>`;
    })
    document.getElementById(idElement).append(dataDocument);
}