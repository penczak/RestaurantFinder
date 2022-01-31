import React, { useContext, useEffect } from 'react';
import RestaurantFinder from '../APIs/RestaurantFinder';
import { RestaurantsContext } from '../context/RestaurantsContext';
import { useNavigate } from 'react-router-dom'

const RestaurantList = (props) => {

	const { restaurants, setRestaurants } = useContext(RestaurantsContext)
	let navigate = useNavigate();

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await RestaurantFinder.get('/'); //get entire restaurants table from Postgres
				setRestaurants(response.data.data.restaurants); //then store response in the RestaurantsContext
			}
			catch (err) { console.log(err) }
		}

		fetchData();
	}, []);

	const handleDelete = async (id) => {
		try {
			const response = await RestaurantFinder.delete(`/restaurants/${id}`); //send delete request to server
			console.log(response); //should be empty?
			setRestaurants(restaurants.filter(restaurant => {
				return restaurant.id !== id; //filter here iterates over every entry, here named 'restaurant' and then will return it to a new array as long as that restaurant.id !== the id of the restaurant we are deleting. 
			}));
		} catch (err) {
			console.log(err);
		}
	};

	const goToUpdate = (id) => {
		navigate(`/restaurants/${id}/update`);
	}

	const goToDetail = (id) => {
		navigate(`/restaurants/${id}`);
	}

	return (
		<div className='list-group'>
			<table className="table table-hover table-dark">
				<thead>
					<tr className='bg-primary'>
						<th scope="col">Restaurant</th>
						<th scope="col">Location</th>
						<th scope="col">Price Range</th>
						<th scope="col">Rating</th>
						<th scope="col">Detail</th>
						<th scope="col">Edit</th>
						<th scope="col">Delete</th>
					</tr>
				</thead>
				<tbody>
					{/* {restaurants && restaurants.map(restaurant => {
						Should use ternary operator instead of &&?  */}
					{restaurants && restaurants.map(restaurant => {
						return <tr key={restaurant.id}>
							{/* Having the goToDetail under an onClick over the entire row (tr component) was giving me
							the issue of the home page always instantly redirecting to a detail page (always id=5??)
							I made the Detail button as a work-around (+I think it's better UI design) but accidentally left the 
							onClick goToDetail in the row which was still giving the same bug, when I thought something was wrong
							within the button.   */}
							<td>{restaurant.name}</td>
							<td>{restaurant.location}</td>
							<td>{"$".repeat(restaurant.price_range)}</td>
							<td>Reviews~</td>
							<td><button onClick={() => goToDetail(restaurant.id)} className="btn btn-warning">Detail</button></td>
							<td><button onClick={() => goToUpdate(restaurant.id)} className="btn btn-warning">Update</button></td>
							<td><button onClick={() => handleDelete(restaurant.id)} className="btn btn-warning">Delete</button></td>
						</tr>
					})}
				</tbody>
			</table>
		</div>
	);
};

export default RestaurantList;

