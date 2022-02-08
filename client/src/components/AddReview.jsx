import React, { useState } from 'react';

const AddReview = () => {

    const [name, setName] = useState("");
    const [reviewText, setReviewText] = useState("");
    const [rating, setRating] = useState("Rating");
 
    return <div className='mb-2'>
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
            <button className="btn btn-primary">Submit</button>
        </form>
    </div>;
    };

export default AddReview;
