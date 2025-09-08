import { Link } from 'react-router-dom';
import picture from '../images/Clip path group.png';


function HandleSignUp() {
    return (

        <>

         


        <div className=" p-5 min-h-screen flex items-center justify-center">
            <div className="flex flex-col items-center bg-white w-full max-w-md mx-3 
            sm:mx-auto rounded-xl p-6 sm:p-8 shadow-[1px_1px_1px_2px] shadow-[#00000054]"
            >

                {/* Logo and Title */}
                <div className="flex flex-col sm:flex-row sm:items-center mb-6 gap-4 sm:gap-5 w-full justify-center">
                    <img src={picture} alt="Tabiya Logo" className="w-16 h-16 sm:w-20 sm:h-20 mx-auto sm:mx-0" />
                    <h1 className="font-bold text-3xl sm:text-5xl text-center sm:text-left text-[#032147]">tabiya</h1>
                </div>

                {/* Input Form */}
                <form className="space-y-4 mb-6 w-full">
                    <input
                        type="text"
                        placeholder="First name"
                        className="w-full bg-[#d9d9d9] rounded-full px-4 py-2 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                        type="text"
                        placeholder="Last name"
                        className="w-full bg-[#d9d9d9] rounded-full px-4 py-2 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        className="w-full bg-[#d9d9d9] rounded-full px-4 py-2 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        className="w-full bg-[#d9d9d9] rounded-full px-4 py-2 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                        type="submit"
                        className="w-full bg-[#032147] text-white rounded-full py-2 text-sm sm:text-base hover:bg-blue-800 transition"
                    >
                        Create account
                    </button>
                </form>

                {/* Already have account */}
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 mb-5 text-xs sm:text-sm justify-center sm:justify-start">
                    <p>Already have an account?</p>
                    <Link to="/login" className="text-blue-600 underline">
                       
                      <button className="hover:underline hover:text-blue-400">Login</button>
                    </Link>
                </div>

                {/* Footer links */}
                <div className="flex flex-col sm:flex-row text-xs sm:text-sm justify-center sm:justify-between gap-2 sm:gap-x-32 w-full">
                   
                   <Link to="/About">
                        <p href="#" className="text-center sm:text-left">About us</p>
                   </Link>
                    <a href="#" className="text-center sm:text-right">Contact us</a>
                </div>

            </div>
        </div>
        </>
    );
}

export default HandleSignUp;