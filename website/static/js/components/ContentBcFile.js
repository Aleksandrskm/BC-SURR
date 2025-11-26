/**
 * Заменяет текст в DOM Элементе.
 * @param {String} idBcFile -id DOM элемента для рендеринга.
 * @param {String} textMessage - текст для вставки.
 */
export function renderBcName(idBcFile,textMessage){
    document.getElementById(idBcFile).innerText=textMessage;
}