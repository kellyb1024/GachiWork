/* ===== Explore — search-driven hub: my groups, hot topics, search ===== */
const BoardsHub = ({ onTab, onOpenBoard }) => {
  const [q, setQ] = useState('');
  const [createOpen, setCreateOpen] = useState(false);

  // Joined state (mock)
  const JOINED_INDUSTRIES = ['manufacturing'];
  const JOINED_SUBGROUPS = ['sg_eps2025'];

  const SUBGROUPS = [
    { k: 'sg_eps2025', industry: 'manufacturing', label: 'EPS renewal 2025', desc: 'Visa renewal cohort — share docs & timing tips', members: '342', today: 8 },
    { k: 'sg_ansan_night', industry: 'manufacturing', label: 'Ansan night-shift', desc: 'Late-shift workers — schedule, dorm, transport', members: '180', today: 5 },
    { k: 'sg_autoparts', industry: 'manufacturing', label: 'Auto-parts factories', desc: 'Parts manufacturing — wages, safety, training', members: '620', today: 11 },
    { k: 'sg_chemcert', industry: 'manufacturing', label: 'New chemical safety cert', desc: 'Discussing the 2026 mandatory cert', members: '94', today: 14 },
  ];

  const COUNTRY_BOARDS = [
    { cc: 'id', code: 'ID', label: 'Indonesia', members: '1,902', today: 24 },
    { cc: 'vn', code: 'VN', label: 'Vietnam', members: '3,820', today: 62 },
    { cc: 'ph', code: 'PH', label: 'Philippines', members: '1,470', today: 19 },
    { cc: 'th', code: 'TH', label: 'Thailand', members: '640', today: 6 },
    { cc: 'mm', code: 'MM', label: 'Myanmar', members: '2,140', today: 38 },
    { cc: 'kh', code: 'KH', label: 'Cambodia', members: '980', today: 11 },
    { cc: 'la', code: 'LA', label: 'Laos', members: '180', today: 2 },
    { cc: 'tl', code: 'TL', label: 'Timor-Leste', members: '140', today: 1 },
    { cc: 'np', code: 'NP', label: 'Nepal', members: '820', today: 9 },
    { cc: 'lk', code: 'LK', label: 'Sri Lanka', members: '420', today: 4 },
    { cc: 'bd', code: 'BD', label: 'Bangladesh', members: '380', today: 5 },
    { cc: 'pk', code: 'PK', label: 'Pakistan', members: '310', today: 3 },
    { cc: 'mn', code: 'MN', label: 'Mongolia', members: '520', today: 7 },
    { cc: 'uz', code: 'UZ', label: 'Uzbekistan', members: '460', today: 6 },
    { cc: 'kg', code: 'KG', label: 'Kyrgyzstan', members: '190', today: 2 },
    { cc: 'cn', code: 'CN', label: 'China', members: '710', today: 8 },
  ];

  const INDUSTRY_BOARDS = INDUSTRIES.map((ind, i) => ({
    key: ind.key, label: ind.label, industry: ind,
    members: ['12,482', '4,128', '2,840', '6,920'][i] || '1,200',
    today: [42, 8, 15, 27][i] || 5,
  }));

  // Hot topics (hashtag-style trending)
  const HOT_TOPICS = [
    { tag: 'unpaidwages', label: 'Unpaid wages', posts: 142, trending: true },
    { tag: 'dorm', label: 'Dorm fees', posts: 98, trending: true },
    { tag: 'epsrenewal', label: 'EPS renewal', posts: 76, trending: true },
    { tag: 'safetycert', label: 'Safety cert 2026', posts: 54, trending: false },
    { tag: 'mealfee', label: 'Meal deductions', posts: 42, trending: false },
    { tag: 'visa', label: 'Visa & status', posts: 38, trending: false },
    { tag: 'health', label: 'Sunday clinics', posts: 31, trending: false },
    { tag: 'translation', label: 'Translation help', posts: 24, trending: false },
  ];

  const query = q.trim().toLowerCase();
  const isSearching = query.length > 0;
  const match = (label) => !query || label.toLowerCase().includes(query);

  // Search results, grouped
  const sIndustries = isSearching ? INDUSTRY_BOARDS.filter(b => match(b.label)) : [];
  const sSubgroups = isSearching ? SUBGROUPS.filter(s => match(s.label) || match(s.desc)) : [];
  const sTopics = isSearching ? HOT_TOPICS.filter(t => match(t.label) || match(t.tag)) : [];
  const sCountries = isSearching ? COUNTRY_BOARDS.filter(b => match(b.label) || match(b.code)) : [];
  const totalResults = sIndustries.length + sSubgroups.length + sTopics.length + sCountries.length;

  return (
    <Chrome active="boards" onTab={onTab}>
      <TopNav title="Explore" />

      <div className="scroll pad-bottom" style={{ background: '#F5F7FB' }}>
        {/* Search */}
        <div style={{ padding: '12px 14px 0' }}>
          <div className="bh-search">
            <Icon.search size={14} />
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search groups, #topics, countries..." />
            {q && (
              <button className="bh-search-clear" onClick={() => setQ('')} aria-label="clear">
                <Icon.close size={12} />
              </button>
            )}
          </div>
        </div>

        {isSearching ? (
          <>
            <div className="bh-results-meta">
              {totalResults} {totalResults === 1 ? 'result' : 'results'} for "{q}"
            </div>

            {sTopics.length > 0 && (
              <>
                <div className="bh-section-title">Topics</div>
                <div className="bh-topic-grid">
                  {sTopics.map(t => (
                    <button key={t.tag} className="bh-topic-chip">
                      <span className="bh-topic-hash">#</span>
                      <span className="bh-topic-label">{t.label}</span>
                      <span className="bh-topic-count">{t.posts}</span>
                    </button>
                  ))}
                </div>
              </>
            )}

            {sIndustries.length > 0 && (
              <>
                <div className="bh-section-title">Industries</div>
                <div className="bh-list">
                  {sIndustries.map(b => (
                    <BoardCard key={b.key} board={b} joined={JOINED_INDUSTRIES.includes(b.key)} onOpen={() => onOpenBoard(b.key)} />
                  ))}
                </div>
              </>
            )}

            {sSubgroups.length > 0 && (
              <>
                <div className="bh-section-title">Subgroups</div>
                <div className="bh-list">
                  {sSubgroups.map(s => (
                    <SubgroupCard key={s.k} sg={s} joined={JOINED_SUBGROUPS.includes(s.k)} onOpen={() => onOpenBoard(s.industry)} />
                  ))}
                </div>
              </>
            )}

            {sCountries.length > 0 && (
              <>
                <div className="bh-section-title">Countries</div>
                <div className="bh-list" style={{ paddingBottom: 24 }}>
                  {sCountries.map(b => (
                    <CountryFilterCard key={b.cc} board={b} />
                  ))}
                </div>
              </>
            )}

            {totalResults === 0 && (
              <div className="bh-empty" style={{ margin: '20px 14px', textAlign: 'center' }}>
                No matches for "{q}". Try a different keyword or create a new subgroup.
              </div>
            )}
          </>
        ) : (
          <>
            {/* === My groups === */}
            <div className="bh-section-title">My groups</div>
            <div className="bh-list">
              {INDUSTRY_BOARDS.filter(b => JOINED_INDUSTRIES.includes(b.key)).map(b => (
                <BoardCard key={b.key} board={b} joined onOpen={() => onOpenBoard(b.key)} />
              ))}
              {SUBGROUPS.filter(s => JOINED_SUBGROUPS.includes(s.k)).map(s => (
                <SubgroupCard key={s.k} sg={s} joined onOpen={() => onOpenBoard(s.industry)} />
              ))}
            </div>

            {/* === Hot topics === */}
            <div className="bh-section-title">
              <span style={{display:'inline-flex',alignItems:'center',gap:6}}>
                <Icon.flame size={15} style={{color:'var(--secondary)'}}/>
                <span>Hot topics</span>
              </span>
            </div>
            <div className="bh-topic-grid">
              {HOT_TOPICS.map(t => (
                <button key={t.tag} className="bh-topic-chip">
                  <span className="bh-topic-hash">#</span>
                  <span className="bh-topic-label">{t.label}</span>
                  <span className="bh-topic-count">{t.posts}</span>
                </button>
              ))}
            </div>

            {/* === Discover subgroups in your industry === */}
            <div className="bh-section-title">
              Subgroups in Manufacturing
              <button className="bh-action" onClick={() => setCreateOpen(true)}><Icon.plus size={12} /> Create</button>
            </div>
            <div className="bh-list" style={{ paddingBottom: 24 }}>
              {SUBGROUPS.filter(s => !JOINED_SUBGROUPS.includes(s.k) && s.industry === 'manufacturing').map(s => (
                <SubgroupCard key={s.k} sg={s} onOpen={() => onOpenBoard(s.industry)} />
              ))}
            </div>
          </>
        )}
      </div>

      {createOpen && <CreateSubgroupSheet onClose={() => setCreateOpen(false)} />}
    </Chrome>
  );
};

const BoardCard = ({ board, joined, onOpen }) =>
  <button className="bh-card" onClick={onOpen}>
    <div className="bh-card-icon" style={{ background: 'var(--primary-50)', color: 'var(--primary)' }}>
      <Icon.layers size={18} />
    </div>
    <div className="bh-card-body">
      <div className="bh-card-title">
        <h4>{board.label}</h4>
        {joined && <span className="bh-joined-pill">Joined</span>}
      </div>
      <p>{board.members} members · {board.today} new today</p>
    </div>
    <Icon.chev size={16} />
  </button>;

const SubgroupCard = ({ sg, joined, onOpen }) =>
  <button className="bh-card sg compact" onClick={onOpen}>
    <div className="bh-card-icon" style={{ background: '#EEF2FF', color: '#6366F1' }}>
      <Icon.tag size={14} />
    </div>
    <div className="bh-card-body">
      <div className="bh-card-title">
        <h4>{sg.label}</h4>
        {joined && <span className="bh-joined-pill">Joined</span>}
      </div>
      <p className="bh-sg-meta">{sg.members} · {sg.today} today</p>
    </div>
    <Icon.chev size={14} />
  </button>;

const CountryFilterCard = ({ board, joined }) =>
  <button className="bh-card">
    <div className="bh-card-icon" style={{ background: '#fff', border: '1px solid var(--line)' }}>
      <Flag cc={board.cc} size={20} />
    </div>
    <div className="bh-card-body">
      <div className="bh-card-title">
        <h4>{board.label}</h4>
        {joined && <span className="bh-joined-pill">Joined</span>}
      </div>
      <p>{board.members} members · {board.today} new today</p>
    </div>
    <Icon.chev size={16} />
  </button>;

const CreateSubgroupSheet = ({ onClose }) => {
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
  const [industry, setIndustry] = useState('manufacturing');
  return (
    <BottomSheet open={true} onClose={onClose} title="Create a subgroup">
      <div className="csg">
        <p className="csg-lead">Subgroups are focused spaces inside an industry. Anyone can join. You'll be the first moderator.</p>

        <div className="csg-field">
          <label>Industry</label>
          <div className="pill-picker" style={{ margin: '4px 0 0' }}>
            {INDUSTRIES.map((ind) =>
              <button key={ind.key} className={`p ${industry === ind.key ? 'on' : ''}`} onClick={() => setIndustry(ind.key)}>
                {ind.label}
              </button>
            )}
          </div>
        </div>

        <div className="csg-field">
          <label>Subgroup name</label>
          <div className="csg-input-row">
            <span className="csg-hash">#</span>
            <input value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Pyeongtaek dorm rentals" maxLength={32} />
          </div>
          <span className="csg-hint">{name.length}/32</span>
        </div>

        <div className="csg-field">
          <label>What's it for? <span className="csg-opt">(shown to people considering joining)</span></label>
          <textarea value={desc} onChange={(e) => setDesc(e.target.value)} placeholder="One or two sentences..." maxLength={140} />
          <span className="csg-hint">{desc.length}/140</span>
        </div>

        <div className="csg-rules">
          <div className="csg-rule"><Icon.check size={11} /> Be respectful — anonymity ≠ anonymity from rules</div>
          <div className="csg-rule"><Icon.check size={11} /> Keep posts on-topic to your subgroup</div>
          <div className="csg-rule"><Icon.check size={11} /> Posts in this subgroup also appear in the parent industry feed</div>
        </div>

        <button className={`btn primary block ${!name.trim() || !desc.trim() ? 'disabled' : ''}`} disabled={!name.trim() || !desc.trim()} onClick={onClose}>
          Create subgroup
        </button>
      </div>
    </BottomSheet>
  );
};

Object.assign(window, { BoardsHub });
