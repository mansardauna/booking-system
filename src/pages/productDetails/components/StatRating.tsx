import { Star, Star1 } from "iconsax-react";
import React, { useState } from "react";

interface ReviewProps{
  product : any;
}
const Review:React.FC<ReviewProps> = ({ product }) => {
  const [rating, setRating] = useState(0);

  // Function to handle star rating selection
  const handleStarClick = (star:any) => {
    setRating(star);
  };

  // Function to submit the review
  const submitReview = () => {
    // Here, you can send the 'rating' to your server or perform other actions
    console.log("Rating submitted: ", rating);
  };

  return (
    <div className="review-container">
      <h3>Product Review</h3>
      <div className="star-rating">
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            onClick={() => handleStarClick(star)}
            className={`star ${rating >= star ? "filled" : "outline"}`}
          >
            {rating >= star ? <Star /> : <Star1 />}
          </span>
        ))}
      </div>
      <button onClick={submitReview}>Submit Review</button>
    </div>
  );
};

export default Review;
