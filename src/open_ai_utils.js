import OpenAI from "openai";


const openai = new OpenAI({
  apiKey: ADD_YOUR_SECRET_KEY,
  dangerouslyAllowBrowser: true,
});

async function askOpenAI(prompt, systemMessage = "") {
  try {
    const messages = [];
    if (systemMessage) {
      messages.push({ role: "system", content: systemMessage });
    }
    messages.push({ role: "user", content: prompt });

    const response = await openai.chat.completions.create({
      model: "gpt-4.1-nano",
      messages,
      max_tokens: 200,
      temperature: 0.2,
    });
    
    return response.choices[0].message.content;

  } catch (err) {
    console.error("OpenAI request failed:", err);
    return "[]";
  }
}

async function getSuggestionsFromAIForArtist(artistName) {
  const NUMBER_OF_SUGGESTIONS = 10;

  const prompt = `
Return up to ${NUMBER_OF_SUGGESTIONS} well-known track titles by the artist "${artistName}".

Rules:
- Output MUST be valid JSON
- Output MUST be a JSON array of strings
- Each string is a track title only
- Do NOT include artist names
- Do NOT include explanations or extra text
- If the input is NOT a musical artist name, return []
- If fewer than ${NUMBER_OF_SUGGESTIONS} real tracks are known, return only those
- If no real track titles can be identified, return []
- Never invent or guess track titles

Example:
["Track 1", "Track 2", "Track 3"]
`;

  const raw = await askOpenAI(prompt, "You only return valid JSON. No extra text.");

  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (err) {
    console.error("Failed to parse AI response:", err);
    return [];
  }
}


export {getSuggestionsFromAIForArtist, askOpenAI}