/* ===== Expert connection screen ===== */
const Expert = ({ onBack, onOpenChat }) => {
  const [toast, setToast] = useState(null);
  return (
    <Chrome hideTabs>
      <TopNav back onBack={onBack} title="Talk to an expert" lang={false} />
      <div className="scroll">
        <div className="expert-hero">
          <div className="ic"><Icon.shield size={28} /></div>
          <h2>1:1 anonymous consultation</h2>
          <p>Experts and Migrant Worker Support Center counselors —<br />available in your language.</p>
        </div>

        <div className="expert-note">
          <div className="ic"><Icon.alert size={13} /></div>
          <p><strong>Initial consultation is always free.</strong> Lawyers may charge if you formally hire them — they will tell you upfront. Counselors are always free.</p>
        </div>

        <div className="expert-list">
          {EXPERTS.map((e, i) =>
          <div key={i} className="expert-card">
              <div className="avatar lg" style={{ width: 54, height: 54, borderRadius: 14, background: 'var(--primary-700)', color: '#fff', display: 'grid', placeItems: 'center' }}>
                <Icon.user size={26} />
              </div>
              <div className="info">
                <div className="name">
                  {e.name}
                  <TrustLabel kind={e.kind || 'expert'} slim />
                  {e.online
                    ? <span className="status-dot">Active</span>
                    : <span className="status-dot off">Away</span>}
                </div>
                <div className="title">{e.title}</div>
                <div className="meta">
                  <span className="m"><Icon.starFill size={12} style={{ color: 'var(--primary)' }} /> {e.rating}</span>
                  <span className="m">({e.reviews})</span>
                  <span className="m"><Icon.clock size={12} /> {e.price}</span>
                </div>
                <div className="langs">
                  {e.langs.map((l) => <span key={l} className="l">{l}</span>)}
                </div>
                <div className="actions">
                  <button className="btn primary" onClick={() => setToast('Connecting...')}>
                    <Icon.phone size={13} /> Call now
                  </button>
                  <button className="btn ghost" onClick={() => onOpenChat ? onOpenChat() : setToast('Chat opened')}>
                    <Icon.comment size={13} /> Message
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      {toast && <Toast msg={toast} onDone={() => setToast(null)} />}
    </Chrome>);

};

Object.assign(window, { Expert });