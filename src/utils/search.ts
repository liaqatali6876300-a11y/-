import { Hadith } from '../types/hadith';
import { getBookMeta } from '../data/bukhariMeta';

const ARABIC_DIACRITICS = /[\u0610-\u061A\u064B-\u065F\u0670\u06D6-\u06ED\u0640]/g;

export function normalizeArabicUrdu(text: string): string {
  return text
    .replace(ARABIC_DIACRITICS, '')
    .replace(/[أإآٱ]/g, 'ا')
    .replace(/ى|ي/g, 'ی')
    .replace(/ك/g, 'ک')
    .replace(/ة|ۃ/g, 'ہ')
    .replace(/ؤ/g, 'و')
    .replace(/ئ/g, 'ی')
    .replace(/ے/g, 'ی')
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

const ROMAN_TO_URDU_MAP: Record<string, string[]> = {
  wahi: ['وحی'],
  wahy: ['وحی'],
  niyyat: ['نیت', 'النيات'],
  niyat: ['نیت'],
  iman: ['ایمان', 'إيمان'],
  imaan: ['ایمان'],
  islam: ['اسلام'],
  ilm: ['علم'],
  wazu: ['وضو', 'الوضوء'],
  wuzu: ['وضو', 'الوضوء'],
  wudu: ['وضو', 'الوضوء'],
  ghusl: ['غسل'],
  gusl: ['غسل'],
  tayammum: ['تیمم'],
  tayamum: ['تیمم'],
  haiz: ['حیض'],
  namaz: ['نماز', 'صلاۃ', 'الصلاة'],
  namaaz: ['نماز', 'صلاۃ'],
  salat: ['صلاۃ', 'الصلاة', 'نماز'],
  salah: ['صلاۃ', 'الصلاة', 'نماز'],
  azan: ['اذان', 'الأذان'],
  azaan: ['اذان', 'الأذان'],
  masjid: ['مسجد'],
  juma: ['جمعہ'],
  jumma: ['جمعہ'],
  eid: ['عید', 'عیدین'],
  witr: ['وتر'],
  tahajjud: ['تہجد'],
  tarawih: ['تراویح'],
  taraweeh: ['تراویح'],
  janaza: ['جنازہ', 'جنازے', 'الجنائز'],
  qabar: ['قبر'],
  zakat: ['زکوٰۃ', 'زکاۃ', 'الزكاة'],
  zakaat: ['زکوٰۃ', 'زکاۃ'],
  sadqa: ['صدقہ'],
  sadaqa: ['صدقہ'],
  hajj: ['حج', 'الحج'],
  haj: ['حج'],
  umrah: ['عمرہ'],
  roza: ['روزہ', 'روزے', 'صوم', 'الصوم'],
  rozah: ['روزہ'],
  sehri: ['سحری'],
  iftar: ['افطار'],
  itikaf: ['اعتکاف'],
  tijarat: ['تجارت', 'خرید', 'فروخت', 'البيوع'],
  kharid: ['خرید', 'فروخت'],
  qarz: ['قرض'],
  riba: ['سود', 'ربا'],
  sood: ['سود'],
  jihad: ['جہاد', 'الجهاد'],
  anbiya: ['انبیاء'],
  sahaba: ['صحابہ'],
  ansar: ['انصار'],
  quran: ['قرآن'],
  tafsir: ['تفسیر'],
  tafseer: ['تفسیر'],
  nikah: ['نکاح', 'النكاح'],
  shadi: ['نکاح', 'شادی'],
  talaq: ['طلاق', 'الطلاق'],
  khana: ['کھانا', 'کھانوں'],
  qurbani: ['قربانی'],
  aqiqah: ['عقیقہ'],
  aqeeqa: ['عقیقہ'],
  libas: ['لباس'],
  kapde: ['لباس', 'کپڑے'],
  adab: ['آداب', 'ادب'],
  dua: ['دعا', 'دعاؤں'],
  duaa: ['دعا', 'دعاؤں'],
  taqdir: ['تقدیر'],
  taqdeer: ['تقدیر'],
  qasam: ['قسم'],
  virasat: ['وراثت', 'فرائض'],
  wirasat: ['وراثت', 'فرائض'],
  khwab: ['خواب', 'خوابوں'],
  fitna: ['فتنہ', 'فتنوں'],
  tawheed: ['توحید'],
  tauheed: ['توحید'],
  jannat: ['جنت'],
  jahannam: ['جہنم', 'دوزخ'],
  tauba: ['توبہ'],
  astaghfar: ['استغفار'],
  darood: ['درود'],
  durood: ['درود'],
  maa: ['ماں', 'والدہ', 'والدین'],
  baap: ['باپ', 'والد', 'والدین'],
  walidain: ['والدین'],
  padosi: ['پڑوسی', 'ہمسایہ'],
  shirk: ['شرک'],
  ghaibat: ['غیبت'],
  jhoot: ['جھوٹ'],
  abuhuraira: ['ابوہریرہ'],
  aisha: ['عائشہ'],
  bukhari: ['بخاری'],
};

const URDU_SYNONYMS: Record<string, string[]> = {
  'نماز': ['صلاۃ', 'الصلاة'],
  'صلاۃ': ['نماز', 'الصلاة'],
  'روزہ': ['صوم', 'الصوم', 'روزے'],
  'زکوٰۃ': ['زکاۃ', 'الزكاة'],
  'زکاۃ': ['زکوٰۃ', 'الزكاة'],
  'تجارت': ['بیوع', 'البيوع', 'خرید', 'فروخت'],
  'وراثت': ['فرائض', 'ترکہ', 'میراث'],
  'شادی': ['نکاح', 'ولیمہ'],
  'دعا': ['دعاؤں', 'الدعوات'],
  'کھانا': ['کھانوں', 'الأطعمة'],
  'والدین': ['ماں', 'باپ', 'والد', 'والدہ'],
  'پڑوسی': ['ہمسایہ'],
};

const STOP_WORDS = new Set([
  'ka', 'ki', 'ke', 'ko', 'se', 'mein', 'me', 'par', 'pe', 'aur', 'ya', 'hai', 'hain',
  'hadith', 'hadees', 'hadis', 'number', 'no', 'bukhari',
  'کا', 'کی', 'کے', 'کو', 'سے', 'میں', 'پر', 'اور', 'یا', 'ہے', 'ہیں', 'حدیث', 'نمبر',
]);

interface NormalizedEntry {
  numNorm: string;
  numBase: string;
  bookNorm: string;
  narratorNorm: string;
  arabicNorm: string;
  urduNorm: string;
}

const normCache = new WeakMap<Hadith, NormalizedEntry>();

function getNormalized(h: Hadith): NormalizedEntry {
  let cached = normCache.get(h);
  if (cached) return cached;

  const book = getBookMeta(h.bookNumber);
  const bookStr = book
    ? `${book.titleArabic} ${book.titleUrdu} کتاب ${book.bookNumber}`
    : `کتاب ${h.bookNumber}`;

  cached = {
    numNorm: h.hadithNumber.toLowerCase(),
    numBase: String(Math.floor(Number(h.hadithNumber))),
    bookNorm: normalizeArabicUrdu(bookStr),
    narratorNorm: normalizeArabicUrdu(h.narrator),
    arabicNorm: normalizeArabicUrdu(h.arabicText),
    urduNorm: normalizeArabicUrdu(h.urduText),
  };
  normCache.set(h, cached);
  return cached;
}

export interface SearchHadithResult {
  hadith: Hadith;
  score: number;
}

export function searchHadiths(hadiths: Hadith[], rawQuery: string): SearchHadithResult[] {
  const trimmed = rawQuery.trim();
  if (!trimmed) return [];

  // Direct Hadith Number detection (e.g., "1", "256", "حدیث 50", "hadith 7563")
  const numMatch = trimmed.match(/^(?:حدیث(?:\s*نمبر)?|hadith|hadees|#)?\s*(\d{1,4}(?:\.\d+)?)$/i);
  if (numMatch) {
    const targetNum = numMatch[1];
    const targetBase = String(Math.floor(Number(targetNum)));
    const exactMatches: SearchHadithResult[] = [];
    for (const h of hadiths) {
      if (h.hadithNumber === targetNum) {
        exactMatches.push({ hadith: h, score: 1000 });
      } else if (String(Math.floor(Number(h.hadithNumber))) === targetBase) {
        exactMatches.push({ hadith: h, score: 900 });
      } else if (h.hadithNumber.startsWith(targetBase)) {
        exactMatches.push({ hadith: h, score: 200 });
      }
    }
    if (exactMatches.length > 0) {
      exactMatches.sort((a, b) => b.score - a.score || Number(a.hadith.hadithNumber) - Number(b.hadith.hadithNumber));
      return exactMatches;
    }
  }

  const normQuery = normalizeArabicUrdu(trimmed);
  const normRomanQuery = normalizeRoman(trimmed);

  const rawTokens = trimmed
    .split(/[\s،,]+/)
    .map((t) => t.trim())
    .filter((t) => t.length > 0);

  const expandedGroups: string[][] = [];

  for (const token of rawTokens) {
    const uTok = normalizeArabicUrdu(token);
    const rTok = normalizeRoman(token);
    if (STOP_WORDS.has(uTok) || STOP_WORDS.has(rTok)) continue;

    const group = new Set<string>([uTok]);

    if (ROMAN_TO_URDU_MAP[rTok]) {
      ROMAN_TO_URDU_MAP[rTok].forEach((u) => group.add(normalizeArabicUrdu(u)));
    } else if (rTok.length >= 3) {
      for (const [key, vals] of Object.entries(ROMAN_TO_URDU_MAP)) {
        const nKey = normalizeRoman(key);
        if (nKey === rTok || nKey.startsWith(rTok) || rTok.startsWith(nKey)) {
          vals.forEach((u) => group.add(normalizeArabicUrdu(u)));
        }
      }
    }

    for (const [uKey, vals] of Object.entries(URDU_SYNONYMS)) {
      if (normalizeArabicUrdu(uKey) === uTok) {
        vals.forEach((u) => group.add(normalizeArabicUrdu(u)));
      }
    }

    const filtered = Array.from(group).filter((g) => g.length >= 2);
    if (filtered.length > 0) {
      expandedGroups.push(filtered);
    }
  }

  if (expandedGroups.length === 0) {
    if (normQuery.length >= 1) {
      expandedGroups.push([normQuery]);
    } else if (normRomanQuery.length >= 1) {
      expandedGroups.push([normRomanQuery]);
    } else {
      return [];
    }
  }

  const results: SearchHadithResult[] = [];

  for (const h of hadiths) {
    const entry = getNormalized(h);
    let score = 0;

    if (normQuery.length >= 2) {
      if (entry.bookNorm.includes(normQuery)) score += 28;
      if (entry.narratorNorm.includes(normQuery)) score += 24;
      if (entry.urduNorm.includes(normQuery)) score += 22;
      if (entry.arabicNorm.includes(normQuery)) score += 22;
    }

    let matchedGroups = 0;

    for (const group of expandedGroups) {
      let groupScore = 0;
      for (const term of group) {
        if (entry.bookNorm.includes(term)) groupScore = Math.max(groupScore, 14);
        if (entry.narratorNorm.includes(term)) groupScore = Math.max(groupScore, 12);
        if (entry.urduNorm.includes(term)) groupScore = Math.max(groupScore, 10);
        if (entry.arabicNorm.includes(term)) groupScore = Math.max(groupScore, 10);
      }
      if (groupScore > 0) {
        matchedGroups++;
        score += groupScore;
      }
    }

    if (expandedGroups.length > 1 && matchedGroups === expandedGroups.length) {
      score += 18;
    }

    if (score > 0) {
      // Slightly prefer primary hadith entries over sub-variants
      if (h.isPrimary) score += 1;
      results.push({ hadith: h, score });
    }
  }

  results.sort(
    (a, b) =>
      b.score - a.score ||
      Number(a.hadith.hadithNumber) - Number(b.hadith.hadithNumber)
  );
  return results;
}
