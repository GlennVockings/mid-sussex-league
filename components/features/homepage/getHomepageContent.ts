import { mockHomepageData } from "@/data/mock/homepage";
import type { HomepageData } from "@/types/homepage";

export async function getHomepageContent(): Promise<HomepageData> {
  /*
   * Prototype implementation.
   *
   * Later this function can call repositories/services:
   *
   * const matches = await fixtureRepository.getTrending();
   * const standings = await standingsRepository.getCurrent();
   * const videos = await videoRepository.getTrending();
   *
   * return buildHomepageFeed(...);
   */

  return mockHomepageData;
}
