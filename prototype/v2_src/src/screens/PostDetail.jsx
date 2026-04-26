/* ===== Post Detail — AI answer + peer replies + evaluation ===== */
const PostDetail = ({ postId, onBack, onOpenRisk, onOpenExpert, onOpenPost, onOpenUser, aiDisplay = 'card', evalStyle = 'buttons' }) => {
  const post = POSTS.find(p => p.id === postId) || POSTS[0];
  const ai = AI_ANSWERS[post.id] || AI_ANSWERS.p1;
  const comments = COMMENTS[post.id] || COMMENTS.p1;

  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [showOrig, setShowOrig] = useState(false);
  const [aiDetailsOpen, setAiDetailsOpen] = useState(false);
  const [aiSummaryFull, setAiSummaryFull] = useState(false);
  const [commentLikes, setCommentLikes] = useState({});
  const [commentHelpful, setCommentHelpful] = useState({});
  const [aiFb, setAiFb] = useState(null);
  const [sheet, setSheet] = useState(null);
  const [toast, setToast] = useState(null);

  const country = COUNTRIES[post.origLang];

  const toggleL = (id) => setCommentLikes(s => ({ ...s, [id]: !s[id] }));
  const toggleH = (id) => {
    setCommentHelpful(s => ({ ...s, [id]: !s[id] }));
    if (!commentHelpful[id]) setToast('+1 Helpful · Author Trust Temp +1');
  };

  return (
    <Chrome hideTabs>
      <TopNav back onBack={onBack} title="" lang={false}
        right={
          <button className="icon-btn" onClick={()=>setSheet('more')}><Icon.moreH size={18}/></button>
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
            {post.riskSignal && <span className="tag red">Risk signal</span>}
          </div>

          <h1>{showOrig && post.titleOrig ? post.titleOrig : post.titleKo}</h1>

          {post.translated && (
            <button className="translation-toggle" onClick={()=>setShowOrig(s=>!s)}>
              <span className="dot"/>
              {showOrig
                ? `Show translated (${country.name})`
                : `Show original ${country.name}`}
              <Icon.translate size={12}/>
            </button>
          )}

          <div className="detail-meta">
            <div className="detail-author" onClick={() => onOpenUser && onOpenUser(post.author.id)} style={{cursor:'pointer'}}>
              <Avatar user={post.author} size="" />
              <div className="info">
                <h4 style={{display:'inline-flex',alignItems:'center',gap:6}}>{post.author.name} <Flag cc={country.cc} size={14}/></h4>
                <div className="sub">
                  <IndustryTag industryKey={post.author.industry}/>
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
            <div className="detail-image"><Icon.image size={32}/></div>
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
                <p>AI flagged this as "3 months unpaid wages + fear of visa retaliation". We've prepared a step-by-step guide for your situation.</p>
                <div className="row" style={{gap:6}}>
                  <button className="btn xs" style={{background:'var(--danger)', color:'#fff'}} onClick={onOpenRisk}>Walk me through this →</button>
                </div>
              </div>
            </div>
          )}

          {(aiDisplay === 'card' || aiDisplay === 'inline') && (
            <div className="ai-answer">
              <div className="head">
                <div style={{flex:1}}>
                  <div className="name">Gachi AI</div>
                  <div className="sub">RAG-grounded · 14 sources · 2s</div>
                </div>
              </div>

              <div className="ai-section">
                <p className={`ai-summary ${aiSummaryFull?'full':''}`} style={{fontWeight:600, color:'var(--ink)'}}>{ai.summary}</p>
                <button className="ai-readmore" onClick={()=>setAiSummaryFull(v=>!v)}>
                  {aiSummaryFull ? 'Show less' : 'Read more'}
                </button>
              </div>

              <button className={`ai-details-toggle ${aiDetailsOpen?'open':''}`} onClick={()=>setAiDetailsOpen(v=>!v)}>
                <span>{aiDetailsOpen ? 'Hide details' : 'View community data & related laws'}</span>
                <Icon.chevDown size={14}/>
              </button>

              {aiDetailsOpen && <>
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
                  <div key={i} style={{marginTop: i===0?0:8, padding:'10px 12px', background:'#fff', borderRadius:8, border:'1px solid var(--line-soft)'}}>
                    <div style={{marginBottom:6}}><TrustLabel kind="official" slim/></div>
                    <h5 style={{fontSize:12, fontWeight:700, color:'var(--ink)'}}>{s.title}</h5>
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
              </>}

              <div className="ai-foot">
                <div className="fb">
                  <button className={aiFb==='good'?'on':''} onClick={()=>setAiFb(aiFb==='good'?null:'good')}>
                    <Icon.thumb size={12}/> Helpful
                    <span className="fb-count">{28 + (aiFb==='good' ? 1 : 0)}</span>
                  </button>
                  <button className={aiFb==='bad'?'on':''} onClick={()=>setAiFb(aiFb==='bad'?null:'bad')} style={aiFb==='bad'?{color:'var(--danger)',background:'var(--danger-50)',borderColor:'#FCA5A5'}:{}}>
                    <Icon.thumbDown size={12}/> Inaccurate
                    <span className="fb-count">{3 + (aiFb==='bad' ? 1 : 0)}</span>
                  </button>
                </div>
                <div className="disclaim">AI · for reference only</div>
              </div>
            </div>
          )}

          {aiDisplay === 'section' && (
            <div style={{padding:'14px', background:'var(--ai-50)', borderRadius:8, textAlign:'center', border:'1px dashed var(--ai-100)'}}>
              <div style={{display:'flex',justifyContent:'center',marginBottom:6}}><TrustLabel kind="ai"/></div>
              <div style={{fontSize:12, fontWeight:700, color:'var(--ink)'}}>AI answer is shown in a separate section</div>
              <div style={{fontSize:10.5, color:'var(--neutral)', marginTop:4}}>Tap 'AI answer' tab below to view</div>
            </div>
          )}
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

        {(() => {
          const similar = POSTS.filter(p => p.id !== post.id && p.industry === post.industry).slice(0, 6);
          if (similar.length === 0) return null;
          return (
            <div className="related-strip">
              <div className="rs-head">
                <h4>Related questions</h4>
                <span className="rs-sub">Same industry · swipe</span>
              </div>
              <div className="rs-row">
                {similar.map(sp => {
                  const sCountry = COUNTRIES[sp.origLang];
                  return (
                    <button key={sp.id} className="rs-card" onClick={()=>onOpenPost && onOpenPost(sp.id)}>
                      <h5>{sp.titleKo}</h5>
                      <div className="rs-meta">
                        <Flag cc={sCountry?.cc} size={10}/>
                        <span>{sp.author.name}</span>
                        <span>·</span>
                        <span><Icon.comment size={10}/> {sp.comments}</span>
                        <span>·</span>
                        <span>{sp.time}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })()}
      </div>

      <div className="comment-dock">
        <button className="side-btn"><Icon.image size={20}/></button>
        <input placeholder={`Reply to ${post.author.name}...`}/>
        <button className="send"><Icon.reply size={16}/></button>
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
          <span className="name" style={{display:'inline-flex',alignItems:'center',gap:5}}>{a.name} <Flag cc={country.cc} size={12}/></span>
          <TrustBadge value={a.trust}/>
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
            <button className={`eval-helpful ${helpful?'on':''}`} onClick={onHelpful} title="Helpful — boosts the author's Trust Temperature">
              {helpful ? <Icon.thumbFill size={13}/> : <Icon.thumb size={13}/>}
              <span>Helpful</span>
              <span className="ct">{comment.helpful + (helpful?1:0)}</span>
            </button>
          )}
          {evalStyle === 'stars' && (
            <>
              <div style={{display:'inline-flex', gap:2}}>
                {[1,2,3,4,5].map(s => (
                  <button key={s} style={{padding:0, color:'var(--primary)'}}>
                    <Icon.starFill size={13}/>
                  </button>
                ))}
              </div>
              <span style={{color:'var(--neutral)'}}>4.8 · {comment.helpful}</span>
            </>
          )}
          {evalStyle === 'emoji' && (
            <div style={{display:'inline-flex', gap:6}}>
              {[
                { icon: Icon.thumb, label: 'Helpful' },
                { icon: Icon.heart, label: 'Thanks' },
                { icon: Icon.checkCircle, label: 'Same case' },
                { icon: Icon.sparkle, label: 'Insightful' },
              ].map((e,i) => {
                const Ic = e.icon;
                return (
                  <button key={i} style={{padding:'4px 8px', background:'var(--line-soft)', borderRadius:999, fontSize:11, fontWeight:600, display:'inline-flex', alignItems:'center', gap:4, color:'var(--ink-soft)'}}>
                    <Ic size={12}/>
                    <span style={{color:'var(--neutral)'}}>{Math.floor(Math.random()*10)+1}</span>
                  </button>
                );
              })}
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
                      <span className="name" style={{fontSize:11.5,display:'inline-flex',alignItems:'center',gap:4}}>{ra.name} <Flag cc={rCountry.cc} size={11}/></span>
                      <TrustBadge value={ra.trust}/>
                      <span className="time">{r.time}</span>
                    </div>
                    <div className="comment-body" style={{fontSize:12.5}}>{r.bodyKo}</div>
                    <div className="comment-meta">
                      <button className={`eval-helpful sm ${childHelpful[r.id]?'on':''}`} onClick={()=>onChildH(r.id)}>
                        {childHelpful[r.id] ? <Icon.thumbFill size={12}/> : <Icon.thumb size={12}/>}
                        <span>Helpful</span>
                        <span className="ct">{r.helpful + (childHelpful[r.id]?1:0)}</span>
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
