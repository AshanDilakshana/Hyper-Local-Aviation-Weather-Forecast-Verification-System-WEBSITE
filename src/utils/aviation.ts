/** Magnus-type approximation of relative humidity from temperature and dew point (°C). */
export function relativeHumidity(tempC: number, dewPointC: number): number {
  const a = 17.625;
  const b = 243.04;
  const rh = 100 * Math.exp(a * dewPointC / (b + dewPointC) - a * tempC / (b + tempC));
  return Math.min(100, Math.max(0, rh));
}