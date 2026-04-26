/* ===== Board — category entry screen ===== */
const Board = ({ boardKey = 'manufacturing', onBack, onOpenPost, onCompose }) => {
  const ind = INDUSTRIES.find(i => i.key === boardKey) || INDUSTRIES[0];
  const posts = POSTS.filter(p => p.industry === boardKey);
  const [filter, setFilter] = useState('hot');
  const colorMap = { manufacturing:'', agriculture:'orange', fisheries:'green', services:'purple' };

  const bgMap = { manufacturing:'#1E3A8A', agriculture:'#C2410C', fisheries:'#166534', services:'#6B21A8' };

  return (
    <Chrome hideTabs style={{background: bgMap[boardKey] || '#1E3A8A'}}>
      <div className={`board-hero ${colorMap[boardKey]}`}>
        <button className="back back-abs" onClick={onBack}><Icon.back size={18}/></button>
        <div className="body">
          <div className="category">{ind.labelEn.toUpperCase()} BOARD</div>
          <h1>{ind.label}</h1>
          <div className="meta">
            <span className="m"><Icon.users size={12}/> 12,482 members</span>
            <span className="dot"/>
            <span className="m"><Icon.pen size={12}/> 342 today</span>
            <span className="dot"/>
            <span className="m"><Icon.sparkle size={12}/> AI answered 98%</span>
          </div>
        </div>
      </div>

      <div className="board-filter">
        {[
          {k:'hot', l:'🔥 Hot'}, {k:'new', l:'Latest'}, {k:'risk', l:'⚠ Risk'}, {k:'wage', l:'#Wages'}, {k:'dorm', l:'#Dorm'}, {k:'safety', l:'#Safety'},
        ].map(f => (
          <button key={f.k} className={`f ${filter===f.k?'on':''}`} onClick={()=>setFilter(f.k)}>{f.l}</button>
        ))}
      </div>

      <div className="scroll pad-bottom" style={{background:'#F5F7FB'}}>
        <div className="feed" style={{paddingTop:12}}>
          {posts.map(p => (
            <div key={p.id} className="post" onClick={()=>onOpenPost(p.id)}>
              <div className="post-tags">
                {p.tags.slice(0,2).map(t => {
                  const topic = TOPICS.find(x => x.key === t);
                  return topic ? <span key={t} className="tag purple">#{topic.label}</span> : null;
                })}
                {p.riskSignal && <span className="tag red">⚠ Risk</span>}
                <span className="sp"/>
                <span className="time">{p.time}</span>
              </div>
              <h3>{p.titleKo}</h3>
              <p className="preview">{p.bodyKo}</p>
              <div className="post-meta">
                <div className="user-chip">
                  <span className="lang-flag">{COUNTRIES[p.origLang].flag}</span>
                  <span className="u-name">{p.author.name}</span>
                  <span style={{fontSize:10, color:'var(--neutral)'}}>· {p.author.region}</span>
                </div>
                <div className="meta-right">
                  <span className="m"><Icon.heart size={13}/> {p.likes}</span>
                  <span className="m"><Icon.comment size={13}/> {p.comments}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <button className="fab" onClick={onCompose}><Icon.pen size={24}/></button>
    </Chrome>
  );
};

Object.assign(window, { Board });
