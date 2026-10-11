exports.handler = async (event) => {
    if (event.httpMethod !== "POST") {
        return { statusCode: 405, body: "Method Not Allowed" };
    }

    try {
        const { chat_id, text } = JSON.parse(event.body);
        const botToken = process.env.BOT_TOKEN;

        if (!botToken) {
            return { statusCode: 500, body: JSON.stringify({ error: "BOT_TOKEN አልተገኘም!" }) };
        }

        const response = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                chat_id: chat_id,
                text: text,
                parse_mode: "HTML"
            })
        });

        const data = await response.json();
        return {
            statusCode: 200,
            body: JSON.stringify(data)
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error.message })
        };
    }
};
