import { createContext, useEffect, useState } from "react";
import axios from "axios"
import { toast } from 'react-toastify'

export const StoreContext = createContext(null);

const StoreContextProvider = (props) =>{

    const [cartItems,setCartItems] = useState({});
    const url = import.meta.env.VITE_BACKEND_URL;
    const [token,setToken] = useState("");
    const [food_list,setFoodList] = useState([]);
    

    //functionality for add to cart
    const addToCart = async (itemId) => {
        if(!token)
        {
            alert("User not logged in. Please sign in to add items to the cart.");
            return;
        }
        if(!cartItems[itemId])//when product is not there in the cart
        {
            setCartItems((prev) => ({...prev,[itemId]:1}))
        }
        else{//if any product is already available in the cart
            setCartItems((prev) => ({...prev,[itemId]:prev[itemId]+1}))
        }
        if(token) {
            await axios.post(url + "/api/cart/add",{itemId},{headers:{token}});
            toast.success("Food Added");
        }
        
        
    }

    //functionality for removing product from the cart
    const removeFromCart = async (itemId) => {
        setCartItems((prev) => ({...prev,[itemId]:prev[itemId]-1}))
        if(token) {
            await axios.post(url + "/api/cart/remove",{itemId},{headers:{token}});
            toast.error("Food Removed");

        }
    }
    
    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for(const item in cartItems)
        {
            if(cartItems[item] > 0)
            {
                let itemInfo = food_list.find((product)=> product._id === item);
                totalAmount += itemInfo.price*cartItems[item];
            }
            
        }
        return totalAmount;
    }
    const fetchFoodList = async () => {
        const response = await axios.get(url+"/api/food/list");
        setFoodList(response.data.data);
    }

    const loadCartData = async (token) => {
        const response = await axios.post(url+"/api/cart/get",{},{headers:{token}});
        setCartItems(response.data.cartData);
    }

    useEffect(()=>{
        
        async function loadData() {
            await fetchFoodList();
            if(localStorage.getItem("token")){
                setToken(localStorage.getItem("token"));
                await loadCartData(localStorage.getItem("token"));
            }
        }
        loadData();
    },[])

    const contextValue = {
        food_list,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        url,
        token,
        setToken
    }
    
    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}
export default StoreContextProvider;