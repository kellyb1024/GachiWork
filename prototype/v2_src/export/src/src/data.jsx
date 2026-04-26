/* ===== Seed data for the prototype ===== */

const COUNTRIES = {
  VN: { flag: '🇻🇳', name: 'Vietnam', code: 'vi', color: 'linear-gradient(135deg,#EF4444,#DC2626)' },
  MM: { flag: '🇲🇲', name: 'Myanmar', code: 'my', color: 'linear-gradient(135deg,#F59E0B,#B45309)' },
  NP: { flag: '🇳🇵', name: 'Nepal',   code: 'ne', color: 'linear-gradient(135deg,#B91C1C,#7F1D1D)' },
  ID: { flag: '🇮🇩', name: 'Indonesia', code: 'id', color: 'linear-gradient(135deg,#EF4444,#FFFFFF)' },
  PH: { flag: '🇵🇭', name: 'Philippines', code: 'tl', color: 'linear-gradient(135deg,#2563EB,#DC2626)' },
  KH: { flag: '🇰🇭', name: 'Cambodia', code: 'km', color: 'linear-gradient(135deg,#1D4ED8,#DC2626)' },
  TH: { flag: '🇹🇭', name: 'Thailand', code: 'th', color: 'linear-gradient(135deg,#DC2626,#1E40AF)' },
  KR: { flag: '🇰🇷', name: 'Korea',   code: 'ko', color: 'linear-gradient(135deg,#1E40AF,#DC2626)' },
};

const INDUSTRIES = [
  { key: 'manufacturing', label: 'Manufacturing', labelEn: 'Manufacturing', color: 'blue', hue: 'var(--primary)' },
  { key: 'agriculture',   label: 'Agriculture', labelEn: 'Agriculture', color: 'orange', hue: 'var(--secondary)' },
  { key: 'fisheries',     label: 'Fisheries', labelEn: 'Fisheries', color: 'green', hue: '#10B981' },
  { key: 'services',      label: 'Services', labelEn: 'Services', color: 'purple', hue: '#7C3AED' },
];

const TOPICS = [
  { key: 'dorm', label: 'Dormitory' }, { key: 'wage', label: 'Wages' }, { key: 'overtime', label: 'Overtime' },
  { key: 'visa', label: 'Visa' }, { key: 'safety', label: 'Safety' }, { key: 'health', label: 'Health' },
  { key: 'housing', label: 'Housing' }, { key: 'lang', label: 'Language' }, { key: 'law', label: 'Law' },
];

const REGIONS = [
  'Ansan','Siheung','Pyeongtaek','Cheonan','Incheon','Gimpo','Cheongju','Busan','Gwangju','Suwon','Hwaseong','Pohang'
];

const POSTS = [
  {
    id: 'p1',
    industry: 'manufacturing',
    origLang: 'MM',
    translated: true,
    postType: 'question',
    riskSignal: true,
    titleKo: "I haven't been paid for 3 months. Is this normal?",
    titleOrig: 'လခ ၃ လ မရှိသေးဘူး. ဒါ ပုံမှန်လား?',
    bodyKo: "I'm a 2nd-year E-9 worker from Myanmar, working at a plastics factory in Incheon. My boss keeps saying \"I'll pay at the end of this month\" but 3 months have passed with no wages. My coworkers are in the same situation. What should I do? I'm afraid that if I complain, he won't renew my visa.",
    bodyOrig: 'ကျွန်တော်က မြန်မာနိုင်ငံမှ E-9 အလုပ်သမား...',
    author: { id: 'u_mz_042', name: 'Anonymous_042', country: 'MM', industry: 'manufacturing', region: 'Incheon', trust: 62 },
    tags: ['wage','law'],
    time: '23m ago',
    comments: 18,
    likes: 34,
    saved: 12,
    translationSource: 'Myanmar → English (auto-translated)',
  },
  {
    id: 'p2',
    industry: 'manufacturing',
    origLang: 'VN',
    translated: true,
    postType: 'question',
    titleKo: 'Dorm deduction ₩300,000 — is this normal?',
    titleOrig: 'Khấu trừ ký túc xá 300.000 won - có bình thường không?',
    bodyKo: "I work at an auto-parts factory in Ansan. They deduct ₩300,000 for dorm from my salary each month, but my friends seem to pay less. What's the typical amount? Meal fees are another ₩50,000 on top.",
    author: { id: 'u_vn_187', name: 'Anonymous_187', country: 'VN', industry: 'manufacturing', region: 'Ansan', trust: 78 },
    tags: ['dorm'],
    time: '2h ago',
    comments: 24,
    likes: 56,
    saved: 8,
  },
  {
    id: 'p3',
    industry: 'agriculture',
    origLang: 'NP',
    translated: true,
    postType: 'question',
    titleKo: 'Dorm rules are Korean-only. Can anyone translate?',
    titleOrig: 'छात्रावास नियम कोरियन मा मात्र छ. अनुवाद गर्न सक्ने?',
    bodyKo: "I work on a farm in Cheongju. The boss handed me new dorm rules on paper — it's only in Korean. There seem to be penalty clauses but I don't know exactly what they say. Can anyone translate into Nepali or English?",
    author: { id: 'u_np_532', name: 'Anonymous_532', country: 'NP', industry: 'agriculture', region: 'Cheongju', trust: 45 },
    tags: ['dorm','lang'],
    time: '5h ago',
    comments: 7,
    likes: 12,
    saved: 3,
  },
  {
    id: 'p4',
    industry: 'services',
    origLang: 'KH',
    translated: true,
    postType: 'experience',
    titleKo: 'Sharing Sunday-open clinics in Pyeongtaek',
    bodyKo: "For people working around Pyeongtaek — here's a list of foreigner-friendly clinics open on Sundays. I've been to all of them personally.",
    author: { id: 'u_kh_841', name: 'Anonymous_841', country: 'KH', industry: 'services', region: 'Pyeongtaek', trust: 88 },
    tags: ['health'],
    time: '1d ago',
    comments: 11,
    likes: 47,
    saved: 29,
  },
  {
    id: 'p5',
    industry: 'manufacturing',
    origLang: 'VN',
    translated: true,
    postType: 'question',
    titleKo: 'Anyone needs the new Ansan safety training cert?',
    bodyKo: "I heard there's a new safety certification required for manufacturing in the Ansan industrial complex. Has anyone gotten it? Does the company cover the cost?",
    author: { id: 'u_vn_992', name: 'Anonymous_992', country: 'VN', industry: 'manufacturing', region: 'Ansan', trust: 54 },
    tags: ['safety'],
    time: '12m ago',
    comments: 14,
    likes: 5,
    saved: 2,
  },
];

/* AI-generated answer payload */
const AI_ANSWERS = {
  p1: {
    summary: '3 months of unpaid wages is a serious violation of the Labor Standards Act. Immediate action is recommended. Visa renewal and wage claims are handled separately, and retaliation for filing a complaint is prohibited by law.',
    rag: [
      '14 similar cases are on record in the community. 12 of them were resolved within 1–2 months after reporting to the Ministry of Employment & Labor.',
      'A Myanmar worker shared last month that the Migrant Worker Support Center helped them resolve the exact same issue.',
    ],
    sop: [
      { title: 'Labor Standards Act §36 (Settlement of Money and Valuables)', desc: "When a worker dies or resigns, the employer must pay all wages, severance, and other money within 14 days of the cause of payment arising." },
      { title: 'Labor Standards Act §43 (Payment of Wages)', desc: 'Wages must be paid at least once a month on a fixed date, in currency, directly and in full to the worker.' },
    ],
    sources: [
      { label: 'Ministry of Employment & Labor', title: 'Guide to reporting unpaid wages', meta: '2025 revision' },
      { label: 'Migrant Worker Support Center', title: 'Myanmar-language counseling guide', meta: '15 regions' },
    ],
  },
  p2: {
    summary: 'A ₩300,000/month dorm deduction is on the high side. Based on community data, average dorm fees in capital-region manufacturing sit at ₩150,000–250,000/month. Whether the deduction is unfair depends on your contract and the actual facility.',
    rag: [
      'Shared data from 42 manufacturing workers in the same region (Ansan): average dorm fee ₩220,000/month, meals ₩80,000/month.',
      '6 of 8 Vietnamese workers successfully renegotiated to lower the amount.',
    ],
    sop: [
      { title: 'Foreign Worker Room & Board Deduction Guidelines (MoEL Notice)', desc: 'Room & board charges cannot exceed a set ratio of ordinary wages and may not be deducted without written consent. For apartment-style dorms the cap is 14–18%/month.' },
    ],
    sources: [
      { label: 'MoEL Notice', title: 'Foreign worker room & board deduction standards', meta: 'No. 2017-2' },
    ],
  },
  p5: {
    summary: 'Starting January 2026, manufacturers handling chemicals in the Ansan area must complete a new safety certification. Per the Occupational Safety and Health Act, the cost must be borne by the employer.',
    rag: [
      '28 manufacturing workers in Ansan reported obtaining the certification in the last 2 months — all were company-funded.',
    ],
    sop: [
      { title: 'Occupational Safety and Health Act §31 (Safety Education)', desc: 'Employers must provide regular safety and health education to their workers, and the cost is borne by the employer.' },
    ],
    sources: [
      { label: 'KOSHA', title: 'Chemical handler training guide', meta: '2026' },
    ],
  },
};

/* Peer comments */
const COMMENTS = {
  p1: [
    {
      id: 'c1', author: { name: 'Anonymous_187', country: 'VN', industry: 'manufacturing', region: 'Ansan', trust: 78 },
      origLang: 'VN',
      bodyKo: "I had a similar issue last year. You can file online at the Ministry of Employment & Labor website. I got all my back pay within 3 weeks. Make sure to collect evidence (contract, KakaoTalk chats, etc.).",
      bodyOrig: 'Tôi cũng gặp tình trạng tương tự năm ngoái...',
      time: '12m ago', likes: 24, helpful: 18, replies: [
        {
          id: 'c1r1', author: { name: 'Anonymous_042', country: 'MM', industry: 'manufacturing', region: 'Incheon', trust: 62 },
          origLang: 'MM',
          bodyKo: 'Thank you. The MoEL site is Korean-only — is there somewhere I can get help?',
          time: '8m ago', likes: 3, helpful: 0,
        },
        {
          id: 'c1r2', author: { name: 'Anonymous_187', country: 'VN', industry: 'manufacturing', region: 'Ansan', trust: 78 },
          origLang: 'VN',
          bodyKo: 'Call the Migrant Worker Support Center at 1577-0071 — they connect you to a Myanmar-language interpreter. It\'s free.',
          time: '5m ago', likes: 12, helpful: 9,
        },
      ]
    },
    {
      id: 'c2', author: { name: 'Anonymous_532', country: 'NP', industry: 'agriculture', region: 'Cheongju', trust: 45 },
      origLang: 'NP', bodyKo: "Filing a complaint doesn't affect your visa — those are separate. If the boss refuses to renew, that's also reportable. Don't be afraid.",
      time: '32m ago', likes: 14, helpful: 11, replies: [],
    },
    {
      id: 'c3', author: { name: 'Anonymous_305', country: 'ID', industry: 'manufacturing', region: 'Gimpo', trust: 71 },
      origLang: 'ID', bodyKo: 'In my case, just missing the payday written in the contract was enough to count as a violation. Double-check your contract.',
      time: '1h ago', likes: 8, helpful: 7, replies: [],
    },
  ],
  p2: [
    {
      id: 'c1', author: { name: 'Anonymous_091', country: 'KH', industry: 'manufacturing', region: 'Ansan', trust: 88 },
      origLang: 'KH', bodyKo: "Our dorm is ₩150,000. ₩300,000 is definitely on the high side. Ask the boss for the breakdown, or look into another factory.",
      time: '1h ago', likes: 28, helpful: 22, replies: []
    },
    {
      id: 'c2', author: { name: 'Anonymous_118', country: 'MM', industry: 'manufacturing', region: 'Ansan', trust: 56 },
      origLang: 'MM', bodyKo: "I'm also in Ansan and I pay ₩200,000. It depends on the dorm condition, but ₩300,000 sounds expensive.",
      time: '45m ago', likes: 16, helpful: 12, replies: []
    },
  ],
};

/* Expert directory (mock) */
const EXPERTS = [
  { name: 'Minjeong Kim, Labor Attorney', title: 'Migrant worker specialist · 13 yrs', rating: 4.9, reviews: 142, price: 'Initial consult free', langs: ['한국어','English','Tiếng Việt'], bg: 'linear-gradient(135deg,#60A5FA,#2563EB)', init: 'MK', online: true },
  { name: 'Junho Park, Lawyer', title: 'Labor litigation · Unpaid wages · Injury', rating: 4.8, reviews: 89, price: 'Initial consult free', langs: ['한국어','English','မြန်မာ'], bg: 'linear-gradient(135deg,#F59E0B,#B45309)', init: 'JP', online: true },
  { name: 'Sujin Lee, Counselor', title: 'Migrant Worker Support Center', rating: 5.0, reviews: 311, price: 'Completely free', langs: ['한국어','Bahasa','ภาษาไทย'], bg: 'linear-gradient(135deg,#10B981,#047857)', init: 'SL', online: false },
];

/* Notifications */
const NOTIFS = [
  { id: 'n0', kind: 'risk', title: '⚠️ Risk signal detected — private notice', body: "AI analysis flagged your situation as 'unpaid wages'. Here's what you can do.", time: '3m ago', unread: true, linkTo: 'risk' },
  { id: 'n1', kind: 'comment', title: 'Anonymous_187 replied to your post', body: 'I had a similar issue last year. You can file online at the Ministry of...', time: '12m ago', unread: true, linkTo: 'post:p1' },
  { id: 'n2', kind: 'ai', title: 'AI updated related legal cards', body: 'Labor Standards Act §36 · 2025 revision has been added.', time: '2h ago', unread: true, linkTo: 'post:p1' },
  { id: 'n3', kind: 'thanks', title: 'Anonymous_042 thanked your answer', body: "They tapped 'Helpful'. Trust Temperature +3", time: '1d ago', unread: false },
  { id: 'n4', kind: 'comment', title: 'New reply from Anonymous_305', body: 'In my case, just missing the payday written in the contract...', time: '1d ago', unread: false },
];

const ME = {
  id: 'me',
  name: 'User_042',
  anonName: 'Anonymous_042',
  country: 'MM',
  industry: 'manufacturing',
  region: 'Incheon',
  trust: 72,
  lang: 'en',
  verified: true,
};

Object.assign(window, { COUNTRIES, INDUSTRIES, TOPICS, REGIONS, POSTS, AI_ANSWERS, COMMENTS, EXPERTS, NOTIFS, ME });
