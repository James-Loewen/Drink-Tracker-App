function getHighest(data: any) {
  const highest = data.reduce(
    (acc: number, obj: any) =>
      Math.max(acc, obj.Containers, obj["Standard Drinks"]),
    0
  );
  return highest;
}

function generateAxisTicks(data: any, defaultMax: number = 4) {
  const highest = Math.max(Math.ceil(getHighest(data)), defaultMax);
  const ticks = [];

  /**
   * This is an attempt to programmatically scale the y-axis step value.
   * A different charting library might not require something like this.
   */
  const step = Math.max(Math.floor(highest / 12), 1);

  for (let i = 0; i <= highest; i += step) {
    ticks.push(i);
  }

  return ticks;
}

export default generateAxisTicks;
