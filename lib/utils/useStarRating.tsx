export default function useStarRating(rating: number) {
  const ratings = String(rating).split('.');
  let fullStars = Number(ratings[0]);
  let halfStars = 0;
  let emptyStars = 0;
  let total = 5;

  if (Number(ratings[1]) >= 5) {
    halfStars = 1;
  }

  emptyStars = total - fullStars - halfStars;

  return {
    fullStars: Number(fullStars),
    halfStars: Number(halfStars),
    emptyStars: Number(emptyStars),
  };
}
