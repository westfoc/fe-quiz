export function shuffle<T>(arr: T[]): T[] {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const v = arr[i];
    const v2 = arr[j];
    if (v != null && v2 != null) {
      const temp = v;
      arr[i] = v2;
      arr[j] = temp;
    }
  }
  return arr;
}
