
import "./style.css"
import { Link, useLocation } from "react-router-dom"
function Header(){
    const location =useLocation()
    const currentLocation= location.pathname;
    return(
        <div className="navbar">
            <div className="gradient"></div>
            <div className="links">
               <Link to="/" className={currentLocation==="/"? "active" :""}>SignUpPage</Link>
               <Link to="/podcasts" className={currentLocation==="/podcasts"? "active" :""}>Podcast</Link>
               <Link to="/create-a-podcast" className={currentLocation==="/create-a-podcast"? "active" :""}>Start a Podcast</Link>
               <Link to='/profile' className={currentLocation==="/profile"? "active" :""}>Profile</Link>
            </div>
        </div>
    )
}

export default Header