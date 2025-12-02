import {TleParser} from "../parsers/TleParser.js";
import {renderPopup} from "../../components/Popup.js";
import {LogView} from "../../components/LogView.js";
import {postKA} from "../api/postKa.js";
import {recalculateKas} from "../api/recalculateKas.js";
export function eventSend(){
    const parserTle=    new TleParser();
    const selectedValue = document.querySelector('input[name="type_bd"]:checked').value;
    let idElem='';
    if (document.getElementById('BC-document').innerHTML===''){
        idElem='get_TLE'
    }else {
        idElem='get_TLEs'
    }
    const arrTles=[...document.querySelectorAll('.data-doc textarea')].map(dataTle=>dataTle.value);
    console.log(arrTles,'arrTles');
    arr= parserTle.parseTLEFile(arrTles);
    document.getElementById('task-btn-TLE').disabled=true;
    arr.forEach(dataTle=>{
        dataTle.NAIM = dataTle.NAIM.replace(/\n/g, "");
        dataTle.NAIM_RUS = dataTle.NAIM_RUS.replace(/\n/g, "")
        dataTle.TLE_NAME = dataTle.TLE_NAME.replace(/\n/g, "")
    })
    postKA(arr,selectedValue)
        .then(()=>{
            console.log(idElem)
            LogView.showBegLogRequest(arr,'#comtainer-logs');
            renderPopup(document.querySelector('#dialog-res'),`Данные  отправлены <br> Ожидайте сообщения о пересчете местоположения КА`)
            recalculateKas(selectedValue).then((res)=>{
                LogView.showEndLogRequest('#comtainer-logs');
            })
        })
    document.getElementById('task-btn-TLE').disabled=true;
}