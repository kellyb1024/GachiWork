/* ===== Inbox — notifications ===== */
const Inbox = ({ onTab, onOpenRisk, onOpenPost }) => {
  const [tab, setTab] = useState('notif');
  return (
    <Chrome active="inbox" onTab={onTab}>
      <TopNav title="Inbox" />
      <div className="tabs-top">
        <div className={`tt ${tab==='notif'?'on':''}`} onClick={()=>setTab('notif')}>Notifications {NOTIFS.filter(n=>n.unread).length > 0 && <span style={{color:'var(--danger)', marginLeft:4}}>●</span>}</div>
        <div className={`tt ${tab==='chat'?'on':''}`} onClick={()=>setTab('chat')}>Messages</div>
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
                  {n.kind==='ai' && <Icon.sparkle size={15}/>}
                  {n.kind==='comment' && <Icon.comment size={15}/>}
                  {n.kind==='thanks' && <Icon.heart size={15}/>}
                </div>
                <div className="body">
                  <h4>{n.title}</h4>
                  <p>{n.body}</p>
                  <div className="t">{n.time}</div>
                </div>
              </div>
            ))}
          </div>
        )}

        {tab === 'chat' && (
          <div className="chat-list">
            {[
              { name:'Minjeong Kim, Attorney', country:'KR', msg:"Update on the unpaid-wage case you asked about yesterday.", time:'12m', unread:2, ic:'MK', bg:'linear-gradient(135deg,#60A5FA,#2563EB)' },
              { name:'Anonymous_187', country:'VN', msg:'How did your MoEL filing go? Just checking in.', time:'1h', unread:1, ic:'87', bg:avatarColor('Anonymous_187') },
              { name:'Migrant Worker Center', country:'KR', msg:'When are you available for Myanmar interpretation?', time:'1d', unread:0, ic:'MW', bg:'linear-gradient(135deg,#10B981,#047857)' },
              { name:'Anonymous_305', country:'ID', msg:"Please connect me too!", time:'2d', unread:0, ic:'05', bg:avatarColor('Anonymous_305') },
            ].map((c, i) => (
              <div key={i} className={`chat-item ${c.unread?'unread':''}`}>
                <div className="avatar" style={{background: c.bg}}>{c.ic}</div>
                <div className="body">
                  <h4>{c.name} {COUNTRIES[c.country]?.flag || ''}</h4>
                  <p>{c.msg}</p>
                </div>
                <div className="right">
                  <span className="t">{c.time}</span>
                  {c.unread > 0 && <span className="n">{c.unread}</span>}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Chrome>
  );
};

Object.assign(window, { Inbox });
