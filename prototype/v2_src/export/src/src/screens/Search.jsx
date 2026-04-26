/* ===== Search / Explore ===== */
const Search = ({ onOpenBoard, onTab, onOpenPost }) => {
  const trending = [
    { t: 'Unpaid wage report process', sub: 'Manufacturing · +142 yesterday', ch: '+128%', up: true },
    { t: 'Typical dorm fee', sub: 'Manufacturing · Ansan', ch: '+45%', up: true },
    { t: 'Sunday clinics for foreigners', sub: 'Services · Pyeongtaek', ch: '+22%', up: true },
    { t: 'Agricultural leave rules', sub: 'Agriculture', ch: '-8%', up: false },
    { t: 'Visa renewal documents', sub: 'All', ch: '+12%', up: true },
  ];
  const recents = ['Unpaid wages', 'Dorm', 'Myanmar interpreter', 'Pyeongtaek clinic'];

  return (
    <Chrome active="search" onTab={onTab}>
      <TopNav logo />
      <div className="scroll pad-bottom">
        <div className="search-bar">
          <Icon.search size={16}/>
          <span>Search jobs, regions, situations...</span>
        </div>

        <div className="sec-title">Recent searches <a>Clear all</a></div>
        <div className="recent-chips">
          {recents.map(r => (
            <span key={r} className="r-chip"><Icon.clock size={11}/> {r} <span className="x">×</span></span>
          ))}
        </div>

        <div className="sec-title">Industry boards</div>
        <div className="top-boards">
          {INDUSTRIES.map((ind, i) => (
            <div key={ind.key} className="tb-item" onClick={()=>onOpenBoard(ind.key)}>
              <div className="tb-icon" style={{background: `${ind.hue}15`, color: ind.hue}}><Icon.briefcase size={16}/></div>
              <div className="tb-text">
                <h4>{ind.label}</h4>
                <p>{['12,482 members · 342 today','8,761 members · 201 today','3,902 members · 76 today','21,003 members · 512 today'][i]}</p>
              </div>
              <div className="tb-meta">
                <div className="num">#{i+1}</div>
                <div className="s"><span className="d"/> Active</div>
              </div>
            </div>
          ))}
        </div>

        <div className="sec-title">🔥 Trending topics</div>
        <div className="trend-list">
          {trending.map((t, i) => (
            <div key={i} className="trend-item">
              <span className="trend-num">#{i+1}</span>
              <div className="trend-body">
                <h4>{t.t}</h4>
                <p>{t.sub}</p>
              </div>
              <span className={`trend-ch ${t.up?'up':'dn'}`}>{t.ch}</span>
            </div>
          ))}
        </div>
      </div>
    </Chrome>
  );
};

Object.assign(window, { Search });
