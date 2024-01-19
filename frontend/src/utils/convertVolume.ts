export function ouncesToMilliliters(oz: number, decimals: null | number = 3) {
  let mL = oz * 29.5735;

  if (decimals !== null) {
    mL = +mL.toFixed(decimals);
  }

  return mL;
}

export function millilitersToOunces(mL: number, decimals: null | number = 1) {
  let oz = mL / 29.5735;

  if (decimals !== null) {
    oz = +oz.toFixed(decimals);
  }

  return oz;
}
