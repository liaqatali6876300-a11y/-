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

export const ALL_MASAIL: Masla[] = [
  ...VOLUMES_1_TO_5,
  ...VOLUMES_6_TO_10,
  ...VOLUMES_11_TO_15,
  ...VOLUMES_16_TO_20,
  ...VOLUMES_21_TO_25,
  ...VOLUMES_26_TO_30,
  ...EXTRA_MASAIL_A,
  ...EXTRA_MASAIL_B,
  ...EXTRA_MASAIL_C,
].sort((a, b) => a.volume - b.volume);

export function getMasailByVolume(volumeNumber: number): Masla[] {
  return ALL_MASAIL.filter((m) => m.volume === volumeNumber);
}

export function getMaslaById(id: string): Masla | undefined {
  return ALL_MASAIL.find((m) => m.id === id);
}
