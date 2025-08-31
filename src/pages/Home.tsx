import { Outlet } from "react-router";
import Navbar from "./NavBar";


const Home = () => {
    return (
        <>
        <Navbar/>
        <div className="max-w-7xl mx-auto">
            
        <Outlet/>
        </div>
        </>
    );
};

export default Home;