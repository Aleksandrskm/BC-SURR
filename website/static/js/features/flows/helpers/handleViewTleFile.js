
import { handleTextFiles } from '../../../components/FileInput.js'  ;
import {TleParser} from "../../parsers/TleParser.js";
import {renderTleTextareas} from "../../../components/tle/TleTextareaList.js";

export function onViewTleFileChange(e) {
    const parser = new TleParser();
    handleTextFiles(e, (text, file) => {
        document.querySelector('.input-file-text').innerHTML =
            `Наименование файла: ${file.name}`;
        const arr = parser.parseTLEFile(text);
        renderTleTextareas(arr, 'data-document');
        document.getElementById('download-tle').disabled = false;
    });
}
