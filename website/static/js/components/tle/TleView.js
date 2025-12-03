import {TleParser} from "../../features/parsers/TleParser.js";
import {renderTleTextareas} from "./TleTextareaList.js";

export function viewTleData(fileReader) {
    const tleParser = new TleParser();
    const arrTleLines= tleParser.parseTLEFile(fileReader);
    renderTleTextareas(arrTleLines,'data-document')
}