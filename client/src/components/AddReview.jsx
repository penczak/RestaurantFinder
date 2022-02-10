import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import RestaurantFinder from '../APIs/RestaurantFinder';

const AddReview = () => {

    const {id} = useParams();
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [reviewText, setReviewText] = useState("");
    const [rating, setRating] = useState("Rating");

    const handleSubmit = async (e) => {
        //e.preventDefault(); 
        //Removed a try-catch from this function because I would have no meaningful way of handling the error other than logging it. 
        const response = await RestaurantFinder.post(`/restaurants/${id}/review`, {
            restaurant_id: id,
            name,
            review: reviewText,
            rating,
        });
        //console.log(response);
        navigate(`/restaurants/${id}`);
    };
 
    return <div className='mb-2'>
        <h1 className='display-6'>Add a review</h1>
        <form action="">
            <div className="row g-3">
                {/* added gutter form layout instead */}
                <div className="col">
                    <label htmlFor="name">Name</label>
                    <input value={name} onChange={e => (setName(e.target.value))} id="name" placeholder='Name' className='form-control' type="text" />
                </div>
                <div className="col">
                    <label htmlFor="rating">Rating</label>
                    <select  value={rating} onChange={e => (setRating(e.target.value))}id="rating" className="form-select">
                        {/* changed from 'custom-select' class to 'form-select' for bootstrap to actually recognize it */}
                        <option disabled>Rating</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </select>
                </div>
            </div>
            <div className="form-group">
                <label htmlFor="review">Review</label>
                <textarea  value={reviewText} onChange={e => (setReviewText(e.target.value))}id="review" cols="30" rows="10" className='form-control'></textarea>
            </div>
            {/* <button className="btn btn-primary">Submit</button> */}
            <button className="btn btn-primary" onClick={handleSubmit}>Submit</button>
        </form>
    </div>;
    };

export default AddReview;
