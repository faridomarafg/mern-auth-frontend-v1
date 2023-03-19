import React, {useState, useEffect} from 'react';
import {BiShow,BiHide} from 'react-icons/bi';
import {useSelector, useDispatch} from 'react-redux';
import { Link ,useNavigate} from 'react-router-dom';
import { toast } from 'react-toastify';
import {FaUserAlt} from 'react-icons/fa';
import imageToBase64 from '../utility/imageToBase64';
import { register, reset } from '../features/auth/authSlice';


const initialState = {
    name:"",
    email:"",
    password:'',
    photo:""
    }

function Register() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [postData, setPostData] = useState(initialState); 
    const [showPassword, setShowPassword] = useState(false);

    const {name, email, password, photo}  =postData;

    const {isLoading, isSuccess, isError, user, message} = useSelector((state)=> state.auth);

    const handleShowPassword = ()=>{
        setShowPassword(!showPassword)
    };
    
    useEffect(()=>{
     if(isError){
        toast.error(message);
        console.log(message);
     }
     
     if(isSuccess ){
        toast.success('User registered Successfully!');
        navigate('/login');
     }

     dispatch(reset());
    },[isSuccess, isError, message, user, navigate, dispatch]);

    //this function is for handling profile image uploading;
    //for showing image in profile section we should convert image to Base64;
    //for this purpose we are going create a file with name of imageToBase64 in utility folder in src folder;
    const handleUploadImage =async (e)=>{
    
    const data = await imageToBase64(e.target.files[0]);
        console.log(data);
   
        setPostData((preve)=>{
          return{
           ...preve,
           photo: data
          }
        })
     };


     const onChangeHandler = (e)=>{
        const {value, name} = e.target;
        setPostData({...postData, [name]:value}) 
    };
     
     const onSubmit = async(e)=>{
        e.preventDefault();
        
        const userData = {
            name,
            email,
            password,
            photo
        }

        await dispatch(register(userData));
      }


      if(isLoading){
        return <h1>Loading...</h1>
      }    

  return (
    <div className='py-[140px] flex flex-col w-full h-full items-center justify-center relative'>
        <h1 className='text-white py-5 text-4xl font-playfair font-semibold'>Register</h1>
        <form 
        onSubmit={onSubmit}
        className='w-[45%] flex flex-col items-center'
        >

            <div className='flex items-center justify-center w-[100px] h-[100px] md:w-[150px] md:h-[150px] rounded-full bg-slate-400 mb-5 relative'>
            <label htmlFor='profileImage' className='w-full h-full'>
            <div className='w-full h-full flex items-center justify-center'>
                {
                postData.photo ?  <img className=' w-[100px] h-[100px] md:w-[150px] md:h-[150px] rounded-full' src={ postData.photo && postData.photo } alt='' />  
                :
                <FaUserAlt id='porfileimage' className='text-6xl bg-slate-300 w-[100px] h-[100px] md:w-[150px] md:h-[150px] rounded-full p-2 cursor-pointer'/>
                }
                <span className='text-sm absolute bottom-[-20px] font-semibold text-slate-400'>Select Profile</span>
            </div>
            <input type={"file"} id="profileImage" accept='image/*' className='hidden' value="" onChange={handleUploadImage} />
            </label>
    
            </div> 
            
            <input 
            type="text"
            placeholder='Name'
            autoComplete='new-password'
            className='w-full p-2 rounded-xl outline-none mb-2'
            name='name'
            value={name}
            onChange={onChangeHandler}
            />

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
            <BiShow className='absolute text-[25px] text-slate-400 pr-1 top-[7px] right-0 cursor-pointer'/>
            :
            <BiHide className='absolute text-[25px] text-slate-400 pr-1 top-[7px] right-0 cursor-pointer'/> 
            }
            </span>
            </div>
            <button type='submit' className='border-2 px-6 py-1 rounded-xl border-slate-400 hover:scale-110 duration-1000 my-3'>
                Register
            </button>


            <p className='flex text-[12px] xs:text-[18px] text-emerald-600 font-playfair  md:text-xl'>Already have an account? </p>
            <p className='text-slate-400 font-semibold hover:scale-125 duration-1000'>&nbsp;
            <Link className='' to='/login'>&nbsp;Login</Link>
            </p>
        </form>
    </div>
  )
}

export default Register