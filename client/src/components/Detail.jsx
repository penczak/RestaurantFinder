import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import RestaurantFinder from '../APIs/RestaurantFinder';
import { RestaurantsContext } from '../context/RestaurantsContext';
import AddReview from './AddReview';
import Reviews from './Reviews';
import StarRating from './StarRating';

const Detail = () => {

    const { id } = useParams();
    const { selectedRestaurant, setSelectedRestaurant } = useContext(RestaurantsContext); 


    useEffect(() => {

        const fetchData = async () => {
            try {
                //using Context instead of useState for a larger object? I couldnt get useState to hold an object that was retrieved from the backend. 
                const response = await RestaurantFinder.get(`/restaurants/${id}`);
                console.log("res.data.data", response.data.data);
                setSelectedRestaurant(response.data.data);                
            }
            catch (err) { console.log(err); }
        };

        fetchData();
    }, []);

    const renderRating = () => {
		if (selectedRestaurant.restaurants.count > 0) {
			return (
				<>
					<StarRating rating={selectedRestaurant.restaurants.average_rating}/>
					<span className='text-warning m-2'>({selectedRestaurant.restaurants.count})</span>
				</>
			);
		} else {
			return (
				<>
					<span className='text-warning m-2'>(No reviews)</span>
				</>
			);
		}
	}

    //console.log(selectedRestaurant);
    return (
    <div>
        { console.log(selectedRestaurant) }
        { selectedRestaurant && (
            <>
                <div className='text-center'>
                    <h1 className='display-1'>{selectedRestaurant.restaurants.name}</h1>
                    <p className='display-6'>{renderRating()}</p>
                    <p className='display-5'>{selectedRestaurant.restaurants.location}</p>
                    <p className='display-6'>Price Range: {"$".repeat(selectedRestaurant.restaurants.price_range)}</p>
                </div>
                <div className="mt-3">
                    <Reviews reviews={selectedRestaurant.reviews}/>
                </div>
                <AddReview/>
            </>
        )}
    </div>
    );
};

export default Detail;
