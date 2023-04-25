import React, { useEffect } from 'react'
import frontend from '../assets/img/frontend.png'
import { useContext } from "react";
import { Context } from '../store/context';

const Url = "http://localhost:5000/image/1"
const LoginAut = () => {
    const { store } = useContext(Context);
    return (
        <div>
            <div className="container text-center text-light">
                <div className='row'>
                    <div className='col'>
                        <h1>
                            Esta Imagen se hace visible desde el Front-end en una Private-Route con Login Autenticado por Token desde el Backend
                        </h1>
                    </div>
                    <div className='col'>
                        <h1>
                            Esta Imagen se hace visible desde el Back-end 
                        </h1>
                    </div>
                </div>
                <div className='row'>
                    <div className='col'>
                        <img src={frontend} alt=" " style={{ maxWidth: "600px" }} />
                    </div>
                    <div className='col'>
                        <img src={Url} alt=" " style={{ maxWidth: "600px" }} />
                    </div>

                </div>
            </div>
        </div>
    )
}
export default LoginAut;