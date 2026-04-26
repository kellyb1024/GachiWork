/* ===== Composer — new post ===== */
const Composer = ({ onBack, onPublish, onOpenPost, layout = 'single' }) => {
  // Default scenario for this prototype: dorm-deduction question
  const SCENARIO_TITLE = 'Dorm deduction ₩300,000 — is this normal?';
  const SCENARIO_BODY = "I work at a plastics factory in Incheon. They deduct ₩300,000 for dorm from my salary each month, but my coworkers from other factories seem to pay less. What's the typical amount? Meal fees are another ₩50,000 on top.";
  // Restore from saved draft if present, but ignore stale drafts that don't match current scenario
  const draft = (() => {
    try {
      const d = JSON.parse(localStorage.getItem('gw_composer_draft') || 'null');
      if (d && d.title && d.title !== SCENARIO_TITLE) {
        // Stale draft from earlier prototype scenario — discard
        localStorage.removeItem('gw_composer_draft');
        return null;
      }
      return d;
    } catch { return null; }
  })();
  const [postType, setPostType] = useState(draft?.postType ?? 'question');
  const [industry, setIndustry] = useState(draft?.industry ?? ME.industry);
  const [topics, setTopics] = useState(draft?.topics ?? ['wage']);
  const [title, setTitle] = useState(draft?.title ?? SCENARIO_TITLE);
  const [body, setBody] = useState(draft?.body ?? SCENARIO_BODY);
  const [images, setImages] = useState([true]);
  const [step, setStep] = useState(1);
  const [debouncedTitle, setDebouncedTitle] = useState(draft?.title ?? SCENARIO_TITLE);
  const [customTags, setCustomTags] = useState(draft?.customTags ?? []);
  const [tagDraft, setTagDraft] = useState('');
  const [showOthers, setShowOthers] = useState(false);
  const [showAllSimilar, setShowAllSimilar] = useState(false);
  const [subgroup, setSubgroup] = useState(draft?.subgroup ?? null);
  const [includeCountry, setIncludeCountry] = useState(draft?.includeCountry ?? true);

  const SUBGROUP_OPTIONS = [
    { k:'sg_eps2025',     label:'EPS renewal 2025' },
  ];

  // Persist draft so opening a similar post and returning preserves the work
  useEffect(() => {
    try {
      localStorage.setItem('gw_composer_draft', JSON.stringify({ postType, industry, topics, title, body, customTags, subgroup, includeCountry }));
    } catch {}
  }, [postType, industry, topics, title, body, customTags, subgroup, includeCountry]);

  const addCustomTag = () => {
    const v = tagDraft.trim().replace(/^#/, '');
    if (!v) return;
    if (customTags.includes(v)) { setTagDraft(''); return; }
    if (topics.length + customTags.length >= 5) return;
    setCustomTags(s => [...s, v]);
    setTagDraft('');
  };
  const removeCustomTag = (t) => setCustomTags(s => s.filter(x => x !== t));

  // Debounce title for live similar-post search (500ms)
  useEffect(() => {
    const t = setTimeout(() => setDebouncedTitle(title.trim()), 500);
    return () => clearTimeout(t);
  }, [title]);

  // Prototype-only similar suggestions — not from real POSTS data.
  // These are hardcoded mock results to demonstrate the "AI found similar
  // questions" UX in the Composer.
  const SIMILAR_PROTO = [
    {
      id: 'p2',
      titleKo: 'My factory takes ₩280,000 every month for the dorm — too much?',
      industry: 'manufacturing',
      tags: ['dorm','wage'],
      author: { name: 'Anonymous_187', country: 'VN', region: 'Ansan' },
      time: '3h ago',
      comments: 24, likes: 56,
      ai: {
        summary: "Dorm deductions of ₩280,000 are on the high side for capital-region manufacturing. Whether it's legal depends on your written consent and the actual facility — workers can request a written breakdown.",
      },
    },
    {
      id: 'sim_2',
      titleKo: 'Boss deducts dorm fee but no contract — what to do?',
      industry: 'manufacturing',
      tags: ['dorm','contract'],
      author: { name: 'Anonymous_512', country: 'KH', region: 'Hwaseong' },
      time: '5d ago',
      comments: 14, likes: 31,
      ai: {
        summary: 'Without written consent, dorm fee deductions are not enforceable. Ask for a contract and itemized breakdown; if refused, contact the Migrant Worker Center (1577-0071).',
      },
    },
    {
      id: 'sim_3',
      titleKo: 'How much do you pay for company dorm + meals?',
      industry: 'manufacturing',
      tags: ['dorm'],
      author: { name: 'Anonymous_904', country: 'NP', region: 'Bucheon' },
      time: '1w ago',
      comments: 47, likes: 88,
    },
  ];

  const similar = (() => {
    const q = (debouncedTitle + ' ' + body).toLowerCase();
    if (q.length < 3) return [];
    // Cheap relevance: count token hits, then return top matches.
    const tokens = q.split(/\s+/).filter(s => s.length > 2);
    const scored = SIMILAR_PROTO.map(p => {
      const hay = (p.titleKo + ' ' + p.tags.join(' ')).toLowerCase();
      let score = 0;
      tokens.forEach(t => { if (hay.includes(t)) score += 1; });
      if (p.industry === industry) score += 0.5;
      topics.forEach(t => { if (p.tags.includes(t)) score += 0.5; });
      return { p, score };
    }).filter(x => x.score >= 1).sort((a,b) => b.score - a.score);
    return scored.map(x => x.p);
  })();

  const toggleTopic = (t) => setTopics(s => s.includes(t) ? s.filter(x=>x!==t) : [...s, t].slice(0,3));
  const canPublish = title.length > 0 && body.length > 0;

  const addImage = () => setImages(s => [...s, true].slice(0, 4));
  const removeImage = (i) => setImages(s => s.filter((_, idx) => idx !== i));

  const prefill = () => {
    setTitle(SCENARIO_TITLE);
    setBody(SCENARIO_BODY);
  };

  if (layout === 'step') {
    return (
      <Chrome hideTabs>
        <TopNav back onBack={onBack} title={`Step ${step} of 3`} lang={false} right={
          <button className={`save ${!canPublish ? 'disabled':''}`} onClick={onPublish} disabled={!canPublish}>
            {step < 3 ? 'Next' : 'Post'}
          </button>
        }/>
        <div className="stepper">
          <div className={`step ${step>=1?'on':''} ${step>1?'done':''}`}/>
          <div className={`step ${step>=2?'on':''} ${step>2?'done':''}`}/>
          <div className={`step ${step>=3?'on':''}`}/>
        </div>

        <div className="scroll composer-scroll">
          <div className="composer">
            {step === 1 && (
              <>
                <div>
                  <div className="comp-label">What kind of post?</div>
                  <div className="comp-sub">Choosing a type helps AI give a more precise answer</div>
                  <div className="post-type-row">
                    <button className={`post-type q ${postType==='question'?'on':''}`} onClick={()=>setPostType('question')}>
                      <div className="ic"><Icon.question size={16}/></div>
                      <h4>Ask a question</h4>
                      <p>AI + community answers</p>
                    </button>
                    <button className={`post-type exp ${postType==='experience'?'on':''}`} onClick={()=>setPostType('experience')}>
                      <div className="ic"><Icon.book size={16}/></div>
                      <h4>Share experience</h4>
                      <p>Tips, reviews, info</p>
                    </button>
                  </div>
                </div>

                <div>
                  <div className="comp-label">Industry (pick 1)</div>
                  <div className="pill-picker">
                    {INDUSTRIES.map(ind => (
                      <button key={ind.key}
                        className={`p ${industry===ind.key?'on':''} ${industry===ind.key?ind.color:''}`}
                        onClick={()=>setIndustry(ind.key)}>
                        {ind.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="comp-label">Tags (up to 3)</div>
                  <div className="pill-picker">
                    {TOPICS.map(t => (
                      <button key={t.key}
                        className={`p ${topics.includes(t.key)?'on purple':''}`}
                        onClick={()=>toggleTopic(t.key)}>
                        #{t.label}
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        <div className="composer-footer">
          {step > 1 && <button className="btn ghost" onClick={()=>setStep(s=>s-1)}>← Back</button>}
          <button className="btn primary" style={{flex:1}} onClick={()=>step<3?setStep(s=>s+1):onPublish()}>
            {step<3 ? 'Next step' : 'Publish'}
          </button>
        </div>
      </Chrome>
    );
  }

  return (
    <Chrome hideTabs>
      <TopNav back onBack={onBack} title="New post" lang={false}/>

      <div className="scroll composer-scroll">
        <div className="composer">
          {/* 1. Type — colored to match the action (question=primary, experience=secondary) */}
          <div>
            <div className="comp-label">Type</div>
            <div className="post-type-row">
              <button className={`post-type q ${postType==='question'?'on':''}`} onClick={()=>setPostType('question')}>
                <div className="ic"><Icon.question size={16}/></div>
                <h4>Ask a question</h4>
                <p>AI + community answers</p>
              </button>
              <button className={`post-type exp ${postType==='experience'?'on':''}`} onClick={()=>setPostType('experience')}>
                <div className="ic"><Icon.book size={16}/></div>
                <h4>Share experience</h4>
                <p>Tips, reviews, info</p>
              </button>
            </div>
          </div>

          {/* 2. Title + body + tags — content together */}
          <div className="comp-card">
            <input className="comp-input" placeholder="Enter a title"
                   value={title} onChange={e=>setTitle(e.target.value)}
                   onFocus={()=>!title && prefill()} />
            <div style={{height:1, background:'var(--line-soft)', margin:'10px 0'}}/>
            <textarea className="comp-textarea" placeholder="Describe your situation…"
                      value={body} onChange={e=>setBody(e.target.value)} />
            <div className="comp-attach-inline">
              <div className="image-row">
                {images.map((_, i) => (
                  <div key={i} className="image-tile filled">
                    <button className="x" onClick={()=>removeImage(i)}>×</button>
                  </div>
                ))}
                {images.length < 4 && (
                  <button className="image-tile sm" onClick={addImage} title="Add photo or document">
                    <Icon.camera size={16}/>
                  </button>
                )}
              </div>
              <span className="attach-hint">
                {images.length === 0 ? 'Add photos or documents' : `${images.length}/4 attached`}
              </span>
            </div>
            <div style={{height:1, background:'var(--line-soft)', margin:'10px 0'}}/>
            <div className="comp-tags-inline">
              <div className="comp-tags-label">Tags <span>(up to 5)</span></div>
              <div className="pill-picker">
                {TOPICS.map(t => (
                  <button key={t.key}
                    className={`p ${topics.includes(t.key)?'on':''}`}
                    onClick={()=>toggleTopic(t.key)}>
                    #{t.label}
                  </button>
                ))}
                {customTags.map(t => (
                  <span key={t} className="p on custom" onClick={()=>removeCustomTag(t)}>
                    #{t} <Icon.close size={11}/>
                  </span>
                ))}
                <button className={`p ${showOthers?'on':''}`} onClick={()=>setShowOthers(v=>!v)}>
                  #Others
                </button>
              </div>
              {showOthers && (
                <div className="others-input-row">
                  <span className="hash">#</span>
                  <input
                    className="custom-tag-input"
                    placeholder="e.g. nightshift, ansan, h2-visa"
                    value={tagDraft}
                    onChange={e=>setTagDraft(e.target.value)}
                    onKeyDown={e=>{ if(e.key==='Enter'){ e.preventDefault(); addCustomTag(); } }}
                    maxLength={24}
                    autoFocus
                  />
                  <button className={`add-tag ${tagDraft.trim()?'on':''}`} onClick={addCustomTag} disabled={!tagDraft.trim()}>Add</button>
                </div>
              )}
            </div>
          </div>

          {/* 3. Industry — locked once chosen, drives feed */}
          <div>
            <div className="comp-label">Industry category</div>
            <div className="pill-picker">
              {INDUSTRIES.map(ind => (
                <button key={ind.key}
                  className={`p ${industry===ind.key?'on':''} ${industry===ind.key?ind.color:''}`}
                  onClick={()=>setIndustry(ind.key)}>
                  {ind.label}
                </button>
              ))}
            </div>
          </div>

          {/* 4. Visibility — industry locked; country toggleable; subgroup optional (+) */}
          <div className="comp-vis">
            <div className="comp-vis-head">
              <Icon.eye size={12}/>
              <span>Where this post appears</span>
            </div>
            <div className="comp-vis-row">
              <div className="vis-chip vis-locked" title="Auto-included — your selected industry">
                <Icon.layers size={11}/>
                <span>{INDUSTRIES.find(i=>i.key===industry)?.label}</span>
              </div>
              <button className={`vis-chip vis-toggle ${includeCountry?'on':'off'}`}
                      onClick={()=>setIncludeCountry(v=>!v)}
                      title={includeCountry?'Tap to remove from country group':'Tap to share to country group'}>
                <Flag cc={COUNTRIES[ME.country]?.cc} size={11}/>
                <span>{COUNTRIES[ME.country]?.name}</span>
                <span className="vis-toggle-state">{includeCountry?<Icon.check size={10}/>:<Icon.plus size={10}/>}</span>
              </button>
              {SUBGROUP_OPTIONS.map(s => (
                <button key={s.k}
                        className={`vis-chip vis-toggle ${subgroup===s.k?'on':'off'}`}
                        onClick={()=>setSubgroup(subgroup===s.k ? null : s.k)}
                        title={subgroup===s.k?'Tap to remove from subgroup':'Tap to share to subgroup'}>
                  <Icon.layers size={11}/>
                  <span>{s.label}</span>
                  <span className="vis-toggle-state">{subgroup===s.k?<Icon.check size={10}/>:<Icon.plus size={10}/>}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Live similar-posts panel — appears when title is entered */}
          {debouncedTitle.length >= 3 && (
            <div className="similar-live">
              <div className="sl-head">
                <Icon.sparkle size={13}/>
                <span className="sl-ai-tag">AI</span>
                <span>People asked something similar</span>
                <span className="sl-count">{similar.length} match{similar.length===1?'':'es'}</span>
              </div>
              {similar.length === 0 ? (
                <div className="sl-empty">
                  No similar questions yet. Yours will be the first — AI will reply within 2 seconds after posting.
                </div>
              ) : (
                <>
                  <div className="sl-list">
                    {(showAllSimilar ? similar : similar.slice(0, 1)).map(p => {
                      const ans = p.ai;
                      return (
                        <div key={p.id} className="sl-item sl-item-tap" role="button" tabIndex={0}
                             onClick={()=>onOpenPost && onOpenPost(p.id)}
                             onKeyDown={(e)=>{if((e.key==='Enter'||e.key===' ')&&onOpenPost){e.preventDefault();onOpenPost(p.id);}}}>
                          <div className="sl-q">
                            <h5>{p.titleKo}</h5>
                            <div className="sl-meta">
                              <span style={{display:'inline-flex',alignItems:'center',gap:4}}>{p.author.name} <Flag cc={COUNTRIES[p.author.country]?.cc} size={11}/></span>
                              <span>·</span>
                              <span>{p.time}</span>
                              <span>·</span>
                              <span>{p.comments} replies</span>
                            </div>
                          </div>
                          {ans && (
                            <div className="sl-ans">
                              <div className="sl-ans-label">Top answer · preview</div>
                              <p className="sl-ans-text">{ans.summary}</p>
                            </div>
                          )}
                          <div className="sl-go">
                            <span>Open this question</span>
                            <Icon.arrow size={12}/>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  {similar.length > 1 && (
                    <button className="sl-more" onClick={()=>setShowAllSimilar(v=>!v)}>
                      {showAllSimilar
                        ? <>Show less <Icon.chev size={12} style={{transform:'rotate(180deg)'}}/></>
                        : <>Show {similar.length - 1} more {similar.length - 1 === 1 ? 'question' : 'questions'} <Icon.chev size={12}/></>
                      }
                    </button>
                  )}
                </>
              )}
            </div>
          )}

          <div className="anon-toggle" style={{cursor:'default'}}>
            <div className="left">
              <div className="ic" style={{background:'var(--primary-50)',color:'var(--primary)'}}><Icon.shield size={16}/></div>
              <div>
                <h4>Posted anonymously</h4>
                <p>All posts are anonymous by default. You'll appear as Anonymous_{Math.floor(Math.random()*900+100)}.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="composer-footer">
        <button className={`btn ${canPublish?'primary':'soft'}`} style={{flex:1}} onClick={()=>canPublish && onPublish()}>
          Publish
        </button>
      </div>
    </Chrome>
  );
};

Object.assign(window, { Composer });
