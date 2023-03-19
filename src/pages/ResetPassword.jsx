import React, {useState, useEffect} from 'react';
import {BiShow,BiHide} from 'react-icons/bi';
import {useSelector, useDispatch} from 'react-redux';
import {useNavigate, useParams} from 'react-router-dom';
import { toast } from 'react-toastify';
import { reset, resetPassword } from '../features/auth/authSlice';

const initialState = {
    password:"",
    password2:''
    }

function ResetPassword() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [postData, setPostData] = useState(initialState); 
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const {password2, password}  =postData;

    const { resetToken } = useParams();

    const {isError, isSuccess, message} = useSelector((state)=> state.auth);

    const handleShowPassword = ()=>{
        setShowPassword(!showPassword)
    };

    const handleShowConfirmPassword = ()=>{
        setShowConfirmPassword(!showConfirmPassword)
    };


    useEffect(() => {
        if(isError){
            toast.error(message);
        }

        if (isSuccess ) {
          navigate("/login");
          toast.success('Password reseted successfully!')
        }
    
        dispatch(reset());
      }, [dispatch, navigate, message, isSuccess, isError]);

     const onChangeHandler = (e)=>{
        const {value, name} = e.target;
        setPostData({...postData, [name]:value}) 
    };
     

    const onSubmit = async (e) => {
        e.preventDefault();
  
        if (password.length < 6) {
          return toast.error("Password must be up to 6 characters");
        }
        if (password !== password2) {
          return toast.error("Passwords do not match");
        }
  
        const userData = {
          password,
        };
  
        await dispatch(resetPassword({ userData, resetToken }));
    };
 

  return (
    <div className='py-[300px] flex flex-col w-full h-full items-center justify-center relative'>
        <h1 className='text-white py-5 text-4xl font-playfair font-semibold'>Reset your Password</h1>
        <form 
        onSubmit={onSubmit}
        className=' w-[35%] flex flex-col items-center' 
        > 
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

        <div className=' relative flex w-full items-center justify-end'>
            <input 
            type={showConfirmPassword? "" : "password"}
            placeholder='Confirm Password'
            autoComplete='new-password'
            className='w-full p-2 rounded-xl outline-none mb-2'
            name='password2'
            value={password2}
            onChange={onChangeHandler}
            />
        <span className='flex text-xl cursor-pointer' onClick={handleShowConfirmPassword}>
        { showConfirmPassword ?
        <BiShow className='absolute right-1 top-3 text-slate-400'/>
        :
        <BiHide className='absolute right-1 top-3 text-slate-400'/> 
        
        }
        </span>
        </div>

        <button type='submit' className='border-2 px-6 py-1 rounded-xl border-slate-400 hover:scale-110 duration-1000 mt-3'>
            Save changes
        </button>

        </form>
    </div>
  )
}

export default ResetPassword