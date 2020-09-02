export const getAmountValue = (value: number, rate: number) => {
  const amount = value / rate;
  return amount.toFixed(8)
}
