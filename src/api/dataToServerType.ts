export type RootObject = {
  arableLand: number;
  hayfieldsAndPastureImproved: number;
  hayfieldsAndPastureNatural: number;
  seedsContractDeliveries: number;
  winterGrains: RootObjectWinterGrains;
  springGrains: RootObjectSpringGrains;
  pulses: RootObjectPulses;
  rape: RootObjectRape;
  annualGrasses: RootObjectAnnualGrasses;
  cornOnSilage: RootObjectCornOnSilage;
  hayGrassHay: RootObjectHayGrassHay;
  haylageGrassHay: RootObjectHaylageGrassHay;
  greenFodderGrassHay: RootObjectGreenFodderGrassHay;
  hayfieldsOnHay: RootObjectHayfieldsOnHay;
  hayfieldsOnSilage: RootObjectHayfieldsOnSilage;
  pasturesOnGreenFodder: RootObjectPasturesOnGreenFodder;
  pasturesOnSilage: RootObjectPasturesOnSilage;
  hayImprovedHayfieldsAndPastures: RootObjectHayImprovedHayfieldsAndPastures;
  haylageImprovedHayfieldsAndPastures: RootObjectHaylageImprovedHayfieldsAndPastures;
  haylageNaturalHayfieldsAndPastures: RootObjectHaylageNaturalHayfieldsAndPastures;
  greenFodderNaturalHayfieldsAndPastures: RootObjectGreenFodderNaturalHayfieldsAndPastures;
  milk: RootObjectMilk;
  meat: RootObjectMeat;
  concentrates: RootObjectConcentrates;
  silo: RootObjectSilo;
  greenFodder: RootObjectGreenFodder;
  hay: RootObjectHay;
  haylage: RootObjectHaylage;
  straw: RootObjectStraw;
  cows: RootObjectCows;
  youngCattle: RootObjectYoungCattle;
}
export type RootObjectWinterGrains = {
  onFeed: number;
  onProduct: number;
  onSeeds: number;
  yieldForecast: number;
  costPrice: number;
  sellingPricePerCent: number;
}
export type RootObjectSpringGrains = {
  onFeed: number;
  onProduct: number;
  onSeeds: number;
  yieldForecast: number;
  costPrice: number;
  sellingPricePerCent: number;
}
export type RootObjectPulses = {
  onFeed: number;
  onSeeds: number;
  yieldForecast: number;
  costPrice: number;
  sellingPricePerCent: number;
}
export type RootObjectRape = {
  onProduct: number;
  yieldForecast: number;
  costPrice: number;
  sellingPricePerCent: number;
  contractDeliveries: number;
}
export type RootObjectAnnualGrasses = {
  yieldForecast: number;
  onFeed: number;
  sellingPricePerCent: number;
}
export type RootObjectCornOnSilage = {
  onFeed: number;
  yieldForecast: number;
  sellingPricePerCent: number;
}
export type RootObjectHayGrassHay = {
  onFeed: number;
  yieldForecast: number;
  sellingPricePerCent: number;
}
export type RootObjectHaylageGrassHay = {
  onFeed: number;
  yieldForecast: number;
  sellingPricePerCent: number;
}
export type RootObjectGreenFodderGrassHay = {
  onFeed: number;
  yieldForecast: number;
  sellingPricePerCent: number;
}
export type RootObjectHayfieldsOnHay = {
  onFeed: number;
  yieldForecast: number;
}
export type RootObjectHayfieldsOnSilage = {
  onFeed: number;
  yieldForecast: number;
}
export type RootObjectPasturesOnGreenFodder = {
  onFeed: number;
  yieldForecast: number;
}
export type RootObjectPasturesOnSilage = {
  onFeed: number;
  yieldForecast: number;
}
export type RootObjectHayImprovedHayfieldsAndPastures = {
  sellingPricePerCent: number;
}
export type RootObjectHaylageImprovedHayfieldsAndPastures = {
  sellingPricePerCent: number;
}
export type RootObjectHaylageNaturalHayfieldsAndPastures = {
  sellingPricePerCent: number;
}
export type RootObjectGreenFodderNaturalHayfieldsAndPastures = {
  sellingPricePerCent: number;
}
export type RootObjectMilk = {
  price: number;
  sellingPricePerCent: number;
}
export type RootObjectMeat = {
  price: number;
  sellingPricePerCent: number;
}
export type RootObjectConcentrates = {
  volume: number;
  price: number;
}
export type RootObjectSilo = {
  volume: number;
  price: number;
}
export type RootObjectGreenFodder = {
  volume: number;
  price: number;
}
export type RootObjectHay = {
  volume: number;
  price: number;
}
export type RootObjectHaylage = {
  volume: number;
  price: number;
}
export type RootObjectStraw = {
  volume: number;
  price: number;
}
export type RootObjectCows = {
  productivity: number;
  livestock: number;
  consumptionOfFU: number;
}
export type RootObjectYoungCattle = {
  productivity: number;
  livestock: number;
  consumptionOfFU: number;
}
