import {KeplerView} from "../../components/kepler/KeplerView.js";
import {convertLineEndings} from "../../utils/converLineEndings.js";
import {keplerToTLE} from "./keplerToTle.js";
import {editFileName} from "../../components/EditFileName.js";
import {getKaDefault} from "../api/getKaDefault.js";
/**
 * Функция получает с сервера стандартные значения кеплеровских строк и отображает их в кеплеровском и TLE форматах.
 * */
export function viewDefaulBc(){
    const selectedValue = document.querySelector('input[name="type_bd"]:checked').value;
    console.log("selectedValue", selectedValue);
    getKaDefault(selectedValue,'BC').then(data=>{
        const dataEnds=convertLineEndings(data);
        document.getElementById('data-document').innerHTML=``;
        document.getElementById('BC-document').innerHTML=``;
        document.getElementById('data-kepler').innerHTML=``;
        document.getElementById('convert-kepler').innerHTML=``;
        const  viewKepler = new KeplerView();
        viewKepler.viewKeplerData(dataEnds);
        document.getElementById('view-btn-kepler').addEventListener('click',keplerToTLE);
        keplerToTLE();
        // document.querySelector('.input-file-text').innerHTML=`Наименование файла: БЦ по умолчанию `;
        editFileName('.input-file-text',`Наименование файла: БЦ по умолчанию `);
        document.getElementById('task-btn-TLE').disabled=false;
    });
}