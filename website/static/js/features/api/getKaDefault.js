export async function getKaDefault(url,typeFile){
    try {
        const response = await fetch(`http://${url}/service/ka_default_file?type=${typeFile}&ist=73`, {
            method: "GET",
            headers: {
                "Content-Type": "text/plain",
            },
        });
        const result = await response;
        return result.text();
    }
    catch (error) {
        console.error("Error add row:", error);
    }
}