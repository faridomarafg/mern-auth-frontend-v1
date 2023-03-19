import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import { toast } from 'react-toastify';
import { forgotPassword } from '../features/auth/authSlice';

const initialState = {
    email:"",
    passwod:''
    }

function ForgotPassword() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [postData, setPostData] = useState(initialState); 

    const {email}  =postData;
    
    const {isSuccess ,isError, isLoading, message} = useSelector((state)=> state.auth);
    
    useEffect(()=>{
        if(isError){
            toast.error(message);
        }
        if(isSuccess){
            navigate('/')
            toast.success('Reset Email sent Successfully')
        }
    },[isError, isSuccess, message, navigate])


     const onChangeHandler = (e)=>{
        const {value, name} = e.target;
        setPostData({...postData, [name]:value}) 
    };
     
     const onSubmit = async(e)=>{
        e.preventDefault();
        const userData = {
            email
        }

        await dispatch(forgotPassword(userData))
      }

    if(isLoading){
        return <h1>Loading...</h1>
    }  

  return (
    <div className='py-[300px] flex flex-col w-full h-full items-center justify-center relative'>
        <h1 className='text-slate-500 py-5 text-[11px] xs:text-[16px] md:text-xl font-playfair font-semibold'>Do You Forgot Your Password?</h1>
        <h1 className='text-slate-500 py-2 text-[11px]  xs:text-[16px] md:text-lg font-playfair font-semibold'>Please Enter Your Email To receive Reset Email</h1>
        <form 
        onSubmit={onSubmit}
        className=' w-[35%] flex flex-col items-center' 
        > 
        
        <input 
            type="email"
            name='email'
            placeholder='Email'
            autoComplete='new-password'
            className='w-full p-2 rounded-xl outline-none mb-2'
            value={email}
            onChange={onChangeHandler}
            />
             <button type='submit' className='border-2 px-6 py-1 rounded-xl border-slate-400 hover:scale-110 duration-1000 mt-3'>Submit</button>
        </form>
    </div>
  )
}

export default ForgotPassword