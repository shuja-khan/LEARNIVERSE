'use client';
import { useState, useEffect, useRef } from 'react';
import { rtdb, auth } from '@/lib/firebase';
import { ref, push, onValue, off, serverTimestamp } from 'firebase/database';

const BADGE_COLORS = {
  Beginner: '#8b8aaa',
  Explorer: '#3b82f6',
  Pro: '#7c3aed',
  Master: '#f59e0b',
};

export default function CommunityChat({ userProfile, user, onXPGain }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [sending, setSending] = useState(false);
  const bottomRef = useRef(null);

  // Quick meeting states
  const [showMeetModal, setShowMeetModal] = useState(false);
  const [meetMethod, setMeetMethod] = useState('google'); // 'google' | 'jitsi'
  const [googleMeetUrl, setGoogleMeetUrl] = useState('');
  const [meetError, setMeetError] = useState('');

  useEffect(() => {
    const chatRef = ref(rtdb, 'chats/community');
    const unsubscribe = onValue(chatRef, (snap) => {
      const data = snap.val();
      if (!data) { setMessages([]); return; }
      const msgs = Object.entries(data).map(([id, msg]) => ({ id, ...msg }));
      msgs.sort((a, b) => (a.timestamp || 0) - (b.timestamp || 0));
      setMessages(msgs.slice(-100));
    });
    return () => off(chatRef);
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  async function sendMessage() {
    if (!input.trim() || !user || sending) return;
    setSending(true);
    const text = input.trim();
    setInput('');
    try {
      await push(ref(rtdb, 'chats/community'), {
        uid: user.uid,
        username: userProfile?.name || user.displayName || 'Learner',
        badge: userProfile?.badge || 'Beginner',
        text,
        timestamp: Date.now(),
      });
      if (onXPGain) onXPGain(10);
    } catch (err) {
      console.error('Failed to send message:', err);
    } finally {
      setSending(false);
    }
  }

  // Meeting sharing logic
  async function sendMeetMessage(url) {
    if (!user || sending) return;
    setSending(true);
    try {
      await push(ref(rtdb, 'chats/community'), {
        uid: user.uid,
        username: userProfile?.name || user.displayName || 'Learner',
        badge: userProfile?.badge || 'Beginner',
        text: 'started a quick meeting',
        type: 'meet',
        meetUrl: url,
        timestamp: Date.now(),
      });
      if (onXPGain) onXPGain(10);
      setShowMeetModal(false);
      setGoogleMeetUrl('');
      setMeetError('');
    } catch (err) {
      console.error('Failed to send meeting link:', err);
    } finally {
      setSending(false);
    }
  }

  function cleanAndValidateGoogleMeetUrl(url) {
    let trimmed = url.trim();
    if (!trimmed) return { error: 'Please enter a URL.', url: '' };
    
    if (!/^https?:\/\//i.test(trimmed)) {
      trimmed = 'https://' + trimmed;
    }
    
    const regex = /^https?:\/\/(www\.)?meet\.google\.com\/[a-z]{3}-[a-z]{4}-[a-z]{3}(\?.*)?$/i;
    if (!regex.test(trimmed)) {
      return { error: 'Please enter a valid Google Meet link (e.g., https://meet.google.com/abc-defg-hij)', url: '' };
    }
    return { error: '', url: trimmed };
  }

  function handleJitsiMeet() {
    const cleanName = (userProfile?.name || 'learner').toLowerCase().replace(/[^a-z0-9]/g, '');
    const randomStr = Math.random().toString(36).substring(2, 7);
    const roomName = `learniverse-${cleanName}-${randomStr}`;
    const url = `https://meet.jit.si/${roomName}`;
    sendMeetMessage(url);
    window.open(url, '_blank');
  }

  function formatTime(ts) {
    if (!ts) return '';
    const d = new Date(ts);
    return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }

  const myUid = user?.uid;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: 'var(--bg-void)' }}>
      {/* Local style inject for pulse animation */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes meet-dot-pulse {
          0%, 100% { transform: scale(0.9); opacity: 0.6; }
          50% { transform: scale(1.2); opacity: 1; }
        }
      `}} />

      {/* Top bar */}
      <div style={{ padding: '16px 24px', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: '12px', background: 'var(--bg-surface)' }}>
        <span style={{ fontSize: '22px' }}>💬</span>
        <div style={{ flex: 1 }}>
          <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '16px' }}>Community Chat</div>
          <div style={{ fontSize: '12px', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#22c55e', display: 'inline-block' }} />
            <span style={{ color: '#22c55e' }}>47 online</span>
          </div>
        </div>
        <button onClick={() => setShowMeetModal(true)} style={{ padding: '8px 16px', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--bg-elevated)', color: 'var(--text-secondary)', fontSize: '13px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', fontFamily: 'var(--font-body)', transition: 'all 0.2s' }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent-violet)'; e.currentTarget.style.color = 'var(--text-primary)'; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text-secondary)'; }}
        >📹 Start Quick Meet</button>
      </div>

      {/* Messages */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '16px 24px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {messages.length === 0 && (
          <div style={{ textAlign: 'center', color: 'var(--text-secondary)', fontSize: '14px', marginTop: '40px' }}>
            <div style={{ fontSize: '40px', marginBottom: '16px' }}>👋</div>
            <div>Be the first to say hello! The community is waiting.</div>
          </div>
        )}
        {messages.map(msg => {
          const isMe = msg.uid === myUid;
          const initial = (msg.username || 'L')[0].toUpperCase();
          const badgeColor = BADGE_COLORS[msg.badge] || BADGE_COLORS.Beginner;
          
          if (msg.type === 'meet') {
            const isGoogleMeet = msg.meetUrl.includes('google.com');
            return (
              <div key={msg.id} style={{ display: 'flex', gap: '10px', justifyContent: isMe ? 'flex-end' : 'flex-start', animation: 'slide-up-fade 0.3s ease' }}>
                {!isMe && (
                  <div style={{ width: '34px', height: '34px', borderRadius: '50%', background: 'linear-gradient(135deg,#7c3aed,#3b82f6)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', fontWeight: 700, color: 'white', flexShrink: 0, alignSelf: 'flex-end' }}>{initial}</div>
                )}
                <div style={{ width: '100%', maxWidth: '280px' }}>
                  {!isMe && (
                    <div style={{ fontSize: '11px', color: badgeColor, fontWeight: 600, marginBottom: '4px', fontFamily: 'var(--font-display)' }}>{msg.username} <span style={{ color: 'var(--text-secondary)', fontWeight: 400, fontFamily: 'var(--font-body)' }}>• {msg.badge}</span></div>
                  )}
                  
                  {/* Meet Request Card */}
                  <div style={{
                    padding: '16px',
                    borderRadius: '12px',
                    background: 'linear-gradient(135deg, rgba(26,26,46,0.95), rgba(18,18,30,0.95))',
                    border: '1px solid rgba(124, 58, 237, 0.4)',
                    boxShadow: '0 8px 32px rgba(124, 58, 237, 0.15)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '12px',
                    position: 'relative',
                    overflow: 'hidden'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <span style={{
                          width: '8px',
                          height: '8px',
                          borderRadius: '50%',
                          background: '#10b981',
                          boxShadow: '0 0 8px #10b981',
                          display: 'inline-block',
                          animation: 'meet-dot-pulse 1.5s infinite ease-in-out'
                        }} />
                        <span style={{ fontSize: '11px', color: '#10b981', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                          Live Meeting
                        </span>
                      </div>
                      <span style={{ fontSize: '16px' }}>{isGoogleMeet ? '📹' : '⚡'}</span>
                    </div>

                    <div>
                      <div style={{ fontWeight: 700, fontSize: '14px', color: 'var(--text-primary)', marginBottom: '2px', fontFamily: 'var(--font-display)' }}>
                        Quick Video Call
                      </div>
                      <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                        {isMe ? 'You started a call' : `${msg.username} invited you to join`}
                      </div>
                    </div>

                    <button
                      onClick={() => window.open(msg.meetUrl, '_blank')}
                      style={{
                        padding: '10px',
                        borderRadius: '8px',
                        border: 'none',
                        background: 'linear-gradient(135deg, #10b981, #059669)',
                        color: 'white',
                        fontWeight: 600,
                        fontSize: '12px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '6px',
                        transition: 'transform 0.2s, box-shadow 0.2s',
                        boxShadow: '0 4px 12px rgba(16, 185, 129, 0.2)'
                      }}
                      onMouseEnter={e => {
                        e.currentTarget.style.transform = 'translateY(-1px)';
                        e.currentTarget.style.boxShadow = '0 6px 16px rgba(16, 185, 129, 0.4)';
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = '0 4px 12px rgba(16, 185, 129, 0.2)';
                      }}
                    >
                      Join Meeting
                    </button>
                  </div>
                  
                  <div style={{ fontSize: '10px', color: 'var(--text-secondary)', marginTop: '4px', textAlign: isMe ? 'right' : 'left' }}>{formatTime(msg.timestamp)}</div>
                </div>
              </div>
            );
          }

          return (
            <div key={msg.id} style={{ display: 'flex', gap: '10px', justifyContent: isMe ? 'flex-end' : 'flex-start', animation: 'slide-up-fade 0.3s ease' }}>
              {!isMe && (
                <div style={{ width: '34px', height: '34px', borderRadius: '50%', background: 'linear-gradient(135deg,#7c3aed,#3b82f6)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', fontWeight: 700, color: 'white', flexShrink: 0, alignSelf: 'flex-end' }}>{initial}</div>
              )}
              <div style={{ maxWidth: '65%' }}>
                {!isMe && (
                  <div style={{ fontSize: '11px', color: badgeColor, fontWeight: 600, marginBottom: '4px', fontFamily: 'var(--font-display)' }}>{msg.username} <span style={{ color: 'var(--text-secondary)', fontWeight: 400, fontFamily: 'var(--font-body)' }}>• {msg.badge}</span></div>
                )}
                <div style={{ padding: '10px 16px', borderRadius: isMe ? '16px 16px 4px 16px' : '16px 16px 16px 4px', background: isMe ? 'linear-gradient(135deg,#7c3aed,#5b21b6)' : 'var(--bg-card)', border: isMe ? 'none' : '1px solid var(--border)', fontSize: '14px', color: 'var(--text-primary)', lineHeight: 1.6 }}>
                  {msg.text}
                </div>
                <div style={{ fontSize: '10px', color: 'var(--text-secondary)', marginTop: '4px', textAlign: isMe ? 'right' : 'left' }}>{formatTime(msg.timestamp)}</div>
              </div>
            </div>
          );
        })}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div style={{ padding: '12px 24px 20px', borderTop: '1px solid var(--border)', background: 'var(--bg-surface)' }}>
        <div style={{ display: 'flex', gap: '10px' }}>
          <input id="community-chat-input" type="text" value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && !sending && sendMessage()} placeholder="Say something to the community..." disabled={sending} className="glow-input" style={{ flex: 1, padding: '13px 18px', borderRadius: '12px', fontSize: '14px' }} />
          <button onClick={sendMessage} disabled={sending || !input.trim()} style={{ width: '44px', height: '44px', borderRadius: '12px', background: 'linear-gradient(135deg,#7c3aed,#5b21b6)', border: 'none', cursor: sending || !input.trim() ? 'not-allowed' : 'pointer', fontSize: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, opacity: sending || !input.trim() ? 0.5 : 1, transition: 'transform 0.2s, opacity 0.2s' }}
            onMouseEnter={e => { if (!sending && input.trim()) e.currentTarget.style.transform = 'rotate(45deg) scale(1.1)'; }}
            onMouseLeave={e => e.currentTarget.style.transform = 'rotate(0) scale(1)'}
          >➤</button>
        </div>
        <div style={{ fontSize: '11px', color: 'var(--text-secondary)', marginTop: '8px', textAlign: 'center' }}>+10 XP per message</div>
      </div>

      {/* Modal */}
      {showMeetModal && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(6, 6, 8, 0.75)',
          backdropFilter: 'blur(10px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          animation: 'scale-in 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)'
        }}>
          <div style={{
            background: 'var(--bg-elevated)',
            border: '1px solid var(--border-bright)',
            borderRadius: '16px',
            width: '90%',
            maxWidth: '440px',
            padding: '28px',
            position: 'relative',
            boxShadow: '0 25px 50px rgba(0, 0, 0, 0.6), 0 0 40px rgba(124, 58, 237, 0.15)',
            display: 'flex',
            flexDirection: 'column',
            gap: '20px'
          }}>
            {/* Close button */}
            <button 
              onClick={() => {
                setShowMeetModal(false);
                setGoogleMeetUrl('');
                setMeetError('');
              }}
              style={{
                position: 'absolute',
                top: '16px',
                right: '16px',
                background: 'none',
                border: 'none',
                color: 'var(--text-secondary)',
                fontSize: '20px',
                cursor: 'pointer',
                transition: 'color 0.2s'
              }}
              onMouseEnter={e => e.currentTarget.style.color = 'var(--text-primary)'}
              onMouseLeave={e => e.currentTarget.style.color = 'var(--text-secondary)'}
            >
              ✕
            </button>

            <div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '20px', color: 'var(--text-primary)', marginBottom: '6px' }}>
                Start a Quick Meeting
              </h3>
              <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
                Invite other community members to join a live video chat room.
              </p>
            </div>

            {/* Tabs */}
            <div style={{ display: 'flex', background: 'var(--bg-void)', borderRadius: '10px', padding: '4px', border: '1px solid var(--border)' }}>
              <button 
                onClick={() => setMeetMethod('google')}
                style={{
                  flex: 1,
                  padding: '8px 12px',
                  borderRadius: '7px',
                  border: 'none',
                  background: meetMethod === 'google' ? 'var(--bg-card)' : 'transparent',
                  color: meetMethod === 'google' ? 'var(--text-primary)' : 'var(--text-secondary)',
                  fontFamily: 'var(--font-body)',
                  fontSize: '13px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
              >
                📹 Google Meet
              </button>
              <button 
                onClick={() => setMeetMethod('jitsi')}
                style={{
                  flex: 1,
                  padding: '8px 12px',
                  borderRadius: '7px',
                  border: 'none',
                  background: meetMethod === 'jitsi' ? 'var(--bg-card)' : 'transparent',
                  color: meetMethod === 'jitsi' ? 'var(--text-primary)' : 'var(--text-secondary)',
                  fontFamily: 'var(--font-body)',
                  fontSize: '13px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
              >
                ⚡ 1-Click Meet
              </button>
            </div>

            {/* Google Meet Content */}
            {meetMethod === 'google' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>1. Generate a new Google Meet link</span>
                  <button 
                    onClick={() => window.open('https://meet.new', '_blank')}
                    style={{
                      padding: '10px 16px',
                      borderRadius: '8px',
                      border: '1px solid var(--border)',
                      background: 'var(--bg-card)',
                      color: 'var(--text-primary)',
                      fontSize: '13px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      fontWeight: 500,
                      transition: 'all 0.2s'
                    }}
                    onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--accent-blue)'}
                    onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}
                  >
                    🌐 Open meet.new
                  </button>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>2. Paste link to share with chat</span>
                  <input 
                    type="text" 
                    value={googleMeetUrl}
                    onChange={e => {
                      setGoogleMeetUrl(e.target.value);
                      setMeetError('');
                    }}
                    placeholder="https://meet.google.com/abc-defg-hij"
                    style={{
                      padding: '11px 14px',
                      borderRadius: '8px',
                      border: '1px solid var(--border)',
                      background: 'var(--bg-void)',
                      color: 'var(--text-primary)',
                      fontSize: '13px',
                      fontFamily: 'var(--font-body)'
                    }}
                    className="glow-input"
                  />
                  {meetError && (
                    <span style={{ fontSize: '11px', color: '#ef4444', marginTop: '2px' }}>{meetError}</span>
                  )}
                </div>

                <button 
                  onClick={() => {
                    const validation = cleanAndValidateGoogleMeetUrl(googleMeetUrl);
                    if (validation.error) {
                      setMeetError(validation.error);
                    } else {
                      sendMeetMessage(validation.url);
                    }
                  }}
                  disabled={sending || !googleMeetUrl}
                  style={{
                    padding: '12px',
                    borderRadius: '8px',
                    background: 'linear-gradient(135deg, var(--accent-violet), #5b21b6)',
                    border: 'none',
                    color: 'white',
                    fontSize: '14px',
                    fontWeight: 600,
                    cursor: (sending || !googleMeetUrl) ? 'not-allowed' : 'pointer',
                    opacity: (sending || !googleMeetUrl) ? 0.6 : 1,
                    transition: 'all 0.2s',
                    marginTop: '4px'
                  }}
                >
                  {sending ? 'Sharing...' : 'Share Meet Link'}
                </button>
              </div>
            )}

            {/* Jitsi Meet Content */}
            {meetMethod === 'jitsi' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', textAlign: 'center', padding: '10px 0' }}>
                <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                  Creates a secure, password-free video room instantly on Jitsi Meet. The meeting link will be posted to the community, and you will be redirected to the room immediately.
                </p>

                <button 
                  onClick={handleJitsiMeet}
                  disabled={sending}
                  style={{
                    padding: '12px 20px',
                    borderRadius: '8px',
                    background: 'linear-gradient(135deg, #10b981, #047857)',
                    border: 'none',
                    color: 'white',
                    fontSize: '14px',
                    fontWeight: 600,
                    cursor: sending ? 'not-allowed' : 'pointer',
                    opacity: sending ? 0.6 : 1,
                    transition: 'all 0.2s',
                    marginTop: '8px',
                    boxShadow: '0 4px 12px rgba(16, 185, 129, 0.2)'
                  }}
                >
                  {sending ? 'Creating...' : '🚀 Create & Join Room'}
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
