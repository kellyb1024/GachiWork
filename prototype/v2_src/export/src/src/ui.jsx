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
          <img className="mk" src={window.__resources.gachiworkLogo} alt="GachiWork"/>
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
  const unreadCount = (typeof NOTIFS !== 'undefined')
    ? NOTIFS.filter(n => n.unread).length
    : 0;
  const tabs = [
    { k: 'home', label: 'Home', icon: Icon.home },
    { k: 'search', label: 'Explore', icon: Icon.search },
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
                boxShadow:'0 2px 6px -1px rgba(245,158,11,.55)'
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
      <span className="flag">{c.flag}</span>
      {showName && <span>{c.name}</span>}
    </span>
  );
};

/* Avatar with initials — same user ⇒ same color */
const avatarColor = (seed) => {
  const palette = [
    'linear-gradient(135deg,#60A5FA,#2563EB)',
    'linear-gradient(135deg,#F59E0B,#B45309)',
    'linear-gradient(135deg,#10B981,#047857)',
    'linear-gradient(135deg,#A78BFA,#6D28D9)',
    'linear-gradient(135deg,#F472B6,#BE185D)',
    'linear-gradient(135deg,#FB923C,#C2410C)',
    'linear-gradient(135deg,#34D399,#065F46)',
    'linear-gradient(135deg,#818CF8,#3730A3)',
  ];
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) % palette.length;
  return palette[h];
};
const Avatar = ({ user, size = 'sm', text }) => {
  const cls = `avatar ${size}`;
  if (!user) return <div className={cls} style={{ background: '#CBD5E1' }}>{text || '?'}</div>;
  const init = (user.name || '?').replace(/Anonymous_/, '').slice(0, 2).toUpperCase();
  return <div className={cls} style={{ background: avatarColor(user.id || user.name) }}>{text || init}</div>;
};

/* Industry tag (colored) */
const IndustryTag = ({ industryKey }) => {
  const ind = INDUSTRIES.find(i => i.key === industryKey);
  if (!ind) return null;
  return <span className={`tag ${ind.color}`}>{ind.label}</span>;
};

/* Trust temperature mini badge */
const TrustBadge = ({ value }) => {
  let color = 'var(--primary)', label = 'Trusted', icon = '🌡️';
  if (value >= 85) { color = 'var(--secondary)'; label = '🔥 Active'; }
  else if (value >= 60) { color = 'var(--tertiary-500)'; label = '✓ Verified'; }
  else if (value >= 40) { color = 'var(--primary)'; label = 'Stable'; }
  else { color = '#94A3B8'; label = 'New'; }
  return (
    <span className="trust-mini" style={{ color, background: 'transparent', padding: 0 }}>
      <span style={{ fontSize: 9, fontWeight: 700 }}>{label}</span>
      <span style={{ fontSize: 9, color: 'var(--neutral)', fontWeight: 600 }}>· {value}°</span>
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

Object.assign(window, { StatusBar, TopNav, TabBar, FlagChip, Avatar, IndustryTag, TrustBadge, Toast, BottomSheet, avatarColor });
