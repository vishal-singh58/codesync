const { AI_API_KEY } = require('../config/env');

async function complete({ prefix, suffix, language }) {
  if (!AI_API_KEY) {
    throw new Error('AI_API_KEY not configured');
  }

  const prompt = [
    `You are an inline code-completion engine for ${language}.`,
    `Given the code before and after the cursor, output ONLY the text that`,
    `should be inserted at the cursor. No explanation, no markdown fences.`,
    `Keep it short (a line or a few lines) — this is ghost-text, not a full file.`,
    ``,
    `--- CODE BEFORE CURSOR ---`,
    prefix.slice(-1500), // keep prompt small — only recent context matters
    `--- CODE AFTER CURSOR ---`,
    suffix.slice(0, 500),
  ].join('\n');

  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': AI_API_KEY,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model: 'claude-sonnet-4-6',
      max_tokens: 120,
      messages: [{ role: 'user', content: prompt }],
    }),
  });

  if (!response.ok) {
    throw new Error(`AI API error: ${response.status}`);
  }

  const data = await response.json();
  const text = data.content?.find((block) => block.type === 'text')?.text ?? '';
  return text.trim();
}

module.exports = { complete };
