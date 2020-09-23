export function qwqGetMinMax(
  numArray: readonly (readonly number[])[] | readonly number[]
): { readonly min: number; readonly max: number } {
  const flattenData: number[] = [];
  for (let i = 0; i < numArray.length; i++) {
    const item = numArray[i];
    if (Array.isArray(item)) {
      for (let j = 0; j < item.length; j++) {
        const jtem = item[j];
        if (isFinite(jtem as number)) {
          flattenData.push(jtem as number);
        }
      }
    } else if (isFinite(item as number)) {
      flattenData.push(item as number);
    }
  }

  let minOrUndefined: number | undefined = undefined;
  let maxOrUndefined: number | undefined = undefined;

  for (let index = 0; index < flattenData.length; index++) {
    const num = flattenData[index];
    if (minOrUndefined === undefined || num < minOrUndefined) {
      minOrUndefined = num;
    }
    if (maxOrUndefined === undefined || num > maxOrUndefined) {
      maxOrUndefined = num;
    }
  }
  const max =
    maxOrUndefined !== undefined && isFinite(maxOrUndefined)
      ? maxOrUndefined || 0
      : 10;
  const min =
    minOrUndefined !== undefined && isFinite(minOrUndefined)
      ? minOrUndefined || 0
      : 0;
  return { min, max };
}
