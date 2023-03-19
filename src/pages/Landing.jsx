import {useSelector} from 'react-redux';

function Landing() {
  const {user} = useSelector((state)=> state.auth);
  console.log(user);
  return (
    <div className='flex flex-col pt-[150px] w-full h-screen items-center justify-center'>
         <div className='w-[60%] h-[30vh]  bg-teal-400 flex flex-col items-center justify-center mb-5 rounded-xl shadow-2xl'>
          <div>
            <img 
            src={user && user.photo} 
            alt=''
            className='w-[100px] h-[100px] md:w-[150px] md:h-[150px] object-cover rounded-full' 
            />
          </div>
          <p className='text-xl text-white'>
            Hey 
            <span className=' font-semibold text-2xl text-pink-600'>{user &&user?.name ? user?.name : ''}
            </span>
            </p>
        
          <p className='text-white text-center'>Thanks so much for visting blog<span className='text-lg md:text-2xl font-playfair font-semibold text-slate-600'>&nbsp; AFG - DEVS &nbsp;</span> </p>
          
         </div>

        <div className='flex flex-col text-center'>
        <h1 className='text-lg md:text-4xl text-slate-500 font-playfair font-semibold'>Hello Wellcome to the AFG - DEVS Community</h1>
        <h1 className='text-lg md:text-4xl text-slate-400 font-playfair font-semibold'>Next version of this blog would release </h1>
        <h1 className='text-lg md:text-4xl text-teal-600 font-playfair font-semibold'>In the near future</h1>
        </div>
    </div>
  )
}

export default Landing