function NavBar(props){
    return(
    <nav className="navbar">
        <span className="navbar-brand">🍽️ MenuCard</span>
        <div className="navbar-links">
            <button className="navbar-link" onClick={()=>props.onNavigate("home")} type="button">Home</button>
            {props.user ? (
                <>
                    <span className="navbar-user">Hi, {props.user.name}</span>
                    <button className="navbar-link" onClick={props.onLogout} type="button">Log out</button>
                </>
            ) : (
                <>
                    <button className="navbar-link" onClick={()=>props.onNavigate("login")} type="button">Login</button>
                    <button className="navbar-link" onClick={()=>props.onNavigate("register")} type="button">Register</button>
                </>
            )}
            <a href="#">Cart</a>
        </div>
    </nav>
    );
}
export default NavBar;