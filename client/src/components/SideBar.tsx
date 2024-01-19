import React from "react";
import { Link } from "react-router-dom";

export default function SideBar() {
    const listItemStyle = "flex items-center p-2 text-gray-900 rounded-sm hover:bg-gray-100 group"

    return (
        <div>
            <aside id="separator-sidebar"
                   className="transition-300 fixed top-0 left-0 z-40 w-60 h-screen flex shadow-md transition-transform -translate-x-full sm:translate-x-0"
                   aria-label="Sidebar">
                <div className="w-full h-full px-4 py-4 overflow-y-auto bg-white">
                    <Link to="/" className="flex items-center ps-2.5 mb-14">
                        <img src="https://flowbite.com/docs/images/logo.svg" className="h-6 me-3 sm:h-7"
                             alt="Flowbite Logo"/>

                        <span
                            className="self-center text-xl font-semibold whitespace-nowrap">
                            Celebrate
                        </span>
                    </Link>

                    <div className="w-full h-5/6 flex flex-col justify-between items-start">
                        <ul className="w-full space-y-2 font-medium">
                            <li>
                                <Link to="/"
                                      className={listItemStyle}>
                                    <svg
                                        className="w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-900"
                                        aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor"
                                        viewBox="0 0 22 21">
                                        <path
                                            d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z"/>
                                        <path
                                            d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z"/>
                                    </svg>
                                    <span className="ms-3">Dashboard</span>
                                </Link>
                            </li>

                            <li>
                                <Link to="/birthdays"
                                      className={listItemStyle}>
                                    <svg
                                        className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-900"
                                        aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor"
                                        viewBox="0 0 18 18">
                                        <path
                                            d="M6.143 0H1.857A1.857 1.857 0 0 0 0 1.857v4.286C0 7.169.831 8 1.857 8h4.286A1.857 1.857 0 0 0 8 6.143V1.857A1.857 1.857 0 0 0 6.143 0Zm10 0h-4.286A1.857 1.857 0 0 0 10 1.857v4.286C10 7.169 10.831 8 11.857 8h4.286A1.857 1.857 0 0 0 18 6.143V1.857A1.857 1.857 0 0 0 16.143 0Zm-10 10H1.857A1.857 1.857 0 0 0 0 11.857v4.286C0 17.169.831 18 1.857 18h4.286A1.857 1.857 0 0 0 8 16.143v-4.286A1.857 1.857 0 0 0 6.143 10Zm10 0h-4.286A1.857 1.857 0 0 0 10 11.857v4.286c0 1.026.831 1.857 1.857 1.857h4.286A1.857 1.857 0 0 0 18 16.143v-4.286A1.857 1.857 0 0 0 16.143 10Z"/>
                                    </svg>
                                    <span className="flex-1 ms-3 whitespace-nowrap">Birthdays</span>
                                </Link>
                            </li>

                            <li>
                                <Link to="/gifts"
                                      className={listItemStyle}>
                                    <svg
                                        className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-900"
                                        aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor"
                                        viewBox="0 0 18 20">
                                        <path
                                            d="M17 5.923A1 1 0 0 0 16 5h-3V4a4 4 0 1 0-8 0v1H2a1 1 0 0 0-1 .923L.086 17.846A2 2 0 0 0 2.08 20h13.84a2 2 0 0 0 1.994-2.153L17 5.923ZM7 9a1 1 0 0 1-2 0V7h2v2Zm0-5a2 2 0 1 1 4 0v1H7V4Zm6 5a1 1 0 1 1-2 0V7h2v2Z"/>
                                    </svg>
                                    <span className="flex-1 ms-3 whitespace-nowrap">Gifts</span>
                                </Link>
                            </li>

                            <li>
                                <Link to="/explore"
                                      className={listItemStyle}>
                                    <svg
                                        className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-900"
                                        aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor"
                                        viewBox="0 0 20 18">
                                        <path
                                            d="M14 2a3.963 3.963 0 0 0-1.4.267 6.439 6.439 0 0 1-1.331 6.638A4 4 0 1 0 14 2Zm1 9h-1.264A6.957 6.957 0 0 1 15 15v2a2.97 2.97 0 0 1-.184 1H19a1 1 0 0 0 1-1v-1a5.006 5.006 0 0 0-5-5ZM6.5 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM8 10H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Z"/>
                                    </svg>
                                    <span className="flex-1 ms-3 whitespace-nowrap">Explore</span>
                                </Link>
                            </li>

                            <li>
                                <Link to="/wishlist"
                                      className={listItemStyle}>
                                    <svg
                                        className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-900"
                                        aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor"
                                        viewBox="0 0 18 20">
                                        <path
                                            d="M17 5.923A1 1 0 0 0 16 5h-3V4a4 4 0 1 0-8 0v1H2a1 1 0 0 0-1 .923L.086 17.846A2 2 0 0 0 2.08 20h13.84a2 2 0 0 0 1.994-2.153L17 5.923ZM7 9a1 1 0 0 1-2 0V7h2v2Zm0-5a2 2 0 1 1 4 0v1H7V4Zm6 5a1 1 0 1 1-2 0V7h2v2Z"/>
                                    </svg>
                                    <span className="flex-1 ms-3 whitespace-nowrap">Wishlist</span>
                                </Link>
                            </li>
                        </ul>

                        <ul className="w-full pt-4 mt-4 space-y-2 font-medium border-t border-gray-100">
                            <li>
                                <Link to="/settings"
                                      className={listItemStyle}>

                                    <svg
                                        className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-900"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24" fill="currentColor">
                                        <path fill-rule="evenodd"
                                              d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z"
                                              clip-rule="evenodd"/>
                                    </svg>

                                    <span className="flex-1 ms-3 whitespace-nowrap">Account</span>
                                </Link>
                            </li>

                            <li>
                                <Link to="/settings"
                                      className={listItemStyle}>
                                    <svg
                                        className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-900"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 50 50">
                                        <path
                                            d="M47.16,21.221l-5.91-0.966c-0.346-1.186-0.819-2.326-1.411-3.405l3.45-4.917c0.279-0.397,0.231-0.938-0.112-1.282 l-3.889-3.887c-0.347-0.346-0.893-0.391-1.291-0.104l-4.843,3.481c-1.089-0.602-2.239-1.08-3.432-1.427l-1.031-5.886 C28.607,2.35,28.192,2,27.706,2h-5.5c-0.49,0-0.908,0.355-0.987,0.839l-0.956,5.854c-1.2,0.345-2.352,0.818-3.437,1.412l-4.83-3.45 c-0.399-0.285-0.942-0.239-1.289,0.106L6.82,10.648c-0.343,0.343-0.391,0.883-0.112,1.28l3.399,4.863 c-0.605,1.095-1.087,2.254-1.438,3.46l-5.831,0.971c-0.482,0.08-0.836,0.498-0.836,0.986v5.5c0,0.485,0.348,0.9,0.825,0.985 l5.831,1.034c0.349,1.203,0.831,2.362,1.438,3.46l-3.441,4.813c-0.284,0.397-0.239,0.942,0.106,1.289l3.888,3.891 c0.343,0.343,0.884,0.391,1.281,0.112l4.87-3.411c1.093,0.601,2.248,1.078,3.445,1.424l0.976,5.861C21.3,47.647,21.717,48,22.206,48 h5.5c0.485,0,0.9-0.348,0.984-0.825l1.045-5.89c1.199-0.353,2.348-0.833,3.43-1.435l4.905,3.441 c0.398,0.281,0.938,0.232,1.282-0.111l3.888-3.891c0.346-0.347,0.391-0.894,0.104-1.292l-3.498-4.857 c0.593-1.08,1.064-2.222,1.407-3.408l5.918-1.039c0.479-0.084,0.827-0.5,0.827-0.985v-5.5C47.999,21.718,47.644,21.3,47.16,21.221z M25,32c-3.866,0-7-3.134-7-7c0-3.866,3.134-7,7-7s7,3.134,7,7C32,28.866,28.866,32,25,32z"/>
                                    </svg>
                                    <span className="flex-1 ms-3 whitespace-nowrap">Settings</span>
                                </Link>
                            </li>

                            <li>
                                <Link to="/login"
                                      className={listItemStyle}>
                                    <svg
                                        className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-900"
                                        aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                                        viewBox="0 0 18 16">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                              stroke-width="2"
                                              d="M1 8h11m0 0L8 4m4 4-4 4m4-11h3a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-3"/>
                                    </svg>
                                    <span className="flex-1 ms-3 whitespace-nowrap">Sign Out</span>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </aside>
        </div>
    );
}
