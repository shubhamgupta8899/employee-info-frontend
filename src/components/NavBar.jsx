import React from "react";
import { Link } from "react-router-dom"; // ✅ Use Link for SPA navigation

const NavBar = () => {
    return (
        <div className="bg-slate-800 h-16 px-16 flex items-center justify-between">
            <h1 className="text-3xl font-bold text-green-500">Employee Data</h1>
            <div className="space-x-6 text-white">
                <Link className="hover:text-blue-400 cursor-pointer" to="/">Home</Link>
                <Link className="hover:text-blue-400 cursor-pointer" to="/profile">Profile</Link>
                <Link className="hover:text-blue-400 cursor-pointer" to="/logout">Logout</Link>
            </div>
        </div>
    );
};

export default NavBar;
