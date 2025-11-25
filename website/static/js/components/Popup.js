'use strict'
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