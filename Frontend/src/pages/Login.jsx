import picture from '../images/Clip path group.png'
import lock from '../images/Lock.png'
import person from '../images/Person.png'
import { Link } from 'react-router-dom'

function HandleLogin() {
    return (
        <div className=" p-5 min-h-screen flex items-center justify-center">
            <div className="flex flex-col items-center bg-white w-full max-w-md mx-3 
        sm:mx-auto rounded-xl p-6 sm:p-8 border border-gray-200 shadow-[1px_1px_1px_2px] shadow-[#00000054]">

                {/* Logo and Title */}
                <div className="flex flex-col sm:flex-row sm:items-center mb-6 gap-4 sm:gap-5 w-full justify-center">
                    <img src={picture} alt="Tabiya Logo" className="w-16 h-16 sm:w-20 sm:h-20 mx-auto sm:mx-0" />
                    <h1 className="font-bold text-3xl sm:text-5xl text-center sm:text-left text-[#032147]">
                        tabiya
                    </h1>
                </div>
                <form className="space-y-4 mb-6 w-full">
                    <div className="relative">
                        <input
                            type="email"
                            required
                            placeholder="Email"
                            className="w-full bg-[#d9d9d9] rounded-full pl-4 pr-12 py-2 
                         text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <img
                            src={person}
                            alt="Email Icon"
                            className="w-20 -right-5 absolute  top-1/2 -translate-y-1/2"
                        />
                    </div>
                    <div className="relative">
                        <img
                            src={lock}
                            alt="Lock Icon"
                            className="w-20 absolute -left-5 top-1/2 -translate-y-1/2"
                        />
                        <input
                            type="password"
                            placeholder='Password'
                            
                            required
                           
                            className="w-full placeholder:text-right bg-[#d9d9d9] rounded-full pl-12 pr-4 py-2 
                                  text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    
                    <button
                        type="submit"
                        className="w-full bg-[#032147] cursor-pointer text-white rounded-full py-2 text-sm sm:text-base hover:bg-blue-800 transition"
                    >
                        Log in
                    </button>
                </form> <br />

                <div className="grid grid-cols-2 grid-rows-2 gap-2 w-full text-center gap-y-10">
                    <p className="text-[13px] hover:underline cursor-pointer hover:text-blue-500"><Link to="/signup" className="text-blue-600 underline">Signup</Link></p>
                    <a href=""><p className="text-[13px] hover:underline cursor-pointer hover:text-blue-500">Forget password?</p></a>
                    
                    <Link to="/About"> 
                    
                        <p className="hover:underline cursor-pointer hover:text-blue-500">About us</p>
                    </Link>
                    <a href=""><p className="hover:underline cursor-pointer hover:text-blue-500">Contact us</p></a>
                </div>

            </div>
        </div>
    )
}

export default HandleLogin
