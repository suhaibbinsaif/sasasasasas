export default {
  async fetch(request, env) {
    if (request.method !== "POST") {
      return new Response("Telegram Bot is running!");
    }

    const update = await request.json();

    if (!update.message || !update.message.text) {
      return new Response("OK");
    }

    const chatId = update.message.chat.id;
    const text = update.message.text;

    await fetch(`https://api.telegram.org/bot${env.BOT_TOKEN}/sendMessage`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: `You said:\n${text}`
      })
    });

    return new Response("OK");
  }
}
