import { Masla } from '../types/fatwa';
import { EXTRA_MASAIL_A } from './extraMasailA';
import { EXTRA_MASAIL_B } from './extraMasailB';
import { EXTRA_MASAIL_C } from './extraMasailC';
import { VOLUMES_1_TO_5 } from './volumes1to5';
import { VOLUMES_6_TO_10 } from './volumes6to10';
import { VOLUMES_11_TO_15 } from './volumes11to15';
import { VOLUMES_16_TO_20 } from './volumes16to20';
import { VOLUMES_21_TO_25 } from './volumes21to25';
import { VOLUMES_26_TO_30 } from './volumes26to30';
import { VOLUMES_30_EXTRA } from './volumes30Extra';
import { VOLUMES_EXPANDED_A } from './volumesExpandedA';
import { VOLUMES_EXPANDED_B } from './volumesExpandedB';
import { VOLUMES_META } from './volumesMeta';

const RAW_MASAIL: Masla[] = [
  ...VOLUMES_1_TO_5,
  ...VOLUMES_6_TO_10,
  ...VOLUMES_11_TO_15,
  ...VOLUMES_16_TO_20,
  ...VOLUMES_21_TO_25,
  ...VOLUMES_26_TO_30,
  ...EXTRA_MASAIL_A,
  ...EXTRA_MASAIL_B,
  ...EXTRA_MASAIL_C,
  ...VOLUMES_EXPANDED_A,
  ...VOLUMES_EXPANDED_B,
  ...VOLUMES_30_EXTRA,
];

const volumeCounters = new Map<number, number>();

export const ALL_MASAIL: Masla[] = [...RAW_MASAIL]
  .sort((a, b) => a.volume - b.volume)
  .map((m, idx) => {
    const volInfo = VOLUMES_META.find((v) => v.volume === m.volume);
    const nextNum = (volumeCounters.get(m.volume) ?? 0) + 1;
    volumeCounters.set(m.volume, nextNum);

    const matchingBab =
      m.bab ??
      volInfo?.abwab.find((b) => b.includes(m.topic)) ??
      volInfo?.abwab[idx % (volInfo?.abwab.length || 1)] ??
      `باب ${m.topic}`;
    const matchingRisala =
      m.risalaName ??
      volInfo?.rasail[idx % (volInfo?.rasail.length || 1)] ??
      'فتاویٰ رضویہ — عمومی فتویٰ';
    const computedPage =
      m.pageRef ?? `جلد ${m.volume}، ${matchingBab}`;

    return {
      ...m,
      sawalNumber: m.sawalNumber ?? nextNum,
      bab: matchingBab,
      risalaName: matchingRisala,
      pageRef: computedPage,
    };
  });

export function getMasailByVolume(volumeNumber: number): Masla[] {
  return ALL_MASAIL.filter((m) => m.volume === volumeNumber);
}

export function getMaslaById(id: string): Masla | undefined {
  return ALL_MASAIL.find((m) => m.id === id);
}

export const TOTAL_PRINTED_PAGES: number = VOLUMES_META.reduce(
  (acc, v) => acc + v.printedPages,
  0
);

export const TOTAL_PRINTED_FATWAS: number = VOLUMES_META.reduce(
  (acc, v) => acc + v.totalFatwas,
  0
);

export const TOTAL_RASAIL: number = VOLUMES_META.reduce(
  (acc, v) => acc + v.rasailCount,
  0
);
