/* ===== Profile — supports both my-profile and other-user view ===== */
const Profile = ({ onTab, onOpenPost, viewUserId, onBack }) => {
  const isMe = !viewUserId || viewUserId === 'me';

  // Mock user lookup for "other" profile (Anonymous_187 — author of p2)
  const OTHER_USER = {
    id: 'u_vn_187',
    anonName: 'Anonymous_187',
    country: 'VN',
    industry: 'manufacturing',
    region: 'Ansan',
    trust: 78,
    stats: { posts: 8, replies: 34, helpful: 142 },
    joinedDate: 'Joined 8 months ago',
  };

  const user = isMe ? ME : OTHER_USER;
  const stats = isMe
    ? { posts: 12, replies: 47, helpful: 189 }
    : OTHER_USER.stats;

  const [tab, setTab] = useState('posts');

  // Posts authored by other user (mocked — p2 + a couple more)
  const otherUserPosts = [POSTS.find(p => p.id === 'p2')].filter(Boolean);

  return (
    <Chrome active="profile" onTab={onTab}>
      <TopNav
        title={isMe ? 'My Profile' : user.anonName}
        left={!isMe ? <button className="icon-btn" onClick={onBack}><Icon.chevLeft size={20}/></button> : undefined}
        right={isMe ? <button className="icon-btn"><Icon.settings size={20}/></button> : null}
      />

      <div className="scroll pad-bottom">
        <div className="profile-head">
          <Avatar user={{ id: user.id || 'me', name: user.anonName }} size="lg"/>
          <h3 style={{display:'inline-flex',alignItems:'center',gap:8}}>
            {user.anonName} <Flag cc={COUNTRIES[user.country]?.cc} size={18}/>
          </h3>
          <div className="m">
            <IndustryTag industryKey={user.industry}/>
          </div>
        </div>

        <div className="trust-card">
          <div className="trust-label">{isMe ? `You got ${stats.helpful} helpful` : `Got ${stats.helpful} helpful`}</div>
          <div className="trust-bar">
            <div className="fill" style={{width: `${((user.trust - 36.5) / (100 - 36.5)) * 100}%`}}/>
            <div className="ind" style={{left: `${((user.trust - 36.5) / (100 - 36.5)) * 100}%`}}/>
          </div>
          <div className="trust-scale">
            <span>New</span>
            <span>Top contributor</span>
          </div>
        </div>

        {/* Stats — shown on OTHER profile only (own profile has tabs that cover this) */}
        {!isMe && (
          <div style={{display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:8, padding:'0 14px 14px'}}>
            {[
              { n: stats.posts, l:'Posts' },
              { n: stats.replies, l:'Replies' },
              { n: stats.helpful, l:'Helpful' },
            ].map(s => (
              <div key={s.l} style={{background:'#fff', borderRadius:12, padding:'12px 8px', textAlign:'center', boxShadow:'var(--shadow-sm)', border:'1px solid var(--line-soft)'}}>
                <div style={{fontSize:18, fontWeight:700, color:'var(--primary)'}}>{s.n}</div>
                <div style={{fontSize:10.5, color:'var(--neutral)', marginTop:2, fontWeight:600}}>{s.l}</div>
              </div>
            ))}
          </div>
        )}

        {/* Action button on other profile */}
        {!isMe && (
          <div style={{padding:'0 14px 14px'}}>
            <button className="btn primary" style={{width:'100%'}}>
              <Icon.message size={14}/> Message
            </button>
          </div>
        )}

        {/* Tabs — only on OWN profile (other profile shows a single Posts list) */}
        {isMe ? (
          <>
            <div className="seg-tab-wrap">
              <div className={`st ${tab==='posts'?'on':''}`} onClick={()=>setTab('posts')}>My posts</div>
              <div className={`st ${tab==='replies'?'on':''}`} onClick={()=>setTab('replies')}>Replies</div>
              <div className={`st ${tab==='saved'?'on':''}`} onClick={()=>setTab('saved')}>Saved</div>
            </div>

            {tab === 'posts' && (
              <div className="feed">
                {POSTS.filter(p => p.author.name === ME.anonName).map(p => (
                  <FeedPost key={p.id} post={p} onOpen={() => onOpenPost && onOpenPost(p.id)} aiDisplay="off" hideAuthor />
                ))}
                {POSTS.filter(p => p.author.name === ME.anonName).length === 0 && (
                  <div className="bh-empty" style={{margin:'14px'}}>You haven't posted anything yet.</div>
                )}
              </div>
            )}

            {tab === 'replies' && (
              <div style={{padding:'0 14px 30px', display:'flex', flexDirection:'column', gap:6}}>
                {[
                  {
                    postTitle: 'Has anyone had trouble with the new safety certification?',
                    postId: 'p5',
                    myReply: 'I got it last month — the company should pay since it\'s mandatory. Push back if they refuse.',
                    time: '2h ago',
                    helpful: 4,
                  },
                  {
                    postTitle: 'Looking for translation of dorm regulations',
                    postId: 'p4',
                    myReply: 'I had the same issue. The Migrant Worker Center (1577-0071) does free translation — they helped me with my contract.',
                    time: '1d ago',
                    helpful: 7,
                  },
                  {
                    postTitle: 'Sunday-open clinics in Pyeongtaek',
                    postId: 'p3',
                    myReply: 'Thank you for sharing. The one near Pyeongtaek station also has a Myanmar interpreter on Sundays.',
                    time: '3d ago',
                    helpful: 2,
                  },
                ].map((r, i) => (
                  <div key={i} className="reply-item" onClick={()=>onOpenPost && onOpenPost(r.postId)}>
                    <div className="reply-context">
                      <Icon.comment size={11}/>
                      <span className="reply-on">Replied to</span>
                      <span className="reply-title">{r.postTitle}</span>
                    </div>
                    <p className="reply-body">{r.myReply}</p>
                    <div className="reply-meta">
                      <span>{r.time}</span>
                      <span className="dot"/>
                      <span><Icon.heart size={11}/> {r.helpful} helpful</span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {tab === 'saved' && (
              <div className="feed">
                {['p2','p3','p4'].map(id => POSTS.find(p => p.id === id)).filter(Boolean).map(p => (
                  <FeedPost key={p.id} post={p} onOpen={() => onOpenPost && onOpenPost(p.id)} aiDisplay="off" />
                ))}
              </div>
            )}
          </>
        ) : (
          // OTHER PROFILE: just a Posts list (no tabs)
          <>
            <div className="bh-section-title" style={{paddingTop:6}}>Posts</div>
            <div className="feed">
              {otherUserPosts.map(p => (
                <FeedPost key={p.id} post={p} onOpen={() => onOpenPost && onOpenPost(p.id)} aiDisplay="off" />
              ))}
            </div>
          </>
        )}
      </div>
    </Chrome>
  );
};

Object.assign(window, { Profile });
