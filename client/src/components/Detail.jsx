import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import RestaurantFinder from '../APIs/RestaurantFinder';
import { RestaurantsContext } from '../context/RestaurantsContext';
import AddReview from './AddReview';
import Reviews from './Reviews';
import StarRating from './StarRating';

const Detail = () => {

    const { id } = useParams();
    let navigate = useNavigate(); //navigate instead of history = useHistory in newer versions of react-router-dom
    const { selectedRestaurant, setSelectedRestaurant } = useContext(RestaurantsContext); 

    useEffect(() => {

        const fetchData = async () => {
            try {
                //using Context instead of useState for a larger object? I couldnt get useState to hold an object that was retrieved from the backend. 
                const response = await RestaurantFinder.get(`/restaurants/${id}`);
                setSelectedRestaurant(response.data.data);
            }
            catch (err) { console.log(err) }
        }

        fetchData();
    }, []);

    console.log(selectedRestaurant);
    return (
    <div>
        <div className='text-center'>
            <h1>{selectedRestaurant && selectedRestaurant.restaurants.name} 🍔</h1>
            <p>{selectedRestaurant && selectedRestaurant.restaurants.location}</p>
            <p>Price Range: {"$".repeat(selectedRestaurant && selectedRestaurant.restaurants.price_range)}</p>
            {/* <h1>{selectedRestaurant.restaurants.name} 🍔</h1>
            <p>{selectedRestaurant.restaurants.location}</p>
            <p>Price Range: {"$".repeat(selectedRestaurant.restaurants.price_range)}</p> */}
        </div>
        <div className="mt-3">
            <Reviews reviews={selectedRestaurant}/>
        </div>
        <AddReview/>
    </div>
    );
};

export default Detail;
