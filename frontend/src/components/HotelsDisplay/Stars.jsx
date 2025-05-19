const Stars = ({ count }) => {
  const starsArray = [];
  for (let i = 0; i < 5; i++) {
    starsArray.push(
      <span key={i} className={i < count ? "star filled" : "star"}>
        &#9733;
      </span>
    );
  }
  return <div className="stars">{starsArray}</div>;
};
export default Stars;
