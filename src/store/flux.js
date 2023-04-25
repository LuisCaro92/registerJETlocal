import { useState } from "react";

const getState = ({ setStore, getActions, getStore }) => {

    return {
        store: {
            user: {
                name: "",
                lastname: "",
                username: "",
                email: "",
                password: ""
            },

            token: "",
            urlImage :[],

        },
        actions: {
            handleChange: (e) => {
                let { user } = getStore();

                const {
                    target: { value, name },
                } = e;
                setStore({
                    user: {
                        ...user,
                        [name]: value
                    },
                });
            },
            handleUserRegister: () => {
                const { user } = getStore();
                fetch("http://localhost:5000/users", {
                    headers: {
                        "Content-Type": "application/json"
                    },
                    method: "POST",
                    body: JSON.stringify(user),
                })
                    .then(res => res.json())
                    .then(data => {
                        alert("Usuario Creado Satisfactoriamente");
                        setStore({
                            user: {
                                name: "",
                                lastname: "",
                                username: "",
                                email: "",
                                password: ""
                            },
                        });
                        console.log(data);
                    })
                    .catch(error => {
                        alert("Ocurrio un error al registrar al Usuario" + error.message);
                        console.log(error)
                    });
            },
            handleUserLogin: () => {
                const { user, token } = getStore();
                fetch("http://localhost:5000/users/login", {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    method: "POST",
                    body: JSON.stringify(user),
                })
                .then(res => res.json())
                .then((data) => {
                    setStore({ token: data })
                    console.log(data)
                    console.log(token)
                })
                .catch(error => console.log(error));

                setStore({
                    user: {
                        username: "",
                        password: ""
                    },
                });
            },
            handleService: (e) => {
                let { service } = getStore();
                const {
                    target: { value, name },
                } = e;
                setStore({
                    service: {
                        ...service,
                        [name]: value
                    },
                });
            },
            cerrarSesion: (navigate) => {
                setStore({user: {
                    name: "",
                    lastname: "",
                    username: "",
                    email: "",
                    password: ""
                }, 
                token: "",
            
            })
            navigate("/")
            },
        },
    };
};
export default getState;
