const isEnd = (
  maximumSlides: number,
  slidePosition: number,
  widthOfContainer: number,
  type: 'next' | 'prev',
  isInfinity: boolean,
): boolean => {
  const fullWidth =
    maximumSlides * Math.abs(widthOfContainer) -
    (isInfinity ? 0 : Math.abs(widthOfContainer));

  const currentPosition =
    Math.abs(slidePosition) +
    (type === 'prev'
      ? -Math.abs(widthOfContainer)
      : Math.abs(widthOfContainer));

  const prevCheck = isInfinity ? currentPosition <= 0 : currentPosition < 0;

  const check =
    currentPosition > fullWidth || // Next check
    prevCheck; // Prev check

  if (check) return true;
  return false;
};

export default isEnd;
