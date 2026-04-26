/* ===== Landing + Login + Signup ===== */
const Landing = ({ onGetStarted, onLogin }) =>
<Chrome hideTabs hideStatus style={{ background: 'var(--primary)' }}>
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', position: 'relative' }}>

      {/* Centered brand block */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px 28px 0', textAlign: 'center' }}>
        <img src={(typeof window!=='undefined'&&window.__GW_ICON)||'assets/gachiwork-icon.png'} alt="GachiWork" style={{ width: 72, height: 72, objectFit: 'contain', display: 'block' }} />
        <div style={{ marginTop: 18, fontSize: 10.5, fontWeight: 800, letterSpacing: '.22em',
        color: 'rgba(255,255,255,.7)', textTransform: 'uppercase' }}>
          Network for E-9 Workers
        </div>
        <h1 style={{ fontSize: 44, fontWeight: 800, marginTop: 10, letterSpacing: '-0.025em', lineHeight: 1.05 }}>
          <span style={{ color: '#fff' }}>Gachi</span><span style={{ color: 'var(--secondary)' }}>Work</span>
        </h1>
      </div>

      {/* CTAs */}
      <div style={{ padding: '12px 24px calc(24px + env(safe-area-inset-bottom))', display: 'flex', flexDirection: 'column', gap: 10 }}>
        <button onClick={onGetStarted}
      style={{ background: '#fff', color: 'var(--primary)', fontWeight: 700, padding: '14px',
        fontSize: 15, borderRadius: 8, width: '100%', border: 'none', cursor: 'pointer' }}>
          Create account
        </button>
        <button onClick={onLogin}
      style={{ background: 'transparent', color: '#fff',
        border: '1px solid rgba(255,255,255,.4)', padding: '13px', fontSize: 14,
        fontWeight: 600, borderRadius: 8, width: '100%', cursor: 'pointer' }}>
          I already have an account
        </button>
        <div style={{ textAlign: 'center', fontSize: 11, color: 'rgba(255,255,255,.7)', marginTop: 8, lineHeight: 1.7 }}>
          <div>By continuing, you agree to our Terms &amp; Privacy Policy.</div>
          <div>Your data is encrypted end-to-end.</div>
        </div>
      </div>
    </div>
  </Chrome>;


const Login = ({ onBack, onSignup, onDone }) => {
  const [email, setEmail] = useState('worker042');
  const [pw, setPw] = useState('••••••••');
  const [show, setShow] = useState(false);
  return (
    <Chrome hideTabs>
      <TopNav back onBack={onBack} title="Sign In" lang={false} />
      <div className="scroll" style={{ padding: '10px 24px' }}>
        <h2 style={{ fontSize: 22, fontWeight: 700, marginTop: 14 }}>Welcome back</h2>
        <p style={{ fontSize: 13, color: 'var(--ink-soft)', marginTop: 6, lineHeight: 1.55 }}>Sign in to continue your anonymous conversations.</p>

        <div style={{ marginTop: 24, display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div className="comp-card" style={{ padding: '10px 14px' }}>
            <div style={{ fontSize: 10.5, fontWeight: 700, color: 'var(--neutral)', letterSpacing: '.08em' }}>USERNAME OR EMAIL</div>
            <input className="comp-input" value={email} onChange={(e) => setEmail(e.target.value)} style={{ fontSize: 14, marginTop: 4 }} />
          </div>
          <div className="comp-card" style={{ padding: '10px 14px', display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 10.5, fontWeight: 700, color: 'var(--neutral)', letterSpacing: '.08em' }}>PASSWORD</div>
              <input className="comp-input" value={pw} onChange={(e) => setPw(e.target.value)} type={show ? 'text' : 'password'} style={{ fontSize: 14, marginTop: 4 }} />
            </div>
            <button className="iconbtn" onClick={() => setShow((s) => !s)}>{show ? <Icon.eyeOff size={18} /> : <Icon.eye size={18} />}</button>
          </div>
          <div style={{ textAlign: 'right' }}><a style={{ fontSize: 12, color: 'var(--primary)', fontWeight: 600 }}>Forgot password?</a></div>
        </div>

        <button className="btn primary block" style={{ marginTop: 20, padding: '15px', fontSize: 15 }} onClick={onDone}>Sign In</button>

        <div style={{ textAlign: 'center', marginTop: 28, fontSize: 13, color: 'var(--ink-soft)' }}>
          New here? <a style={{ color: 'var(--primary)', fontWeight: 700, cursor: 'pointer' }} onClick={onSignup}>Create an account</a>
        </div>
      </div>
    </Chrome>);

};

/* ===== Signup — 5 steps: visa → nickname → password → nationality → language ===== */
const Signup = ({ onBack, onDone, initialStep = 1 }) => {
  const TOTAL = 5;
  const [step, setStep] = useState(initialStep);
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
  { k: 'ID', n: 'Indonesia', cc: 'id', region: 'Southeast Asia' },
  { k: 'KH', n: 'Cambodia', cc: 'kh', region: 'Southeast Asia' },
  { k: 'PH', n: 'Philippines', cc: 'ph', region: 'Southeast Asia' },
  { k: 'VN', n: 'Vietnam', cc: 'vn', region: 'Southeast Asia' },
  { k: 'TH', n: 'Thailand', cc: 'th', region: 'Southeast Asia' },
  { k: 'MM', n: 'Myanmar', cc: 'mm', region: 'Southeast Asia' },
  { k: 'TL', n: 'Timor-Leste', cc: 'tl', region: 'Southeast Asia' },
  { k: 'LA', n: 'Laos', cc: 'la', region: 'Southeast Asia' },
  // Central & South Asia / Other
  { k: 'NP', n: 'Nepal', cc: 'np', region: 'Central Asia & Other' },
  { k: 'UZ', n: 'Uzbekistan', cc: 'uz', region: 'Central Asia & Other' },
  { k: 'KG', n: 'Kyrgyzstan', cc: 'kg', region: 'Central Asia & Other' },
  { k: 'LK', n: 'Sri Lanka', cc: 'lk', region: 'Central Asia & Other' },
  { k: 'BD', n: 'Bangladesh', cc: 'bd', region: 'Central Asia & Other' },
  { k: 'PK', n: 'Pakistan', cc: 'pk', region: 'Central Asia & Other' },
  { k: 'MN', n: 'Mongolia', cc: 'mn', region: 'Central Asia & Other' },
  { k: 'CN', n: 'China', cc: 'cn', region: 'Central Asia & Other' },
  { k: 'TJ', n: 'Tajikistan', cc: 'tj', region: 'Central Asia & Other' }];

  const LANGS = [
  // Pinned to top
  { k: 'en', n: 'English',   native: 'English' },
  { k: 'ko', n: 'Korean',    native: '한국어' },
  // Alphabetical (covers all 17 E-9 sending-country languages)
  { k: 'bn', n: 'Bengali',    native: 'বাংলা' },
  { k: 'my', n: 'Burmese',    native: 'မြန်မာ' },
  { k: 'zh', n: 'Chinese',    native: '中文' },
  { k: 'tl', n: 'Filipino',   native: 'Tagalog' },
  { k: 'id', n: 'Indonesian', native: 'Bahasa Indonesia' },
  { k: 'km', n: 'Khmer',      native: 'ខ្មែរ' },
  { k: 'ky', n: 'Kyrgyz',     native: 'Кыргызча' },
  { k: 'lo', n: 'Lao',        native: 'ລາວ' },
  { k: 'mn', n: 'Mongolian',  native: 'Монгол' },
  { k: 'ne', n: 'Nepali',     native: 'नेपाली' },
  { k: 'si', n: 'Sinhala',    native: 'සිංහල' },
  { k: 'tg', n: 'Tajik',      native: 'Тоҷикӣ' },
  { k: 'pt', n: 'Tetum',      native: 'Tetun' },
  { k: 'th', n: 'Thai',       native: 'ไทย' },
  { k: 'ur', n: 'Urdu',       native: 'اردو' },
  { k: 'uz', n: 'Uzbek',      native: 'Oʻzbek' },
  { k: 'vi', n: 'Vietnamese', native: 'Tiếng Việt' }];


  const headings = {
    1: { t: 'Verify your E-9 visa', s: "We verify E-9 (Non-professional Employment) visa holders to keep the community safe." },
    2: { t: 'Choose your username', s: "Your real name is never shown. Username can be anything." },
    3: { t: 'Set a password', s: "At least 8 characters. We never share your credentials." },
    4: { t: 'Where are you from?', s: "We'll match you with peers from your country." },
    5: { t: 'Preferred language', s: "All posts will be auto-translated to this language." }
  };

  const canNext = (() => {
    if (step === 1) return visaFile || visaNo.length >= 6;
    if (step === 2) return nickname.trim().length >= 2 && /^\S+@\S+\.\S+$/.test(email.trim());
    if (step === 3) {
      const ok = pw.length >= 8 && /[a-zA-Z]/.test(pw) && /[0-9]/.test(pw) && /[^a-zA-Z0-9]/.test(pw);
      return ok && pw === pw2;
    }
    if (step === 4) return !!nationality;
    if (step === 5) return !!language && agree;
    return false;
  })();

  const next = () => step < TOTAL ? setStep((s) => s + 1) : onDone && onDone();
  const prev = () => step > 1 ? setStep((s) => s - 1) : onBack();

  const selectedNat = NATIONS.find((n) => n.k === nationality);
  const selectedLang = LANGS.find((l) => l.k === language);

  return (
    <Chrome hideTabs>
      <TopNav back onBack={prev} title={`Step ${step} of ${TOTAL}`} lang={false} />
      <div className="stepper" style={{ padding: '0 18px 10px' }}>
        {Array.from({ length: TOTAL }).map((_, i) => <div key={i} className={`step ${step >= i + 1 ? 'on' : ''} ${step > i + 1 ? 'done' : ''}`} />)}
      </div>

      <div className="scroll composer-scroll">
        <div style={{ padding: '8px 24px 24px' }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, letterSpacing: '-0.015em' }}>{headings[step].t}</h2>
          <p style={{ fontSize: 13, color: 'var(--ink-soft)', marginTop: 6, lineHeight: 1.55 }}>{headings[step].s}</p>

          {/* Step 1 — E-9 visa verification */}
          {step === 1 &&
          <div style={{ marginTop: 22, display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div style={{ padding: 14, borderRadius: 14, background: 'var(--primary-50)', border: '1px solid var(--primary-100)', display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                <div style={{ width: 24, height: 24, borderRadius: 8, background: 'var(--primary)', color: '#fff', display: 'grid', placeItems: 'center', flexShrink: 0 }}>
                  <Icon.shield size={13} />
                </div>
                <div style={{ fontSize: 12, color: 'var(--primary-700)', lineHeight: 1.55 }}>
                  Only E-9 visa holders can join. Uploaded documents are <strong>deleted after verification</strong> and never shared.
                </div>
              </div>

              <div>
                <div className="comp-label">Upload visa / ARC (front)</div>
                <button onClick={() => setVisaFile((f) => !f)}
              style={{ width: '100%', padding: '28px 18px', borderRadius: 14, background: visaFile ? 'var(--primary-50)' : '#fff', border: visaFile ? '2px solid var(--primary)' : '2px dashed var(--line)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, color: visaFile ? 'var(--primary)' : 'var(--ink-soft)' }}>
                  {visaFile ?
                <>
                      <Icon.checkCircle size={28} />
                      <div style={{ fontSize: 13, fontWeight: 700 }}>arc_front.jpg</div>
                      <div style={{ fontSize: 11, color: 'var(--neutral)' }}>Tap to replace</div>
                    </> :

                <>
                      <Icon.camera size={28} />
                      <div style={{ fontSize: 13, fontWeight: 700 }}>Take photo or choose file</div>
                      <div style={{ fontSize: 11, color: 'var(--neutral)' }}>JPG, PNG · up to 10 MB</div>
                    </>
                }
                </button>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: 10, margin: '2px 0' }}>
                <div style={{ flex: 1, height: 1, background: 'var(--line)' }} />
                <span style={{ fontSize: 10.5, color: 'var(--neutral)', fontWeight: 700, letterSpacing: '.08em' }}>OR ENTER MANUALLY</span>
                <div style={{ flex: 1, height: 1, background: 'var(--line)' }} />
              </div>

              <div className="comp-card" style={{ padding: '10px 14px' }}>
                <div style={{ fontSize: 10.5, fontWeight: 700, color: 'var(--neutral)', letterSpacing: '.08em' }}>ALIEN REGISTRATION NO.</div>
                <input className="comp-input" placeholder="000000-0000000" value={visaNo}
              onChange={(e) => setVisaNo(e.target.value)} style={{ fontSize: 14, marginTop: 4, fontFamily: 'monospace' }} />
              </div>
            </div>
          }

          {/* Step 2 — Nickname + email */}
          {step === 2 &&
          <div style={{ marginTop: 22, display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div className="comp-card" style={{ padding: '10px 14px' }}>
                <div style={{ fontSize: 10.5, fontWeight: 700, color: 'var(--neutral)', letterSpacing: '.08em' }}>USERNAME</div>
                <input className="comp-input" placeholder="e.g. worker042" value={nickname}
              onChange={(e) => setNickname(e.target.value)} style={{ fontSize: 14, marginTop: 4 }} />
                {nickname &&
              <div style={{ marginTop: 8, fontSize: 11, color: nickname.length >= 2 ? 'var(--primary)' : 'var(--neutral)' }}>
                    {nickname.length >= 2 ? 'Available' : 'At least 2 characters'}
                  </div>
              }
              </div>

              <div className="comp-card" style={{ padding: '10px 14px' }}>
                <div style={{ fontSize: 10.5, fontWeight: 700, color: 'var(--neutral)', letterSpacing: '.08em' }}>EMAIL</div>
                <input className="comp-input" placeholder="you@example.com" value={email}
              onChange={(e) => setEmail(e.target.value)} style={{ fontSize: 14, marginTop: 4 }} />
                <div style={{ marginTop: 8, fontSize: 11, color: 'var(--neutral)', lineHeight: 1.5 }}>Used to sign in and recover your account. Never shown publicly.

              </div>
              </div>

              <div style={{ padding: 12, borderRadius: 8, background: 'var(--bg)', border: '1px solid var(--line)', display: 'flex', gap: 10, alignItems: 'center' }}>
                <div style={{ width: 44, height: 44, borderRadius: '50%', background: 'var(--primary)', color: '#fff', display: 'grid', placeItems: 'center', fontWeight: 700, fontSize: 14 }}>
                  {(nickname || '??').slice(0, 2).toUpperCase()}
                </div>
                <div>
                  <div style={{ fontSize: 10.5, color: 'var(--neutral)', fontWeight: 700, letterSpacing: '.08em' }}>YOU'LL APPEAR AS</div>
                  <div style={{ fontSize: 14, fontWeight: 700, marginTop: 2 }}>{nickname || 'Anonymous_042'}</div>
                </div>
              </div>
            </div>
          }

          {/* Step 3 — Password */}
          {step === 3 && (() => {
            const rules = [
            { k: 'len', label: 'At least 8 characters', ok: pw.length >= 8 },
            { k: 'letter', label: 'Includes a letter (a–z, A–Z)', ok: /[a-zA-Z]/.test(pw) },
            { k: 'number', label: 'Includes a number (0–9)', ok: /[0-9]/.test(pw) },
            { k: 'symbol', label: 'Includes a symbol (! @ # $ …)', ok: /[^a-zA-Z0-9]/.test(pw) }];

            return (
              <div style={{ marginTop: 22, display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div className="comp-card" style={{ padding: '10px 14px', display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 10.5, fontWeight: 700, color: 'var(--neutral)', letterSpacing: '.08em' }}>PASSWORD</div>
                  <input className="comp-input" type={showPw ? 'text' : 'password'} placeholder="Type your new password"
                    value={pw} onChange={(e) => setPw(e.target.value)} style={{ fontSize: 14, marginTop: 4 }} />
                </div>
                <button className="iconbtn" onClick={() => setShowPw((s) => !s)}>{showPw ? <Icon.eyeOff size={18} /> : <Icon.eye size={18} />}</button>
              </div>

              {/* Live checklist of concrete rules */}
              <div style={{ padding: '10px 14px', borderRadius: 8, background: 'var(--bg)', border: '1px solid var(--line)', display: 'flex', flexDirection: 'column', gap: 6 }}>
                <div style={{ fontSize: 10.5, fontWeight: 700, color: 'var(--neutral)', letterSpacing: '.08em', marginBottom: 2 }}>YOUR PASSWORD MUST</div>
                {rules.map((r) =>
                  <div key={r.k} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <div style={{
                      width: 16, height: 16, borderRadius: '50%',
                      background: r.ok ? 'var(--primary)' : 'var(--line)',
                      color: r.ok ? '#fff' : 'var(--neutral-soft)',
                      display: 'grid', placeItems: 'center', flexShrink: 0
                    }}>
                      <Icon.check size={10} />
                    </div>
                    <span style={{ fontSize: 12, color: r.ok ? 'var(--ink)' : 'var(--ink-soft)', fontWeight: r.ok ? 600 : 500 }}>
                      {r.label}
                    </span>
                  </div>
                  )}
              </div>

              <div className="comp-card" style={{ padding: '10px 14px' }}>
                <div style={{ fontSize: 10.5, fontWeight: 700, color: 'var(--neutral)', letterSpacing: '.08em' }}>CONFIRM PASSWORD</div>
                <input className="comp-input" type={showPw ? 'text' : 'password'} placeholder="Re-enter password"
                  value={pw2} onChange={(e) => setPw2(e.target.value)} style={{ fontSize: 14, marginTop: 4 }} />
                {pw2 &&
                  <div style={{ marginTop: 6, fontSize: 11, color: pw === pw2 ? 'var(--primary)' : 'var(--danger)' }}>
                    {pw === pw2 ? 'Passwords match' : 'Passwords do not match'}
                  </div>
                  }
              </div>
            </div>);

          })()}

          {/* Step 4 — Nationality dropdown */}
          {step === 4 &&
          <div style={{ marginTop: 22 }}>
              <div className="comp-label">Nationality</div>
              <button onClick={() => setNatOpen((o) => !o)}
            style={{ width: '100%', padding: '14px 16px', borderRadius: 14, background: '#fff', border: nationality ? '2px solid var(--primary)' : '2px solid var(--line)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  {selectedNat ?
                <>
                      <Flag cc={selectedNat.cc} size={18}/>
                      <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--ink)' }}>{selectedNat.n}</span>
                    </> :

                <span style={{ fontSize: 14, color: 'var(--neutral)', fontWeight: 500 }}>Select your nationality</span>
                }
                </span>
                <Icon.chev size={16} style={{ transform: natOpen ? 'rotate(180deg)' : 'none', transition: 'transform .2s', color: 'var(--neutral)' }} />
              </button>

              {natOpen &&
            <div style={{ marginTop: 8, padding: 6, background: '#fff', borderRadius: 14, border: '1px solid var(--line)', maxHeight: 360, overflowY: 'auto', boxShadow: 'var(--shadow-sm)' }}>
                  {[...NATIONS].sort((a,b)=>a.n.localeCompare(b.n)).map((n) =>
              <button key={n.k} onClick={() => {setNationality(n.k);setNatOpen(false);}}
              style={{ width: '100%', padding: '12px 14px', borderRadius: 10, background: nationality === n.k ? 'var(--primary-50)' : 'transparent', display: 'flex', alignItems: 'center', gap: 12, textAlign: 'left', transition: 'background .12s' }}>
                        <Flag cc={n.cc} size={18}/>
                        <span style={{ flex: 1, fontSize: 14, fontWeight: 600, color: nationality === n.k ? 'var(--primary)' : 'var(--ink)' }}>{n.n}</span>
                        {nationality === n.k && <Icon.check size={16} style={{ color: 'var(--primary)' }} />}
                      </button>
              )}
                </div>
            }
            </div>
          }

          {/* Step 5 — Language dropdown + terms */}
          {step === 5 &&
          <div style={{ marginTop: 22, display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div>
                <div className="comp-label">Preferred language</div>
                <button onClick={() => setLangOpen((o) => !o)}
              style={{ width: '100%', padding: '14px 16px', borderRadius: 14, background: '#fff', border: language ? '2px solid var(--primary)' : '2px solid var(--line)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 2 }}>
                    {selectedLang ?
                  <>
                        <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--ink)' }}>{selectedLang.native}</span>
                        <span style={{ fontSize: 11, color: 'var(--neutral)' }}>{selectedLang.n}</span>
                      </> :

                  <span style={{ fontSize: 14, color: 'var(--neutral)', fontWeight: 500 }}>Select a language</span>
                  }
                  </span>
                  <Icon.chev size={16} style={{ transform: langOpen ? 'rotate(180deg)' : 'none', transition: 'transform .2s', color: 'var(--neutral)' }} />
                </button>

                {langOpen &&
              <div style={{ marginTop: 8, padding: 6, background: '#fff', borderRadius: 14, border: '1px solid var(--line)', maxHeight: 320, overflowY: 'auto', boxShadow: 'var(--shadow-sm)' }}>
                    {LANGS.map((l) =>
                <button key={l.k} onClick={() => {setLanguage(l.k);setLangOpen(false);}}
                style={{ width: '100%', padding: '12px 14px', borderRadius: 10, background: language === l.k ? 'var(--primary-50)' : 'transparent', display: 'flex', alignItems: 'center', gap: 12, textAlign: 'left' }}>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontSize: 14, fontWeight: 700, color: language === l.k ? 'var(--primary)' : 'var(--ink)' }}>{l.native}</div>
                          <div style={{ fontSize: 11, color: 'var(--neutral)', marginTop: 1 }}>{l.n}</div>
                        </div>
                        {language === l.k && <Icon.check size={16} style={{ color: 'var(--primary)' }} />}
                      </button>
                )}
                  </div>
              }
              </div>

              <div style={{ padding: 14, borderRadius: 14, background: '#fff', border: '1px solid var(--line)', display: 'flex', flexDirection: 'column', gap: 10 }}>
                <div style={{ fontSize: 13, fontWeight: 700 }}>Your privacy is protected</div>
                {[
              'Posts are anonymous by default',
              'AI risk signals are shown only to you',
              'Your identity is never shared with employers'].
              map((line, i) =>
              <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                    <div style={{ width: 20, height: 20, borderRadius: '50%', background: 'var(--primary-50)', color: 'var(--primary)', display: 'grid', placeItems: 'center', flexShrink: 0, marginTop: 1 }}>
                      <Icon.check size={12} />
                    </div>
                    <span style={{ fontSize: 12.5, color: 'var(--ink-soft)', lineHeight: 1.5 }}>{line}</span>
                  </div>
              )}
              </div>

              <label style={{ display: 'flex', gap: 10, alignItems: 'flex-start', padding: '4px 2px', cursor: 'pointer' }}>
                <input type="checkbox" checked={agree} onChange={(e) => setAgree(e.target.checked)} style={{ marginTop: 3 }} />
                <span style={{ fontSize: 12, color: 'var(--ink-soft)', lineHeight: 1.5 }}>
                  I agree to the <a style={{ color: 'var(--primary)', fontWeight: 600 }}>Terms of Service</a> and <a style={{ color: 'var(--primary)', fontWeight: 600 }}>Privacy Policy</a>.
                </span>
              </label>
            </div>
          }
        </div>
      </div>

      <div className="composer-footer">
        {step > 1 && <button className="btn ghost" onClick={prev}>Back</button>}
        <button className={`btn ${canNext ? 'primary' : 'soft'}`} style={{ flex: 1 }} onClick={next} disabled={!canNext}>
          {step === TOTAL ? 'Join GachiWork' : 'Next'}
        </button>
      </div>
    </Chrome>);

};

Object.assign(window, { Landing, Login, Signup });