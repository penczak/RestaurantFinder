import React from 'react';
import StarRating from './StarRating';

const Reviews = ({reviews}) => {

    const maxChar = 175;

    return <div className='row row-cols-3 mb-2 justify-content-start'>
        {reviews && reviews.map((review) => {


            //----------Text Overflow----------
            //I started writing functionality for reviews that are too long to be shortened with '...' added which was good until I realized
            //that I don't have a good plan for expanding the cards. Does the whole row expand with it? That seems ugly. Pushing all the other 
            //cards around to accomdate seems ugly too. 
            //---------------------------------
            // const expandCard = () => {
            //     //if review text is actually long..
            //     if (review.review.length > maxChar) {
            //         //expand card

            //     }
            // }
            // onClick={expandCard}

            //if review length is under max, then displayText is original review, otherwise, use substring to return first [maxChar]s of the string + '...' 
            let displayText = (review.review.length <= maxChar) ? review.review : review.review.substring(0,(maxChar + 1))+"...";
            return (
                <div key={review.id} className="card text-white bg-primary m-2" style={{maxWidth: "30%", height: "12rem"}}>
                    <div className="card-header d-flex justify-content-between">
                        <span>{review.name}</span>
                        <span><StarRating rating={review.rating}/></span>
                    </div>
                    <div className="card-body">
                        <p className="card-text">{displayText}</p>
                    </div>
                </div>
            )
        })}

        {/*  Dummy (static) card: 
        <div className="card text-white bg-primary mb-3 mr-4" style={{maxWidth: "30%"}}>
            <div className="card-header d-flex justify-content-between">
                <span>Joanne</span>
                <span><StarRating rating={3}/></span>
            </div>
            <div className="card-body">
                <p className="card-text">This review is hardcoded data!</p>
            </div>
        </div> */}

    </div>;
};

export default Reviews;
