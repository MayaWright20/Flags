export const randomNumberGenerator = (maxVal: number) => {
  return Math.floor(Math.random() * maxVal);
};

export const randomNumbers = (length: number, maxVal: number): number[] => {
  const picked = new Set<number>();
  while (picked.size < length) {
    picked.add(Math.floor(Math.random() * maxVal));
  }
  return [...picked];
};
