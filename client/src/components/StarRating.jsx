import React from 'react';

const StarRating = ({rating}) => {
    const stars = [];
  
    for (let i=1; i <= 5; i++) {
        if (i <= rating) {
            stars.push(<i className="fas fa-star text-warning" key={i}></i>);
        } else if (i === Math.ceil(rating)) {
            stars.push(<i className="fas fa-star-half-alt text-warning" key={i}></i>)
        } else {
            stars.push(<i className="far fa-star text-warning" key={i}></i>)
        }
    };

    return (
        <>{stars}</>
    );
};

export default StarRating;
