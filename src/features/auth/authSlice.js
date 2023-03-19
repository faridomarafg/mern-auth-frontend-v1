import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import authService from './authService';

//Get user from local storagge
const user = JSON.parse(localStorage.getItem('user'));

const initialState = {
    user : user ? user : null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message:''
};

//Register User
export const register = createAsyncThunk('auth/register', async(userData, thunkAPI)=>{
    try {
        return await authService.register(userData);
    } catch (error) {
      //   const message =(error.response && error.response.data && error.response.data.message) || error.message ||error.toString();
      // return thunkAPI.rejectWithValue(message)  

      const message =
      (error.response &&
        error.response.data &&
        error.response.data.message) ||
      error.message ||
      error.toString()
    return thunkAPI.rejectWithValue(message)
    }
});


//Login User
export const login = createAsyncThunk('auth/login', async(userData, thunkAPI)=>{
    try {
        return await authService.login(userData);
    } catch (error) {
        const message =(error.response && error.response.data && error.response.data.message) || error.message ||error.toString();
      return thunkAPI.rejectWithValue(message)  
    }
});

//Logout User
export const logout = createAsyncThunk('auth/logout', async(_, thunkAPI)=>{
    try {
        return await authService.logout();
    } catch (error) {
        const message =(error.response && error.response.data && error.response.data.message) || error.message ||error.toString();
      return thunkAPI.rejectWithValue(message)  
    }
});


//Forgot Password
export const forgotPassword = createAsyncThunk('auth/forgotPassword', async(userData, thunkAPI)=>{
    try {
        return await authService.forgotpassword(userData);
    } catch (error) {
        const message =(error.response && error.response.data && error.response.data.message) || error.message ||error.toString();
      return thunkAPI.rejectWithValue(message)  
    }
});


//Reset Password
export const resetPassword = createAsyncThunk('auth/resetPassword', async({userData, resetToken}, thunkAPI)=>{
    try {
        console.log(resetToken);
        return await authService.resetPassword(userData, resetToken);
    } catch (error) {
        const message =(error.response && error.response.data && error.response.data.message) || error.message ||error.toString();
      return thunkAPI.rejectWithValue(message)  
    }
});


const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers:{
      reset : (state)=>{
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = false;
        state.message = ''
      },
      setUser :(state, action)=>{
        state.user = action.payload
      }
    },
    extraReducers:(builder)=>{
     builder

     //Regiseter User
     .addCase(register.pending, (state)=>{
       state.isLoading = true;  
     })
     .addCase(register.fulfilled, (state, action)=>{
      state.isLoading = false;
      state.isSuccess = true;
      state.user = action.payload;  
    })
    .addCase(register.rejected, (state, action)=>{
      state.isLoading = false;
      state.isError = true;
      state.user = null;
      state.message = action.payload;   
    })

    //Login User
    .addCase(login.pending, (state)=>{
    state.isLoading = true;  
    })
    .addCase(login.fulfilled, (state, action)=>{
    state.isLoading = false;
    state.isSuccess = true;
    state.user = action.payload;  
    })
    .addCase(login.rejected, (state, action)=>{
    state.isLoading = false;
    state.isError = true;
    state.user = null;
    state.message = action.payload;   
    })

    //Forgot Password
    .addCase(forgotPassword.pending, (state)=>{
    state.isLoading = true;  
    })
    .addCase(forgotPassword.fulfilled, (state, action)=>{
    state.isLoading = false;
    state.isSuccess = true;
    state.message = action.payload;
    })
    .addCase(forgotPassword.rejected, (state, action)=>{
    state.isLoading = false;
    state.isError = true;
    state.message = action.payload;   
    })

    //Reset Password
    .addCase(resetPassword.pending, (state)=>{
    state.isLoading = true;  
    })
    .addCase(resetPassword.fulfilled, (state, action)=>{
    state.isLoading = false;
    state.isSuccess = true;
    state.message = action.payload;
    })
    .addCase(resetPassword.rejected, (state, action)=>{
    state.isLoading = false;
    state.isError = true;
    state.message = action.payload;  
    console.log(action.payload); 
    })

    //Logout User
    .addCase(logout.fulfilled, (state)=>{
    state.user = null;  
    })
    }
});

export const {reset, setUser} = authSlice.actions;

export default authSlice.reducer;