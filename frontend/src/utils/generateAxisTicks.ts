function getHighest(data: any) {
  const highest = data.reduce(
    (acc: number, obj: any) =>
      Math.max(acc, obj.Containers, obj["Standard Drinks"]),
    0
  );
  return highest;
}

function generateAxisTicks(data: any) {
  const highest = getHighest(data);
  const ticks = [];
  for (let i = 0; i <= highest; i++) {
    ticks.push(i);
  }
  return ticks;
}

export default generateAxisTicks;
