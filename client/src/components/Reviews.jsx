import React from 'react';
import StarRating from './StarRating';

const Reviews = ({reviews}) => {
  
  return <div className='row row-cols-3 mb-2'>
      {/* {reviews.map((review) => {
            <div className="card text-white bg-primary mb-3 mr-4" style={{maxWidth: "30%"}}>
                <div className="card-header d-flex justify-content-between">
                    <span>{review.name}</span>
                    <span><StarRating rating={3}/></span>
                </div>
                <div className="card-body">
                    <p className="card-text">Epic restaurant!</p>
                </div>
            </div>
      })} */}

      <div className="card text-white bg-primary mb-3 mr-4" style={{maxWidth: "30%"}}>
          <div className="card-header d-flex justify-content-between">
              <span>Joanne</span>
              <span><StarRating rating={3}/></span>
          </div>
          <div className="card-body">
              <p className="card-text">This review is hardcoded data!</p>
          </div>
      </div>

  </div>;
};

export default Reviews;
