export function ouncesToMilliliters(oz: number) {
  const mL = +(oz * 29.5735).toFixed(3);
  return mL;
}

export function millilitersToOunces(mL: number) {
  const oz = +(mL / 29.5735).toFixed(3);
  return oz;
}
