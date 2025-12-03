import {startDateTimer} from "../components/Timer.js";
import {onViewTleFileChange} from "../features/flows/handleViewTleFile.js";
/**
 * Функция инициализации страницы просмотра и сохранения файла.
 * */
export function initPageView() {
    startDateTimer('#timer');
    setupEventListeners()
}

/**
 * Функция инициализации обработчиков событий.
 * */
function setupEventListeners() {
    document.getElementById("view_TLE").addEventListener("change", onViewTleFileChange);
    document.getElementById('download-tle').disabled = true
    document.getElementById('download-tle').addEventListener('click',()=>{
        const arrBlob=[];
        let indexBlob=0;
        document.querySelectorAll('textarea').forEach(lineTle=>{
            console.log(lineTle.value);
            indexBlob++;
            if (indexBlob==document.querySelectorAll('textarea').length) {
                arrBlob.push(`${String(lineTle.value)}`)
            }
            else{
                arrBlob.push(`${String(lineTle.value)}\r\n`)
            }
        })
        let blob = new Blob(arrBlob, {type: 'text/plain'});
        const link=document.getElementById('link')
        link.href = URL.createObjectURL(blob);
        console.log(blob)
    })
}
