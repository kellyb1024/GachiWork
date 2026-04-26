/* ===== App root — navigation + tweaks ===== */
const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "aiDisplay": "card",
  "evalStyle": "buttons",
  "composerLayout": "single",
  "entryScreen": "landing"
}/*EDITMODE-END*/;

const App = () => {
  const [route, setRoute] = useState({ name: 'landing' });
  const [history, setHistory] = useState([]);
  const [tweaks, setTweaks] = useState(TWEAK_DEFAULTS);
  const [tweaksOpen, setTweaksOpen] = useState(false);

  // Persist current screen so refresh keeps place
  useEffect(() => {
    try {
      const saved = localStorage.getItem('gw_route');
      if (saved) setRoute(JSON.parse(saved));
    } catch {}
  }, []);
  useEffect(() => {
    try { localStorage.setItem('gw_route', JSON.stringify(route)); } catch {}
  }, [route]);

  const go = (next) => {
    setHistory(h => [...h, route]);
    setRoute(next);
  };
  const back = () => {
    setHistory(h => {
      if (h.length === 0) { setRoute({ name: 'home' }); return h; }
      const last = h[h.length - 1];
      setRoute(last);
      return h.slice(0, -1);
    });
  };
  const goTab = (tab) => {
    setHistory([]);
    setRoute({ name: tab });
  };
  const openPost = (pid) => go({ name: 'post', pid });
  const openBoard = (bkey) => go({ name: 'board', bkey });
  const openCompose = () => go({ name: 'compose' });
  const openRisk = () => go({ name: 'risk' });
  const openExpert = () => go({ name: 'expert' });

  // Tweaks: wire edit-mode protocol
  useEffect(() => {
    const handler = (ev) => {
      const d = ev?.data;
      if (!d || typeof d !== 'object') return;
      if (d.type === '__activate_edit_mode') setTweaksOpen(true);
      else if (d.type === '__deactivate_edit_mode') setTweaksOpen(false);
    };
    window.addEventListener('message', handler);
    window.parent.postMessage({ type: '__edit_mode_available' }, '*');
    return () => window.removeEventListener('message', handler);
  }, []);

  const setTweak = (k, v) => {
    const next = { ...tweaks, [k]: v };
    setTweaks(next);
    window.parent.postMessage({ type: '__edit_mode_set_keys', edits: { [k]: v } }, '*');
  };

  // Reset button
  useEffect(() => {
    const btn = document.getElementById('resetBtn');
    if (btn) btn.onclick = () => { setHistory([]); setRoute({ name: 'landing' }); };
  }, []);

  // ---------- render route ----------
  let view;
  const { name } = route;
  if (name === 'landing') {
    view = <Landing onGetStarted={() => { setHistory([]); setRoute({ name:'signup' }); }}
                    onLogin={() => { setHistory([]); setRoute({ name:'login' }); }} />;
  } else if (name === 'login') {
    view = <Login onBack={() => setRoute({ name:'landing' })}
                  onSignup={() => setRoute({ name:'signup' })}
                  onDone={() => { setHistory([]); setRoute({ name:'home' }); }} />;
  } else if (name === 'signup') {
    view = <Signup onBack={() => setRoute({ name:'landing' })}
                   onDone={() => { setHistory([]); setRoute({ name:'home' }); }} />;
  } else if (name === 'home') {
    view = <Home onTab={goTab} onOpenPost={openPost} onOpenBoard={openBoard}
                 onCompose={openCompose} onOpenExpert={openExpert}
                 aiDisplay={tweaks.aiDisplay} />;
  } else if (name === 'search') {
    view = <Search onTab={goTab} onOpenBoard={openBoard} onOpenPost={openPost}/>;
  } else if (name === 'inbox') {
    view = <Inbox onTab={goTab} onOpenRisk={openRisk} onOpenPost={openPost}/>;
  } else if (name === 'profile') {
    view = <Profile onTab={goTab} onOpenPost={openPost}/>;
  } else if (name === 'compose') {
    view = <Composer onBack={back} onPublish={() => { setHistory([]); setRoute({ name:'post', pid:'p1' }); }}
                     layout={tweaks.composerLayout} />;
  } else if (name === 'post') {
    view = <PostDetail postId={route.pid} onBack={back}
                       onOpenRisk={openRisk} onOpenExpert={openExpert}
                       aiDisplay={tweaks.aiDisplay} evalStyle={tweaks.evalStyle} />;
  } else if (name === 'board') {
    view = <Board boardKey={route.bkey} onBack={back}
                  onOpenPost={openPost} onCompose={openCompose}/>;
  } else if (name === 'risk') {
    view = <RiskAlert onBack={back} onOpenExpert={openExpert}/>;
  } else if (name === 'expert') {
    view = <Expert onBack={back}/>;
  } else {
    view = <Landing onGetStarted={() => setRoute({ name:'signup' })} onLogin={() => setRoute({ name:'login' })} />;
  }

  return (
    <>
      <div className="app-root">{view}</div>
      {tweaksOpen && (
        <TweakPanel tweaks={tweaks} setTweak={setTweak}
          onClose={()=>{
            setTweaksOpen(false);
            // also tell the host to flip its toolbar toggle off
            try { window.parent.postMessage({ type: '__deactivate_edit_mode' }, '*'); } catch {}
          }}
          onNav={(n)=>{setHistory([]); setRoute(n);}}/>
      )}
    </>
  );
};

const TweakPanel = ({ tweaks, setTweak, onClose, onNav }) => {
  const opts = [
    { key:'aiDisplay', label:'AI answer display', values:[
        {v:'card', l:'Pinned card'}, {v:'inline', l:'Inline'}, {v:'section', l:'Separate section'}
      ]},
    { key:'evalStyle', label:'Evaluation UX', values:[
        {v:'buttons', l:'Helpful + Like'}, {v:'stars', l:'Stars'}, {v:'emoji', l:'Emoji reactions'}
      ]},
    { key:'composerLayout', label:'Composer layout', values:[
        {v:'single', l:'Single screen'}, {v:'step', l:'Step by step'}
      ]},
  ];
  return (
    <div className="tweak-panel">
      <div className="tweak-head">
        <span>Tweaks</span>
        <button onClick={onClose}>×</button>
      </div>
      <div className="tweak-body">
        {opts.map(o => (
          <div key={o.key} className="tweak-group">
            <label>{o.label}</label>
            <div className="tweak-options">
              {o.values.map(v => (
                <button key={v.v} className={tweaks[o.key]===v.v?'on':''} onClick={()=>setTweak(o.key, v.v)}>
                  {v.l}
                </button>
              ))}
            </div>
          </div>
        ))}
        <div className="tweak-group">
          <label>Jump to screen</label>
          <div className="tweak-options">
            <button onClick={()=>onNav({name:'landing'})}>Landing</button>
            <button onClick={()=>onNav({name:'login'})}>Login</button>
            <button onClick={()=>onNav({name:'signup'})}>Signup</button>
            <button onClick={()=>onNav({name:'home'})}>Home</button>
            <button onClick={()=>onNav({name:'compose'})}>Compose</button>
            <button onClick={()=>onNav({name:'post', pid:'p1'})}>Detail + AI</button>
            <button onClick={()=>onNav({name:'risk'})}>Risk alert</button>
            <button onClick={()=>onNav({name:'expert'})}>Experts</button>
            <button onClick={()=>onNav({name:'board', bkey:'manufacturing'})}>Board</button>
          </div>
        </div>
      </div>
    </div>
  );
};

ReactDOM.createRoot(document.getElementById('app')).render(<App/>);
