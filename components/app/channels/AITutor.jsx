'use client';
import { useState, useRef, useEffect, useCallback } from 'react';
import { sendToGemini } from '@/lib/gemini';

const SUGGESTIONS = [
  'How do I learn Graphic Design?',
  'Give me a Python roadmap',
  'Find me a remote job in marketing',
  'What are the best free courses for beginners?',
];

const WELCOME_MESSAGE = {
  id: 'welcome',
  role: 'ai',
  text: "👋 Hey! I'm **Learniverse AI**, powered by Gemini. I'm here to help you build personalized learning roadmaps, find the best courses, and guide your career journey.\n\nWhat would you like to learn today?",
  timestamp: new Date(),
};

export default function AITutor({ userProfile, onXPGain }) {
  const [messages, setMessages] = useState([WELCOME_MESSAGE]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [history, setHistory] = useState([]);
  const [voiceSupported, setVoiceSupported] = useState(false);
  const bottomRef = useRef(null);
  const recognitionRef = useRef(null);
  const inputRef = useRef(null);
  const finalTranscriptRef = useRef('');

  useEffect(() => {
    setVoiceSupported('webkitSpeechRecognition' in window || 'SpeechRecognition' in window);
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  function formatText(text) {
    return text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/\n/g, '<br/>');
  }

  async function typewriterEffect(fullText, msgId) {
    const chars = fullText.split('');
    let current = '';
    for (let i = 0; i < chars.length; i++) {
      current += chars[i];
      const snapshot = current;
      setMessages(prev => prev.map(m => m.id === msgId ? { ...m, text: snapshot, streaming: true } : m));
      if (i < chars.length - 1) await new Promise(r => setTimeout(r, 8));
    }
    setMessages(prev => prev.map(m => m.id === msgId ? { ...m, streaming: false } : m));
  }

  async function sendMessage(text) {
    const userText = text || input.trim();
    if (!userText) return;
    setInput('');

    const userMsg = { id: Date.now(), role: 'user', text: userText, timestamp: new Date() };
    setMessages(prev => [...prev, userMsg]);
    setLoading(true);

    const aiMsgId = Date.now() + 1;
    setMessages(prev => [...prev, { id: aiMsgId, role: 'ai', text: '', loading: true, timestamp: new Date() }]);

    try {
      const response = await sendToGemini(userText, history, userProfile);
      setMessages(prev => prev.map(m => m.id === aiMsgId ? { ...m, loading: false, text: '' } : m));
      await typewriterEffect(response, aiMsgId);

      setHistory(prev => [
        ...prev,
        { role: 'user', parts: [{ text: userText }] },
        { role: 'model', parts: [{ text: response }] },
      ]);

      if (onXPGain) onXPGain(10);
    } catch (err) {
      setMessages(prev => prev.map(m => m.id === aiMsgId ? { ...m, loading: false, text: '⚠️ Error: ' + err.message } : m));
    } finally {
      setLoading(false);
    }
  }

  function startVoice() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) return;
    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.lang = 'en-US';
    recognitionRef.current = recognition;
    finalTranscriptRef.current = '';

    recognition.onresult = (e) => {
      let interimTranscript = '';
      let finalTranscript = '';
      for (let i = e.resultIndex; i < e.results.length; i++) {
        const transcript = e.results[i][0].transcript;
        if (e.results[i].isFinal) {
          finalTranscript += transcript;
        } else {
          interimTranscript += transcript;
        }
      }
      if (finalTranscript) {
        finalTranscriptRef.current += finalTranscript;
      }
      setInput(finalTranscriptRef.current + interimTranscript);
    };
    recognition.onend = () => {
      setIsListening(false);
      const textToSend = finalTranscriptRef.current.trim();
      if (textToSend) {
        sendMessage(textToSend);
        finalTranscriptRef.current = '';
      }
    };
    recognition.onerror = (e) => {
      console.error('Speech recognition error:', e.error);
      setIsListening(false);
    };
    recognition.start();
    setIsListening(true);
  }

  function stopVoice() {
    recognitionRef.current?.stop();
    setIsListening(false);
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: 'var(--bg-void)' }}>
      {/* Top bar */}
      <div style={{ padding: '16px 24px', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: '12px', background: 'var(--bg-surface)' }}>
        <span style={{ fontSize: '22px' }}>🤖</span>
        <div>
          <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '16px' }}>AI Tutor</div>
          <div style={{ fontSize: '12px', color: '#22c55e', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#22c55e', display: 'inline-block' }} />
            Powered by Gemini AI
          </div>
        </div>
        {isListening && (
          <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <div className="sound-bar" />
            <div className="sound-bar" />
            <div className="sound-bar" />
            <div className="sound-bar" />
            <div className="sound-bar" />
            <span style={{ color: '#ef4444', fontSize: '12px', marginLeft: '6px' }}>Listening...</span>
          </div>
        )}
      </div>

      {/* Messages area */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {messages.map(msg => (
          <div key={msg.id} style={{ display: 'flex', justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start', animation: 'slide-up-fade 0.3s ease' }}>
            {msg.role === 'ai' && (
              <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'linear-gradient(135deg,#7c3aed,#3b82f6)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', marginRight: '10px', flexShrink: 0, alignSelf: 'flex-end' }}>🤖</div>
            )}
            <div style={{ maxWidth: '70%', padding: '14px 18px', borderRadius: msg.role === 'user' ? '18px 18px 4px 18px' : '18px 18px 18px 4px', background: msg.role === 'user' ? 'linear-gradient(135deg,#7c3aed,#5b21b6)' : 'var(--bg-card)', borderLeft: msg.role === 'ai' ? '3px solid var(--accent-violet)' : 'none', fontSize: '14px', lineHeight: 1.65, color: 'var(--text-primary)', fontFamily: 'var(--font-body)', position: 'relative' }}>
              {msg.loading ? (
                <div style={{ display: 'flex', gap: '4px', padding: '4px 0' }}>
                  <div className="typing-dot" />
                  <div className="typing-dot" />
                  <div className="typing-dot" />
                </div>
              ) : (
                <>
                  <span dangerouslySetInnerHTML={{ __html: formatText(msg.text) }} />
                  {msg.streaming && <span style={{ animation: 'blink 1s infinite', marginLeft: '2px' }}>|</span>}
                </>
              )}
            </div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Suggestion chips */}
      <div style={{ padding: '0 24px 12px', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
        {SUGGESTIONS.map(s => (
          <button key={s} onClick={() => sendMessage(s)} disabled={loading} style={{ padding: '6px 14px', borderRadius: '100px', border: '1px solid var(--border)', background: 'var(--bg-elevated)', color: 'var(--text-secondary)', fontSize: '12px', cursor: 'pointer', fontFamily: 'var(--font-body)', transition: 'all 0.2s', whiteSpace: 'nowrap' }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent-violet)'; e.currentTarget.style.color = 'var(--text-primary)'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text-secondary)'; }}
          >{s}</button>
        ))}
      </div>

      {/* Input area */}
      <div style={{ padding: '12px 24px 20px', borderTop: '1px solid var(--border)', background: 'var(--bg-surface)' }}>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <input ref={inputRef} id="ai-tutor-input" type="text" value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && !loading && sendMessage()} placeholder="Ask me anything... or press 🎙️ to speak" disabled={loading} className="glow-input" style={{ flex: 1, padding: '14px 18px', borderRadius: '12px', fontSize: '14px' }} />
          {/* Mic button */}
          {voiceSupported ? (
            <button onClick={isListening ? stopVoice : startVoice} title={isListening ? 'Stop listening' : 'Voice input'} style={{ width: '44px', height: '44px', borderRadius: '12px', border: isListening ? '2px solid #ef4444' : '1px solid var(--border)', background: isListening ? 'rgba(239,68,68,0.15)' : 'var(--bg-elevated)', cursor: 'pointer', fontSize: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, animation: isListening ? 'pulse-ring 1.5s ease-out infinite' : 'none', transition: 'all 0.2s' }}>
              {isListening ? '🔴' : '🎙️'}
            </button>
          ) : (
            <button title="Voice input requires Chrome" style={{ width: '44px', height: '44px', borderRadius: '12px', border: '1px solid var(--border)', background: 'var(--bg-elevated)', cursor: 'not-allowed', fontSize: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, opacity: 0.4 }}>🎙️</button>
          )}
          {/* Send button */}
          <button onClick={() => sendMessage()} disabled={loading || !input.trim()} style={{ width: '44px', height: '44px', borderRadius: '12px', background: 'linear-gradient(135deg,#7c3aed,#5b21b6)', border: 'none', cursor: loading || !input.trim() ? 'not-allowed' : 'pointer', fontSize: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, opacity: loading || !input.trim() ? 0.5 : 1, transition: 'transform 0.2s, opacity 0.2s' }}
            onMouseEnter={e => { if (!loading && input.trim()) e.currentTarget.style.transform = 'rotate(45deg) scale(1.1)'; }}
            onMouseLeave={e => e.currentTarget.style.transform = 'rotate(0) scale(1)'}
          >➤</button>
        </div>
        <div style={{ fontSize: '11px', color: 'var(--text-secondary)', marginTop: '8px', textAlign: 'center' }}>
          +10 XP per message • {voiceSupported ? 'Voice mode active' : 'Use Chrome for voice input'}
        </div>
      </div>
    </div>
  );
}
