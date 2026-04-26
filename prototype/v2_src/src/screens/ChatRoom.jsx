/* ===== Chat Room — 1:1 with expert/counselor ===== */
const ChatRoom = ({ onBack, expertKey = 'sujin' }) => {
  // Pick expert: default = Minjeong Kim (the EXPERT attorney already in user's inbox)
  const expert = EXPERTS.find(e => e.name.startsWith('Minjeong')) || EXPERTS[0];

  // Seed conversation: counselor has been auto-handed the post context
  const [messages, setMessages] = useState([
    {
      from: 'system',
      kind: 'context',
      time: '2:14 PM',
      content: {
        postTitle: "I haven't been paid for 3 months. Is this normal?",
        postSummary: 'AI flagged: unpaid wages 3 months + visa retaliation fear',
      },
    },
    {
      from: 'expert',
      time: '2:14 PM',
      text: "Hi, I'm Minjeong, a labor attorney. I saw your post and AI flagged it as a serious case — I'm sorry you're going through this. What you're experiencing is illegal under Korean law, and I want to help.",
    },
    {
      from: 'expert',
      time: '2:14 PM',
      text: "First, let me reassure you: filing a wage complaint will NOT affect your E-9 visa. Many workers fear this, but the law explicitly protects you from retaliation. Can I ask a few quick questions?",
    },
  ]);

  const [draft, setDraft] = useState('');
  const [typing, setTyping] = useState(false);
  const scrollerRef = React.useRef(null);

  // Auto-scroll to bottom on new message
  useEffect(() => {
    const el = scrollerRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, typing]);

  const send = () => {
    const text = draft.trim();
    if (!text) return;
    const now = new Date();
    const time = now.getHours() > 12
      ? `${now.getHours() - 12}:${String(now.getMinutes()).padStart(2, '0')} PM`
      : `${now.getHours()}:${String(now.getMinutes()).padStart(2, '0')} AM`;
    setMessages(m => [...m, { from: 'me', time, text }]);
    setDraft('');
    // Simulated reply
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      setMessages(m => [...m, {
        from: 'expert',
        time,
        text: "Got it, thank you. Could you tell me: 1) what's written in your contract for monthly wages, and 2) do you have any messages or recordings where the employer mentioned the unpaid wages?",
      }]);
    }, 2200);
  };

  const onKey = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  return (
    <Chrome hideTabs>
      {/* Custom top bar with avatar + name + status */}
      <div className="chat-topnav">
        <button className="back" onClick={onBack}><Icon.back size={18} /></button>
        <div className="who">
          <div className="av"><Icon.user size={18} /></div>
          <div className="info">
            <div className="name">
              {expert.name.split(',')[0]}
              <TrustLabel kind={expert.kind} slim />
            </div>
            <div className="sub">
              {expert.online
                ? <><span className="dot on"></span> Active now</>
                : <><span className="dot off"></span> Away · replies in ~2h</>}
            </div>
          </div>
        </div>
        <button className="more"><Icon.moreH size={18} /></button>
      </div>

      {/* Messages */}
      <div className="chat-scroll" ref={scrollerRef}>
        <div className="chat-system">
          <Icon.shield size={11} /> You are chatting anonymously. Your real name is hidden from {expert.name.split(',')[0]}.
        </div>

        <div className="chat-day-divider"><span>Today</span></div>

        {messages.map((m, i) => {
          if (m.from === 'system' && m.kind === 'context') {
            return (
              <div key={i} className="chat-context">
                <div className="ctx-head">
                  <Icon.shieldAlert size={12} /> Risk-flagged post auto-shared with counselor
                </div>
                <div className="ctx-body">
                  <h5>{m.content.postTitle}</h5>
                  <p>{m.content.postSummary}</p>
                </div>
              </div>
            );
          }
          const isMe = m.from === 'me';
          // Group consecutive messages from same sender (no avatar repeat)
          const prev = messages[i - 1];
          const groupedWithPrev = prev && prev.from === m.from && prev.from !== 'system';
          return (
            <div key={i} className={`chat-msg ${isMe ? 'me' : 'them'} ${groupedWithPrev ? 'grouped' : ''}`}>
              {!isMe && !groupedWithPrev && (
                <div className="msg-av"><Icon.user size={14} /></div>
              )}
              {!isMe && groupedWithPrev && <div className="msg-av-spacer" />}
              <div className="msg-stack">
                <div className="msg-bubble">{m.text}</div>
                {(!messages[i + 1] || messages[i + 1].from !== m.from) && (
                  <div className="msg-time">{m.time}</div>
                )}
              </div>
            </div>
          );
        })}

        {typing && (
          <div className="chat-msg them">
            <div className="msg-av"><Icon.user size={14} /></div>
            <div className="msg-stack">
              <div className="msg-bubble typing">
                <span></span><span></span><span></span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Composer */}
      <div className="chat-composer">
        <button className="cc-attach" aria-label="Attach"><Icon.plus size={18} /></button>
        <div className="cc-input-wrap">
          <input
            type="text"
            placeholder="Write a message..."
            value={draft}
            onChange={e => setDraft(e.target.value)}
            onKeyDown={onKey}
          />
        </div>
        <button
          className={`cc-send ${draft.trim() ? 'on' : ''}`}
          onClick={send}
          disabled={!draft.trim()}
          aria-label="Send"
        >
          <Icon.send size={16} />
        </button>
      </div>
    </Chrome>
  );
};

Object.assign(window, { ChatRoom });
