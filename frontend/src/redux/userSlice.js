import {createSlice} from '@reduxjs/toolkit'
const userSlicer = createSlice({
    name:"userSlicer",
    initialState:{
        user:JSON.parse(localStorage.getItem('user')) || null,
        isAuthenticated:JSON.parse(localStorage.getItem('isAuthenticated')) || false
    },
    reducers:{
        userLoginData:(state,action)=>{
            state.user = action.payload;
            state.isAuthenticated = true;
            localStorage.setItem('user',JSON.stringify(state.user));
            localStorage.setItem('isAuthenticated',JSON.stringify(state.isAuthenticated));
        },
        userLogoutData:(state,action)=>{
            state.user = null;
            state.isAuthenticated = false;
            localStorage.removeItem('user');
            localStorage.removeItem('isAuthenticated');
        },
        userRoleChange:(state,action)=>{
            const userIndex = state.user.findIndex((u) => u.id === action.payload.id);            
            if(userIndex !== -1){
                state.uses[userIndex].role = action.payload.role;
                localStorage.setItem("user",JSON.stringify(state.user))
            }
            if(state.user.id === action.payload.id){
                state.user.role === action.payload.role;
                localStorage.setItem("user",JSON.stringify(state.user))
            }
        },
        userStatusChange:(state,action)=>{
            const userIndex = state.user.findIndex((u) => u.id === action.payload);
            
            if(userIndex !== -1){
                state.user[userIndex].status = !state.user[userIndex].status;
                localStorage.setItem("user",JSON.stringify(state.user))
            }
            if(state.user.id === action.payload.id){
                state.user.status = !state.user[userIndex].status;
                localStorage.setItem("user",JSON.stringify(state.user))
            }
        },
    }
});
export const {userLoginData,userLogoutData,userRoleChange,userStatusChange} = userSlicer.actions;
export default userSlicer.reducer;