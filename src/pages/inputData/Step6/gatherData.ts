import { saveDataToServer } from '../../../api/api'
import { AppRootStateType } from '../../../state/store'
import { RootObject } from '../../../api/dataToServerType'

export const gatherData = async (state: AppRootStateType) => {

  const rootObject: RootObject = {
    arableLand: state.landResources.arableLand ?? 0,
    hayfieldsAndPastureImproved: state.landResources.hayfieldsAndPastureImproved ?? 0,
    hayfieldsAndPastureNatural: state.landResources.hayfieldsAndPastureNatural ?? 0,
    seedsContractDeliveries: state.cultures.seeds.contractDeliveries ?? 0,
    winterGrains: {
      onFeed: state.cultures.winterGrains.onFeed ?? 0,
      onProduct: state.cultures.winterGrains.onProduct ?? 0,
      onSeeds: state.cultures.winterGrains.onSeeds ?? 0,
      yieldForecast: state.cultures.winterGrains.yieldForecast ?? 0,
      costPrice: state.cultures.winterGrains.costPrice ?? 0,
      sellingPricePerCent: state.cultures.winterGrains.sellingPricePerCent ?? 0
    },
    springGrains: {
      onFeed: state.cultures.springGrains.onFeed ?? 0,
      onProduct: state.cultures.springGrains.onProduct ?? 0,
      onSeeds: state.cultures.springGrains.onSeeds ?? 0,
      yieldForecast: state.cultures.springGrains.yieldForecast ?? 0,
      costPrice: state.cultures.springGrains.costPrice ?? 0,
      sellingPricePerCent: state.cultures.springGrains.sellingPricePerCent ?? 0
    },
    pulses: {
      onFeed: state.cultures.pulses.onFeed ?? 0,
      onSeeds: state.cultures.pulses.onSeeds ?? 0,
      yieldForecast: state.cultures.pulses.yieldForecast ?? 0,
      costPrice: state.cultures.pulses.costPrice ?? 0,
      sellingPricePerCent: state.cultures.pulses.sellingPricePerCent ?? 0
    },
    rape: {
      onProduct: state.cultures.rape.onProduct ?? 0,
      yieldForecast: state.cultures.rape.yieldForecast ?? 0,
      costPrice: state.cultures.rape.costPrice ?? 0,
      sellingPricePerCent: state.cultures.rape.sellingPricePerCent ?? 0,
      contractDeliveries: state.cultures.rape.contractDeliveries ?? 0
    },
    annualGrasses: {
      yieldForecast: state.cultures.annualGrasses.yieldForecast ?? 0,
      onFeed: state.cultures.annualGrasses.onFeed ?? 0,
      sellingPricePerCent: state.cultures.annualGrasses.sellingPricePerCent ?? 0
    },
    cornOnSilage: {
      onFeed: state.cultures.cornOnSilage.onFeed ?? 0,
      yieldForecast: state.cultures.cornOnSilage.yieldForecast ?? 0,
      sellingPricePerCent: state.cultures.cornOnSilage.sellingPricePerCent ?? 0
    },
    hayGrassHay: {
      onFeed: state.cultures.hayGrassHay.onFeed ?? 0,
      yieldForecast: state.cultures.hayGrassHay.yieldForecast ?? 0,
      sellingPricePerCent: state.cultures.hayGrassHay.sellingPricePerCent ?? 0
    },
    haylageGrassHay: {
      onFeed: state.cultures.haylageGrassHay.onFeed ?? 0,
      yieldForecast: state.cultures.haylageGrassHay.yieldForecast ?? 0,
      sellingPricePerCent: state.cultures.haylageGrassHay.sellingPricePerCent ?? 0
    },
    greenFodderGrassHay: {
      onFeed: state.cultures.greenFodderGrassHay.onFeed ?? 0,
      yieldForecast: state.cultures.greenFodderGrassHay.yieldForecast ?? 0,
      sellingPricePerCent: state.cultures.greenFodderGrassHay.sellingPricePerCent ?? 0
    },
    hayfieldsOnHay: {
      onFeed: state.cultures.hayImprovedHayfieldsAndPastures.onFeed ?? 0,
      yieldForecast: state.cultures.hayImprovedHayfieldsAndPastures.yieldForecast ?? 0
    },
    hayfieldsOnSilage: {
      onFeed: state.cultures.haylageImprovedHayfieldsAndPastures.onFeed ?? 0,
      yieldForecast: state.cultures.haylageImprovedHayfieldsAndPastures.yieldForecast ?? 0
    },
    pasturesOnGreenFodder: {
      onFeed: state.cultures.greenFodderNaturalHayfieldsAndPastures.onFeed ?? 0,
      yieldForecast: state.cultures.greenFodderNaturalHayfieldsAndPastures.yieldForecast ?? 0
    },
    pasturesOnSilage: {
      onFeed: state.cultures.haylageNaturalHayfieldsAndPastures.onFeed ?? 0,
      yieldForecast: state.cultures.haylageNaturalHayfieldsAndPastures.yieldForecast ?? 0
    },
    hayImprovedHayfieldsAndPastures: {
      sellingPricePerCent: state.cultures.hayImprovedHayfieldsAndPastures.sellingPricePerCent ?? 0
    },
    haylageImprovedHayfieldsAndPastures: {
      sellingPricePerCent: state.cultures.haylageImprovedHayfieldsAndPastures.sellingPricePerCent ?? 0
    },
    haylageNaturalHayfieldsAndPastures: {
      sellingPricePerCent: state.cultures.haylageNaturalHayfieldsAndPastures.sellingPricePerCent ?? 0
    },
    greenFodderNaturalHayfieldsAndPastures: {
      sellingPricePerCent: state.cultures.greenFodderNaturalHayfieldsAndPastures.sellingPricePerCent ?? 0
    },
    milk: {
      price: state.livestockProducts.milk.costPrice ?? 0,
      sellingPricePerCent: state.livestockProducts.milk.sellingPricePerCent ?? 0
    },
    meat: {
      price: state.livestockProducts.cattleMeat.costPrice ?? 0,
      sellingPricePerCent: state.livestockProducts.cattleMeat.sellingPricePerCent ?? 0
    },
    concentrates: {
      volume: state.feeds.concentrates.volume ?? 0,
      price: state.feeds.concentrates.price ?? 0
    },
    silo: {
      volume: state.feeds.silo.volume ?? 0,
      price: state.feeds.silo.price ?? 0
    },
    greenFodder: {
      volume: state.feeds.greenFodder.volume ?? 0,
      price: state.feeds.greenFodder.price ?? 0
    },
    hay: {
      volume: state.feeds.hay.volume ?? 0,
      price: state.feeds.hay.price ?? 0
    },
    haylage: {
      volume: state.feeds.haylage.volume ?? 0,
      price: state.feeds.haylage.price ?? 0
    },
    straw: {
      volume: state.feeds.straw.volume ?? 0,
      price: state.feeds.straw.price ?? 0
    },
    cows: {
      productivity: state.animals.cows.productivity ?? 25,
      livestock: state.animals.cows.livestock ?? 0,
      consumptionOfFU: state.animals.cows.consumptionOfFU ?? 0
    },
    youngCattle: {
      productivity: state.animals.youngCattle.productivity ?? 350,
      livestock: state.animals.youngCattle.livestock ?? 0,
      consumptionOfFU: state.animals.youngCattle.consumptionOfFU ?? 0
    }
  };
  console.log('Sending data to server:', rootObject);

  try {
    await saveDataToServer(rootObject);
  } catch (error) {
    console.error('Failed to save data:', error);
  }
};