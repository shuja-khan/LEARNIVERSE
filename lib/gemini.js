// lib/gemini.js — Gemini API helper
import { courses } from '@/data/courses';

const GEMINI_API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`;

/**
 * Build system prompt with user profile context
 */
export function buildSystemPrompt(userProfile = {}) {
  const { name = 'Learner', interests = [], expertise = 'Beginner', goals = '' } = userProfile;
  
  // Format courses summary to feed into system prompt context
  const coursesSummary = courses.map(c => `- "${c.title}" by ${c.platform} (Category: ${c.category}, Level: ${c.level}, Link: ${c.url})`).join('\n');

  return `You are Learniverse AI, an expert learning assistant.
User profile: Name: ${name}, Interests: ${interests.join(', ') || 'General learning'}, Level: ${expertise}, Goals: ${goals || 'Personal growth'}.

Here is the Learniverse Course Database of available courses in our platform. Always prioritize recommending these courses when relevant:
${coursesSummary}

When asked how to learn something:
1. Give a clear structured roadmap with numbered steps.
2. Recommend relevant courses from the Learniverse Course Database above. Provide the exact course title, creator/platform, and the exact course link so they can click it.
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
  if (!GEMINI_API_KEY) {
    return '⚠️ Gemini API key not configured. Please add your NEXT_PUBLIC_GEMINI_API_KEY to .env.local to enable AI responses.';
  }

  const systemPrompt = buildSystemPrompt(userProfile);

  // Build conversation history
  const contents = [
    // Inject system context as first user turn
    {
      role: 'user',
      parts: [{ text: systemPrompt + '\n\nUser: ' + userMessage }],
    },
  ];

  // If we have history, restructure with full conversation
  if (history.length > 0) {
    const fullContents = [
      { role: 'user', parts: [{ text: systemPrompt }] },
      { role: 'model', parts: [{ text: 'Understood! I am Learniverse AI, ready to help you on your learning journey. What would you like to learn today?' }] },
      ...history,
      { role: 'user', parts: [{ text: userMessage }] },
    ];

    const response = await fetch(GEMINI_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: fullContents,
        generationConfig: {
          temperature: 0.8,
          maxOutputTokens: 2048,
        },
      }),
    });

    if (!response.ok) {
      const err = await response.json();
      throw new Error(err.error?.message || 'Gemini API error');
    }

    const data = await response.json();
    return data.candidates?.[0]?.content?.parts?.[0]?.text || 'I could not generate a response. Please try again.';
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
    const err = await response.json();
    throw new Error(err.error?.message || 'Gemini API error');
  }

  const data = await response.json();
  return data.candidates?.[0]?.content?.parts?.[0]?.text || 'I could not generate a response. Please try again.';
}
