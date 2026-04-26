/* ===== Landing + Login + Signup ===== */
const Landing = ({ onGetStarted, onLogin }) => (
  <Chrome hideTabs hideStatus style={{
    background:'linear-gradient(165deg, #3A82C2 0%, #2E74B5 35%, #245e93 70%, #1A4872 100%)'
  }}>
    <div style={{flex:1, display:'flex', flexDirection:'column', color:'#fff', position:'relative', overflow:'hidden'}}>
      {/* Status bar removed — rely on device status bar */}
      {/* Decorative accent blobs — kept inside viewport so edges don't look clipped */}
      <div style={{position:'absolute', top:40, right:-30, width:200, height:200, borderRadius:'50%',
        background:'radial-gradient(circle, rgba(245,158,11,.4), transparent 65%)', filter:'blur(34px)'}}/>
      <div style={{position:'absolute', top:200, left:-40, width:220, height:220, borderRadius:'50%',
        background:'radial-gradient(circle, rgba(83,74,183,.5), transparent 70%)', filter:'blur(40px)'}}/>
      <div style={{position:'absolute', bottom:220, right:-20, width:200, height:200, borderRadius:'50%',
        background:'radial-gradient(circle, rgba(16,185,129,.32), transparent 70%)', filter:'blur(36px)'}}/>
      <div style={{position:'absolute', bottom:60, left:30, width:180, height:180, borderRadius:'50%',
        background:'radial-gradient(circle, rgba(253,230,138,.22), transparent 70%)', filter:'blur(30px)'}}/>

      <div style={{padding:'20px 28px 8px', position:'relative', zIndex:1, textAlign:'center'}}>
        <img src={window.__resources.gachiworkIcon} alt="GachiWork" style={{width:72, height:72, objectFit:'contain',
          filter:'drop-shadow(0 14px 30px rgba(0,0,0,.35))', display:'block', margin:'0 auto'}}/>
        <div style={{marginTop:10, fontSize:10.5, fontWeight:700, letterSpacing:'.22em',
          color:'#FDE68A', textTransform:'uppercase'}}>For E-9 Workers</div>
        <h1 style={{fontSize:38, fontWeight:800, marginTop:8, letterSpacing:'-0.025em', lineHeight:1.02, color:'#fff'}}>
          Gachi<span style={{
            background:'linear-gradient(135deg, #F59E0B 0%, #FDE68A 100%)',
            WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text'
          }}>Work</span>
        </h1>
        <p style={{fontSize:13, opacity:.92, marginTop:10, lineHeight:1.5, maxWidth:280, color:'#EAF2FA',
          marginLeft:'auto', marginRight:'auto'}}>
          An anonymous community for migrant workers in Korea.<br/>
          Ask in your language — AI and peers answer instantly.
        </p>
      </div>

      {/* Feature cards — each accented with a different palette color */}
      <div style={{flex:1, padding:'10px 24px', display:'flex', flexDirection:'column', gap:8, justifyContent:'center', position:'relative', zIndex:1}}>
        {[
          {ic:'sparkle', t:'AI answers in 2 seconds',    s:'Grounded in Korean labor law + community data', accent:'#534AB7', accentSoft:'rgba(206,203,246,.95)'},
          {ic:'users',   t:'Peer support that gets it',  s:'Connect with people who shared your experience', accent:'#10B981', accentSoft:'rgba(110,231,183,.95)'},
          {ic:'shield',  t:'Anonymous & private',         s:'Risk signals are seen only by you',              accent:'#F59E0B', accentSoft:'rgba(253,230,138,.95)'},
        ].map((f,i)=>(
          <div key={i} style={{background:'rgba(255,255,255,.1)', backdropFilter:'blur(14px)', WebkitBackdropFilter:'blur(14px)',
            padding:'11px 12px', borderRadius:14, display:'flex', gap:10, alignItems:'center',
            border:'1px solid rgba(255,255,255,.18)'}}>
            <div style={{width:36, height:36, borderRadius:10, flexShrink:0,
              background:`linear-gradient(135deg, ${f.accent}, ${f.accent}CC)`,
              color:'#fff', display:'grid', placeItems:'center',
              boxShadow:`0 6px 18px -6px ${f.accent}`}}>
              {f.ic==='sparkle' && <Icon.sparkle size={16}/>}
              {f.ic==='users' && <Icon.users size={16}/>}
              {f.ic==='shield' && <Icon.shield size={16}/>}
            </div>
            <div style={{flex:1}}>
              <div style={{fontSize:13.5, fontWeight:700, color:'#fff'}}>{f.t}</div>
              <div style={{fontSize:11, color:'#EAF2FA', opacity:.8, marginTop:1, lineHeight:1.4}}>{f.s}</div>
            </div>
            <div style={{width:5, height:26, borderRadius:3, background:f.accentSoft, opacity:.7}}/>
          </div>
        ))}
      </div>

      {/* CTAs */}
      <div style={{padding:'12px 24px calc(16px + env(safe-area-inset-bottom))', display:'flex', flexDirection:'column', gap:8,
        position:'relative', zIndex:1,
        background:'linear-gradient(180deg,transparent, rgba(26,72,114,.6))'}}>
        <button className="btn" onClick={onGetStarted}
          style={{background:'linear-gradient(135deg, #F59E0B 0%, #FBBF24 100%)',
            color:'#0F172A', fontWeight:800, padding:'13px', fontSize:15, borderRadius:14, width:'100%',
            boxShadow:'0 14px 30px -8px rgba(245,158,11,.55), 0 0 0 1px rgba(253,230,138,.5) inset'}}>
          Create account — it's free
        </button>
        <button className="btn" onClick={onLogin}
          style={{background:'rgba(255,255,255,.1)', color:'#fff',
            border:'1px solid rgba(255,255,255,.28)', padding:'12px', fontSize:14,
            fontWeight:600, borderRadius:14, width:'100%', backdropFilter:'blur(8px)'}}>
          I already have an account
        </button>
        <div style={{textAlign:'center', fontSize:10, opacity:.75, marginTop:2, lineHeight:1.45, color:'#EAF2FA'}}>
          By continuing, you agree to our Terms & Privacy Policy.<br/>
          Your data is encrypted end-to-end.
        </div>
      </div>
    </div>
  </Chrome>
);

const Login = ({ onBack, onSignup, onDone }) => {
  const [email, setEmail] = useState('worker042');
  const [pw, setPw] = useState('••••••••');
  const [show, setShow] = useState(false);
  return (
    <Chrome hideTabs>
      <TopNav back onBack={onBack} title="Sign In" lang={false}/>
      <div className="scroll" style={{padding:'10px 24px'}}>
        <h2 style={{fontSize:22, fontWeight:700, marginTop:14}}>Welcome back</h2>
        <p style={{fontSize:13, color:'var(--ink-soft)', marginTop:6, lineHeight:1.55}}>Sign in to continue your anonymous conversations.</p>

        <div style={{marginTop:24, display:'flex', flexDirection:'column', gap:12}}>
          <div className="comp-card" style={{padding:'10px 14px'}}>
            <div style={{fontSize:10.5, fontWeight:700, color:'var(--neutral)', letterSpacing:'.08em'}}>NICKNAME OR EMAIL</div>
            <input className="comp-input" value={email} onChange={e=>setEmail(e.target.value)} style={{fontSize:14, marginTop:4}}/>
          </div>
          <div className="comp-card" style={{padding:'10px 14px', display:'flex', alignItems:'center', gap:8}}>
            <div style={{flex:1}}>
              <div style={{fontSize:10.5, fontWeight:700, color:'var(--neutral)', letterSpacing:'.08em'}}>PASSWORD</div>
              <input className="comp-input" value={pw} onChange={e=>setPw(e.target.value)} type={show?'text':'password'} style={{fontSize:14, marginTop:4}}/>
            </div>
            <button className="iconbtn" onClick={()=>setShow(s=>!s)}>{show?<Icon.eyeOff size={18}/>:<Icon.eye size={18}/>}</button>
          </div>
          <div style={{textAlign:'right'}}><a style={{fontSize:12, color:'var(--primary)', fontWeight:600}}>Forgot password?</a></div>
        </div>

        <button className="btn primary block" style={{marginTop:20, padding:'15px', fontSize:15}} onClick={onDone}>Sign In</button>

        <div style={{textAlign:'center', marginTop:28, fontSize:13, color:'var(--ink-soft)'}}>
          New here? <a style={{color:'var(--primary)', fontWeight:700, cursor:'pointer'}} onClick={onSignup}>Create an account</a>
        </div>
      </div>
    </Chrome>
  );
};

/* ===== Signup — 5 steps: visa → nickname → password → nationality → language ===== */
const Signup = ({ onBack, onDone }) => {
  const TOTAL = 5;
  const [step, setStep] = useState(1);
  const [visaFile, setVisaFile] = useState(false);
  const [visaNo, setVisaNo] = useState('');
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [pw, setPw] = useState('');
  const [pw2, setPw2] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [nationality, setNationality] = useState('');
  const [language, setLanguage] = useState('');
  const [agree, setAgree] = useState(true);
  const [natOpen, setNatOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);

  const NATIONS = [
    // Southeast Asia
    {k:'ID', n:'Indonesia',   f:'🇮🇩', region:'Southeast Asia'},
    {k:'KH', n:'Cambodia',    f:'🇰🇭', region:'Southeast Asia'},
    {k:'PH', n:'Philippines', f:'🇵🇭', region:'Southeast Asia'},
    {k:'VN', n:'Vietnam',     f:'🇻🇳', region:'Southeast Asia'},
    {k:'TH', n:'Thailand',    f:'🇹🇭', region:'Southeast Asia'},
    {k:'MM', n:'Myanmar',     f:'🇲🇲', region:'Southeast Asia'},
    {k:'TL', n:'Timor-Leste', f:'🇹🇱', region:'Southeast Asia'},
    {k:'LA', n:'Laos',        f:'🇱🇦', region:'Southeast Asia'},
    // Central & South Asia / Other
    {k:'NP', n:'Nepal',       f:'🇳🇵', region:'Central Asia & Other'},
    {k:'UZ', n:'Uzbekistan',  f:'🇺🇿', region:'Central Asia & Other'},
    {k:'KG', n:'Kyrgyzstan',  f:'🇰🇬', region:'Central Asia & Other'},
    {k:'LK', n:'Sri Lanka',   f:'🇱🇰', region:'Central Asia & Other'},
    {k:'BD', n:'Bangladesh',  f:'🇧🇩', region:'Central Asia & Other'},
    {k:'PK', n:'Pakistan',    f:'🇵🇰', region:'Central Asia & Other'},
    {k:'MN', n:'Mongolia',    f:'🇲🇳', region:'Central Asia & Other'},
    {k:'CN', n:'China',       f:'🇨🇳', region:'Central Asia & Other'},
    {k:'TJ', n:'Tajikistan',  f:'🇹🇯', region:'Central Asia & Other'},
  ];
  const LANGS = [
    {k:'en', n:'English', native:'English'},
    {k:'my', n:'Myanmar', native:'မြန်မာ'},
    {k:'vi', n:'Vietnamese', native:'Tiếng Việt'},
    {k:'ne', n:'Nepali', native:'नेपाली'},
    {k:'id', n:'Indonesian', native:'Bahasa Indonesia'},
    {k:'tl', n:'Filipino', native:'Tagalog'},
    {k:'km', n:'Khmer', native:'ខ្មែរ'},
    {k:'th', n:'Thai', native:'ไทย'},
    {k:'ko', n:'Korean', native:'한국어'},
  ];

  const headings = {
    1: {t:'Verify your E-9 visa', s:"We verify E-9 (Non-professional Employment) visa holders to keep the community safe."},
    2: {t:'Choose your nickname', s:"Your real name is never shown. Nickname can be anything."},
    3: {t:'Set a password', s:"At least 8 characters. We never share your credentials."},
    4: {t:'Where are you from?', s:"We'll match you with peers from your country."},
    5: {t:'Preferred language', s:"All posts will be auto-translated to this language."},
  };

  const canNext = (() => {
    if (step === 1) return visaFile || visaNo.length >= 6;
    if (step === 2) return nickname.trim().length >= 2;
    if (step === 3) return pw.length >= 8 && pw === pw2;
    if (step === 4) return !!nationality;
    if (step === 5) return !!language && agree;
    return false;
  })();

  const next = () => step < TOTAL ? setStep(s=>s+1) : onDone && onDone();
  const prev = () => step > 1 ? setStep(s=>s-1) : onBack();

  const selectedNat = NATIONS.find(n=>n.k===nationality);
  const selectedLang = LANGS.find(l=>l.k===language);

  return (
    <Chrome hideTabs>
      <TopNav back onBack={prev} title={`Step ${step} of ${TOTAL}`} lang={false}/>
      <div className="stepper" style={{padding:'0 18px 10px'}}>
        {Array.from({length:TOTAL}).map((_,i) => <div key={i} className={`step ${step>=i+1?'on':''} ${step>i+1?'done':''}`}/>)}
      </div>

      <div className="scroll composer-scroll">
        <div style={{padding:'8px 24px 24px'}}>
          <h2 style={{fontSize:22, fontWeight:700, letterSpacing:'-0.015em'}}>{headings[step].t}</h2>
          <p style={{fontSize:13, color:'var(--ink-soft)', marginTop:6, lineHeight:1.55}}>{headings[step].s}</p>

          {/* Step 1 — E-9 visa verification */}
          {step === 1 && (
            <div style={{marginTop:22, display:'flex', flexDirection:'column', gap:14}}>
              <div style={{padding:14, borderRadius:14, background:'var(--ai-50)', border:'1px solid rgba(83,74,183,.2)', display:'flex', gap:10, alignItems:'flex-start'}}>
                <div style={{width:24, height:24, borderRadius:8, background:'var(--ai)', color:'#fff', display:'grid', placeItems:'center', flexShrink:0}}>
                  <Icon.shield size={13}/>
                </div>
                <div style={{fontSize:12, color:'var(--ai-800)', lineHeight:1.55}}>
                  Only E-9 visa holders can join. Uploaded documents are <strong>deleted after verification</strong> and never shared.
                </div>
              </div>

              <div>
                <div className="comp-label">Upload visa / ARC (front)</div>
                <button onClick={()=>setVisaFile(f=>!f)}
                  style={{width:'100%', padding:'28px 18px', borderRadius:14, background: visaFile?'var(--primary-50)':'#fff', border: visaFile?'2px solid var(--primary)':'2px dashed var(--line)', display:'flex', flexDirection:'column', alignItems:'center', gap:8, color: visaFile?'var(--primary)':'var(--ink-soft)'}}>
                  {visaFile ? (
                    <>
                      <Icon.checkCircle size={28}/>
                      <div style={{fontSize:13, fontWeight:700}}>arc_front.jpg</div>
                      <div style={{fontSize:11, color:'var(--neutral)'}}>Tap to replace</div>
                    </>
                  ) : (
                    <>
                      <Icon.camera size={28}/>
                      <div style={{fontSize:13, fontWeight:700}}>Take photo or choose file</div>
                      <div style={{fontSize:11, color:'var(--neutral)'}}>JPG, PNG · up to 10 MB</div>
                    </>
                  )}
                </button>
              </div>

              <div style={{display:'flex', alignItems:'center', gap:10, margin:'2px 0'}}>
                <div style={{flex:1, height:1, background:'var(--line)'}}/>
                <span style={{fontSize:10.5, color:'var(--neutral)', fontWeight:700, letterSpacing:'.08em'}}>OR ENTER MANUALLY</span>
                <div style={{flex:1, height:1, background:'var(--line)'}}/>
              </div>

              <div className="comp-card" style={{padding:'10px 14px'}}>
                <div style={{fontSize:10.5, fontWeight:700, color:'var(--neutral)', letterSpacing:'.08em'}}>ALIEN REGISTRATION NO.</div>
                <input className="comp-input" placeholder="000000-0000000" value={visaNo}
                  onChange={e=>setVisaNo(e.target.value)} style={{fontSize:14, marginTop:4, fontFamily:'monospace'}}/>
              </div>
            </div>
          )}

          {/* Step 2 — Nickname + email */}
          {step === 2 && (
            <div style={{marginTop:22, display:'flex', flexDirection:'column', gap:12}}>
              <div className="comp-card" style={{padding:'10px 14px'}}>
                <div style={{fontSize:10.5, fontWeight:700, color:'var(--neutral)', letterSpacing:'.08em'}}>NICKNAME</div>
                <input className="comp-input" placeholder="e.g. worker042" value={nickname}
                  onChange={e=>setNickname(e.target.value)} style={{fontSize:14, marginTop:4}}/>
                {nickname && (
                  <div style={{marginTop:8, fontSize:11, color: nickname.length>=2?'var(--tertiary-500)':'var(--neutral)'}}>
                    {nickname.length>=2 ? '✓ Available' : 'At least 2 characters'}
                  </div>
                )}
              </div>

              <div className="comp-card" style={{padding:'10px 14px'}}>
                <div style={{fontSize:10.5, fontWeight:700, color:'var(--neutral)', letterSpacing:'.08em'}}>EMAIL <span style={{color:'var(--neutral)'}}>(optional)</span></div>
                <input className="comp-input" placeholder="you@example.com" value={email}
                  onChange={e=>setEmail(e.target.value)} style={{fontSize:14, marginTop:4}}/>
                <div style={{marginTop:8, fontSize:11, color:'var(--neutral)', lineHeight:1.5}}>
                  Used only to recover your account. Never shown publicly.
                </div>
              </div>

              <div style={{padding:12, borderRadius:12, background:'#FAFAF8', border:'1px solid var(--line)', display:'flex', gap:10, alignItems:'center'}}>
                <div style={{width:44, height:44, borderRadius:'50%', background:'linear-gradient(135deg,#CECBF6,#534AB7)', color:'#fff', display:'grid', placeItems:'center', fontWeight:700, fontSize:14}}>
                  {(nickname || '??').slice(0,2).toUpperCase()}
                </div>
                <div>
                  <div style={{fontSize:10.5, color:'var(--neutral)', fontWeight:700, letterSpacing:'.08em'}}>YOU'LL APPEAR AS</div>
                  <div style={{fontSize:14, fontWeight:700, marginTop:2}}>{nickname || 'Anonymous_042'}</div>
                </div>
              </div>
            </div>
          )}

          {/* Step 3 — Password */}
          {step === 3 && (
            <div style={{marginTop:22, display:'flex', flexDirection:'column', gap:12}}>
              <div className="comp-card" style={{padding:'10px 14px', display:'flex', alignItems:'center', gap:8}}>
                <div style={{flex:1}}>
                  <div style={{fontSize:10.5, fontWeight:700, color:'var(--neutral)', letterSpacing:'.08em'}}>PASSWORD</div>
                  <input className="comp-input" type={showPw?'text':'password'} placeholder="At least 8 characters"
                    value={pw} onChange={e=>setPw(e.target.value)} style={{fontSize:14, marginTop:4}}/>
                </div>
                <button className="iconbtn" onClick={()=>setShowPw(s=>!s)}>{showPw?<Icon.eyeOff size={18}/>:<Icon.eye size={18}/>}</button>
              </div>

              <div className="comp-card" style={{padding:'10px 14px'}}>
                <div style={{fontSize:10.5, fontWeight:700, color:'var(--neutral)', letterSpacing:'.08em'}}>CONFIRM PASSWORD</div>
                <input className="comp-input" type={showPw?'text':'password'} placeholder="Re-enter password"
                  value={pw2} onChange={e=>setPw2(e.target.value)} style={{fontSize:14, marginTop:4}}/>
                {pw2 && (
                  <div style={{marginTop:6, fontSize:11, color: pw===pw2 ? 'var(--tertiary-500)':'var(--danger)'}}>
                    {pw===pw2 ? '✓ Passwords match' : '✗ Passwords do not match'}
                  </div>
                )}
              </div>

              <div style={{display:'flex', gap:6, marginTop:2}}>
                {[0,1,2,3].map(i => (
                  <div key={i} style={{flex:1, height:4, borderRadius:999, background: pw.length > i*3 ? ['#EF4444','#F59E0B','#10B981','#10B981'][Math.min(Math.floor(pw.length/3),3)] : 'var(--line)'}}/>
                ))}
              </div>
              <div style={{fontSize:11, color:'var(--neutral)', lineHeight:1.55, marginTop:-4}}>
                Mix letters, numbers, and symbols for the strongest password.
              </div>
            </div>
          )}

          {/* Step 4 — Nationality dropdown */}
          {step === 4 && (
            <div style={{marginTop:22}}>
              <div className="comp-label">Nationality</div>
              <button onClick={()=>setNatOpen(o=>!o)}
                style={{width:'100%', padding:'14px 16px', borderRadius:14, background:'#fff', border: nationality?'2px solid var(--primary)':'2px solid var(--line)', display:'flex', alignItems:'center', justifyContent:'space-between'}}>
                <span style={{display:'flex', alignItems:'center', gap:10}}>
                  {selectedNat ? (
                    <>
                      <span style={{fontSize:22}}>{selectedNat.f}</span>
                      <span style={{fontSize:14, fontWeight:700, color:'var(--ink)'}}>{selectedNat.n}</span>
                    </>
                  ) : (
                    <span style={{fontSize:14, color:'var(--neutral)', fontWeight:500}}>Select your nationality</span>
                  )}
                </span>
                <Icon.chev size={16} style={{transform: natOpen?'rotate(180deg)':'none', transition:'transform .2s', color:'var(--neutral)'}}/>
              </button>

              {natOpen && (
                <div style={{marginTop:8, padding:6, background:'#fff', borderRadius:14, border:'1px solid var(--line)', maxHeight:360, overflowY:'auto', boxShadow:'var(--shadow-sm)'}}>
                  {['Southeast Asia','Central Asia & Other'].map(region => (
                    <div key={region}>
                      <div style={{padding:'10px 14px 6px', fontSize:10.5, fontWeight:700, color:'var(--neutral)', letterSpacing:'.1em', textTransform:'uppercase'}}>
                        {region}
                      </div>
                      {NATIONS.filter(n => n.region === region).map(n => (
                        <button key={n.k} onClick={()=>{setNationality(n.k); setNatOpen(false);}}
                          style={{width:'100%', padding:'12px 14px', borderRadius:10, background: nationality===n.k?'var(--primary-50)':'transparent', display:'flex', alignItems:'center', gap:12, textAlign:'left', transition:'background .12s'}}>
                          <span style={{fontSize:22}}>{n.f}</span>
                          <span style={{flex:1, fontSize:14, fontWeight:600, color: nationality===n.k?'var(--primary)':'var(--ink)'}}>{n.n}</span>
                          {nationality===n.k && <Icon.check size={16} style={{color:'var(--primary)'}}/>}
                        </button>
                      ))}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Step 5 — Language dropdown + terms */}
          {step === 5 && (
            <div style={{marginTop:22, display:'flex', flexDirection:'column', gap:14}}>
              <div>
                <div className="comp-label">Preferred language</div>
                <button onClick={()=>setLangOpen(o=>!o)}
                  style={{width:'100%', padding:'14px 16px', borderRadius:14, background:'#fff', border: language?'2px solid var(--primary)':'2px solid var(--line)', display:'flex', alignItems:'center', justifyContent:'space-between'}}>
                  <span style={{display:'flex', flexDirection:'column', alignItems:'flex-start', gap:2}}>
                    {selectedLang ? (
                      <>
                        <span style={{fontSize:14, fontWeight:700, color:'var(--ink)'}}>{selectedLang.native}</span>
                        <span style={{fontSize:11, color:'var(--neutral)'}}>{selectedLang.n}</span>
                      </>
                    ) : (
                      <span style={{fontSize:14, color:'var(--neutral)', fontWeight:500}}>Select a language</span>
                    )}
                  </span>
                  <Icon.chev size={16} style={{transform: langOpen?'rotate(180deg)':'none', transition:'transform .2s', color:'var(--neutral)'}}/>
                </button>

                {langOpen && (
                  <div style={{marginTop:8, padding:6, background:'#fff', borderRadius:14, border:'1px solid var(--line)', maxHeight:320, overflowY:'auto', boxShadow:'var(--shadow-sm)'}}>
                    {LANGS.map(l => (
                      <button key={l.k} onClick={()=>{setLanguage(l.k); setLangOpen(false);}}
                        style={{width:'100%', padding:'12px 14px', borderRadius:10, background: language===l.k?'var(--primary-50)':'transparent', display:'flex', alignItems:'center', gap:12, textAlign:'left'}}>
                        <div style={{flex:1}}>
                          <div style={{fontSize:14, fontWeight:700, color: language===l.k?'var(--primary)':'var(--ink)'}}>{l.native}</div>
                          <div style={{fontSize:11, color:'var(--neutral)', marginTop:1}}>{l.n}</div>
                        </div>
                        {language===l.k && <Icon.check size={16} style={{color:'var(--primary)'}}/>}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div style={{padding:14, borderRadius:14, background:'#fff', border:'1px solid var(--line)', display:'flex', flexDirection:'column', gap:10}}>
                <div style={{fontSize:13, fontWeight:700}}>Your privacy is protected</div>
                {[
                  'Posts are anonymous by default',
                  'AI risk signals are shown only to you',
                  'Your identity is never shared with employers',
                ].map((line,i)=>(
                  <div key={i} style={{display:'flex', gap:10, alignItems:'flex-start'}}>
                    <div style={{width:20, height:20, borderRadius:'50%', background:'var(--tertiary)', color:'var(--tertiary-500)', display:'grid', placeItems:'center', flexShrink:0, marginTop:1}}>
                      <Icon.check size={12}/>
                    </div>
                    <span style={{fontSize:12.5, color:'var(--ink-soft)', lineHeight:1.5}}>{line}</span>
                  </div>
                ))}
              </div>

              <label style={{display:'flex', gap:10, alignItems:'flex-start', padding:'4px 2px', cursor:'pointer'}}>
                <input type="checkbox" checked={agree} onChange={e=>setAgree(e.target.checked)} style={{marginTop:3}}/>
                <span style={{fontSize:12, color:'var(--ink-soft)', lineHeight:1.5}}>
                  I agree to the <a style={{color:'var(--primary)', fontWeight:600}}>Terms of Service</a> and <a style={{color:'var(--primary)', fontWeight:600}}>Privacy Policy</a>.
                </span>
              </label>
            </div>
          )}
        </div>
      </div>

      <div className="composer-footer">
        {step > 1 && <button className="btn ghost" onClick={prev}>Back</button>}
        <button className={`btn ${canNext ? 'primary' : 'soft'}`} style={{flex:1}} onClick={next} disabled={!canNext}>
          {step === TOTAL ? 'Join GachiWork' : 'Next'}
        </button>
      </div>
    </Chrome>
  );
};

Object.assign(window, { Landing, Login, Signup });
