/**
 * Заменяет переносы строк чтобы они были одного вида.
 * @param {String} text -данные строк для замены переноса строки.
 */
export function convertLineEndings(text) {
    return text.replace(/\n/g, '\r\n');
}