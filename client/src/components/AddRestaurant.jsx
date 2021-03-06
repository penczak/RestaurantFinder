import React, { useContext, useState } from 'react';
import RestaurantFinder from '../APIs/RestaurantFinder';
import { RestaurantsContext } from '../context/RestaurantsContext';

const AddRestaurant = () => {
    const {addRestaurants} = useContext(RestaurantsContext);
    const [name, setName] = useState("");
    const [location, setLocation] = useState("");
    const [priceRange, setPriceRange] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault(); 
        try {
            const response = await RestaurantFinder.post("/", {
                name,
                location,
                price_range: priceRange,
            });
            console.log(response);
            addRestaurants(response.data.data.restaurants);
        } catch (err) {
    
        }
    };
    return (
    <div className='mb-4'>
        <form action="">
            <div className="form-row">
                <div className="col">
                    <input value={name} onChange={e => (setName(e.target.value))} type="text" className='form-control' placeholder="Name"/>
                </div>
                <div className="col">
                    <input value={location} onChange={e => (setLocation(e.target.value))}type="text" className='form-control' placeholder="Location"/>
                </div>
                <div className="col">
                    <select value={priceRange} onChange={e => (setPriceRange(e.target.value))}className='form-select my-1 mr-sm-2'>
                        {/* changed from 'custom-select' class to 'form-select' for bootstrap to actually recognize it */}
                        <option disabled>Price Range</option>
                        <option value="1">$</option>
                        <option value="2">$$</option>
                        <option value="3">$$$</option>
                        <option value="4">$$$$</option>
                        <option value="5">$$$$$</option>
                    </select>
                </div>
                <button onClick={handleSubmit} type="submit" className="btn btn-warning">Add</button> 
                {/* //onClick={handleSubmit} */}
            </div>
        </form>
    </div>
  );
};

export default AddRestaurant;
