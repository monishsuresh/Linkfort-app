export const renderStars = (rating: number) => {
    const roundedRating = Math.round(rating * 2) / 2; // round to nearest 0.5
    const fullStars = Math.floor(roundedRating);
    const hasHalfStar = roundedRating % 1 === 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    return (
        "⭐".repeat(fullStars) +
        (hasHalfStar ? "✨" : "") +
        "☆".repeat(emptyStars)
    );
};