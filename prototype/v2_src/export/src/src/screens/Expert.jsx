/* ===== Expert connection screen ===== */
const Expert = ({ onBack }) => {
  const [toast, setToast] = useState(null);
  return (
    <Chrome hideTabs>
      <TopNav back onBack={onBack} title="Talk to an expert" lang={false}/>
      <div className="scroll">
        <div className="expert-hero">
          <div className="ic"><Icon.shield size={28}/></div>
          <h2>Free 1:1 anonymous consultation</h2>
          <p>Labor attorneys, lawyers, and Migrant Worker Support Center counselors —<br/>available in your language.</p>
        </div>

        <div className="expert-note">
          <div className="ic"><Icon.alert size={13}/></div>
          <p><strong>Anonymity guaranteed:</strong> You don't need to share your real name or company. All conversations are encrypted with AES-256.</p>
        </div>

        <div className="expert-list">
          {EXPERTS.map((e, i) => (
            <div key={i} className="expert-card">
              <div className="avatar lg" style={{ width:54, height:54, borderRadius:14, background: e.bg, fontSize:16 }}>{e.init}</div>
              <div className="info">
                <div className="name">
                  {e.name}
                  {e.online && <span className="pill">● Available now</span>}
                </div>
                <div className="title">{e.title}</div>
                <div className="meta">
                  <span className="m"><Icon.starFill size={12} style={{color:'#F59E0B'}}/> {e.rating}</span>
                  <span className="m">({e.reviews})</span>
                  <span className="m"><Icon.clock size={12}/> {e.price}</span>
                </div>
                <div className="langs">
                  {e.langs.map(l => <span key={l} className="l">{l}</span>)}
                </div>
                <div className="actions">
                  <button className="btn primary" onClick={()=>setToast('Connecting...')}>
                    <Icon.phone size={13}/> Call now
                  </button>
                  <button className="btn ghost" onClick={()=>setToast('Chat opened')}>
                    <Icon.comment size={13}/> Message
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div style={{padding:'4px 18px 30px', fontSize:11, color:'var(--neutral)', textAlign:'center', lineHeight:1.5}}>
          ※ Consultations are free; paid legal representation is only used if you opt in.<br/>
          Government partner organizations →
        </div>
      </div>
      {toast && <Toast msg={toast} onDone={()=>setToast(null)}/>}
    </Chrome>
  );
};

Object.assign(window, { Expert });
