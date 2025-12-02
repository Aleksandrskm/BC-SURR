import {getKaDefault} from "../api/getKaDefault.js";
import {convertLineEndings} from "../../utils/converLineEndings.js";
import {viewTleData} from "../../components/tle/TleView.js";
import {editFileName} from "../../components/EditFileName.js";
/**
 * Функция получает с сервера стандартные значения TLE строк и отображает их.
 * */
export function viewDefaulTles(){
    const selectedValue = document.querySelector('input[name="type_bd"]:checked').value;
    getKaDefault(selectedValue,'TLE').then(data=>{
        console.log(data)
        const dataEnds=convertLineEndings(data)
        document.getElementById('data-document').innerHTML=``;
        document.getElementById('bc-file').innerText=`Содержание файла БЦ:`;
        document.getElementById('BC-document').innerHTML=``;
        document.getElementById('data-kepler').innerHTML=``;
        document.getElementById('convert-kepler').innerHTML=``;
        console.log(document.getElementById('data-kepler'))
        // arr= readLinesValue(dataEnds, {},'get_TLEs');
        // console.log(arr);
        viewTleData(dataEnds);
        editFileName('.input-file-text',`Наименование файла: TLE по умолчанию `);
        // document.querySelector('.input-file-text').innerHTML=`Наименование файла: TLE по умолчанию`;
        document.getElementById('task-btn-TLE').disabled=false;
    });
}