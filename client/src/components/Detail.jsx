import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import RestaurantFinder from '../APIs/RestaurantFinder';

const Detail = () => {

    const { id } = useParams();
    let navigate = useNavigate(); //navigate instead of history = useHistory in newer versions of react-router-dom
    const [name, setName] = useState("");
    const [location, setLocation] = useState("");
    const [priceRange, setPriceRange] = useState("");

    useEffect(() => {

        const fetchData = async () => {
            try {

                const response = await RestaurantFinder.get(`/restaurants/${id}`);
                console.log(response.data.data);
                setName(response.data.data.restaurants.name);
                setLocation(response.data.data.restaurants.location);
                setPriceRange(response.data.data.restaurants.price_range);
            }
            catch (err) { console.log(err) }
        }

        fetchData();
    }, [id]);

    return (
    <div>
        <h1 className='text-center'>{name} 🍔</h1>
    </div>
    );
};

export default Detail;
