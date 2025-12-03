/**
 * Функция пересчета данных по КА на сервере.
 *
 * @param {String} url - url адрес сервера.
 * */
export async function recalculateKas(url){
    try {
        const response = await fetch(`http://${url}/ka/recalculate`, {
            method: "POST",
            headers: {
                "Content-Type": "text/plain",
                "X-Source":73
            },
        });
        if (response.ok) {
            const result = await response;
            return result;
        }
        else {
            throw new Error(`HTTP error! status: ${response.status} ${response.statusText}`);
        }
    } catch (error) {
        console.error("Error recalculating KAS:", error);
        throw error;
    }

}