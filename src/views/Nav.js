import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { Context } from '../store/context';


const Nav = ({user}) => {
    const { actions } = useContext(Context);
    const navigate = useNavigate()
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-primary bg-opacity-75">
                <div className="container-fluid">
                    <Link to="/" className="navbar-brand">Navbar</Link>
                    <button className="navbar-toggler " type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon "></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav  me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link to="/register" className="nav-link" aria-current="page">Register</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/login" className="nav-link" >Login</Link>
                            </li>{
                                user ? (
                                    <li className="nav-item">
                                        <Link to="/loginaut" className="nav-link" >Pagina Logueado</Link>
                                    </li>
                                    
                                ) :
                                    (
                                        <div></div>
                                    )}
                        </ul>{
                            user ? (
                                <button className="btn btn-outline-danger me-md-2" onClick={e => actions.cerrarSesion(navigate)}>cerrar sesión</button>
                            ) : (
                                <div></div>
                            )
                        }
                    </div>
                </div>
            </nav>
        </div>
    )
}
export default Nav;