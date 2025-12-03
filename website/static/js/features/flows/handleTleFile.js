
import { handleTextFiles } from "../../components/FileInput.js";
import {TleParser} from "../parsers/TleParser.js";
import {renderTleTextareas} from "../../components/tle/TleTextareaList.js";
/**
 * Функция обработки, парса и отображения TLE файла.
 * @param {Event} e -ивент при обработке файла.
 * */
export function onTlesFileChange(e) {
    const parser = new TleParser();
    handleTextFiles(e, (text, file) => {
        document.getElementById('bc-file').innerText = 'Содержание файла БЦ:';
        document.getElementById('data-document').innerHTML = '';
        document.getElementById('BC-document').innerHTML = '';
        document.getElementById('data-kepler').innerHTML = '';
        document.getElementById('convert-kepler').innerHTML = '';

        const arr = parser.parseTLEFile(text);
        renderTleTextareas(arr, 'data-document');

        document.querySelector('.input-file-text').innerHTML =
            `Наименование файла: ${file.name}`;
        document.getElementById('task-btn-TLE').disabled = false;
    });
}
