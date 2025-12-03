/**
 * Функция обработки, парса и отображения файла.
 * @param {Event} event -ивент при обработке файла.
 * @param {Function} onFileText - функция для обработки файла.
 * */
export function handleTextFiles(event, onFileText) {
    const files = event.target.files;
    for (const file of files) {
        const reader = new FileReader();
        reader.onload = () => {
            onFileText(reader.result, file);
        };
        reader.readAsText(file);
    }
}
