import {getDateTime} from "../utils/getDateTime.js";
/**
 * Создает таймер с текущим временем.
 * @param {String} selector -селектор элемента для отображения времени.
 * @param {Number} interval - интервал таймера.
 */
export function startDateTimer(selector, interval = 0) {
    setInterval(()=> {
        document.querySelector(selector).innerHTML = getDateTime();
    }, interval);
}