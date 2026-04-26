/* ===== Seed data for the prototype ===== */

const COUNTRIES = {
  VN: { cc: 'vn', name: 'Vietnam', code: 'vi' },
  MM: { cc: 'mm', name: 'Myanmar', code: 'my' },
  NP: { cc: 'np', name: 'Nepal',   code: 'ne' },
  ID: { cc: 'id', name: 'Indonesia', code: 'id' },
  PH: { cc: 'ph', name: 'Philippines', code: 'tl' },
  KH: { cc: 'kh', name: 'Cambodia', code: 'km' },
  TH: { cc: 'th', name: 'Thailand', code: 'th' },
  KR: { cc: 'kr', name: 'Korea',   code: 'ko' },
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
    id: 'p_me_dorm',
    industry: 'manufacturing',
    origLang: 'MM',
    translated: true,
    postType: 'question',
    titleKo: 'Dorm deduction ₩300,000 — is this normal?',
    titleOrig: 'အိပ်ဆောင်ဖြတ်ထုတ်ခြင်း ၃၀၀,၀၀၀ ဝမ် - ပုံမှန်လား?',
    bodyKo: "I work at a plastics factory in Incheon. They deduct ₩300,000 for dorm from my salary each month, but my coworkers from other factories seem to pay less. What's the typical amount? Meal fees are another ₩50,000 on top.",
    bodyOrig: 'ကျွန်တော်က အင်ချွန်မြို့ ပလပ်စတစ်စက်ရုံတွင်...',
    author: { id: 'u_mz_042', name: 'Anonymous_042', country: 'MM', industry: 'manufacturing', region: 'Incheon', trust: 62 },
    tags: ['dorm','wage'],
    time: '1h ago',
    comments: 2,
    likes: 4,
    saved: 0,
    translationSource: 'Myanmar → English (auto-translated)',
    isMine: true,
  },
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
    time: '2h ago',
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
    titleKo: 'My factory takes ₩280,000 every month for the dorm — too much?',
    titleOrig: 'Nhà máy của tôi lấy 280.000 won mỗi tháng cho ký túc xá — có quá nhiều không?',
    bodyKo: "I work at an auto-parts factory in Ansan, sharing a dorm room with 3 other workers. The deduction is ₩280,000 + ₩40,000 for meals. Friends at nearby factories pay around ₩150,000–200,000. Is mine too high? Can I ask the company to lower it?",
    author: { id: 'u_vn_187', name: 'Anonymous_187', country: 'VN', industry: 'manufacturing', region: 'Ansan', trust: 78 },
    tags: ['dorm'],
    time: '3h ago',
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
    time: '6h ago',
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
    time: '1h ago',
    comments: 14,
    likes: 5,
    saved: 2,
  },
];

/* AI-generated answer payload */
const AI_ANSWERS = {
  p_me_dorm: {
    summary: 'A ₩300,000/month dorm deduction is on the high side. Based on community data from Incheon manufacturing, average dorm fees sit at ₩150,000–230,000/month. The legality depends on your written consent and the actual facility — you have the right to ask for a breakdown.',
    rag: [
      'Shared data from 38 manufacturing workers in Incheon: average dorm fee ₩190,000/month, meals ₩70,000/month.',
      '4 of 5 Myanmar workers successfully renegotiated to lower the amount after asking for the breakdown.',
      'Posts tagged #dorm in your industry: 12 in the past 30 days, 8 resolved.',
    ],
    sop: [
      { title: 'Foreign Worker Room & Board Deduction Guidelines (MoEL Notice)', desc: 'Room & board charges cannot exceed a set ratio of ordinary wages and may not be deducted without written consent. For apartment-style dorms the cap is 14–18%/month.' },
      { title: 'How to ask your employer for a written breakdown', desc: 'Request a written itemization of the deduction (utilities, rent, meals). Without consent in writing, deductions exceeding the cap are not enforceable.' },
    ],
    sources: [
      { label: 'MoEL Notice', title: 'Foreign worker room & board deduction standards', meta: 'No. 2017-2' },
      { label: 'Migrant Worker Support Center', title: 'Dormitory dispute counseling guide', meta: '15 regions' },
    ],
  },
  p1: {
    summary: '3 months of unpaid wages is a serious violation of the Labor Standards Act. Immediate action is recommended. Visa renewal and wage claims are handled separately, and retaliation for filing a complaint is prohibited by law.',
    rag: [
      '14 similar cases are on record in the community. 12 of them were resolved within 1–2 months after reporting to the Ministry of Employment & Labor.',
      'A Myanmar worker shared last month that the Migrant Worker Support Center helped them resolve the exact same issue.',
    ],
    sop: [
      { title: 'Labor Standards Act Article 36 (Settlement of Money and Valuables)', desc: "When a worker dies or resigns, the employer must pay all wages, severance, and other money within 14 days of the cause of payment arising." },
      { title: 'Labor Standards Act Article 43 (Payment of Wages)', desc: 'Wages must be paid at least once a month on a fixed date, in currency, directly and in full to the worker.' },
    ],
    sources: [
      { label: 'Ministry of Employment & Labor', title: 'Guide to reporting unpaid wages', meta: '2025 revision' },
      { label: 'Migrant Worker Support Center', title: 'Myanmar-language counseling guide', meta: '15 regions' },
    ],
  },
  p2: {
    summary: 'A ₩280,000/month dorm deduction is on the high side. Based on community data, average dorm fees in capital-region manufacturing sit at ₩150,000–250,000/month. Whether the deduction is unfair depends on your contract and the actual facility.',
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
      { title: 'Occupational Safety and Health Act Article 31 (Safety Education)', desc: 'Employers must provide regular safety and health education to their workers, and the cost is borne by the employer.' },
    ],
    sources: [
      { label: 'KOSHA', title: 'Chemical handler training guide', meta: '2026' },
    ],
  },
};

/* Peer comments */
const COMMENTS = {
  p_me_dorm: [
    {
      id: 'c1', author: { name: 'Anonymous_091', country: 'KH', industry: 'manufacturing', region: 'Incheon', trust: 88 },
      origLang: 'KH', bodyKo: "Our dorm in Incheon is ₩180,000. ₩300,000 is definitely on the high side. Ask the boss for a written breakdown — they have to itemize rent vs utilities vs meals.",
      time: '32m ago', likes: 14, helpful: 11, replies: []
    },
    {
      id: 'c2', author: { name: 'Anonymous_118', country: 'MM', industry: 'manufacturing', region: 'Bucheon', trust: 56 },
      origLang: 'MM', bodyKo: "I'm in Bucheon (next to Incheon) and pay ₩200,000. Same factory style. ₩300,000 sounds expensive — definitely worth pushing back.",
      time: '1h ago', likes: 9, helpful: 7, replies: []
    },
  ],
  p1: [
    {
      id: 'c1', author: { name: 'Anonymous_187', country: 'VN', industry: 'manufacturing', region: 'Ansan', trust: 78 },
      origLang: 'VN',
      bodyKo: "I had a similar issue last year. You can file online at the Ministry of Employment & Labor website. I got all my back pay within 3 weeks. Make sure to collect evidence (contract, KakaoTalk chats, etc.).",
      bodyOrig: 'Tôi cũng gặp tình trạng tương tự năm ngoái...',
      time: '1h ago', likes: 24, helpful: 18, replies: [
        {
          id: 'c1r1', author: { name: 'Anonymous_042', country: 'MM', industry: 'manufacturing', region: 'Incheon', trust: 62 },
          origLang: 'MM',
          bodyKo: 'Thank you. The MoEL site is Korean-only — is there somewhere I can get help?',
          time: '1h ago', likes: 3, helpful: 0,
        },
        {
          id: 'c1r2', author: { name: 'Anonymous_187', country: 'VN', industry: 'manufacturing', region: 'Ansan', trust: 78 },
          origLang: 'VN',
          bodyKo: 'Call the Migrant Worker Support Center at 1577-0071 — they connect you to a Myanmar-language interpreter. It\'s free.',
          time: '1h ago', likes: 12, helpful: 9,
        },
      ]
    },
    {
      id: 'c2', author: { name: 'Anonymous_532', country: 'NP', industry: 'agriculture', region: 'Cheongju', trust: 45 },
      origLang: 'NP', bodyKo: "Filing a complaint doesn't affect your visa — those are separate. If the boss refuses to renew, that's also reportable. Don't be afraid.",
      time: '1h ago', likes: 14, helpful: 11, replies: [],
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
      origLang: 'KH', bodyKo: "Our dorm is ₩150,000. ₩280,000 is definitely on the high side. Ask the boss for the breakdown, or look into another factory.",
      time: '1h ago', likes: 28, helpful: 22, replies: []
    },
    {
      id: 'c2', author: { name: 'Anonymous_118', country: 'MM', industry: 'manufacturing', region: 'Ansan', trust: 56 },
      origLang: 'MM', bodyKo: "I'm also in Ansan and I pay ₩200,000. It depends on the dorm condition, but ₩280,000 sounds expensive.",
      time: '1h ago', likes: 16, helpful: 12, replies: []
    },
  ],
};

/* Expert directory (mock) */
const EXPERTS = [
  { name: 'Minjeong Kim, Labor Attorney', kind: 'expert',   title: 'Migrant worker specialist · Unpaid wages', rating: 4.9, reviews: 142, price: 'Free first consult · paid if hired', langs: ['한국어','English','မြန်မာ'], bg: '#0047AB', init: 'MK', online: true },
  { name: 'Junho Park, Lawyer',           kind: 'expert',   title: 'Labor litigation · Unpaid wages · Injury', rating: 4.8, reviews: 89, price: 'Free first consult · paid if hired', langs: ['한국어','English','မြန်မာ'], bg: '#0047AB', init: 'JP', online: true },
  { name: 'Sujin Lee, Counselor',         kind: 'official', title: 'Migrant Worker Support Center', rating: 5.0, reviews: 311, price: 'Always free · gov-funded', langs: ['한국어','Bahasa','ภาษาไทย'], bg: '#0F766E', init: 'SL', online: false },
];

/* Notifications */
const NOTIFS = [
  { id: 'n0', kind: 'risk', title: 'Risk signal detected on your post', body: "AI flagged your situation as 'unpaid wages'. Tap to see the full answer and what to do next.", time: '1h ago', unread: true, linkTo: 'post:p1' },
  { id: 'n1', kind: 'comment', title: 'Anonymous_187 replied to your post', body: 'I had a similar issue last year. You can file online at the Ministry of...', time: '1h ago', unread: true, linkTo: 'post:p1' },
  { id: 'n3', kind: 'thanks', title: 'Anonymous_042 marked your answer Helpful', body: 'Your reply on visa processing was useful. Trust Temperature +3', time: '1d ago', unread: false },
  { id: 'n4', kind: 'comment', title: 'New reply from Anonymous_305', body: 'In my case, just missing the payday written in the contract...', time: '1d ago', unread: false },
];

const ME = {
  id: 'me',
  name: 'User_042',
  anonName: 'Anonymous_042',
  country: 'MM',
  industry: 'manufacturing',
  region: 'Incheon',
  trust: 50,
  lang: 'my',
  verified: true,
};

/* Chat threads (Inbox > Messages) */
const CHATS = [
  { name:'Minjeong Kim, Attorney', country:'KR', msg:"Update on the unpaid-wage case you asked about yesterday.", time:'1h', unread:2, kind:'expert' },
  { name:'Anonymous_187', country:'VN', msg:'How did your MoEL filing go? Just checking in.', time:'1h', unread:1, kind:'peer' },
  { name:'Migrant Worker Center', country:'KR', msg:'When are you available for Myanmar interpretation?', time:'1d', unread:0, kind:'official' },
  { name:'Anonymous_305', country:'ID', msg:"Please connect me too!", time:'2d', unread:0, kind:'peer' },
];

Object.assign(window, { COUNTRIES, INDUSTRIES, TOPICS, REGIONS, POSTS, AI_ANSWERS, COMMENTS, EXPERTS, NOTIFS, CHATS, ME });
