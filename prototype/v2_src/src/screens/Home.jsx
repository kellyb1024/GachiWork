/* ===== Home feed ===== */
const Home = ({ onOpenPost, onOpenBoard, onCompose, onTab, onOpenExpert, aiDisplay }) => {
  const [tab, setTab] = useState('all');
  // Joined: industry boards + subgroups + country filter
  const JOINED_INDUSTRIES = ['manufacturing'];
  const JOINED_SUBGROUPS = [
    { k: 'sg_eps2025', label: 'EPS renewal 2025', industry: 'manufacturing' },
  ];
  const COUNTRY_FILTER = ME.country; // 'MM' — automatic, from profile

  const tabs = [
    { k: 'all', label: 'All' },
    ...JOINED_INDUSTRIES.map(k => {
      const ind = INDUSTRIES.find(i => i.key === k);
      return { k, label: ind ? ind.label : k, kind:'industry' };
    }),
    { k: `country_${COUNTRY_FILTER}`, label: COUNTRIES[COUNTRY_FILTER]?.name, kind:'country', cc: COUNTRIES[COUNTRY_FILTER]?.cc },
    ...JOINED_SUBGROUPS.map(s => ({ k: s.k, label: s.label, kind:'subgroup' })),
  ];

  const filtered = POSTS.filter(p => {
    if (tab === 'all') return true;
    if (tab === 'saved') return p.saved > 10;
    if (tab.startsWith('country_')) return p.author.country === tab.split('_')[1];
    if (tab.startsWith('sg_')) return p.subgroups?.includes(tab) || (tab === 'sg_eps2025' && p.tags.includes('visa')); // mock
    return p.industry === tab;
  });

  const [sort, setSort] = useState('latest');
  const [sortOpen, setSortOpen] = useState(false);
  const SORTS = [
    { k: 'latest',  label: 'New' },
    { k: 'helpful', label: 'Top' },
    { k: 'active',  label: 'Trending' },
    { k: 'unanswered', label: 'Unanswered' },
  ];
  const sortLabel = SORTS.find(s=>s.k===sort)?.label;

  // Parse "2h ago" / "1d ago" / "3mo ago" / "1y ago" → hours for chronological sort
  const ageHr = (t) => {
    if (!t) return 9e9;
    const m = String(t).match(/(\d+)\s*(mo|y|h|d)/i);
    if (!m) return 9e9;
    const n = parseInt(m[1], 10);
    const u = m[2].toLowerCase();
    if (u === 'h') return n;
    if (u === 'd') return n * 24;
    if (u === 'mo') return n * 24 * 30;
    if (u === 'y') return n * 24 * 365;
    return 9e9;
  };

  const sorted = [...filtered].sort((a, b) => {
    if (sort === 'latest')    return ageHr(a.time) - ageHr(b.time);
    if (sort === 'helpful')   return (b.likes || 0) - (a.likes || 0);
    if (sort === 'active')    return (b.comments || 0) - (a.comments || 0);
    if (sort === 'unanswered')return (a.comments || 0) - (b.comments || 0);
    return 0;
  });

  return (
    <Chrome active="home" onTab={onTab}>
      <TopNav logo />

      <div className="scroll pad-bottom">
        {/* Greeting + trust */}
        <div className="home-hero">
          <div className="home-greet">
            <Avatar user={{ id: 'me', name: ME.anonName }} size="" />
            <div style={{flex:1}}>
              <h2 style={{display:'inline-flex',alignItems:'center',gap:7}}>Hi, {ME.anonName} <Flag cc={COUNTRIES[ME.country]?.cc} size={15}/></h2>
              <p>
                <span style={{color:'var(--primary)',fontWeight:700}}>Manufacturing</span>
                <span className="verified">Verified</span>
              </p>
            </div>
          </div>
        </div>

        {/* Category chips */}
        <div className="seg-row">
          {tabs.map(t => (
            <button key={t.k} className={`seg-chip ${tab === t.k ? 'on' : ''} ${t.kind==='subgroup'?'sg':''}`} onClick={() => setTab(t.k)}>
              {t.kind === 'country' && <Flag cc={t.cc} size={11}/>}
              {t.label}
            </button>
          ))}
        </div>

        {/* Sort row */}
        <div className="filter-row">
          <span className="count">{filtered.length} posts</span>
          <div className="sort-wrap">
            <button className="sort-btn" onClick={()=>setSortOpen(o=>!o)}>
              <Icon.sort size={12}/> {sortLabel} <Icon.chevDown size={10}/>
            </button>
            {sortOpen && (
              <>
                <div className="sort-backdrop" onClick={()=>setSortOpen(false)}/>
                <div className="sort-menu">
                  {SORTS.map(s => (
                    <button key={s.k} className={`sort-opt ${sort===s.k?'on':''}`}
                      onClick={()=>{ setSort(s.k); setSortOpen(false); }}>
                      {s.label}
                      {sort===s.k && <Icon.check size={12}/>}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>

        {/* Feed */}
        <div className="feed">
          {sorted.slice(0, 2).map(p => (
            <FeedPost key={p.id} post={p} onOpen={() => onOpenPost(p.id)} aiDisplay={aiDisplay} />
          ))}

          {/* Inline guide card */}
          <div className="ad">
            <span className="pill">NEW</span>
            <h3>Free 1:1 chat with experts</h3>
            <p>Anonymously connect with labor attorneys and support counselors.<br/>Available in your language.</p>
            <button className="btn" onClick={onOpenExpert}>Find an expert →</button>
          </div>

          {sorted.slice(2).map(p => (
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

const FeedPost = ({ post, onOpen, aiDisplay, hideAuthor }) => {
  const country = COUNTRIES[post.origLang];
  const ai = AI_ANSWERS[post.id];
  const showTeaser = ai && (aiDisplay === 'card' || aiDisplay === 'inline');

  return (
    <article className="post" onClick={onOpen}>
      <span className="post-time">{post.time}</span>
      <div className="post-tags">
        <IndustryTag industryKey={post.industry} />
        {post.tags.slice(0, 2).map(t => {
          const topic = TOPICS.find(x => x.key === t);
          return topic ? <span key={t} className="tag purple">#{topic.label}</span> : null;
        })}
        {post.riskSignal && <span className="tag red">Risk signal</span>}
      </div>

      <h3>{post.titleKo}</h3>

      <div className="post-meta">
        {hideAuthor ? <div/> : (
          <div className="user-chip">
            <div className="u-dot"><Icon.user size={13}/></div>
            <span className="u-name" style={{display:'inline-flex',alignItems:'center',gap:4}}>{post.author.name} <Flag cc={country.cc} size={11}/></span>
          </div>
        )}
        <div className="meta-right">
          <span className="m"><Icon.heart size={13} /> {post.likes}</span>
          <span className="m"><Icon.comment size={13} /> {post.comments}</span>
        </div>
      </div>
    </article>
  );
};

Object.assign(window, { Home, FeedPost });
