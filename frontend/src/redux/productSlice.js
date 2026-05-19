import {createSlice} from '@reduxjs/toolkit'

const safeParseJSON = (key, fallback) => {
    try {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : fallback;
    } catch {
        localStorage.removeItem(key); // wipes corrupted data automatically
        return fallback;
    }
};

const productSlice = createSlice({
    name:'productSlicer',
    initialState: {
        products: safeParseJSON('products', []),
        cartItems: safeParseJSON('cartItems', []),
        loading: false,
        error: null
    },
    reducers:{
         
        addProduct:(state,action)=>{
            state.products.push(action.payload);
            localStorage.setItem("products",JSON.stringify(state.products));
        },
        setproduct: (state, action) => {
            state.products = action.payload;
            localStorage.setItem("products", JSON.stringify(action.payload)); // ✅ Bug 1 Fixed
        },
        updateProduct:(state,action)=>{
            const productIndex = state.products.findIndex((pr) => pr._id === action.payload._id); // ✅ use _id
            if(productIndex !== -1){
                state.products[productIndex] = action.payload;
                localStorage.setItem('products',JSON.stringify(state.products));
            }
        },
        deleteProduct:(state,action)=>{
            const productIndex = state.products.findIndex((pr) => pr._id === action.payload); // ✅ use _id
            if(productIndex !== -1){
                state.products.splice(productIndex,1);
                localStorage.setItem('products',JSON.stringify(state.products));
            }
        },
        addCartItems:(state,action)=>{
            const itemindex = state.cartItems.findIndex((it) => it._id === action.payload._id);
            if(itemindex !== -1){
                state.cartItems[itemindex].quantity++;
            }
            else{
                state.cartItems.push({...action.payload,quantity:1})
            }
            localStorage.setItem("cartItems",JSON.stringify(state.cartItems))
        },
        cartItemIncrement:(state,action)=>{
            const itemindex = state.cartItems.findIndex((it) => it._id === action.payload); // ✅ Bug 2 Fixed
            if(itemindex !== -1){
                state.cartItems[itemindex].quantity++;
                localStorage.setItem("cartItems",JSON.stringify(state.cartItems))
            }
        },
        cartItemDecrement:(state,action)=>{
            const itemindex = state.cartItems.findIndex((it) => it._id === action.payload); // ✅ Bug 2 Fixed
            if(itemindex !== -1){
                if(state.cartItems[itemindex].quantity > 1){  // ✅ prevent going below 1
                    state.cartItems[itemindex].quantity--;
                }
                localStorage.setItem("cartItems",JSON.stringify(state.cartItems))
            }
        },
        removeCartItems:(state,action)=>{
            const itemindex = state.cartItems.findIndex((it) => it._id === action.payload); // ✅ Bug 2 Fixed
            if(itemindex !== -1){
                state.cartItems.splice(itemindex,1);
                localStorage.setItem("cartItems",JSON.stringify(state.cartItems))
            }
        }
    }
});

export const {setproduct,addProduct,addCartItems,cartItemIncrement,cartItemDecrement,removeCartItems,updateProduct,deleteProduct} = productSlice.actions;
export default productSlice.reducer;