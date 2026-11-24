import { Hadith, RawHadithRecord } from '../types/hadith';
import { VOLUMES_META } from './bukhariMeta';

const volumeCache = new Map<number, Hadith[]>();
const volumePromises = new Map<number, Promise<Hadith[]>>();
const hadithByIdCache = new Map<string, Hadith>();
let allLoadedPromise: Promise<Hadith[]> | null = null;

function mapRecord(raw: RawHadithRecord): Hadith {
  return {
    id: raw.id,
    hadithNumber: raw.n,
    bookNumber: raw.b,
    volume: raw.v,
    isPrimary: raw.p === 1,
    narrator: raw.r,
    arabicText: raw.a,
    urduText: raw.u,
  };
}

export function getCachedVolumeHadiths(volumeNumber: number): Hadith[] | undefined {
  return volumeCache.get(volumeNumber);
}

export function getCachedAllHadiths(): Hadith[] {
  const result: Hadith[] = [];
  for (let v = 1; v <= VOLUMES_META.length; v++) {
    const list = volumeCache.get(v);
    if (list) result.push(...list);
  }
  return result;
}

export function getLoadedHadithCount(): number {
  let total = 0;
  for (const list of volumeCache.values()) {
    total += list.length;
  }
  return total;
}

export function getHadithByIdSync(id: string): Hadith | undefined {
  return hadithByIdCache.get(id);
}

export async function loadVolumeHadiths(volumeNumber: number): Promise<Hadith[]> {
  const existing = volumeCache.get(volumeNumber);
  if (existing) return existing;

  const inflight = volumePromises.get(volumeNumber);
  if (inflight) return inflight;

  const promise = (async () => {
    const res = await fetch(`/data/vol-${volumeNumber}.json`);
    if (!res.ok) {
      throw new Error(`Failed to load volume ${volumeNumber}`);
    }
    const rawList: RawHadithRecord[] = await res.json();
    const mapped = rawList.map(mapRecord);
    volumeCache.set(volumeNumber, mapped);
    for (const h of mapped) {
      hadithByIdCache.set(h.id, h);
    }
    return mapped;
  })();

  volumePromises.set(volumeNumber, promise);
  try {
    return await promise;
  } catch (err) {
    volumePromises.delete(volumeNumber);
    throw err;
  }
}

export async function loadAllVolumes(
  onVolumeLoaded?: (loadedVolumes: number, loadedHadiths: number) => void
): Promise<Hadith[]> {
  if (allLoadedPromise) return allLoadedPromise;

  allLoadedPromise = (async () => {
    let completed = 0;
    await Promise.all(
      VOLUMES_META.map(async (vol) => {
        await loadVolumeHadiths(vol.volume);
        completed += 1;
        onVolumeLoaded?.(completed, getLoadedHadithCount());
      })
    );
    return getCachedAllHadiths();
  })();

  try {
    return await allLoadedPromise;
  } catch (err) {
    allLoadedPromise = null;
    throw err;
  }
}

export function findVolumeForHadithNumber(hadithIdOrNum: string): number | undefined {
  const numStr = hadithIdOrNum.replace(/^sb-/, '');
  const n = Math.floor(Number(numStr));
  if (!Number.isFinite(n) || n <= 0) return undefined;
  const vol = VOLUMES_META.find((v) => n >= v.firstHadith && n <= v.lastHadith);
  return vol?.volume;
}

export async function loadHadithById(id: string): Promise<Hadith | undefined> {
  const cached = hadithByIdCache.get(id);
  if (cached) return cached;

  const likelyVol = findVolumeForHadithNumber(id);
  if (likelyVol) {
    await loadVolumeHadiths(likelyVol);
    const hit = hadithByIdCache.get(id);
    if (hit) return hit;
  }

  await loadAllVolumes();
  return hadithByIdCache.get(id);
}
