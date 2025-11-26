'use strict'
/**
 * Отображает исчезающие сообщение на экране.
 * @param {Element} dialogElement - элемент для визуализации.
 * @param {String} message - сообщение для отображения.
 */
function renderPopup(dialogElement,message){
    const elementDivPopup = document.createElement("div");
    const elementParagraphPopup=document.createElement("p");
    dialogElement.innerHTML=``;
    elementParagraphPopup.innerHTML=message;
    elementDivPopup.append(elementParagraphPopup);
    elementDivPopup.classList.add('dialog-div');
    dialogElement.prepend(elementDivPopup);
    dialogElement.classList.add('popup');
    dialogElement.showModal()
    setTimeout(()=>{
        dialogElement.classList.remove('popup')
        dialogElement.close()
    },5000)
}
export {renderPopup}