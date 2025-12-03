import {KeplerView} from "../../components/kepler/KeplerView.js";
import {keplerToTLE} from "./keplerToTle.js";
import {handleTextFiles} from "../../components/FileInput.js";
/**
 * Функция обработки, парса и отображения Бц файла.
 * @param {Event} e -ивент при обработке файла.
 * */
export function onBcFileChange(e) {
    handleTextFiles(e, (text, file) => {
        document.getElementById('bc-file').innerText = 'Содержание файла БЦ:';
        document.getElementById('data-document').innerHTML = '';
        document.getElementById('BC-document').innerHTML = '';
        document.getElementById('data-kepler').innerHTML = '';
        document.getElementById('convert-kepler').innerHTML = '';
        const  viewKepler = new KeplerView();
        viewKepler.viewKeplerData(text);

        document
            .getElementById('view-btn-kepler')
            .addEventListener('click', keplerToTLE);

        document.querySelector('.input-file-text').innerHTML =
            `Наименование файла: ${file.name}`;
    });
}
