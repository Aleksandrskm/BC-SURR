
import { handleTextFiles } from '../../components/FileInput.js'  ;
import {TleParser} from "../parsers/TleParser.js";
import {renderTleTextareas} from "../../components/tle/TleTextareaList.js";
/**
 * Функция отображения для просмотра TLE файла.
 * @param {Event} e -ивент при обработке файла.
 * */
export function onViewTleFileChange(e) {
    const parser = new TleParser();
    document.getElementById('data-document').innerHTML = '';
    handleTextFiles(e, (text, file) => {
        document.querySelector('.input-file-text').innerHTML =
            `Наименование файла: ${file.name}`;
        const arr = parser.parseTLEFile(text);
        renderTleTextareas(arr, 'data-document');
        document.getElementById('download-tle').disabled = false;
    });
}
