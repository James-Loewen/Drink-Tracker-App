const ETHANOL_GRAMS_PER_MILLILITER = 0.79;
const GRAMS_OF_ETHANOL = 14;

function calculateStandardDrinks(
  volume: number,
  abv: number,
  ethanolGrams = GRAMS_OF_ETHANOL
) {
  abv = abv / 100;
  const totalEthanolVolume = volume * abv;
  return totalEthanolVolume / (ethanolGrams / ETHANOL_GRAMS_PER_MILLILITER);
}

export default calculateStandardDrinks;
