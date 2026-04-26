/* ===== Board — category entry screen ===== */
const Board = ({ boardKey = 'manufacturing', onBack, onOpenPost, onCompose }) => {
  const ind = INDUSTRIES.find(i => i.key === boardKey) || INDUSTRIES[0];
  const posts = POSTS.filter(p => p.industry === boardKey);
  const [filter, setFilter] = useState('hot');

  return (
    <Chrome hideTabs style={{background: 'var(--primary)'}}>
      <div className="board-hero">
        <button className="back back-abs" onClick={onBack}><Icon.back size={18}/></button>
        <div className="body">
          <div className="category">INDUSTRY</div>
          <h1>{ind.label}</h1>
          <div className="meta">
            <span className="m"><Icon.users size={12}/> 12,482 members</span>
            <span className="dot"/>
            <span className="m"><Icon.pen size={12}/> 1,847 posts</span>
          </div>
        </div>
      </div>

      <div className="board-filter">
        {[
          {k:'hot', l:'Hot'}, {k:'new', l:'Latest'}, {k:'risk', l:'Risk'}, {k:'wage', l:'#Wages'}, {k:'dorm', l:'#Dorm'}, {k:'safety', l:'#Safety'},
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
                {p.riskSignal && <span className="tag red">Risk</span>}
                <span className="sp"/>
                <span className="time">{p.time}</span>
              </div>
              <h3>{p.titleKo}</h3>
              <p className="preview">{p.bodyKo}</p>
              <div className="post-meta">
                <div className="user-chip">
                  <div className="u-dot"><Icon.user size={13}/></div>
                  <span className="u-name" style={{display:'inline-flex',alignItems:'center',gap:4}}>{p.author.name} <Flag cc={COUNTRIES[p.origLang]?.cc} size={11}/></span>
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
