// lib/gemini.js — Gemini API helper
import { courses } from '@/data/courses';

const GEMINI_API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
const GEMINI_MODEL = 'gemini-2.5-flash';
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${GEMINI_API_KEY}`;

/**
 * Build system prompt with user profile context
 */
export function buildSystemPrompt(userProfile = {}) {
  const { name = 'Learner', interests = [], expertise = 'Beginner', goals = '' } = userProfile;

  const coursesSummary = courses
    .map(c => `- "${c.title}" by ${c.platform} (Category: ${c.category}, Level: ${c.level}, Link: ${c.url})`)
    .join('\n');

  return `You are Learniverse AI, a friendly and expert learning assistant.
User profile: Name: ${name}, Interests: ${interests.join(', ') || 'General learning'}, Level: ${expertise}, Goals: ${goals || 'Personal growth'}.

Here is the Learniverse Course Database of available courses on our platform. Always prioritize recommending these courses when relevant:
${coursesSummary}

When asked how to learn something:
1. Give a clear structured roadmap with numbered steps.
2. Recommend relevant courses from the Learniverse Course Database above. Provide the exact course title, creator/platform, and the exact course link.
3. Suggest 2-3 tools they should use.
4. End with: "💡 Pro tip: Connect with our community members who specialize in [topic] for personalized help!"
Format with emojis and clear sections. Be encouraging and motivating. Keep responses well-structured and easy to read.`;
}

/**
 * Send a message to Gemini and get a response
 * @param {string} userMessage - The user's message
 * @param {Array} history - Previous messages [{role, parts}]
 * @param {object} userProfile - User's profile for context
 * @returns {string} - AI response text
 */
export async function sendToGemini(userMessage, history = [], userProfile = {}) {
  if (!GEMINI_API_KEY || GEMINI_API_KEY === 'your_gemini_api_key_here') {
    return '⚠️ Gemini API key not configured. Please add your NEXT_PUBLIC_GEMINI_API_KEY to .env.local to enable AI responses.';
  }

  const systemPrompt = buildSystemPrompt(userProfile);

  // Build conversation contents with system context
  let contents = [];

  if (history.length > 0) {
    // Multi-turn conversation: inject system prompt as first exchange
    contents = [
      { role: 'user', parts: [{ text: systemPrompt }] },
      { role: 'model', parts: [{ text: 'Understood! I am Learniverse AI, ready to help you on your learning journey. What would you like to learn today?' }] },
      ...history,
      { role: 'user', parts: [{ text: userMessage }] },
    ];
  } else {
    // First message: inject system prompt + user message together
    contents = [
      { role: 'user', parts: [{ text: systemPrompt + '\n\nUser: ' + userMessage }] },
    ];
  }

  const response = await fetch(GEMINI_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents,
      generationConfig: {
        temperature: 0.8,
        maxOutputTokens: 2048,
      },
    }),
  });

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    const errMsg = err.error?.message || `HTTP ${response.status}`;
    console.error('Gemini API error:', errMsg);
    throw new Error(errMsg);
  }

  const data = await response.json();
  const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
  return text || 'I could not generate a response. Please try again.';
}
