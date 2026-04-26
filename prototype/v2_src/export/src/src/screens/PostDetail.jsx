/* ===== Post Detail — AI answer + peer replies + evaluation ===== */
const PostDetail = ({ postId, onBack, onOpenRisk, onOpenExpert, aiDisplay = 'card', evalStyle = 'buttons' }) => {
  const post = POSTS.find(p => p.id === postId) || POSTS[0];
  const ai = AI_ANSWERS[post.id] || AI_ANSWERS.p1;
  const comments = COMMENTS[post.id] || COMMENTS.p1;

  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [showOrig, setShowOrig] = useState(false);
  const [commentLikes, setCommentLikes] = useState({});
  const [commentHelpful, setCommentHelpful] = useState({});
  const [aiFb, setAiFb] = useState(null);
  const [sheet, setSheet] = useState(null);
  const [toast, setToast] = useState(null);

  const country = COUNTRIES[post.origLang];

  const toggleL = (id) => setCommentLikes(s => ({ ...s, [id]: !s[id] }));
  const toggleH = (id) => {
    setCommentHelpful(s => ({ ...s, [id]: !s[id] }));
    if (!commentHelpful[id]) setToast('+1 Helpful · Added to Trust Temperature');
  };

  return (
    <Chrome hideTabs>
      <TopNav back onBack={onBack} title="" lang={false}
        right={
          <>
            <button className="icon-btn" onClick={()=>setSaved(s=>!s)}>
              {saved ? <Icon.bookmarkFill size={18}/> : <Icon.bookmark size={18}/>}
            </button>
            <button className="icon-btn" onClick={()=>setSheet('more')}><Icon.moreH size={18}/></button>
          </>
        }
      />

      <div className="scroll" style={{paddingBottom: 80}}>
        <div className="detail">
          <div className="detail-top-tags">
            <IndustryTag industryKey={post.industry}/>
            {post.tags.map(t => {
              const topic = TOPICS.find(x => x.key === t);
              return topic ? <span key={t} className="tag purple">#{topic.label}</span> : null;
            })}
            {post.riskSignal && <span className="tag red">⚠ Risk signal</span>}
            <span className="chip ai" style={{marginLeft:'auto'}}>
              <Icon.sparkle size={10}/> AI analyzed
            </span>
          </div>

          <h1>{showOrig && post.titleOrig ? post.titleOrig : post.titleKo}</h1>

          {post.translated && (
            <button className="translation-toggle" onClick={()=>setShowOrig(s=>!s)}>
              <span className="dot"/>
              {showOrig
                ? `Show translated (${country.name})`
                : `Show original ${country.flag} ${country.name}`}
              <Icon.translate size={12}/>
            </button>
          )}

          <div className="detail-meta">
            <div className="detail-author">
              <Avatar user={post.author} size="" />
              <div className="info">
                <h4>{post.author.name} {country.flag}</h4>
                <div className="sub">
                  <IndustryTag industryKey={post.author.industry}/>
                  <span>·</span>
                  <span>{post.author.region}</span>
                  <span>·</span>
                  <TrustBadge value={post.author.trust}/>
                </div>
              </div>
            </div>
            <span style={{fontSize:11, color:'var(--neutral)'}}>{post.time}</span>
          </div>

          <div className="detail-body ko">
            {showOrig && post.bodyOrig ? post.bodyOrig : post.bodyKo}
          </div>

          {post.id === 'p1' && (
            <div className="detail-image">🏭</div>
          )}

          <div className="detail-actions">
            <button className={`action ${liked?'on like':''}`} onClick={()=>setLiked(l=>!l)}>
              {liked ? <Icon.heartFill size={16}/> : <Icon.heart size={16}/>}
              {post.likes + (liked?1:0)}
            </button>
            <button className="action"><Icon.comment size={16}/> {post.comments}</button>
            <button className="action"><Icon.share size={16}/> Share</button>
            <button className="action" onClick={()=>setSaved(s=>!s)}>
              {saved ? <Icon.bookmarkFill size={16}/> : <Icon.bookmark size={16}/>} Save
            </button>
          </div>

          {post.riskSignal && (
            <div className="risk-banner">
              <div className="ic"><Icon.shieldAlert size={18}/></div>
              <div style={{flex:1}}>
                <h4>Risk signal detected — urgent notice</h4>
                <p>AI flagged this as "3 months unpaid wages + fear of visa retaliation". Get a private walkthrough of your rights, or talk to an expert for free.</p>
                <div className="row" style={{gap:6}}>
                  <button className="btn xs" style={{background:'var(--danger)', color:'#fff'}} onClick={onOpenRisk}>Get private guidance</button>
                  <button className="btn xs ghost" onClick={onOpenExpert}>Talk to an expert</button>
                </div>
              </div>
            </div>
          )}

          {(aiDisplay === 'card' || aiDisplay === 'inline') && (
            <div className="ai-answer">
              <div className="head">
                <div className="mark"><Icon.sparkle size={18}/></div>
                <div style={{flex:1}}>
                  <div className="name">Gachi AI answer <span className="tag">Instant</span></div>
                  <div className="sub">RAG-grounded · 14 sources analyzed · 2s</div>
                </div>
                {aiDisplay === 'inline' && <span className="chip ai"><Icon.sparkle size={10}/> Inline</span>}
              </div>

              <div className="ai-section">
                <p style={{fontWeight:600, color:'var(--ink)'}}>{ai.summary}</p>
              </div>

              <div className="ai-section">
                <div className="ai-section-label rag">
                  <Icon.users size={11}/> Community data
                </div>
                <ul>
                  {ai.rag.map((r, i) => <li key={i}>{r}</li>)}
                </ul>
              </div>

              <div className="ai-section">
                <div className="ai-section-label sop">
                  <Icon.scale size={11}/> Related laws · SOP
                </div>
                {ai.sop.map((s, i) => (
                  <div key={i} style={{marginTop: i===0?0:8, padding:'10px 12px', background:'#fff', borderRadius:10, border:'1px solid var(--line-soft)'}}>
                    <h5 style={{fontSize:12, fontWeight:700, color:'var(--ai-800)'}}>{s.title}</h5>
                    <p style={{fontSize:11.5, color:'var(--ink-soft)', marginTop:4, lineHeight:1.55}}>{s.desc}</p>
                  </div>
                ))}

                {ai.sources.map((src, i) => (
                  <div key={i} className="ai-source" style={{marginTop: 8}}>
                    <div className="ic"><Icon.book size={14}/></div>
                    <div className="body">
                      <h5>{src.title}</h5>
                      <div className="meta">{src.label} · {src.meta}</div>
                    </div>
                    <span className="arrow"><Icon.chev size={13}/></span>
                  </div>
                ))}
              </div>

              <div className="ai-foot">
                <div className="fb">
                  <button className={aiFb==='good'?'on':''} onClick={()=>setAiFb('good')}>
                    <Icon.thumb size={12}/> Helpful
                  </button>
                  <button className={aiFb==='bad'?'on':''} onClick={()=>setAiFb('bad')} style={aiFb==='bad'?{color:'var(--danger)',background:'var(--danger-50)'}:{}}>
                    <Icon.thumb size={12} style={{transform:'rotate(180deg)'}}/> Inaccurate
                  </button>
                </div>
                <div className="disclaim">AI answers are for reference. For specifics, talk to an expert.</div>
              </div>
            </div>
          )}

          {aiDisplay === 'section' && (
            <div style={{padding:'12px 14px', background:'var(--ai-50)', borderRadius:14, textAlign:'center', border:'1px dashed rgba(83,74,183,.3)'}}>
              <div style={{fontSize:12, fontWeight:700, color:'var(--ai-800)'}}>🤖 AI answer is shown in a separate section</div>
              <div style={{fontSize:10.5, color:'var(--ai)', marginTop:4}}>Tap 'AI answer' tab below to view</div>
            </div>
          )}

          <div className="similar-card">
            <h4><Icon.users size={14}/> People with similar experiences</h4>
            <div className="sub">Recommended connections · same industry / country</div>
            <div className="similar-row">
              {[
                { name:'Anonymous_187', country:'VN', industry:'manufacturing', region:'Ansan', trust:78, note:'Resolved similar case last year' },
                { name:'Anonymous_305', country:'ID', industry:'manufacturing', region:'Gimpo', trust:71, note:'Filed with MoEL before' },
                { name:'Anonymous_441', country:'MM', industry:'manufacturing', region:'Pyeongtaek', trust:66, note:'Runs Myanmar community' },
              ].map((u, i) => (
                <div key={i} className="similar-person">
                  <div className="avatar sm" style={{ background: avatarColor(u.name), margin:'0 auto 6px' }}>
                    {u.name.replace('Anonymous_','').slice(0,2)}
                  </div>
                  <h5>{u.name} {COUNTRIES[u.country].flag}</h5>
                  <p>{u.note}</p>
                  <button className="btn xs ghost"><Icon.link size={10}/> Connect</button>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="comments-head">
          <h3>{comments.length} answers · {comments.reduce((a,c)=>a+(c.replies?.length||0),0)} replies</h3>
          <button className="sort-btn"><Icon.sort size={12}/> Most helpful</button>
        </div>

        <div className="comments">
          {comments.map((c) => (
            <CommentThread
              key={c.id}
              comment={c}
              liked={commentLikes[c.id]}
              helpful={commentHelpful[c.id]}
              onLike={()=>toggleL(c.id)}
              onHelpful={()=>toggleH(c.id)}
              evalStyle={evalStyle}
              childLiked={commentLikes}
              childHelpful={commentHelpful}
              onChildL={toggleL}
              onChildH={toggleH}
              onReport={()=>setSheet('report')}
            />
          ))}
        </div>
      </div>

      <div className="comment-dock">
        <button className="side-btn"><Icon.image size={20}/></button>
        <input placeholder={`Reply to ${post.author.name}...`}/>
        <button className="send"><Icon.send size={16}/></button>
      </div>

      {toast && <Toast msg={toast} onDone={()=>setToast(null)}/>}

      <BottomSheet open={sheet==='more'} onClose={()=>setSheet(null)} title="Post options">
        <div className="sheet-row" onClick={()=>{setSheet(null); setSaved(true); setToast('Saved');}}>
          <div className="ic"><Icon.bookmark size={18}/></div>
          <div className="body"><h4>Save</h4><p>Revisit later from your profile</p></div>
        </div>
        <div className="sheet-row" onClick={()=>{setSheet(null); setToast('Link copied');}}>
          <div className="ic"><Icon.share size={18}/></div>
          <div className="body"><h4>Share</h4><p>Copy link or send to another app</p></div>
        </div>
        <div className="sheet-row" onClick={()=>{setSheet(null); setToast('Translation language changed');}}>
          <div className="ic"><Icon.translate size={18}/></div>
          <div className="body"><h4>Change translation language</h4><p>English · 한국어 · Tiếng Việt · မြန်မာ ...</p></div>
        </div>
        <div className="sheet-row danger" onClick={()=>{setSheet('report');}}>
          <div className="ic"><Icon.flag size={18}/></div>
          <div className="body"><h4>Report</h4><p>Inappropriate · scam · misinformation</p></div>
        </div>
      </BottomSheet>

      <BottomSheet open={sheet==='report'} onClose={()=>setSheet(null)} title="Report reason">
        {['Misinformation / scam','Inappropriate language','Spam / advertising','Hate speech','Other'].map(r => (
          <div key={r} className="sheet-row" onClick={()=>{setSheet(null); setToast('Report submitted');}}>
            <div className="ic"><Icon.flag size={18}/></div>
            <div className="body"><h4>{r}</h4></div>
          </div>
        ))}
      </BottomSheet>
    </Chrome>
  );
};

const CommentThread = ({ comment, liked, helpful, onLike, onHelpful, evalStyle, childLiked, childHelpful, onChildL, onChildH, onReport }) => {
  const [showOrig, setShowOrig] = useState(false);
  const country = COUNTRIES[comment.origLang];
  const a = comment.author;

  return (
    <div className="comment">
      <div className="av-col">
        <Avatar user={{ id: a.name, name: a.name }} size="sm"/>
        {(comment.replies?.length > 0) && <div className="vert"/>}
      </div>
      <div className="main">
        <div className="comment-head">
          <span className="name">{a.name}</span>
          <span className="b flag" style={{fontSize:13}}>{country.flag}</span>
          <span className="b" style={{background:'#DBEAFE', color:'#1E40AF'}}>{INDUSTRIES.find(i=>i.key===a.industry).label}</span>
          <span className="b">{a.region}</span>
          <span className="b" style={{background:'rgba(245,158,11,.15)', color:'#92400E'}}>🌡️ {a.trust}°</span>
          <span className="time">{comment.time}</span>
        </div>
        <div className="comment-body">{comment.bodyKo}</div>
        {comment.bodyOrig && (
          <>
            <button className="translation-toggle" onClick={()=>setShowOrig(s=>!s)} style={{marginTop:6}}>
              <Icon.translate size={12}/>
              {showOrig ? 'Show translation' : `Original (${country.name})`}
            </button>
            {showOrig && (
              <div className="comment-orig">{comment.bodyOrig}</div>
            )}
          </>
        )}
        <div className="comment-meta">
          {evalStyle === 'buttons' && (
            <>
              <button className={helpful?'on help':''} onClick={onHelpful}>
                <Icon.thumb size={13}/> Helpful {comment.helpful + (helpful?1:0)}
              </button>
              <button className={liked?'on':''} onClick={onLike}>
                {liked ? <Icon.heartFill size={13}/> : <Icon.heart size={13}/>} {comment.likes + (liked?1:0)}
              </button>
            </>
          )}
          {evalStyle === 'stars' && (
            <>
              <div style={{display:'inline-flex', gap:2}}>
                {[1,2,3,4,5].map(s => (
                  <button key={s} style={{padding:0, color:'#F59E0B'}}>
                    <Icon.starFill size={13}/>
                  </button>
                ))}
              </div>
              <span style={{color:'var(--neutral)'}}>4.8 · {comment.helpful}</span>
            </>
          )}
          {evalStyle === 'emoji' && (
            <div style={{display:'inline-flex', gap:6}}>
              {['👍','❤️','🙏','💡'].map(e => (
                <button key={e} style={{padding:'4px 8px', background:'#F1F5F9', borderRadius:999, fontSize:11, fontWeight:600}}>
                  <span style={{fontSize:12}}>{e}</span> <span style={{color:'var(--neutral)', marginLeft:2}}>{Math.floor(Math.random()*10)+1}</span>
                </button>
              ))}
            </div>
          )}
          <button><Icon.reply size={13}/> Reply</button>
          <button onClick={onReport}><Icon.flag size={13}/> Report</button>
        </div>

        {comment.replies?.length > 0 && (
          <div className="comment-replies">
            {comment.replies.map(r => {
              const rCountry = COUNTRIES[r.origLang];
              const ra = r.author;
              return (
                <div className="comment" key={r.id}>
                  <div className="av-col">
                    <Avatar user={{ id: ra.name, name: ra.name }} size="xs"/>
                  </div>
                  <div className="main">
                    <div className="comment-head">
                      <span className="name" style={{fontSize:11.5}}>{ra.name}</span>
                      <span className="b flag" style={{fontSize:12}}>{rCountry.flag}</span>
                      <span className="b">{ra.region}</span>
                      <span className="time">{r.time}</span>
                    </div>
                    <div className="comment-body" style={{fontSize:12.5}}>{r.bodyKo}</div>
                    <div className="comment-meta">
                      <button className={childHelpful[r.id]?'on help':''} onClick={()=>onChildH(r.id)}>
                        <Icon.thumb size={12}/> {r.helpful + (childHelpful[r.id]?1:0)}
                      </button>
                      <button className={childLiked[r.id]?'on':''} onClick={()=>onChildL(r.id)}>
                        <Icon.heart size={12}/> {r.likes + (childLiked[r.id]?1:0)}
                      </button>
                      <button onClick={onReport}><Icon.flag size={12}/></button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

Object.assign(window, { PostDetail });
