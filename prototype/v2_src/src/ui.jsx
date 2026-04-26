/* ===== Shared UI primitives ===== */
const { useState, useEffect, useRef, useMemo, useContext, createContext } = React;

/* Status bar removed — rely on the OS status bar */
const StatusBar = () => null;

const TopNav = ({ title, back, onBack, right, logo, lang = true, style }) => (
  <div className="topnav" style={style}>
    <div className="left">
      {back ? (
        <button className="back" onClick={onBack} aria-label="back"><Icon.back size={18} /></button>
      ) : logo ? (
        <div className="logo">
          <img className="mk" src={(typeof window!=='undefined'&&window.__GW_LOGO)||'assets/gachiwork-logo.png'} alt="GachiWork"/>
          <span>Gachi<em>Work</em></span>
        </div>
      ) : null}
    </div>
    {title && <h1>{title}</h1>}
    <div className="right">
      {right}
      {lang && (
        <button className="lang"><Icon.lang size={12} /> EN</button>
      )}
    </div>
  </div>
);

/* Bottom tab bar */
const TabBar = ({ active, onTab }) => {
  const notifUnread = (typeof NOTIFS !== 'undefined')
    ? NOTIFS.filter(n => n.unread).length
    : 0;
  const chatUnread = (typeof CHATS !== 'undefined')
    ? CHATS.reduce((n,c) => n + c.unread, 0)
    : 0;
  const unreadCount = notifUnread + chatUnread;
  const tabs = [
    { k: 'home', label: 'Home', icon: Icon.home },
    { k: 'boards', label: 'Explore', icon: Icon.compass },
    { k: 'inbox', label: 'Inbox', icon: Icon.inbox, badge: unreadCount },
    { k: 'profile', label: 'Profile', icon: Icon.user },
  ];
  return (
    <div className="tabbar">
      {tabs.map(t => (
        <button key={t.k} className={`tab ${active === t.k ? 'on' : ''}`} onClick={() => onTab(t.k)}>
          <span style={{position:'relative', display:'inline-block', lineHeight:0}}>
            <t.icon size={22} />
            {t.badge > 0 && (
              <span style={{
                position:'absolute', top:-5, right:-8,
                minWidth:16, height:16, padding:'0 4px', borderRadius:999,
                background:'var(--secondary)', color:'#fff',
                fontSize:10, fontWeight:800, letterSpacing:0,
                display:'inline-flex', alignItems:'center', justifyContent:'center',
                border:'2px solid #fff',
                boxShadow:'0 2px 6px -1px rgba(245,158,11,.5)'
              }}>{t.badge > 99 ? '99+' : t.badge}</span>
            )}
          </span>
          {t.label}
        </button>
      ))}
    </div>
  );
};

/* Flag chip */
const FlagChip = ({ countryKey, showName = false }) => {
  const c = COUNTRIES[countryKey];
  if (!c) return null;
  return (
    <span className="flag-chip">
      <span className={`fi fi-${c.cc}`} style={{display:'inline-block', width:18, height:14, borderRadius:2, backgroundSize:'cover', backgroundPosition:'center', boxShadow:'inset 0 0 0 1px rgba(0,0,0,.06)'}}/>
      {showName && <span>{c.name}</span>}
    </span>
  );
};

/* Flag — uses flag-icons library SVGs (works on every OS, no emoji rendering issues) */
const Flag = ({ cc, size = 14 }) => {
  if (!cc) return null;
  return (
    <span className={`fi fi-${String(cc).toLowerCase()}`} style={{
      display:'inline-block',
      width: Math.round(size * 4 / 3), height: size,
      borderRadius: 2,
      verticalAlign:'middle',
      flexShrink: 0,
      backgroundSize:'cover',
      backgroundPosition:'center',
      boxShadow: 'inset 0 0 0 1px rgba(0,0,0,.06)',
    }}/>
  );
};

/* Avatar — unified neutral profile color, person icon (no initials/digits) */
const avatarColor = () => 'var(--primary-50)';
const Avatar = ({ user, size = 'sm', text }) => {
  const cls = `avatar ${size}`;
  const sz = size === 'lg' ? 22 : size === 'md' ? 18 : 14;
  return (
    <div className={cls} style={{ background: 'var(--primary-50)', color: 'var(--primary)' }}>
      {text != null ? text : <Icon.user size={sz} />}
    </div>
  );
};

/* Industry tag — distinct treatment so 업종 stands out from topic hashtags */
const IndustryTag = ({ industryKey }) => {
  const ind = INDUSTRIES.find(i => i.key === industryKey);
  if (!ind) return null;
  return <span className="tag industry">{ind.label}</span>;
};

/* Trust temperature mini badge — number only */
const TrustBadge = ({ value }) => (
  <span className="trust-mini" style={{ color: 'var(--neutral)', background: 'transparent', padding: 0, fontSize: 10, fontWeight: 700 }}>
    {value}°
  </span>
);

/* Trust Label — official | expert | peer | ai (brand kit canonical) */
const TrustLabel = ({ kind = 'peer', slim = false, children }) => {
  const map = {
    official: { text: 'OFFICIAL', icon: Icon.shieldCheck },
    expert:   { text: 'EXPERT',   icon: Icon.verified },
    peer:     { text: 'PEER',     icon: Icon.users },
    ai:       { text: 'AI',       icon: Icon.sparkle },
  };
  const m = map[kind];
  const Ic = m.icon;
  return (
    <span className={`tlabel ${kind}${slim ? ' slim' : ''}`}>
      <Ic size={10} />
      {children || m.text}
    </span>
  );
};

/* Toast */
const Toast = ({ msg, onDone }) => {
  useEffect(() => {
    const t = setTimeout(onDone, 2200);
    return () => clearTimeout(t);
  }, []);
  return (
    <div className="toast">
      <Icon.checkCircle size={14} /> {msg}
    </div>
  );
};

/* Bottom Sheet */
const BottomSheet = ({ open, onClose, title, children }) => {
  if (!open) return null;
  return (
    <>
      <div className="sheet-backdrop" onClick={onClose} />
      <div className="sheet">
        <div className="sheet-grab" />
        {title && <h3 style={{padding:'4px 4px 10px'}}>{title}</h3>}
        {children}
      </div>
    </>
  );
};

Object.assign(window, { StatusBar, TopNav, TabBar, FlagChip, Flag, Avatar, IndustryTag, TrustBadge, TrustLabel, Toast, BottomSheet, avatarColor });
