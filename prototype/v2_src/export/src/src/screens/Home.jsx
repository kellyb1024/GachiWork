/* ===== Home feed ===== */
const Home = ({ onOpenPost, onOpenBoard, onCompose, onTab, onOpenExpert, aiDisplay }) => {
  const [tab, setTab] = useState('all');
  const tabs = [
    { k: 'all', label: 'All' },
    { k: 'manufacturing', label: 'Manufacturing' },
    { k: 'agriculture', label: 'Agriculture' },
    { k: 'fisheries', label: 'Fisheries' },
    { k: 'services', label: 'Services' },
    { k: 'saved', label: 'Saved' },
  ];

  const filtered = POSTS.filter(p => tab === 'all' ? true : tab === 'saved' ? p.saved > 10 : p.industry === tab);

  return (
    <Chrome active="home" onTab={onTab}>
      <TopNav logo right={<button className="icon-btn"><Icon.bell size={20} /></button>} />

      <div className="scroll pad-bottom">
        {/* Greeting + trust */}
        <div className="home-hero">
          <div className="home-greet">
            <Avatar user={{ id: 'me', name: ME.anonName }} size="" text="42" />
            <div style={{flex:1}}>
              <h2>Hi, {ME.anonName} <span style={{fontSize:18}}>{COUNTRIES[ME.country].flag}</span></h2>
              <p>
                <span style={{color:'var(--primary)',fontWeight:700}}>Manufacturing · Incheon</span>
                <span className="verified">✓ Verified</span>
              </p>
            </div>
          </div>
        </div>

        {/* Category chips */}
        <div className="seg-row">
          {tabs.map(t => (
            <button key={t.k} className={`seg-chip ${tab === t.k ? 'on' : ''}`} onClick={() => setTab(t.k)}>
              {t.label}
            </button>
          ))}
        </div>

        {/* Sort row */}
        <div className="filter-row">
          <span className="count">{filtered.length} posts</span>
          <button className="sort-btn"><Icon.sort size={12} /> Latest</button>
        </div>

        {/* Feed */}
        <div className="feed">
          {filtered.slice(0, 2).map(p => (
            <FeedPost key={p.id} post={p} onOpen={() => onOpenPost(p.id)} aiDisplay={aiDisplay} />
          ))}

          {/* Inline guide card */}
          <div className="ad">
            <span className="pill">✦ NEW</span>
            <h3>Free 1:1 chat with experts</h3>
            <p>Anonymously connect with labor attorneys and support counselors.<br/>Available in your language.</p>
            <button className="btn" onClick={onOpenExpert}>Find an expert →</button>
          </div>

          {filtered.slice(2).map(p => (
            <FeedPost key={p.id} post={p} onOpen={() => onOpenPost(p.id)} aiDisplay={aiDisplay} />
          ))}
        </div>
      </div>

      <button className="fab" onClick={onCompose} aria-label="Compose">
        <Icon.pen size={24} />
      </button>
    </Chrome>
  );
};

const FeedPost = ({ post, onOpen, aiDisplay }) => {
  const country = COUNTRIES[post.origLang];
  const ai = AI_ANSWERS[post.id];
  const showTeaser = ai && (aiDisplay === 'card' || aiDisplay === 'inline');

  return (
    <article className="post" onClick={onOpen}>
      <div className="post-tags">
        <IndustryTag industryKey={post.industry} />
        {post.tags.slice(0, 2).map(t => {
          const topic = TOPICS.find(x => x.key === t);
          return topic ? <span key={t} className="tag purple">#{topic.label}</span> : null;
        })}
        {post.riskSignal && <span className="tag red">⚠ Risk signal</span>}
        <span className="sp"></span>
        <span className="time">{post.time}</span>
      </div>

      <h3>{post.titleKo}</h3>
      <p className="preview">{post.bodyKo}</p>

      {showTeaser && (
        <div className="ai-teaser">
          <div className="ai-mark"><Icon.sparkle size={13} /></div>
          <div className="ai-body">
            <div className="ai-title">Gachi AI · Instant answer</div>
            <div className="ai-text">{ai.summary}</div>
          </div>
        </div>
      )}

      <div className="post-meta">
        <div className="user-chip">
          <div className="u-dot" style={{ background: avatarColor(post.author.id) }}>
            {post.author.name.replace('Anonymous_','').slice(0,2)}
          </div>
          <span className="lang-flag">{country.flag}</span>
          <span className="u-name">{post.author.name}</span>
          {post.translated && <span style={{fontSize:9,color:'var(--ai)',fontWeight:700,padding:'1px 5px',background:'var(--ai-50)',borderRadius:4,letterSpacing:'.04em'}}>Translated</span>}
        </div>
        <div className="meta-right">
          <span className="m"><Icon.heart size={13} /> {post.likes}</span>
          <span className="m"><Icon.comment size={13} /> {post.comments}</span>
        </div>
      </div>
    </article>
  );
};

Object.assign(window, { Home });
