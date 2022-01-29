import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; //navigate instead of history = useHistory in newer versions of react-router-dom
import RestaurantFinder from '../APIs/RestaurantFinder';


const Update = (props) => {
    // const {restaurants} = useContext(RestaurantsContext)
    const {id} = useParams();
    let navigate = useNavigate(); //navigate instead of history = useHistory in newer versions of react-router-dom
    const [name, setName] = useState("");
    const [location, setLocation] = useState("");
    const [priceRange, setPriceRange] = useState("");

    useEffect(() => {
        
        const fetchData = async () => {
            try {
                
            const response = await RestaurantFinder.get(`/${id}`);
            //MISTAKE: setRestaurants(response.data.data.restaurants); 
            //instead of context, do useState and set[Value]
            console.log(response.data.data);
            setName(response.data.data.restaurants.name);
            setLocation(response.data.data.restaurants.location);
            setPriceRange(response.data.data.restaurants.price_range);
            } 
            catch(err) { console.log(err) }
        }

        fetchData();
        }, [id]);
    
        // Here, I was using the restaurants context instead of useState for each value. 
        // This is a problem because if a user went directly to the update page instead
        // of navigating to it from the homepage, then the data would never have been 
        // fetched and would throw an error. 
    // const handleUpdate = async (e) => {
    //     e.preventDefault(); 
    //     try { const response = await RestaurantFinder.put(`/${id}`, {
    //             name: restaurants.name,
    //             location: restaurants.location,
    //             price_range: restaurants.price_range,

    const handleSubmit = async (e) => {
        e.preventDefault(); 
        //Removed a try-catch from this function because I would have no meaningful way of handling the error other than logging it. 
        const updatedResponse = await RestaurantFinder.put(`/${id}`, {
            name,
            location,
            price_range: priceRange,
        });
        navigate(`/${id}`);
        //console.log(updatedResponse);
    };


    // console.log(restaurants);
    return (
    // <div>
    <div>
        <h1 className='text-center'>Update {name} 🍔</h1>
        <form action="" border="100px">
            {/* 
            This was my attempt without following the guide: 
            It was all 95% correct, but didnt work because I was 
            trying to use the Context instead of useState for each
            value. Because of that mistake, I was using placeholders
            instead of value={name}, etc. 
            <div className="form-group">
                <label htmlFor="name">Name</label>
                <input placeholder={restaurants.name} onChange={e => (setName(e.target.value))} type="text" id="name" className='form-control'  />
            </div>

            <div className="form-group">
                <label htmlFor="location">Location</label>
                <input placeholder={restaurants.location} onChange={e => (setLocation(e.target.value))} type="text" id="location" className='form-control'  />
            </div>

            <div>
                <label htmlFor="priceRange">Price Range</label>
                <br />
                <select placeholder={restaurants.price_range} onChange={e => (setPriceRange(e.target.value))} id="priceRange" className='custom-select my-1 mr-sm-2' >
                    <option disabled>Price Range</option>
                    <option value="1">$</option>
                    <option value="2">$$</option>
                    <option value="3">$$$</option>
                    <option value="4">$$$$</option>
                    <option value="5">$$$$$</option>
                </select>
            </div>

            <br />
            <div>
                <button className="btn btn-primary" onClick={() => handleUpdate({restaurants})} >Update</button>
            </div> */}

            <div className="form-group">
                <label htmlFor="name">Name</label>
                {/* value=[useState value]. Puts in original value and allows it to be changed.
                Better than placeholder because it is changeable and we can use the onChange event
                handler to call setName which will then also change the value(={name}).  */}
                <input value={name} onChange={(e) => (setName(e.target.value))} type="text" id="name" className='form-control'  />
            </div>

            <div className="form-group">
                <label htmlFor="location">Location</label>
                <input value={location} onChange={(e) => (setLocation(e.target.value))} type="text" id="location" className='form-control'  />
            </div>

            <div>
                <label htmlFor="priceRange">Price Range</label>
                <br />
                {/* same useState comment applies here. Custom select instead of text/num input
                because we only want a certain limited number of values coming in here. 
                This is basically a copy-paste from the AddRestaurant.jsx price range select. */}
                <select value={priceRange} onChange={(e) => (setPriceRange(e.target.value))} id="priceRange" className='custom-select my-1 mr-sm-2' >
                    <option disabled>Price Range</option>
                    <option value="1">$</option>
                    <option value="2">$$</option>
                    <option value="3">$$$</option>
                    <option value="4">$$$$</option>
                    <option value="5">$$$$$</option>
                </select>
            </div>

            <br />
            <div> 
                
                {/* <button className="btn btn-primary" onClick={() => handleUpdate({restaurants})} >Update</button> 

                My button was pretty much fine, I just didn't need to pass in {restaurants},
                 but use useState instead.
                 Also, handleUpdate isn't a great name because this whole component is 
                 called Update.jsx. handleSubmit is less vague. 
                 "The <input type="submit"> defines a submit button which submits all
                  form values to a form-handler." (from W3) 
                  It seems like type of submit on an INPUT component makes it into a button, but 
                  I'm not sure what the effect is on a button component */}
                
                
                <button className="btn btn-warning" onClick={handleSubmit}>Update</button>

                {/* <button className="btn btn-primary" onClick={() => buttonTest}>Update</button> 
                Really sneaky mistake here. I put an arrow function inside the onClick handler and so then
                it was expecting a promise (I think??). Either way, the button would just do nothing in
                this form. () => was removed and then it works */}
            </div>

        </form>
    </div> 
    )
};

export default Update;

//My old attempt at converting the react component into a class. Not sure why I was doing this,
//but I think it was to use props? or the constructor??

// class Update extends React.Component {

//     constructor(props) {
        
//         this.handleInputChange = this.handleInputChange.bind(this);
        
//         const {restaurants, setRestaurants} = useContext(RestaurantsContext)
        
//         const fetchData = async () => {
//             try {
//                 const response = await RestaurantFinder.get(`/${id}`);
//                 setRestaurants(response.data.data.restaurants);
//                 console.log(response);
//             } 
//             catch(err) { console.log(err) }
//         }
        
//         fetchData();


//         super(props);
//         this.state = {
//           name: restaurants.name,
//           location: restaurants.location,
//           price_range: restaurants.price_range,
//         };
//     }
  
//     handleInputChange(event) {
//       const target = event.target;
//       const value = target.value;
//       const name = target.name;
  
//       this.setState({
//         [name]: value
//       });
//     }
  
//     render() {
//         return (
//         <div>
//             <h1 className='text-center'>Update {this.restaurants.name}</h1>
//             <form action="">
//                 <div className="form-group">
//                     <label htmlFor="name">Name</label>
//                     <input type="text" id="name" className='form-control' value={this.restaurants.name}
//                             onChange={this.handleInputChange}  />
//                 </div>

//                 <div className="form-group">
//                     <label htmlFor="location">Location</label>
//                     <input type="text" id="location" className='form-control' value={this.restaurants.location}
//                             onChange={this.handleInputChange} />
//                 </div>

//                 <div>
//                     <label htmlFor="priceRange">Price Range</label>
//                     <br />
//                     <select id="priceRange" className='custom-select my-1 mr-sm-2' >
//                         <option disabled>Price Range</option>
//                         <option value="1">$</option>
//                         <option value="2">$$</option>
//                         <option value="3">$$$</option>
//                         <option value="4">$$$$</option>
//                         <option value="5">$$$$$</option>
//                     </select>
//                 </div>
//             </form>
//         </div>
//         )
//     }
//   }


