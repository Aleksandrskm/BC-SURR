/**
 * Создает массив данных из Кеплеровских строк.
 * @param {String} data -данные для разбиения кеплеровских строк.
 */
export function splitKeplerLines(data) {
    return data.split('\r\n');
}