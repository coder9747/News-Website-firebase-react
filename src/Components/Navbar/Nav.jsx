'use client';

import { Button, Navbar } from "flowbite-react";
import { toast } from "react-toastify";
import { Link, NavLink } from "react-router-dom";
import { useContext } from "react";
import { Context } from "../../Context/Context";
import { signOut } from "firebase/auth";
import { auth } from "../../Firebase/Config-file";

export default function NavbarWithCTAButton() {
    const { allcategory } = useContext(Context);
    function handleSignOut()
    {
        try {
            signOut(auth);
            localStorage.clear();
            window.location.reload();
            
        } catch (error) {
            toast.error("Something Went Wrong")
        }
    }
    const isAdmin = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")).role : false;
    return (
        <div className="px-2">
            <Navbar
                fluid
                rounded
            >
                <Navbar.Brand href="https://flowbite-react.com">
                    <img
                        alt="Flowbite React Logo"
                        className="mr-3 md:h-16 h-12  "
                        src="https://w0.peakpx.com/wallpaper/204/673/HD-wallpaper-ias-national-emblem-indian-administrative-service-satyameva-jayate.jpg"
                    />
                    <Link to={'/'} className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
                        Bharat Top
                    </Link>
                </Navbar.Brand>
                <div className="flex md:order-2 mx-2">
                    <Navbar.Toggle />
                </div>
                <Navbar.Collapse>

                    {isAdmin && <Navbar.Link href="#">
                        <Link to={'/adminonly'}>
                            Admin Only
                        </Link>
                    </Navbar.Link>}
                    <Navbar.Link>
                        <Link to={'/writeforus'}>
                            Write For Us
                        </Link>
                    </Navbar.Link>
                    <Navbar.Link >
                        <Link to={'/support-us'}>
                            Support Us
                        </Link>
                    </Navbar.Link>
                    <Navbar.Link >
                        <Link to={'/get-in-touch'}>
                            Get In Touch
                        </Link>
                    </Navbar.Link>
                   {!localStorage.getItem("user") &&  <Navbar.Link >
                        <Link to={'/auth'}>
                           Login 
                        </Link>
                    </Navbar.Link>}
                   {localStorage.getItem("user") &&  <Navbar.Link >
                        <button onClick={handleSignOut}>
                           Logout
                        </button>
                    </Navbar.Link>}
                    
                    <Navbar.Link href="#">
                        <div class="relative md:hidden">
                            <div class="absolute inset-y-0 hover:text-lg right-3 flex items-center pl-3 pointer-events-none">
                                <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                                </svg>
                                <span class="sr-only">Search icon</span>
                            </div>
                            <input type="text" id="search-navbar" class="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search..." />
                        </div>
                    </Navbar.Link>
                </Navbar.Collapse>
            </Navbar>
                <div className="border flex justify-around">
                    {
                        allcategory && allcategory.map((item, idx) => {
                            return <Link id={idx} to={`/category/${item.name}`}>{item.name}</Link>
                        })
                    }
                </div>
        </div>
    )
}


