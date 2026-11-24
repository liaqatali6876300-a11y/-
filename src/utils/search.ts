import { Masla } from '../types/fatwa';

const ARABIC_DIACRITICS = /[\u0610-\u061A\u064B-\u065F\u0670\u06D6-\u06ED]/g;

export function normalizeUrdu(text: string): string {
  return text
    .replace(ARABIC_DIACRITICS, '')
    .replace(/[أإآٱ]/g, 'ا')
    .replace(/ى|ي/g, 'ی')
    .replace(/ك/g, 'ک')
    .replace(/ة|ۃ/g, 'ہ')
    .replace(/ؤ/g, 'و')
    .replace(/ئ/g, 'ی')
    .replace(/ے/g, 'ی')
    .replace(/[ًٌٍَُِّْٰ]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase();
}

export function normalizeRoman(text: string): string {
  return text
    .toLowerCase()
    .replace(/['"`\-_.,!?()]/g, ' ')
    .replace(/aa+/g, 'a')
    .replace(/ee+|ii+/g, 'i')
    .replace(/oo+|uu+/g, 'u')
    .replace(/ph/g, 'f')
    .replace(/kh/g, 'k')
    .replace(/gh/g, 'g')
    .replace(/sh/g, 's')
    .replace(/th/g, 't')
    .replace(/dh/g, 'd')
    .replace(/zh/g, 'z')
    .replace(/q/g, 'k')
    .replace(/w/g, 'v')
    .replace(/\s+/g, ' ')
    .trim();
}

// Map common Roman Urdu words & English Islamic terms -> Urdu concepts & synonyms
const ROMAN_TO_URDU_MAP: Record<string, string[]> = {
  wazu: ['وضو', 'طہارت', 'مسح'],
  wuzu: ['وضو', 'طہارت'],
  wudu: ['وضو', 'طہارت'],
  wadoo: ['وضو'],
  ablution: ['وضو'],
  masah: ['مسح', 'موزوں'],
  ghusl: ['غسل', 'جنابت', 'پاکی'],
  gusl: ['غسل', 'جنابت'],
  nahana: ['غسل'],
  janabat: ['جنابت', 'غسل'],
  tayammum: ['تیمم', 'مٹی'],
  tayamum: ['تیمم'],
  taharat: ['طہارت', 'پاکی', 'نجاست'],
  paki: ['پاکی', 'طہارت'],
  paaki: ['پاکی', 'طہارت'],
  najasat: ['نجاست', 'ناپاک', 'پیشاب', 'خون'],
  napak: ['ناپاک', 'نجاست'],
  napaki: ['ناپاکی', 'نجاست', 'غسل'],
  peshab: ['پیشاب', 'استنجا', 'نجاست'],
  istinja: ['استنجا'],
  khoon: ['خون', 'نجاست', 'وضو'],
  haiz: ['حیض', 'ماہواری'],
  nafas: ['نفاس'],
  istihaza: ['استحاضہ'],
  namaz: ['نماز', 'صلوٰۃ', 'فرائض', 'سجدہ'],
  namaaz: ['نماز', 'صلوٰۃ'],
  salah: ['نماز', 'صلوٰۃ'],
  salat: ['نماز', 'صلوٰۃ'],
  azan: ['اذان', 'اقامت'],
  azaan: ['اذان', 'اقامت'],
  iqamat: ['اقامت'],
  masjid: ['مسجد'],
  imam: ['امام', 'امامت'],
  imamat: ['امامت', 'امام'],
  jamaat: ['جماعت'],
  jamat: ['جماعت'],
  sajda: ['سجدہ', 'سجدہ سہو'],
  sajdah: ['سجدہ'],
  sahw: ['سجدہ سہو'],
  sahu: ['سجدہ سہو'],
  tilawat: ['سجدہ تلاوت', 'تلاوت'],
  ruku: ['رکوع'],
  qiraat: ['قراءت', 'قرآن'],
  witr: ['وتر'],
  vitr: ['وتر'],
  tahajjud: ['تہجد'],
  nafil: ['نفل'],
  qaza: ['قضا'],
  kaza: ['قضا'],
  musafir: ['مسافر', 'قصر', 'سفر'],
  safar: ['سفر', 'مسافر', 'قصر'],
  qasr: ['قصر', 'مسافر'],
  jumma: ['جمعہ', 'خطبہ'],
  juma: ['جمعہ'],
  jummah: ['جمعہ'],
  eid: ['عید', 'عیدین'],
  taraweeh: ['تراویح'],
  tarawih: ['تراویح'],
  janaza: ['جنازہ', 'میت', 'قبر'],
  janazah: ['جنازہ', 'میت'],
  mayyat: ['میت', 'جنازہ'],
  maiyat: ['میت', 'جنازہ'],
  kafan: ['کفن', 'میت'],
  dafan: ['دفن', 'قبر'],
  qabar: ['قبر', 'مزار'],
  qabr: ['قبر'],
  mazar: ['مزار', 'قبر'],
  fatiha: ['فاتحہ', 'ایصال ثواب'],
  esal: ['ایصال ثواب', 'فاتحہ'],
  isaal: ['ایصال ثواب'],
  sawab: ['ثواب', 'ایصال ثواب'],
  roza: ['روزہ', 'صوم', 'سحری', 'افطار'],
  rozah: ['روزہ'],
  fast: ['روزہ'],
  sehri: ['سحری', 'روزہ'],
  iftar: ['افطار', 'روزہ'],
  iftari: ['افطار', 'روزہ'],
  kaffara: ['کفارہ', 'قسم', 'روزہ'],
  fidya: ['فدیہ', 'روزہ'],
  itikaf: ['اعتکاف'],
  aitikaf: ['اعتکاف'],
  zakat: ['زکوٰۃ', 'نصاب'],
  zakaat: ['زکوٰۃ', 'نصاب'],
  nisab: ['نصاب', 'زکوٰۃ'],
  ushr: ['عشر', 'زکوٰۃ'],
  fitrana: ['صدقہ فطر', 'فطرانہ'],
  sadqa: ['صدقہ', 'خیرات'],
  hajj: ['حج', 'احرام', 'طواف'],
  haj: ['حج'],
  umrah: ['عمرہ'],
  umra: ['عمرہ'],
  ihram: ['احرام'],
  ehram: ['احرام'],
  tawaf: ['طواف'],
  nikah: ['نکاح', 'شادی', 'مہر'],
  nikaah: ['نکاح'],
  shadi: ['نکاح', 'شادی', 'ولیمہ'],
  shaadi: ['نکاح', 'شادی'],
  mahr: ['مہر', 'حق مہر'],
  mehr: ['مہر', 'حق مہر'],
  walima: ['ولیمہ'],
  razaat: ['رضاعت', 'دودھ'],
  talaq: ['طلاق', 'عدت', 'خلع'],
  talaaq: ['طلاق'],
  divorce: ['طلاق'],
  khula: ['خلع', 'طلاق'],
  iddat: ['عدت', 'طلاق', 'بیوہ'],
  halala: ['حلالہ', 'طلاق'],
  ruju: ['رجوع'],
  nafaqa: ['نفقہ', 'نان نفقہ'],
  virasat: ['وراثت', 'ترکہ', 'میراث'],
  wirasat: ['وراثت', 'میراث'],
  miras: ['میراث', 'وراثت'],
  meeras: ['میراث', 'وراثت'],
  wasiyat: ['وصیت'],
  tijarat: ['تجارت', 'خرید', 'فروخت', 'بیع'],
  business: ['تجارت', 'کاروبار'],
  karobar: ['کاروبار', 'تجارت'],
  sood: ['سود', 'ربا', 'بینک'],
  sud: ['سود', 'ربا'],
  riba: ['ربا', 'سود'],
  interest: ['سود', 'بینک'],
  bank: ['بینک', 'سود'],
  qarz: ['قرض', 'ادھار'],
  udhar: ['ادھار', 'قرض'],
  rishwat: ['رشوت'],
  kiraya: ['کرایہ', 'اجارہ'],
  ijara: ['اجارہ', 'کرایہ'],
  shirkat: ['شراکت', 'شرکت'],
  amanat: ['امانت'],
  hiba: ['ہبہ', 'تحفہ'],
  qurbani: ['قربانی', 'جانور'],
  qurbaani: ['قربانی'],
  aqeeqa: ['عقیقہ'],
  aqiqah: ['عقیقہ'],
  zibah: ['ذبح', 'ذبیحہ'],
  halal: ['حلال', 'حرام'],
  haram: ['حرام', 'حلال'],
  parda: ['پردہ', 'حجاب'],
  pardah: ['پردہ'],
  hijab: ['پردہ', 'حجاب'],
  libas: ['لباس', 'کپڑے'],
  kapde: ['کپڑے', 'لباس'],
  dadhi: ['داڑھی'],
  daarhi: ['داڑھی'],
  beard: ['داڑھی'],
  tasveer: ['تصویر', 'فوٹو'],
  photo: ['تصویر'],
  music: ['موسیقی', 'گانا'],
  mausiqi: ['موسیقی'],
  gana: ['گانا', 'موسیقی'],
  sharab: ['شراب', 'نشہ'],
  cigarette: ['سگریٹ', 'تمباکو'],
  gold: ['سونا'],
  sona: ['سونا', 'چاندی'],
  chandi: ['چاندی'],
  taweez: ['تعویذ', 'دم'],
  dam: ['دم'],
  qasam: ['قسم', 'کفارہ'],
  mannat: ['نذر', 'منت'],
  nazr: ['نذر'],
  aqaid: ['عقائد', 'ایمان'],
  aqeedah: ['عقائد', 'عقیدہ'],
  iman: ['ایمان', 'عقائد'],
  shirk: ['شرک'],
  bidat: ['بدعت'],
  khatm: ['ختم نبوت'],
  nubuwwat: ['ختم نبوت', 'نبوت'],
  ghaib: ['علم غیب'],
  noor: ['نور', 'بشر'],
  milad: ['میلاد', 'میلا د'],
  meelad: ['میلاد'],
  darood: ['درود', 'سلام'],
  durood: ['درود', 'سلام'],
  salam: ['سلام', 'درود'],
  tawassul: ['توسل', 'استمداد'],
  taqleed: ['تقلید', 'حنفی'],
  hanafi: ['حنفی', 'تقلید'],
  tasawwuf: ['تصوف', 'بیعت'],
  bayt: ['بیعت', 'مرید'],
  peer: ['پیر', 'مرید'],
  mureed: ['مرید', 'بیعت'],
  bivi: ['بیوی', 'نکاح', 'طلاق'],
  biwi: ['بیوی', 'نکاح', 'طلاق'],
  shohar: ['شوہر', 'نکاح', 'طلاق'],
  aurat: ['عورت', 'پردہ', 'حیض'],
  baap: ['باپ', 'والد', 'وراثت'],
  maa: ['ماں', 'والدہ', 'وراثت'],
  beta: ['بیٹا', 'وراثت', 'عقیقہ'],
  beti: ['بیٹی', 'وراثت', 'عقیقہ'],
  beva: ['بیوہ', 'عدت', 'وراثت'],
};

// Urdu common synonym groups so searching "آسان اردو" or common terms matches
const URDU_SYNONYM_MAP: Record<string, string[]> = {
  'شادی': ['نکاح', 'ولیمہ'],
  'بیوی': ['عورت', 'نکاح', 'طلاق', 'مہر'],
  'شوہر': ['مرد', 'نکاح', 'طلاق'],
  'بچہ': ['عقیقہ', 'رضاعت', 'وراثت'],
  'ماہواری': ['حیض', 'استحاضہ'],
  'فوت': ['میت', 'جنازہ', 'دفن', 'وراثت'],
  'موت': ['میت', 'جنازہ', 'انتقال'],
  'انتقال': ['میت', 'جنازہ', 'وراثت', 'عدت'],
  'بینک': ['سود', 'ربا', 'قرض'],
  'پیسے': ['مال', 'قرض', 'زکوٰۃ', 'سود'],
  'فوٹو': ['تصویر'],
  'گانا': ['موسیقی', 'باجا'],
  'منت': ['نذر'],
  'جائیداد': ['وراثت', 'ترکہ', 'میراث'],
  'حصہ': ['وراثت', 'قربانی', 'ترکہ'],
  'کرایہ': ['اجارہ'],
  'ٹوٹنا': ['نواقض', 'فاسد', 'ٹوٹ'],
  'ٹوٹ': ['نواقض', 'فاسد', 'ٹوٹنا'],
  'بھول': ['سجدہ سہو', 'سہو', 'بھولے'],
  'سفر': ['مسافر', 'قصر'],
  'زکات': ['زکوٰۃ', 'زکوۃ'],
  'صلوۃ': ['نماز', 'صلوٰۃ'],
  'طہارت': ['پاکی', 'وضو', 'غسل'],
};

const STOP_WORDS = new Set([
  'ka', 'ki', 'ke', 'ko', 'se', 'mein', 'me', 'par', 'pe', 'aur', 'ya', 'hai', 'hain',
  'ho', 'hota', 'hoti', 'masla', 'masail', 'hukm', 'kya', 'kaise', 'kab', 'agar',
  'کا', 'کی', 'کے', 'کو', 'سے', 'میں', 'پر', 'اور', 'یا', 'ہے', 'ہیں', 'ہو', 'مسئلہ', 'مسائل', 'حکم', 'کیا', 'اگر',
]);

export interface SearchResult {
  masla: Masla;
  score: number;
}

export function searchMasail(masail: Masla[], rawQuery: string): SearchResult[] {
  const trimmed = rawQuery.trim();
  if (!trimmed) return [];

  const normUrduQuery = normalizeUrdu(trimmed);
  const normRomanQuery = normalizeRoman(trimmed);

  // Split tokens
  const rawTokens = trimmed
    .split(/[\s،,]+/)
    .map((t) => t.trim())
    .filter((t) => t.length > 0);

  const expandedGroups: string[][] = [];

  for (const token of rawTokens) {
    const uTok = normalizeUrdu(token);
    const rTok = normalizeRoman(token);
    if (STOP_WORDS.has(uTok) || STOP_WORDS.has(rTok)) continue;

    const group = new Set<string>([uTok, rTok]);

    // Check direct Roman map
    if (ROMAN_TO_URDU_MAP[rTok]) {
      ROMAN_TO_URDU_MAP[rTok].forEach((u) => group.add(normalizeUrdu(u)));
    }
    // Check normalized keys in Roman map
    for (const [key, vals] of Object.entries(ROMAN_TO_URDU_MAP)) {
      const nKey = normalizeRoman(key);
      if (nKey === rTok || (rTok.length >= 3 && (nKey.startsWith(rTok) || rTok.startsWith(nKey)))) {
        vals.forEach((u) => group.add(normalizeUrdu(u)));
        group.add(nKey);
      }
    }
    // Check Urdu synonym map
    for (const [uKey, vals] of Object.entries(URDU_SYNONYM_MAP)) {
      if (normalizeUrdu(uKey) === uTok) {
        vals.forEach((u) => group.add(normalizeUrdu(u)));
      }
    }

    expandedGroups.push(Array.from(group).filter((g) => g.length >= 2));
  }

  // Fallback if all tokens were stop words
  if (expandedGroups.length === 0) {
    expandedGroups.push([normUrduQuery, normRomanQuery].filter(Boolean));
  }

  const results: SearchResult[] = [];

  for (const masla of masail) {
    const titleN = normalizeUrdu(masla.title);
    const topicN = normalizeUrdu(masla.topic);
    const babN = normalizeUrdu(masla.bab ?? '');
    const risalaN = normalizeUrdu(masla.risalaName ?? '');
    const sawalStr = masla.sawalNumber ? String(masla.sawalNumber) : '';
    const questionN = normalizeUrdu(masla.question);
    const answerN = normalizeUrdu(masla.answer);
    const dalilN = normalizeUrdu(masla.dalil);
    const explanationN = normalizeUrdu(masla.explanation);
    const keywordsUrduN = masla.keywords.map(normalizeUrdu).join(' ');
    const keywordsRomanN = masla.keywords.map(normalizeRoman).join(' ');

    let score = 0;

    // Exact full phrase boost
    if (normUrduQuery.length >= 2) {
      if (titleN.includes(normUrduQuery)) score += 30;
      if (questionN.includes(normUrduQuery)) score += 22;
      if (topicN.includes(normUrduQuery) || babN.includes(normUrduQuery) || risalaN.includes(normUrduQuery)) {
        score += 20;
      }
    }
    if (sawalStr && trimmed === sawalStr) {
      score += 25;
    }
    if (normRomanQuery.length >= 2 && keywordsRomanN.includes(normRomanQuery)) {
      score += 24;
    }

    let matchedGroupCount = 0;

    for (const group of expandedGroups) {
      let groupScore = 0;
      for (const term of group) {
        if (topicN.includes(term) || babN.includes(term) || risalaN.includes(term)) {
          groupScore = Math.max(groupScore, 14);
        }
        if (titleN.includes(term)) groupScore = Math.max(groupScore, 12);
        if (keywordsUrduN.includes(term)) groupScore = Math.max(groupScore, 11);
        if (keywordsRomanN.includes(term)) groupScore = Math.max(groupScore, 11);
        if (questionN.includes(term)) groupScore = Math.max(groupScore, 9);
        if (answerN.includes(term)) groupScore = Math.max(groupScore, 6);
        if (explanationN.includes(term)) groupScore = Math.max(groupScore, 5);
        if (dalilN.includes(term)) groupScore = Math.max(groupScore, 3);
      }
      if (groupScore > 0) {
        matchedGroupCount++;
        score += groupScore;
      }
    }

    // Bonus for matching all search terms
    if (expandedGroups.length > 1 && matchedGroupCount === expandedGroups.length) {
      score += 15;
    }

    if (score > 0) {
      results.push({ masla, score });
    }
  }

  results.sort((a, b) => b.score - a.score || a.masla.volume - b.masla.volume);
  return results;
}
