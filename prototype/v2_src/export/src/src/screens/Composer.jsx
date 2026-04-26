/* ===== Composer — new post ===== */
const Composer = ({ onBack, onPublish, layout = 'single' }) => {
  const [postType, setPostType] = useState('question');
  const [industry, setIndustry] = useState(ME.industry);
  const [topics, setTopics] = useState(['wage']);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [images, setImages] = useState([true]);
  const [anon, setAnon] = useState(true);
  const [step, setStep] = useState(1);

  const toggleTopic = (t) => setTopics(s => s.includes(t) ? s.filter(x=>x!==t) : [...s, t].slice(0,3));
  const canPublish = title.length > 0 && body.length > 0;

  const addImage = () => setImages(s => [...s, true].slice(0, 4));
  const removeImage = (i) => setImages(s => s.filter((_, idx) => idx !== i));

  const prefill = () => {
    setTitle('Dorm deduction ₩300,000 — is this normal?');
    setBody("I work at an auto-parts factory in Ansan. They deduct ₩300,000 for dorm from my salary each month, but my friends seem to pay less. What's the typical amount?");
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
                    <button className={`post-type ${postType==='experience'?'on':''}`} onClick={()=>setPostType('experience')}>
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
      <TopNav back onBack={onBack} title="New post" lang={false} right={
        <button className={`save ${!canPublish ? 'disabled':''}`} onClick={()=>canPublish && onPublish()} disabled={!canPublish}>
          Post
        </button>
      }/>

      <div className="scroll composer-scroll">
        <div className="composer">
          <div>
            <div className="comp-label">Type</div>
            <div className="post-type-row">
              <button className={`post-type q ${postType==='question'?'on':''}`} onClick={()=>setPostType('question')}>
                <div className="ic"><Icon.question size={16}/></div>
                <h4>Ask a question</h4>
                <p>AI + community answers</p>
              </button>
              <button className={`post-type ${postType==='experience'?'on':''}`} onClick={()=>setPostType('experience')}>
                <div className="ic"><Icon.book size={16}/></div>
                <h4>Share experience</h4>
                <p>Tips, reviews, info</p>
              </button>
            </div>
          </div>

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

          <div className="comp-card">
            <input className="comp-input" placeholder="Enter a title"
                   value={title} onChange={e=>setTitle(e.target.value)}
                   onFocus={()=>!title && prefill()} />
            <div style={{height:1, background:'var(--line-soft)', margin:'10px 0'}}/>
            <textarea className="comp-textarea" placeholder="Describe your situation in detail. AI will find related laws and similar experiences."
                      value={body} onChange={e=>setBody(e.target.value)} />
            {body.length > 20 && (
              <div style={{marginTop:10, padding:'8px 10px', background:'var(--ai-50)', borderRadius:8, display:'flex',gap:8, alignItems:'center', fontSize:11, color:'var(--ai-800)'}}>
                <Icon.sparkle size={13}/>
                <span>AI detected an 'unpaid wages' situation. Posting will auto-link relevant laws.</span>
              </div>
            )}
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

          <div>
            <div className="comp-label">Photos · Documents <span style={{color:'var(--neutral)',fontWeight:500}}>({images.length}/4)</span></div>
            <div className="image-row">
              {images.map((_, i) => (
                <div key={i} className="image-tile filled">
                  <button className="x" onClick={()=>removeImage(i)}>×</button>
                </div>
              ))}
              {images.length < 4 && (
                <button className="image-tile" onClick={addImage}>
                  <Icon.camera size={20}/>
                </button>
              )}
            </div>
          </div>

          <div className="anon-toggle">
            <div className="left">
              <div className="ic"><Icon.shield size={16}/></div>
              <div>
                <h4>Post anonymously</h4>
                <p>Shown as Anonymous_042 instead of your name</p>
              </div>
            </div>
            <button className={`switch ${anon?'on':''}`} onClick={()=>setAnon(a=>!a)} aria-label="anon"/>
          </div>
        </div>
      </div>

      <div className="composer-footer">
        <div className="side">
          <button className="iconbtn"><Icon.image size={18}/></button>
          <button className="iconbtn"><Icon.camera size={18}/></button>
          <button className="iconbtn"><Icon.mic size={18}/></button>
        </div>
        <button className={`btn ${canPublish?'primary':'soft'}`} style={{flex:1}} onClick={()=>canPublish && onPublish()}>
          Publish
        </button>
      </div>
    </Chrome>
  );
};

Object.assign(window, { Composer });
