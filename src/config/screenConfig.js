export const getScreenConfig = (selectedFarm) => ({
  AddPackageScreen: (block) => ({
    screenName: 'AddPackageScreen',
    params: {
      animalID: block.animalOwnerUsers?.[0]?.animalID,
      blockData: block,
      animalOwnerUserId: block.animalOwnerUsers?.[0]?.animalOwnerUserId,
    },
  }),
  AddAnimalScreen: (block) => ({
    screenName: 'AddAnimalScreen',
    params: {
      blockData: block,
      farmID: selectedFarm,
    },
  }),
  InfoScreen: (block) => ({
    screenName: 'InfoScreen',
    params: {
      blockData: block,
      endDate: block.endDate,
    },
  }),
  MainImageScreen: (block) => ({
    screenName: 'MainImageScreen',
    params: {
      blockData: block,
    },
  }),
})
