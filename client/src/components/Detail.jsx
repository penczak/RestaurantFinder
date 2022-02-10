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
    const [name, setName] = useState("");
    const [location, setLocation] = useState("");
    const [priceRange, setPriceRange] = useState("");

    useEffect(() => {

        const fetchData = async () => {
            try {
                //using Context instead of useState for a larger object? I couldnt get useState to hold an object that was retrieved from the backend. 
                const response = await RestaurantFinder.get(`/restaurants/${id}`);
                setSelectedRestaurant(response.data.data);
                setName(response.data.data.restaurants.name);
                setLocation(response.data.data.restaurants.location);
                setPriceRange(response.data.data.restaurants.price_range)
            }
            catch (err) { console.log(err) }
        }

        fetchData();
    }, []);

    //console.log(selectedRestaurant);
    return (
    <div>
        {selectedRestaurant && (
            <>
                <div className='text-center'>
                    <h1 className='display-1'>{name}</h1>
                    <p className='display-5'>{location}</p>
                    <p className='display-6'>Price Range: {"$".repeat(priceRange)}</p>
                    {/* <h1>{selectedRestaurant.restaurants.name} 🍔</h1>
                    <p>{selectedRestaurant.restaurants.location}</p>
                    <p>Price Range: {"$".repeat(selectedRestaurant.restaurants.price_range)}</p> */}
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
