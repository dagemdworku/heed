export const formatTime = (seconds: number) => {
  const round = Math.round(seconds);
  const s = round % 60;
  const minutes = Math.round((round - s) / 60);
  const m = minutes % 60;
  const h = Math.round((minutes - m) / 60);

  return `${h ? h + ":" : ""}${m > 9 ? m : "0" + m}:${s > 9 ? s : "0" + s}`;
};

export function isBetween(
  currentTime?: number,
  beginTime?: number,
  endTime?: number
): boolean {
  if (
    currentTime === undefined ||
    beginTime === undefined ||
    endTime === undefined
  )
    return false;

  if (currentTime < beginTime) return false;
  if (currentTime > endTime) return false;

  return true;
}
