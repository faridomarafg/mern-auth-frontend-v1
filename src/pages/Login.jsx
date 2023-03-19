import React, {useState, useEffect} from 'react';
import {BiShow,BiHide} from 'react-icons/bi';
import {useSelector, useDispatch} from 'react-redux';
import { Link ,useNavigate} from 'react-router-dom';
import { toast } from 'react-toastify';
import { login, reset } from '../features/auth/authSlice';

const initialState = {
    email:"",
    password:''
    }

function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [postData, setPostData] = useState(initialState); 
    const [showPassword, setShowPassword] = useState(false);

    const {email, password}  =postData;

    const {isLoading, isSuccess, isError, message} = useSelector((state)=> state.auth);

    const handleShowPassword = ()=>{
        setShowPassword(!showPassword)
    };

    useEffect(()=>{
        if(isError){
            toast.error(message);
        }

        if(isSuccess){
            toast.success('User Logged In Successfully!');
            navigate('/');
            
        }
        dispatch(reset());
    },[isError, isSuccess, navigate, dispatch, message]) 

     const onChangeHandler = (e)=>{
        const {value, name} = e.target;
        setPostData({...postData, [name]:value}) 
    };
     
     const onSubmit = async(e)=>{
        e.preventDefault();
        
        const userData = {
            email,
            password
        }

        dispatch(login(userData));
      }
  
      if(isLoading){
        return <h1>Loading...</h1>
      };
      
  return (
    <div className='py-[300px] flex flex-col w-full h-full items-center justify-center relative'>
        <h1 className='text-white py-5 text-4xl font-playfair font-semibold'>Login</h1>
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

            <div className=' relative flex w-full items-center justify-end'>
                <input 
                type={showPassword? "" : "password"}
                placeholder='Password'
                autoComplete='new-password'
                className='w-full p-2 rounded-xl outline-none mb-2'
                name='password'
                value={password}
                onChange={onChangeHandler}
                />
            <span className='flex text-xl cursor-pointer' onClick={handleShowPassword}>
            { showPassword ?
            <BiShow className='absolute right-1 top-3 text-slate-400'/>
            :
            <BiHide className='absolute right-1 top-3 text-slate-400'/> 
            
            }
            </span>
            </div>
            <button type='submit' className='border-2 px-6 py-1 rounded-xl border-slate-400 hover:scale-110 duration-1000 mt-3'>
                Login
            </button>
             
            <p className='text-[11px] xs:text-[16px] text-emerald-600 font-playfair flex md:text-xl'>Don't have an account?</p>
            <p className='text-slate-400 font-semibold hover:scale-125 duration-1000'>&nbsp;<Link className='text-[12px] md:text-lg' to='/register'>&nbsp;Register</Link></p>
            <span className='text-[11px] xs:text-[16px] text-slate-700 font-semibold hover:scale-110 md:text-lg duration-1000'>
            <Link to='/forgotpassword'>Forgot Passwor?</Link>
            </span>
        </form>
    </div>
  )
}

export default Login