import { BookMeta, QuickTopic, VolumeMeta } from '../types/hadith';

export const TOTAL_VOLUMES = 7;
export const TOTAL_BOOKS = 97;
export const TOTAL_HADITHS_WITH_REPEATS = 7563;
export const TOTAL_HADITHS_UNIQUE = 2602;

export const VOLUMES_META: VolumeMeta[] = [
  {
    "volume": 1,
    "name": "جلد نمبر 1",
    "subtitle": "کتاب بدء الوحی تا کتاب التہجد",
    "bookStart": 1,
    "bookEnd": 19,
    "bookCount": 19,
    "hadithCount": 1187,
    "totalEntries": 1191,
    "firstHadith": 1,
    "lastHadith": 1187
  },
  {
    "volume": 2,
    "name": "جلد نمبر 2",
    "subtitle": "کتاب الجنائز، زکوٰۃ، حج، صوم و اعتکاف",
    "bookStart": 20,
    "bookEnd": 33,
    "bookCount": 14,
    "hadithCount": 859,
    "totalEntries": 863,
    "firstHadith": 1188,
    "lastHadith": 2046
  },
  {
    "volume": 3,
    "name": "جلد نمبر 3",
    "subtitle": "کتاب البیوع تا کتاب الوصایا (معاملات)",
    "bookStart": 34,
    "bookEnd": 55,
    "bookCount": 22,
    "hadithCount": 735,
    "totalEntries": 739,
    "firstHadith": 2047,
    "lastHadith": 2781
  },
  {
    "volume": 4,
    "name": "جلد نمبر 4",
    "subtitle": "کتاب الجہاد، بدء الخلق، انبیاء و مناقبِ صحابہ",
    "bookStart": 56,
    "bookEnd": 63,
    "bookCount": 8,
    "hadithCount": 1167,
    "totalEntries": 1170,
    "firstHadith": 2782,
    "lastHadith": 3948
  },
  {
    "volume": 5,
    "name": "جلد نمبر 5",
    "subtitle": "کتاب المغازی، کتاب التفسیر و فضائل القرآن",
    "bookStart": 64,
    "bookEnd": 66,
    "bookCount": 3,
    "hadithCount": 1114,
    "totalEntries": 1120,
    "firstHadith": 3949,
    "lastHadith": 5062
  },
  {
    "volume": 6,
    "name": "جلد نمبر 6",
    "subtitle": "کتاب النکاح، الطلاق، الاطعمہ، اللباس، الادب و الدعوات",
    "bookStart": 67,
    "bookEnd": 80,
    "bookCount": 14,
    "hadithCount": 1349,
    "totalEntries": 1352,
    "firstHadith": 5063,
    "lastHadith": 6411
  },
  {
    "volume": 7,
    "name": "جلد نمبر 7",
    "subtitle": "کتاب الرقاق، الفرائض، الحدود، الفتن، الاحکام و التوحید",
    "bookStart": 81,
    "bookEnd": 97,
    "bookCount": 17,
    "hadithCount": 1152,
    "totalEntries": 1154,
    "firstHadith": 6412,
    "lastHadith": 7563
  }
];

export const BOOKS_META: BookMeta[] = [
  {
    "bookNumber": 1,
    "volume": 1,
    "titleArabic": "كتاب بدء الوحى",
    "titleUrdu": "وحی کے شروع ہونے کا بیان",
    "titleEnglish": "Revelation",
    "hadithCount": 7,
    "totalEntries": 7,
    "firstHadith": 1,
    "lastHadith": 7
  },
  {
    "bookNumber": 2,
    "volume": 1,
    "titleArabic": "كتاب الإيمان",
    "titleUrdu": "ایمان کا بیان",
    "titleEnglish": "Belief (Faith)",
    "hadithCount": 51,
    "totalEntries": 51,
    "firstHadith": 8,
    "lastHadith": 58
  },
  {
    "bookNumber": 3,
    "volume": 1,
    "titleArabic": "كتاب العلم",
    "titleUrdu": "علم کا بیان",
    "titleEnglish": "Knowledge",
    "hadithCount": 76,
    "totalEntries": 76,
    "firstHadith": 59,
    "lastHadith": 134
  },
  {
    "bookNumber": 4,
    "volume": 1,
    "titleArabic": "كتاب الوضوء",
    "titleUrdu": "وضو کا بیان",
    "titleEnglish": "Ablutions (Wudu)",
    "hadithCount": 113,
    "totalEntries": 113,
    "firstHadith": 135,
    "lastHadith": 247
  },
  {
    "bookNumber": 5,
    "volume": 1,
    "titleArabic": "كتاب الغسل",
    "titleUrdu": "غسل کا بیان",
    "titleEnglish": "Bathing (Ghusl)",
    "hadithCount": 46,
    "totalEntries": 46,
    "firstHadith": 248,
    "lastHadith": 293
  },
  {
    "bookNumber": 6,
    "volume": 1,
    "titleArabic": "كتاب الحيض",
    "titleUrdu": "حیض کا بیان",
    "titleEnglish": "Menstrual Periods",
    "hadithCount": 40,
    "totalEntries": 40,
    "firstHadith": 294,
    "lastHadith": 333
  },
  {
    "bookNumber": 7,
    "volume": 1,
    "titleArabic": "كتاب التيمم",
    "titleUrdu": "تیمم کا بیان",
    "titleEnglish": "Tayammum",
    "hadithCount": 15,
    "totalEntries": 15,
    "firstHadith": 334,
    "lastHadith": 348
  },
  {
    "bookNumber": 8,
    "volume": 1,
    "titleArabic": "كتاب الصلاة",
    "titleUrdu": "نماز کا بیان",
    "titleEnglish": "Prayers (Salat)",
    "hadithCount": 172,
    "totalEntries": 173,
    "firstHadith": 349,
    "lastHadith": 520
  },
  {
    "bookNumber": 9,
    "volume": 1,
    "titleArabic": "كتاب مواقيت الصلاة",
    "titleUrdu": "اوقات نماز کا بیان",
    "titleEnglish": "Times of Prayers",
    "hadithCount": 82,
    "totalEntries": 82,
    "firstHadith": 521,
    "lastHadith": 602
  },
  {
    "bookNumber": 10,
    "volume": 1,
    "titleArabic": "كتاب الأذان",
    "titleUrdu": "اذان کا بیان",
    "titleEnglish": "Call to Prayers (Adhan)",
    "hadithCount": 273,
    "totalEntries": 275,
    "firstHadith": 603,
    "lastHadith": 875
  },
  {
    "bookNumber": 11,
    "volume": 1,
    "titleArabic": "كتاب الجمعة",
    "titleUrdu": "جمعہ کا بیان",
    "titleEnglish": "Friday Prayer",
    "hadithCount": 66,
    "totalEntries": 66,
    "firstHadith": 876,
    "lastHadith": 941
  },
  {
    "bookNumber": 12,
    "volume": 1,
    "titleArabic": "كتاب صلاة الخوف",
    "titleUrdu": "خوف کی نماز",
    "titleEnglish": "Fear Prayer",
    "hadithCount": 6,
    "totalEntries": 6,
    "firstHadith": 942,
    "lastHadith": 947
  },
  {
    "bookNumber": 13,
    "volume": 1,
    "titleArabic": "كتاب العيدين",
    "titleUrdu": "عیدین کا بیان",
    "titleEnglish": "Two Eid Festivals",
    "hadithCount": 42,
    "totalEntries": 42,
    "firstHadith": 948,
    "lastHadith": 989
  },
  {
    "bookNumber": 14,
    "volume": 1,
    "titleArabic": "كتاب الوتر",
    "titleUrdu": "وتر کا بیان",
    "titleEnglish": "Witr Prayer",
    "hadithCount": 15,
    "totalEntries": 15,
    "firstHadith": 990,
    "lastHadith": 1004
  },
  {
    "bookNumber": 15,
    "volume": 1,
    "titleArabic": "كتاب الاستسقاء",
    "titleUrdu": "نماز استسقاء",
    "titleEnglish": "Rain Prayer (Istisqaa)",
    "hadithCount": 35,
    "totalEntries": 35,
    "firstHadith": 1005,
    "lastHadith": 1039
  },
  {
    "bookNumber": 16,
    "volume": 1,
    "titleArabic": "كتاب الكسوف",
    "titleUrdu": "کسوف کا بیان",
    "titleEnglish": "Eclipses",
    "hadithCount": 27,
    "totalEntries": 27,
    "firstHadith": 1040,
    "lastHadith": 1066
  },
  {
    "bookNumber": 17,
    "volume": 1,
    "titleArabic": "كتاب سجود القرآن",
    "titleUrdu": "سجدہ تلاوت",
    "titleEnglish": "Prostration During Quran",
    "hadithCount": 13,
    "totalEntries": 13,
    "firstHadith": 1067,
    "lastHadith": 1079
  },
  {
    "bookNumber": 18,
    "volume": 1,
    "titleArabic": "كتاب تقصير الصلاة",
    "titleUrdu": "نماز قصر کا بیان",
    "titleEnglish": "Shortening Prayers",
    "hadithCount": 40,
    "totalEntries": 40,
    "firstHadith": 1080,
    "lastHadith": 1119
  },
  {
    "bookNumber": 19,
    "volume": 1,
    "titleArabic": "كتاب التهجد",
    "titleUrdu": "تہجد کا بیان",
    "titleEnglish": "Night Prayer (Tahajjud)",
    "hadithCount": 68,
    "totalEntries": 69,
    "firstHadith": 1120,
    "lastHadith": 1187
  },
  {
    "bookNumber": 20,
    "volume": 2,
    "titleArabic": "كتاب فضل الصلاة في مسجد مكة والمدينة",
    "titleUrdu": "مسجد مکہ و مدینہ میں نماز کی فضیلت",
    "titleEnglish": "Superiority of Masjid Makkah & Madinah",
    "hadithCount": 10,
    "totalEntries": 10,
    "firstHadith": 1188,
    "lastHadith": 1197
  },
  {
    "bookNumber": 21,
    "volume": 2,
    "titleArabic": "كتاب العمل في الصلاة",
    "titleUrdu": "نماز میں عمل",
    "titleEnglish": "Actions while Praying",
    "hadithCount": 26,
    "totalEntries": 27,
    "firstHadith": 1198,
    "lastHadith": 1223
  },
  {
    "bookNumber": 22,
    "volume": 2,
    "titleArabic": "كتاب السهو",
    "titleUrdu": "سہو/بھول کا بیان",
    "titleEnglish": "Forgetfulness in Prayer",
    "hadithCount": 13,
    "totalEntries": 14,
    "firstHadith": 1224,
    "lastHadith": 1236
  },
  {
    "bookNumber": 23,
    "volume": 2,
    "titleArabic": "كتاب الجنائز",
    "titleUrdu": "جنازے کا بیان",
    "titleEnglish": "Funerals",
    "hadithCount": 158,
    "totalEntries": 160,
    "firstHadith": 1237,
    "lastHadith": 1394
  },
  {
    "bookNumber": 24,
    "volume": 2,
    "titleArabic": "كتاب الزكاة",
    "titleUrdu": "زکاۃ کا بیان",
    "titleEnglish": "Obligatory Charity (Zakat)",
    "hadithCount": 118,
    "totalEntries": 118,
    "firstHadith": 1395,
    "lastHadith": 1512
  },
  {
    "bookNumber": 25,
    "volume": 2,
    "titleArabic": "كتاب الحج",
    "titleUrdu": "حج کا بیان",
    "titleEnglish": "Hajj",
    "hadithCount": 260,
    "totalEntries": 260,
    "firstHadith": 1513,
    "lastHadith": 1772
  },
  {
    "bookNumber": 26,
    "volume": 2,
    "titleArabic": "كتاب العمرة",
    "titleUrdu": "عمرہ کا بیان",
    "titleEnglish": "Minor Pilgrimage (Umrah)",
    "hadithCount": 33,
    "totalEntries": 33,
    "firstHadith": 1773,
    "lastHadith": 1805
  },
  {
    "bookNumber": 27,
    "volume": 2,
    "titleArabic": "كتاب المحصر",
    "titleUrdu": "محصور کا بیان",
    "titleEnglish": "Pilgrims Prevented",
    "hadithCount": 15,
    "totalEntries": 15,
    "firstHadith": 1806,
    "lastHadith": 1820
  },
  {
    "bookNumber": 28,
    "volume": 2,
    "titleArabic": "كتاب جزاء الصيد",
    "titleUrdu": "شکار کی سزا",
    "titleEnglish": "Penalty of Hunting",
    "hadithCount": 46,
    "totalEntries": 46,
    "firstHadith": 1821,
    "lastHadith": 1866
  },
  {
    "bookNumber": 29,
    "volume": 2,
    "titleArabic": "كتاب فضائل المدينة",
    "titleUrdu": "مدینہ کی فضیلت",
    "titleEnglish": "Virtues of Madinah",
    "hadithCount": 24,
    "totalEntries": 24,
    "firstHadith": 1867,
    "lastHadith": 1890
  },
  {
    "bookNumber": 30,
    "volume": 2,
    "titleArabic": "كتاب الصوم",
    "titleUrdu": "روزے کا بیان",
    "titleEnglish": "Fasting",
    "hadithCount": 117,
    "totalEntries": 117,
    "firstHadith": 1891,
    "lastHadith": 2007
  },
  {
    "bookNumber": 31,
    "volume": 2,
    "titleArabic": "كتاب صلاة التراويح",
    "titleUrdu": "تراویح کا بیان",
    "titleEnglish": "Tarawih Prayer",
    "hadithCount": 6,
    "totalEntries": 6,
    "firstHadith": 2008,
    "lastHadith": 2013
  },
  {
    "bookNumber": 32,
    "volume": 2,
    "titleArabic": "كتاب فضل ليلة القدر",
    "titleUrdu": "شب قدر کی فضیلت",
    "titleEnglish": "Virtues of Lailat-ul-Qadr",
    "hadithCount": 11,
    "totalEntries": 11,
    "firstHadith": 2014,
    "lastHadith": 2024
  },
  {
    "bookNumber": 33,
    "volume": 2,
    "titleArabic": "كتاب الاعتكاف",
    "titleUrdu": "اعتکاف کا بیان",
    "titleEnglish": "Retiring to Mosque (Itikaf)",
    "hadithCount": 22,
    "totalEntries": 22,
    "firstHadith": 2025,
    "lastHadith": 2046
  },
  {
    "bookNumber": 34,
    "volume": 3,
    "titleArabic": "كتاب البيوع",
    "titleUrdu": "خرید و فروخت کا بیان",
    "titleEnglish": "Sales and Trade",
    "hadithCount": 192,
    "totalEntries": 193,
    "firstHadith": 2047,
    "lastHadith": 2238
  },
  {
    "bookNumber": 35,
    "volume": 3,
    "titleArabic": "كتاب السلم",
    "titleUrdu": "سلم کا بیان",
    "titleEnglish": "Advance Payment",
    "hadithCount": 18,
    "totalEntries": 20,
    "firstHadith": 2239,
    "lastHadith": 2256
  },
  {
    "bookNumber": 36,
    "volume": 3,
    "titleArabic": "كتاب الشفعة",
    "titleUrdu": "شفعہ کا بیان",
    "titleEnglish": "Pre-emption",
    "hadithCount": 3,
    "totalEntries": 3,
    "firstHadith": 2257,
    "lastHadith": 2259
  },
  {
    "bookNumber": 37,
    "volume": 3,
    "titleArabic": "كتاب الإجارة",
    "titleUrdu": "اجارہ کا بیان",
    "titleEnglish": "Hiring",
    "hadithCount": 27,
    "totalEntries": 27,
    "firstHadith": 2260,
    "lastHadith": 2286
  },
  {
    "bookNumber": 38,
    "volume": 3,
    "titleArabic": "كتاب الحوالات",
    "titleUrdu": "حوالہ کا بیان",
    "titleEnglish": "Transfer of Debt",
    "hadithCount": 3,
    "totalEntries": 3,
    "firstHadith": 2287,
    "lastHadith": 2289
  },
  {
    "bookNumber": 39,
    "volume": 3,
    "titleArabic": "كتاب الكفالة",
    "titleUrdu": "کفالت کا بیان",
    "titleEnglish": "Guarantee",
    "hadithCount": 9,
    "totalEntries": 9,
    "firstHadith": 2290,
    "lastHadith": 2298
  },
  {
    "bookNumber": 40,
    "volume": 3,
    "titleArabic": "كتاب الوكالة",
    "titleUrdu": "وکالت کا بیان",
    "titleEnglish": "Representation",
    "hadithCount": 21,
    "totalEntries": 21,
    "firstHadith": 2299,
    "lastHadith": 2319
  },
  {
    "bookNumber": 41,
    "volume": 3,
    "titleArabic": "كتاب المزارعة",
    "titleUrdu": "مزارعت کا بیان",
    "titleEnglish": "Agriculture",
    "hadithCount": 31,
    "totalEntries": 31,
    "firstHadith": 2320,
    "lastHadith": 2350
  },
  {
    "bookNumber": 42,
    "volume": 3,
    "titleArabic": "كتاب المساقاة",
    "titleUrdu": "مساقات و شرب",
    "titleEnglish": "Distribution of Water",
    "hadithCount": 34,
    "totalEntries": 34,
    "firstHadith": 2351,
    "lastHadith": 2384
  },
  {
    "bookNumber": 43,
    "volume": 3,
    "titleArabic": "كتاب الاستقراض",
    "titleUrdu": "قرض لینے کا بیان",
    "titleEnglish": "Loans",
    "hadithCount": 25,
    "totalEntries": 25,
    "firstHadith": 2385,
    "lastHadith": 2409
  },
  {
    "bookNumber": 44,
    "volume": 3,
    "titleArabic": "كتاب الخصومات",
    "titleUrdu": "جھگڑوں کا بیان",
    "titleEnglish": "Disputes",
    "hadithCount": 16,
    "totalEntries": 16,
    "firstHadith": 2410,
    "lastHadith": 2425
  },
  {
    "bookNumber": 45,
    "volume": 3,
    "titleArabic": "كتاب اللقطة",
    "titleUrdu": "لقطہ کا بیان",
    "titleEnglish": "Lost Things",
    "hadithCount": 14,
    "totalEntries": 15,
    "firstHadith": 2426,
    "lastHadith": 2439
  },
  {
    "bookNumber": 46,
    "volume": 3,
    "titleArabic": "كتاب المظالم",
    "titleUrdu": "ظلم کا بیان",
    "titleEnglish": "Oppressions",
    "hadithCount": 43,
    "totalEntries": 43,
    "firstHadith": 2440,
    "lastHadith": 2482
  },
  {
    "bookNumber": 47,
    "volume": 3,
    "titleArabic": "كتاب الشركة",
    "titleUrdu": "شراکت کا بیان",
    "titleEnglish": "Partnership",
    "hadithCount": 25,
    "totalEntries": 25,
    "firstHadith": 2483,
    "lastHadith": 2507
  },
  {
    "bookNumber": 48,
    "volume": 3,
    "titleArabic": "كتاب الرهن",
    "titleUrdu": "رہن کا بیان",
    "titleEnglish": "Mortgaging",
    "hadithCount": 9,
    "totalEntries": 9,
    "firstHadith": 2508,
    "lastHadith": 2516
  },
  {
    "bookNumber": 49,
    "volume": 3,
    "titleArabic": "كتاب العتق",
    "titleUrdu": "آزاد کرنے کا بیان",
    "titleEnglish": "Manumission",
    "hadithCount": 43,
    "totalEntries": 43,
    "firstHadith": 2517,
    "lastHadith": 2559
  },
  {
    "bookNumber": 50,
    "volume": 3,
    "titleArabic": "كتاب المكاتب",
    "titleUrdu": "مکاتب کا بیان",
    "titleEnglish": "Makatib",
    "hadithCount": 6,
    "totalEntries": 6,
    "firstHadith": 2560,
    "lastHadith": 2565
  },
  {
    "bookNumber": 51,
    "volume": 3,
    "titleArabic": "كتاب الهبة",
    "titleUrdu": "ہبہ/تحفہ کا بیان",
    "titleEnglish": "Gifts",
    "hadithCount": 71,
    "totalEntries": 71,
    "firstHadith": 2566,
    "lastHadith": 2636
  },
  {
    "bookNumber": 52,
    "volume": 3,
    "titleArabic": "كتاب الشهادات",
    "titleUrdu": "گواہی کا بیان",
    "titleEnglish": "Witnesses",
    "hadithCount": 53,
    "totalEntries": 53,
    "firstHadith": 2637,
    "lastHadith": 2689
  },
  {
    "bookNumber": 53,
    "volume": 3,
    "titleArabic": "كتاب الصلح",
    "titleUrdu": "صلح کا بیان",
    "titleEnglish": "Peacemaking",
    "hadithCount": 21,
    "totalEntries": 21,
    "firstHadith": 2690,
    "lastHadith": 2710
  },
  {
    "bookNumber": 54,
    "volume": 3,
    "titleArabic": "كتاب الشروط",
    "titleUrdu": "شرائط کا بیان",
    "titleEnglish": "Conditions",
    "hadithCount": 27,
    "totalEntries": 27,
    "firstHadith": 2711,
    "lastHadith": 2737
  },
  {
    "bookNumber": 55,
    "volume": 3,
    "titleArabic": "كتاب الوصايا",
    "titleUrdu": "وصیتوں کا بیان",
    "titleEnglish": "Wills",
    "hadithCount": 44,
    "totalEntries": 44,
    "firstHadith": 2738,
    "lastHadith": 2781
  },
  {
    "bookNumber": 56,
    "volume": 4,
    "titleArabic": "كتاب الجهاد",
    "titleUrdu": "جہاد کا بیان",
    "titleEnglish": "Fighting for the Cause of Allah",
    "hadithCount": 309,
    "totalEntries": 309,
    "firstHadith": 2782,
    "lastHadith": 3090
  },
  {
    "bookNumber": 57,
    "volume": 4,
    "titleArabic": "كتاب فرض الخمس",
    "titleUrdu": "خمس کا بیان",
    "titleEnglish": "One-fifth of Booty",
    "hadithCount": 65,
    "totalEntries": 65,
    "firstHadith": 3091,
    "lastHadith": 3155
  },
  {
    "bookNumber": 58,
    "volume": 4,
    "titleArabic": "كتاب الجزية",
    "titleUrdu": "جزیہ کا بیان",
    "titleEnglish": "Jizyah Tax",
    "hadithCount": 34,
    "totalEntries": 34,
    "firstHadith": 3156,
    "lastHadith": 3189
  },
  {
    "bookNumber": 59,
    "volume": 4,
    "titleArabic": "كتاب بدء الخلق",
    "titleUrdu": "بدء الخلق",
    "titleEnglish": "Beginning of Creation",
    "hadithCount": 136,
    "totalEntries": 136,
    "firstHadith": 3190,
    "lastHadith": 3325
  },
  {
    "bookNumber": 60,
    "volume": 4,
    "titleArabic": "كتاب أحاديث الأنبياء",
    "titleUrdu": "انبیاء کی احادیث",
    "titleEnglish": "Prophets",
    "hadithCount": 163,
    "totalEntries": 163,
    "firstHadith": 3326,
    "lastHadith": 3488
  },
  {
    "bookNumber": 61,
    "volume": 4,
    "titleArabic": "كتاب المناقب",
    "titleUrdu": "فضائل و مناقب",
    "titleEnglish": "Merits/Virtues",
    "hadithCount": 160,
    "totalEntries": 162,
    "firstHadith": 3489,
    "lastHadith": 3648
  },
  {
    "bookNumber": 62,
    "volume": 4,
    "titleArabic": "كتاب فضائل الصحابة",
    "titleUrdu": "صحابہ کی فضیلت",
    "titleEnglish": "Companions of the Prophet",
    "hadithCount": 127,
    "totalEntries": 128,
    "firstHadith": 3649,
    "lastHadith": 3775
  },
  {
    "bookNumber": 63,
    "volume": 4,
    "titleArabic": "كتاب مناقب الأنصار",
    "titleUrdu": "انصار کے مناقب",
    "titleEnglish": "Merits of Al-Ansar",
    "hadithCount": 173,
    "totalEntries": 173,
    "firstHadith": 3776,
    "lastHadith": 3948
  },
  {
    "bookNumber": 64,
    "volume": 5,
    "titleArabic": "كتاب المغازي",
    "titleUrdu": "غزوات کا بیان",
    "titleEnglish": "Military Expeditions",
    "hadithCount": 525,
    "totalEntries": 526,
    "firstHadith": 3949,
    "lastHadith": 4473
  },
  {
    "bookNumber": 65,
    "volume": 5,
    "titleArabic": "كتاب التفسير",
    "titleUrdu": "تفسیر قرآن",
    "titleEnglish": "Prophetic Commentary on Quran",
    "hadithCount": 504,
    "totalEntries": 506,
    "firstHadith": 4474,
    "lastHadith": 4977
  },
  {
    "bookNumber": 66,
    "volume": 5,
    "titleArabic": "كتاب فضائل القرآن",
    "titleUrdu": "فضائل قرآن",
    "titleEnglish": "Virtues of the Quran",
    "hadithCount": 85,
    "totalEntries": 88,
    "firstHadith": 4978,
    "lastHadith": 5062
  },
  {
    "bookNumber": 67,
    "volume": 6,
    "titleArabic": "كتاب النكاح",
    "titleUrdu": "نکاح کا بیان",
    "titleEnglish": "Wedlock/Marriage",
    "hadithCount": 188,
    "totalEntries": 188,
    "firstHadith": 5063,
    "lastHadith": 5250
  },
  {
    "bookNumber": 68,
    "volume": 6,
    "titleArabic": "كتاب الطلاق",
    "titleUrdu": "طلاق کا بیان",
    "titleEnglish": "Divorce",
    "hadithCount": 100,
    "totalEntries": 100,
    "firstHadith": 5251,
    "lastHadith": 5350
  },
  {
    "bookNumber": 69,
    "volume": 6,
    "titleArabic": "كتاب النفقات",
    "titleUrdu": "نفقات کا بیان",
    "titleEnglish": "Supporting the Family",
    "hadithCount": 22,
    "totalEntries": 22,
    "firstHadith": 5351,
    "lastHadith": 5372
  },
  {
    "bookNumber": 70,
    "volume": 6,
    "titleArabic": "كتاب الأطعمة",
    "titleUrdu": "کھانوں کا بیان",
    "titleEnglish": "Food/Meals",
    "hadithCount": 94,
    "totalEntries": 95,
    "firstHadith": 5373,
    "lastHadith": 5466
  },
  {
    "bookNumber": 71,
    "volume": 6,
    "titleArabic": "كتاب العقيقة",
    "titleUrdu": "عقیقہ کا بیان",
    "titleEnglish": "Aqiqah",
    "hadithCount": 8,
    "totalEntries": 9,
    "firstHadith": 5467,
    "lastHadith": 5474
  },
  {
    "bookNumber": 72,
    "volume": 6,
    "titleArabic": "كتاب الذبائح",
    "titleUrdu": "ذبیحوں کا بیان",
    "titleEnglish": "Slaughtering",
    "hadithCount": 70,
    "totalEntries": 70,
    "firstHadith": 5475,
    "lastHadith": 5544
  },
  {
    "bookNumber": 73,
    "volume": 6,
    "titleArabic": "كتاب الأضاحي",
    "titleUrdu": "قربانی کا بیان",
    "titleEnglish": "Sacrifice on Eid ul Adha",
    "hadithCount": 30,
    "totalEntries": 30,
    "firstHadith": 5545,
    "lastHadith": 5574
  },
  {
    "bookNumber": 74,
    "volume": 6,
    "titleArabic": "كتاب الأشربة",
    "titleUrdu": "مشروبات کا بیان",
    "titleEnglish": "Drinks",
    "hadithCount": 65,
    "totalEntries": 65,
    "firstHadith": 5575,
    "lastHadith": 5639
  },
  {
    "bookNumber": 75,
    "volume": 6,
    "titleArabic": "كتاب المرضى",
    "titleUrdu": "مریضوں کا بیان",
    "titleEnglish": "Patients",
    "hadithCount": 38,
    "totalEntries": 38,
    "firstHadith": 5640,
    "lastHadith": 5677
  },
  {
    "bookNumber": 76,
    "volume": 6,
    "titleArabic": "كتاب الطب",
    "titleUrdu": "طب کا بیان",
    "titleEnglish": "Medicine",
    "hadithCount": 105,
    "totalEntries": 105,
    "firstHadith": 5678,
    "lastHadith": 5782
  },
  {
    "bookNumber": 77,
    "volume": 6,
    "titleArabic": "كتاب اللباس",
    "titleUrdu": "لباس کا بیان",
    "titleEnglish": "Dress",
    "hadithCount": 187,
    "totalEntries": 188,
    "firstHadith": 5783,
    "lastHadith": 5969
  },
  {
    "bookNumber": 78,
    "volume": 6,
    "titleArabic": "كتاب الأدب",
    "titleUrdu": "آداب کا بیان",
    "titleEnglish": "Good Manners (Adab)",
    "hadithCount": 257,
    "totalEntries": 257,
    "firstHadith": 5970,
    "lastHadith": 6226
  },
  {
    "bookNumber": 79,
    "volume": 6,
    "titleArabic": "كتاب الاستئذان",
    "titleUrdu": "اجازت لینے کا بیان",
    "titleEnglish": "Asking Permission",
    "hadithCount": 77,
    "totalEntries": 77,
    "firstHadith": 6227,
    "lastHadith": 6303
  },
  {
    "bookNumber": 80,
    "volume": 6,
    "titleArabic": "كتاب الدعوات",
    "titleUrdu": "دعاؤں کا بیان",
    "titleEnglish": "Invocations (Dua)",
    "hadithCount": 108,
    "totalEntries": 108,
    "firstHadith": 6304,
    "lastHadith": 6411
  },
  {
    "bookNumber": 81,
    "volume": 7,
    "titleArabic": "كتاب الرقاق",
    "titleUrdu": "رقاق و نرم دلی",
    "titleEnglish": "Softening of Hearts",
    "hadithCount": 182,
    "totalEntries": 182,
    "firstHadith": 6412,
    "lastHadith": 6593
  },
  {
    "bookNumber": 82,
    "volume": 7,
    "titleArabic": "كتاب القدر",
    "titleUrdu": "تقدیر کا بیان",
    "titleEnglish": "Divine Will (Qadar)",
    "hadithCount": 27,
    "totalEntries": 27,
    "firstHadith": 6594,
    "lastHadith": 6620
  },
  {
    "bookNumber": 83,
    "volume": 7,
    "titleArabic": "كتاب الأيمان والنذور",
    "titleUrdu": "قسموں اور نذروں کا بیان",
    "titleEnglish": "Oaths and Vows",
    "hadithCount": 87,
    "totalEntries": 87,
    "firstHadith": 6621,
    "lastHadith": 6707
  },
  {
    "bookNumber": 84,
    "volume": 7,
    "titleArabic": "كتاب كفارات الأيمان",
    "titleUrdu": "قسم کے کفارے",
    "titleEnglish": "Expiation for Oaths",
    "hadithCount": 15,
    "totalEntries": 15,
    "firstHadith": 6708,
    "lastHadith": 6722
  },
  {
    "bookNumber": 85,
    "volume": 7,
    "titleArabic": "كتاب الفرائض",
    "titleUrdu": "فرائض/وراثت کا بیان",
    "titleEnglish": "Laws of Inheritance",
    "hadithCount": 49,
    "totalEntries": 49,
    "firstHadith": 6723,
    "lastHadith": 6771
  },
  {
    "bookNumber": 86,
    "volume": 7,
    "titleArabic": "كتاب الحدود",
    "titleUrdu": "حدود کا بیان",
    "titleEnglish": "Limits and Punishments (Hudud)",
    "hadithCount": 89,
    "totalEntries": 89,
    "firstHadith": 6772,
    "lastHadith": 6860
  },
  {
    "bookNumber": 87,
    "volume": 7,
    "titleArabic": "كتاب الديات",
    "titleUrdu": "دیت کا بیان",
    "titleEnglish": "Blood Money (Diyat)",
    "hadithCount": 57,
    "totalEntries": 59,
    "firstHadith": 6861,
    "lastHadith": 6917
  },
  {
    "bookNumber": 88,
    "volume": 7,
    "titleArabic": "كتاب استتابة المرتدين",
    "titleUrdu": "مرتدین سے توبہ",
    "titleEnglish": "Dealing with Apostates",
    "hadithCount": 22,
    "totalEntries": 22,
    "firstHadith": 6918,
    "lastHadith": 6939
  },
  {
    "bookNumber": 89,
    "volume": 7,
    "titleArabic": "كتاب الإكراه",
    "titleUrdu": "اکراہ/جبر کا بیان",
    "titleEnglish": "Coercion",
    "hadithCount": 13,
    "totalEntries": 13,
    "firstHadith": 6940,
    "lastHadith": 6952
  },
  {
    "bookNumber": 90,
    "volume": 7,
    "titleArabic": "كتاب الحيل",
    "titleUrdu": "حیلوں کا بیان",
    "titleEnglish": "Tricks/Stratagems",
    "hadithCount": 29,
    "totalEntries": 29,
    "firstHadith": 6953,
    "lastHadith": 6981
  },
  {
    "bookNumber": 91,
    "volume": 7,
    "titleArabic": "كتاب التعبير",
    "titleUrdu": "خوابوں کی تعبیر",
    "titleEnglish": "Interpretations of Dreams",
    "hadithCount": 66,
    "totalEntries": 66,
    "firstHadith": 6982,
    "lastHadith": 7047
  },
  {
    "bookNumber": 92,
    "volume": 7,
    "titleArabic": "كتاب الفتن",
    "titleUrdu": "فتنوں کا بیان",
    "titleEnglish": "Tribulations (Fitan)",
    "hadithCount": 89,
    "totalEntries": 89,
    "firstHadith": 7048,
    "lastHadith": 7136
  },
  {
    "bookNumber": 93,
    "volume": 7,
    "titleArabic": "كتاب الأحكام",
    "titleUrdu": "احکام کا بیان",
    "titleEnglish": "Judgements (Ahkaam)",
    "hadithCount": 89,
    "totalEntries": 89,
    "firstHadith": 7137,
    "lastHadith": 7225
  },
  {
    "bookNumber": 94,
    "volume": 7,
    "titleArabic": "كتاب التمني",
    "titleUrdu": "تمنا کا بیان",
    "titleEnglish": "Wishes",
    "hadithCount": 20,
    "totalEntries": 20,
    "firstHadith": 7226,
    "lastHadith": 7245
  },
  {
    "bookNumber": 95,
    "volume": 7,
    "titleArabic": "كتاب أخبار الآحاد",
    "titleUrdu": "اخبار الآحاد",
    "titleEnglish": "News of Individual",
    "hadithCount": 22,
    "totalEntries": 22,
    "firstHadith": 7246,
    "lastHadith": 7267
  },
  {
    "bookNumber": 96,
    "volume": 7,
    "titleArabic": "كتاب الاعتصام بالكتاب والسنة",
    "titleUrdu": "کتاب و سنت سے اعتصام",
    "titleEnglish": "Holding Fast to Quran & Sunnah",
    "hadithCount": 103,
    "totalEntries": 103,
    "firstHadith": 7268,
    "lastHadith": 7370
  },
  {
    "bookNumber": 97,
    "volume": 7,
    "titleArabic": "كتاب التوحيد",
    "titleUrdu": "توحید کا بیان",
    "titleEnglish": "Oneness of Allah (Tawheed)",
    "hadithCount": 193,
    "totalEntries": 193,
    "firstHadith": 7371,
    "lastHadith": 7563
  }
];

const BOOK_MAP = new Map<number, BookMeta>(BOOKS_META.map((b) => [b.bookNumber, b]));
const VOLUME_MAP = new Map<number, VolumeMeta>(VOLUMES_META.map((v) => [v.volume, v]));

export function getBookMeta(bookNumber: number): BookMeta | undefined {
  return BOOK_MAP.get(bookNumber);
}

export function getVolumeMeta(volumeNumber: number): VolumeMeta | undefined {
  return VOLUME_MAP.get(volumeNumber);
}

export function getBooksByVolume(volumeNumber: number): BookMeta[] {
  return BOOKS_META.filter((b) => b.volume === volumeNumber);
}

export const QUICK_TOPICS: QuickTopic[] = [
  {
    "label": "بدء الوحی",
    "query": "وحی"
  },
  {
    "label": "ایمان",
    "query": "ایمان"
  },
  {
    "label": "علم",
    "query": "علم"
  },
  {
    "label": "وضو و طہارت",
    "query": "وضو"
  },
  {
    "label": "غسل",
    "query": "غسل"
  },
  {
    "label": "نماز",
    "query": "نماز"
  },
  {
    "label": "زکوٰۃ",
    "query": "زکوٰۃ"
  },
  {
    "label": "روزہ",
    "query": "روزہ"
  },
  {
    "label": "حج و عمرہ",
    "query": "حج"
  },
  {
    "label": "خرید و فروخت",
    "query": "تجارت"
  },
  {
    "label": "نکاح",
    "query": "نکاح"
  },
  {
    "label": "طلاق",
    "query": "طلاق"
  },
  {
    "label": "قربانی",
    "query": "قربانی"
  },
  {
    "label": "آداب و اخلاق",
    "query": "آداب"
  },
  {
    "label": "دعائیں",
    "query": "دعا"
  },
  {
    "label": "توحید",
    "query": "توحید"
  }
];
