import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_SERVER_URL;

console.log(BACKEND_URL);


const API_URL = `${BACKEND_URL}/api/users`;


//Register User
const register = async(userData) => {
    const response = await axios.post(`${API_URL}/register`, userData);

    if(response.data){
        localStorage.setItem('user', JSON.stringify(response.data));
    }

    return response.data
};

//Login User
const login = async(userData) => {
    const response = await axios.post(`${API_URL}/login`, userData);

    if(response.data){
        localStorage.setItem('user', JSON.stringify(response.data));
    }

    return response.data
};

//Logout User
const logout = async() => {
   const response =  await axios.get(`${API_URL}/logout`);

   localStorage.removeItem('user');
   
   return response.data
};


//Forgot Password
const forgotpassword = async(userData) => {
    const response = await axios.post(`${API_URL}/forgotpassword`, userData);

    if(response.data){
        localStorage.setItem('user', JSON.stringify(response.data));
    }

    return response.data
};


// Reset Password
const resetPassword = async (userData, resetToken) => {
    const response = await axios.put(`${API_URL}/resetpassword/${resetToken}`, userData);

    if(response.data){
        localStorage.setItem('user',JSON.stringify(response.data));
    }
  
    return response.data.message;
  };


const authService = {
    register,
    login,
    logout,
    forgotpassword,
    resetPassword
}

export default authService