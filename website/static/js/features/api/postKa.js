/**
 * Функция отправки данных КА на сервер.
 *
 * @param {Object} data - тело запроса со всеми данными.
 * @param {String} url - url адрес сервера.
 * */
export async function postKA(data,url){
    try {
        const response = await fetch(`http://${url}/ka?ist=73`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
        const result = await response.json();
        return result;
    }
    catch (error) {
        console.error("Error add row:", error);
    }
}