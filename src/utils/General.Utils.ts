export const timeTracker = async <T extends any[], R>(
  funct: (...args: T) => Promise<R> | R,
  ...args: T
) => {
  const startTime = performance.now();
  try {
    await funct(...args);
  } catch (e) {
    console.log(e);
  } finally {
    const endTime = performance.now();
    return endTime - startTime;
  }
};
