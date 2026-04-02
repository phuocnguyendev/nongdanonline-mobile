import type { Block } from '../types/api.types';

interface ScreenConfig {
  screenName: string;
  params: Record<string, unknown>;
}

interface ScreenConfigMap {
  AddPackageScreen: (block: Block) => ScreenConfig;
  AddAnimalScreen: (block: Block) => ScreenConfig;
  InfoScreen: (block: Block) => ScreenConfig;
  MainImageScreen: (block: Block) => ScreenConfig;
}

export const getScreenConfig = (selectedFarm: string): ScreenConfigMap => ({
  AddPackageScreen: (block: Block): ScreenConfig => ({
    screenName: 'AddPackageScreen',
    params: {
      animalID: block.animalOwnerUsers?.[0]?.animalID,
      blockData: block,
      animalOwnerUserId: block.animalOwnerUsers?.[0]?.animalOwnerUserId,
    },
  }),
  AddAnimalScreen: (block: Block): ScreenConfig => ({
    screenName: 'AddAnimalScreen',
    params: {
      blockData: block,
      farmID: selectedFarm,
    },
  }),
  InfoScreen: (block: Block): ScreenConfig => ({
    screenName: 'InfoScreen',
    params: {
      blockData: block,
      endDate: block.endDate,
    },
  }),
  MainImageScreen: (block: Block): ScreenConfig => ({
    screenName: 'MainImageScreen',
    params: {
      blockData: block,
    },
  }),
});
