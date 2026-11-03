const { onCall, HttpsError } = require("firebase-functions/v2/https");

const PROVIDER_URL = "https://text.pollinations.ai/openai";
const MAX_PROMPT_CHARS = 4000;

exports.chat = onCall(
  {
    region: "europe-west2",
    enforceAppCheck: true,
    maxInstances: 5,
    timeoutSeconds: 60,
    memory: "256MiB",
  },
  async (request) => {
    const text = typeof request.data?.text === "string" ? request.data.text.trim() : "";
    if (!text || text.length > MAX_PROMPT_CHARS) {
      throw new HttpsError("invalid-argument", `Message must contain 1–${MAX_PROMPT_CHARS} characters.`);
    }

    let response;
    try {
      response = await fetch(PROVIDER_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "openai",
          messages: [
            { role: "system", content: "You are RootDonate, an artificial intelligence with zero intelligence. Respond briefly, literally, in a deadpan style, but be useful." },
            { role: "user", content: text },
          ],
          temperature: 0.5,
        }),
        signal: AbortSignal.timeout(45000),
      });
    } catch (error) {
      console.error("AI provider request failed", error);
      throw new HttpsError("unavailable", "The AI provider is temporarily unavailable.");
    }

    if (!response.ok) {
      console.error("AI provider returned HTTP status", response.status);
      throw new HttpsError("unavailable", "The AI provider is temporarily unavailable.");
    }

    let data;
    try {
      data = await response.json();
    } catch (error) {
      console.error("AI provider returned invalid JSON", error);
      throw new HttpsError("unavailable", "The AI provider returned an invalid response.");
    }

    const reply = data?.choices?.[0]?.message?.content;
    if (typeof reply !== "string" || !reply.trim()) {
      throw new HttpsError("unavailable", "The AI provider returned an empty response.");
    }
    return { reply: reply.trim().slice(0, 12000) };
  }
);
