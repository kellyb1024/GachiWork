/* ===== Profile ===== */
const Profile = ({ onTab, onOpenPost }) => {
  const [tab, setTab] = useState('posts');
  return (
    <Chrome active="profile" onTab={onTab}>
      <TopNav title="My Profile" right={<button className="icon-btn"><Icon.settings size={20}/></button>}/>

      <div className="scroll pad-bottom">
        <div className="profile-head">
          <Avatar user={{ id: 'me', name: ME.anonName }} size="lg" text="42"/>
          <h3>{ME.anonName} <span style={{fontSize:22}}>{COUNTRIES[ME.country].flag}</span></h3>
          <div className="m">
            <IndustryTag industryKey={ME.industry}/> · 2 years 3 months in Korea
          </div>
        </div>

        <div className="trust-card">
          <div className="trust-label">TRUST TEMPERATURE</div>
          <div className="trust-bar">
            <div className="ind" style={{left: `${ME.trust}%`}}/>
          </div>
          <div className="trust-scale">
            <span>New</span><span>Stable</span><span>✓ Verified</span><span>🔥 Active</span>
          </div>
          <div style={{textAlign:'center', marginTop:10, fontSize:12, color:'var(--ink-soft)'}}>
            <strong style={{color:'var(--secondary)', fontSize:18}}>{ME.trust}°</strong> · +3° recent · 3 answer thanks
          </div>
        </div>

        <div style={{display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:8, padding:'0 14px 14px'}}>
          {[
            { n:'12', l:'Posts' },
            { n:'47', l:'Answers' },
            { n:'189', l:'Helpful' },
          ].map(s => (
            <div key={s.l} style={{background:'#fff', borderRadius:12, padding:'12px 8px', textAlign:'center', boxShadow:'var(--shadow-sm)', border:'1px solid var(--line-soft)'}}>
              <div style={{fontSize:18, fontWeight:700, color:'var(--primary)'}}>{s.n}</div>
              <div style={{fontSize:10.5, color:'var(--neutral)', marginTop:2, fontWeight:600}}>{s.l}</div>
            </div>
          ))}
        </div>

        <div className="seg-tab-wrap">
          <div className={`st ${tab==='posts'?'on':''}`} onClick={()=>setTab('posts')}>My posts</div>
          <div className={`st ${tab==='saved'?'on':''}`} onClick={()=>setTab('saved')}>Saved</div>
          <div className={`st ${tab==='connects'?'on':''}`} onClick={()=>setTab('connects')}>Connections</div>
        </div>

        {tab === 'posts' && (
          <div>
            {POSTS.slice(0,3).map(p => (
              <div key={p.id} className="post-item" onClick={()=>onOpenPost && onOpenPost(p.id)} style={{cursor:'pointer'}}>
                <div className="body">
                  <div className="post-tags" style={{margin:0}}>
                    <IndustryTag industryKey={p.industry}/>
                    {p.tags.slice(0,1).map(t => {
                      const topic = TOPICS.find(x => x.key === t);
                      return topic ? <span key={t} className="tag purple">#{topic.label}</span> : null;
                    })}
                    <span className="sp"/>
                    <span className="time">{p.time}</span>
                  </div>
                  <h4 style={{marginTop:8}}>{p.titleKo}</h4>
                  <p>{p.bodyKo.slice(0,80)}...</p>
                  <div className="footer">
                    <span><Icon.heart size={13}/> {p.likes}</span>
                    <span><Icon.comment size={13}/> {p.comments}</span>
                    <span><Icon.bookmark size={13}/> {p.saved}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {tab === 'saved' && (
          <div>
            {POSTS.slice(1,3).map(p => (
              <div key={p.id} className="post-item" onClick={()=>onOpenPost && onOpenPost(p.id)} style={{cursor:'pointer'}}>
                <div className="body">
                  <h4>{p.titleKo}</h4>
                  <p>{p.bodyKo.slice(0,80)}...</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {tab === 'connects' && (
          <div style={{padding:'0 14px 30px', display:'flex', flexDirection:'column', gap:8}}>
            {[
              { name:'Anonymous_187', country:'VN', industry:'manufacturing', region:'Ansan', trust:78, mutual:'3 similar experiences' },
              { name:'Anonymous_305', country:'ID', industry:'manufacturing', region:'Gimpo', trust:71, mutual:'Same industry' },
              { name:'Anonymous_441', country:'MM', industry:'manufacturing', region:'Pyeongtaek', trust:66, mutual:'Same country' },
            ].map(u => (
              <div key={u.name} className="follower-item">
                <Avatar user={{ id:u.name, name:u.name }} size=""/>
                <div className="body" style={{flex:1}}>
                  <h4>{u.name} {COUNTRIES[u.country].flag}</h4>
                  <p>{INDUSTRIES.find(i=>i.key===u.industry).label} · {u.region} · 🌡️ {u.trust}° · {u.mutual}</p>
                </div>
                <button className="btn-follow on">Connected</button>
              </div>
            ))}
          </div>
        )}
      </div>
    </Chrome>
  );
};

Object.assign(window, { Profile });
