/* ===== Inbox — notifications ===== */
const Inbox = ({ onTab, onOpenRisk, onOpenPost, onOpenChat }) => {
  const [tab, setTab] = useState('notif');
  const chatUnread = CHATS.reduce((n,c)=>n+c.unread, 0);
  return (
    <Chrome active="inbox" onTab={onTab}>
      <TopNav title="Inbox" />
      <div className="tabs-top">
        <div className={`tt ${tab==='notif'?'on':''}`} onClick={()=>setTab('notif')}>
          Notifications
          {NOTIFS.filter(n=>n.unread).length > 0 && (
            <span className="tt-badge">{NOTIFS.filter(n=>n.unread).length}</span>
          )}
        </div>
        <div className={`tt ${tab==='chat'?'on':''}`} onClick={()=>setTab('chat')}>
          Messages
          {chatUnread > 0 && <span className="tt-badge">{chatUnread}</span>}
        </div>
      </div>

      <div className="scroll pad-bottom">
        {tab === 'notif' && (
          <div className="notif-list">
            {NOTIFS.map(n => (
              <div key={n.id}
                   className={`notif-item ${n.unread?'':'read'} ${n.kind}`}
                   onClick={()=>{
                     if (n.linkTo === 'risk') onOpenRisk();
                     else if (n.linkTo?.startsWith('post:')) onOpenPost(n.linkTo.split(':')[1]);
                   }}>
                <div className="ic">
                  {n.kind==='risk' && <Icon.shieldAlert size={15}/>}
                  {n.kind==='comment' && <Icon.comment size={15}/>}
                  {n.kind==='thanks' && <Icon.thumb size={15}/>}
                </div>
                <div className="body">
                  <div style={{display:'flex',alignItems:'center',gap:6,flexWrap:'wrap',marginBottom:2}}>
                    <h4 style={{margin:0}}>{n.title}</h4>
                    {(n.kind==='comment' || n.kind==='thanks') && <TrustLabel kind="peer" slim/>}
                  </div>
                  <p>{n.body}</p>
                  <div className="t">{n.time}</div>
                </div>
              </div>
            ))}
          </div>
        )}

        {tab === 'chat' && (
          <div className="chat-list">
            {CHATS.map((c, i) => {
              const trusted = c.kind === 'expert' || c.kind === 'official';
              return (
              <div key={i} className={`chat-item ${c.unread?'unread':''}`}
                   onClick={()=>{ if (i === 0 && onOpenChat) onOpenChat(); }}
                   style={i === 0 ? {cursor:'pointer'} : {}}>
                <div className="avatar" style={{
                  background: trusted ? 'var(--primary-700)' : 'var(--primary-50)',
                  color: trusted ? '#fff' : 'var(--primary)'
                }}><Icon.user size={18}/></div>
                <div className="body">
                  <div style={{display:'flex',alignItems:'center',gap:6,flexWrap:'wrap'}}>
                    <h4 style={{margin:0,display:'inline-flex',alignItems:'center',gap:5}}>{c.name} <Flag cc={COUNTRIES[c.country]?.cc} size={12}/></h4>
                    <TrustLabel kind={c.kind} slim/>
                  </div>
                  <p>{c.msg}</p>
                </div>
                <div className="right">
                  <span className="t">{c.time}</span>
                  {c.unread > 0 && <span className="n">{c.unread}</span>}
                </div>
              </div>
            );})}
          </div>
        )}
      </div>
    </Chrome>
  );
};

Object.assign(window, { Inbox });
