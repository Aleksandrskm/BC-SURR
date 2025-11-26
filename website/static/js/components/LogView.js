import {renderPopup} from "./Popup.js";
export class LogView{
    /**
     * Отображает начало логов при отправке данных на сервер.
     * @param {Array} arrClassTlEs - данные TLE для отображения.
     * @param {String} selector - селектор элемента для отображения.
     */
    static showBegLogRequest(arrClassTlEs,selector){
        const selectedElement=document.querySelector(`${selector}`)
        selectedElement.innerHTML+=`<br><span class='header-log'>Начало сеанса: ${new Date().toLocaleString()}</span>`;
        for (let datasTle of arrClassTlEs) {
            const logIn=document.createElement('div');
            logIn.innerHTML+=`<br>`;
            for(let fieldTLE in datasTle)
            {
                logIn.innerHTML+=`<div> ${fieldTLE}:${(datasTle[fieldTLE])}</div>`;
                selectedElement.append(logIn);
            }
        }
        document.querySelector(selector).innerHTML+=`<br><div>Время начала отправки данных БД: ${new Date().toLocaleString()}</div>`;
    }

    /**
     * Отображает завершение логов при отправке данных на сервер.
     * @param {String} selector - селектор элемента для отображения.
     */
    static showEndLogRequest(selector){
        const logIn=document.createElement('div');
        const selectedElement=document.querySelector(`${selector}`)
        logIn.innerHTML+=`<br>`;
        logIn.innerHTML+=`<span style="font-size: calc(1.2rem);">Завершение сеанса:</span>`
        selectedElement.append(logIn);
        selectedElement.innerHTML+=`<div>Время ответа о завершении получения данных и перерасчета местоположения КА: 
        <br>${new Date().toLocaleString()}</div>`;
        selectedElement.innerHTML+=`<br><span class='header-log'>Данные успешно обновлены</span>`
        setTimeout(() => {
            const container = document.querySelector(`#comtainer-logs`);
            if (container) {
                container.scrollTo({
                    top: container.scrollHeight,
                    behavior: 'smooth'
                });
                renderPopup(document.querySelector('#dialog-res'),`Данные успешно обновлены`)
            }
        }, 300)

    }
}