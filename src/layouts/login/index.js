import React, { Component, Fragment, useState } from 'react';
import { useHistory } from "react-router-dom"
import AxiosService from '../../lib/axios';
import AuthAPI from '../../api/auth';
import Applications from '../../application/Applications';
import './style.css';

const Login = ({ ...props }) => {
    const history = useHistory();
    const [email, setEmail] = useState(null);
    const [username, setUserName] = useState(null);
    const [password, setPassword] = useState(null);
    const [err, setErr] = useState(false);

    const handleKeyDown = (event) => {
        if (event.key === "Enter") {
            login();
        }
    };

    const login = async () => {
        return AuthAPI.login({ username: username, password: password })
            .then(async res => {
                setErr(false);
                AxiosService.setToken(res.data.token);
                AxiosService.setIdToken(res.data.id);
                history.push('/');
            })
            .catch(error => {
                console.log(error)
                switch (error.status) {
                    case 400: return setErr(true);
                    default: return console.log(error);
                }
            })
    }

    const recoveryPassword = () => {
        AuthAPI.recovery(email)
            .then(res => console.log(res))
            .catch(err => console.log(err));
    }

    return (
        <Fragment>
            <div style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                height: "100vh"
            }}>
                <div className="container login">
                    <div className="row">
                        <div className="col-12">
                            <div className="row form">
                                <div className="col-12 text-center">
                                    <svg width="332" height="129" viewBox="0 0 332 129" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M120.486 129H118.267V0H120.486V129Z" fill="#E9531E" />
                                        <path d="M194.341 89.264C194.339 88.9683 194.339 88.7018 194.343 88.4373C194.372 86.286 194.407 84.1348 194.442 81.9835C194.53 76.6773 194.619 71.1902 194.623 65.7926C194.625 63.0384 194.393 60.4573 193.932 58.1232C192.871 52.7547 189.929 49.1271 185.189 47.3435C182.491 46.3282 179.547 45.9508 176.448 46.227C169.722 46.8203 164.707 49.8721 161.543 55.295C161.524 55.33 161.502 55.365 161.483 55.4C161.812 52.8967 162.114 50.3175 161.872 47.715L161.839 47.363H145.825V53.9432H153.515L153.125 89.4585H147.036V95.9998H168.593V89.4176H161.648V89.3884C161.647 89.1259 161.647 88.8983 161.65 88.6707L161.726 83.5687C161.793 78.8519 161.863 73.9756 161.976 69.179C162.018 67.3137 162.192 65.707 162.499 64.2657C163.566 59.2863 166.048 56.0361 170.086 54.3244C172.436 53.3285 175.027 53.0329 178.015 53.4238C182.057 53.9509 184.545 56.2131 185.407 60.146C185.929 62.521 186.193 64.9018 186.197 67.2164C186.205 72.4195 186.11 77.7121 186.018 82.8296C185.985 84.7144 185.952 86.6011 185.921 88.4879C185.917 88.7485 185.894 89.0091 185.868 89.3067L185.857 89.4585H179.814V96.0017H201.293V89.3865H194.341V89.264Z" fill="#E9531E" />
                                        <path d="M162.627 35.1356C162.814 34.8399 162.979 34.5754 163.152 34.3147C165.169 31.2473 167.392 30.7261 170.581 32.5642C170.934 32.7684 171.284 32.9765 171.632 33.1847C172.596 33.7604 173.593 34.3556 174.636 34.8282C176.519 35.6802 178.327 36.1081 180.05 36.1081C181.207 36.1081 182.322 35.9156 183.395 35.5304C186.321 34.4801 188.157 32.109 189.93 29.8158L190.738 28.779L185.698 25.2195L185.468 25.4782C185.24 25.7311 185.026 25.9781 184.816 26.2213C184.378 26.725 183.963 27.2016 183.523 27.6412C181.481 29.6757 180.015 29.8916 177.477 28.5378C177.011 28.2889 176.552 28.0282 176.091 27.7656C175.314 27.3261 174.512 26.869 173.684 26.478C169.824 24.6516 166.158 24.3073 163.084 25.488C160.209 26.5928 157.995 28.9697 156.5 32.5564L156.366 32.8812L162.111 35.9525L162.627 35.1356Z" fill="#E9531E" />
                                        <path d="M229.403 87.2634C226.047 90.5564 219.871 91.5562 215.919 89.4438C213.283 88.0356 211.964 85.7229 212.001 82.5719C212.036 79.59 213.346 77.5244 216.005 76.2503C218.209 75.1961 220.677 74.5873 223.551 74.3869C226.039 74.2138 228.499 74.1146 231.102 74.0096C232.08 73.9707 233.069 73.9318 234.071 73.8871C233.919 78.6545 233.197 83.5405 229.403 87.2634ZM324.988 89.366V89.3077C324.986 89.0393 324.986 88.8136 324.99 88.5899C325.019 86.9347 325.05 85.2794 325.085 83.6241C325.157 79.8993 325.231 76.1725 325.264 72.4477C325.274 71.4829 325.299 70.5201 325.324 69.5554C325.41 66.1242 325.502 62.5744 324.861 59.0927C323.894 53.8352 321.554 50.2562 317.707 48.1536C315.092 46.7239 312.121 46.0899 308.08 46.1346C300.573 46.1968 295.233 49.7155 292.212 56.5933C292.183 56.6594 292.151 56.7236 292.116 56.7917C292.107 56.7547 292.097 56.7178 292.085 56.6808C291.211 53.4695 289.673 51.0401 287.386 49.2545C284.362 46.8951 280.726 45.8603 276.562 46.1813C269.279 46.7434 264.038 49.9567 260.96 55.7355C261.414 52.9832 261.739 50.3301 261.439 47.6401L261.4 47.2939H245.468V53.9266H253.105L252.754 89.4147L248.434 89.3991H241.578V89.3524C241.576 89.1073 241.576 88.907 241.58 88.7047C241.613 87.1447 241.652 85.5848 241.691 84.0248C241.775 80.6112 241.862 77.0828 241.889 73.6089C241.897 72.5547 241.917 71.4965 241.932 70.4384C241.995 66.7933 242.057 63.0218 241.718 59.3417C241.159 53.24 237.801 49.1164 232.01 47.4183C229.96 46.8173 227.608 46.4322 224.816 46.2416C219.196 45.8584 213.359 46.9243 206.442 49.5988C205.712 49.8789 205.405 50.334 205.411 51.1179C205.418 52.0515 205.415 52.9832 205.418 53.9149H205.415V62.3021H213.155V54.8194C213.206 54.6385 213.322 54.5432 213.575 54.4557C217.629 53.0727 221.672 52.5514 225.595 52.9152C229.471 53.2711 231.922 54.9925 233.084 58.1805C234.153 61.1137 234.106 64.1714 234.058 67.406L234.048 67.9896C233.596 67.9876 233.156 67.9857 232.72 67.9818C231.527 67.9721 230.384 67.9643 229.243 67.9973C223.845 68.1549 218.113 68.4758 212.604 70.4968C207.332 72.4302 204.447 75.6824 203.783 80.4381C203.588 81.8347 203.555 83.3051 203.686 84.8068C204.145 90.1752 206.659 93.8397 211.154 95.6973C213.708 96.7515 216.301 97.2786 218.914 97.2786C221.326 97.2786 223.755 96.8293 226.185 95.9287C229.747 94.61 232.376 91.9919 234.408 87.7205L233.725 95.9968L268.167 95.9385V89.3427H261.293L261.355 83.6436C261.41 78.7614 261.466 73.7139 261.575 68.752C261.604 67.3224 261.807 65.743 262.175 64.0566C263.73 56.9259 268.741 52.9891 275.96 53.2497C280.237 53.4073 283.011 55.578 283.981 59.5284C284.565 61.9053 284.876 64.4495 284.882 66.8886C284.894 72.1909 284.789 77.5847 284.687 82.8014C284.65 84.762 284.611 86.7207 284.58 88.6794C284.576 88.8759 284.557 89.0684 284.534 89.3174L284.524 89.4322H278.464V95.9579H300.081V89.3758H293.31L293.306 89.3232C293.29 89.0898 293.279 88.8953 293.28 88.7008L293.314 84.0443C293.345 79.3527 293.378 74.5036 293.458 69.7343C293.485 68.1354 293.652 66.4763 293.96 64.8035C295.34 57.2624 300.577 52.9463 308.008 53.2536C312.351 53.4345 315.04 55.5488 316.001 59.5421C316.585 61.9617 316.895 64.6168 316.899 67.2174C316.907 72.5119 316.79 77.8959 316.679 83.1029C316.636 85.0363 316.595 86.9697 316.558 88.905C316.556 89.0606 316.529 89.2163 316.502 89.3913L315.503 89.3894C315.125 89.3894 314.759 89.3971 314.386 89.3971H310.412V94.324C310.412 94.3707 310.41 94.4213 310.41 94.468L310.412 95.4347V95.9035L310.414 95.954H332V89.366H324.988Z" fill="#E9531E" />
                                        <path d="M55.1693 49.5705C65.1271 49.5705 71.4712 56.3905 71.4712 66.5803V87.7622C71.4712 89.5274 70.5075 90.6507 68.6605 90.6507H64.6453C62.7982 90.6507 61.8346 89.5274 61.8346 87.7622V67.3826C61.8346 61.6057 58.6224 57.8347 53.1617 57.8347C47.7813 57.8347 43.9266 61.6057 43.9266 67.3826V87.7622C43.9266 89.5274 42.8827 90.6507 41.116 90.6507H37.0204C35.2537 90.6507 34.2098 89.5274 34.2098 87.7622V67.3826C34.2098 61.6057 31.0779 57.8347 25.5369 57.8347C20.1565 57.8347 16.3018 61.6057 16.3018 67.3826V87.7622C16.3018 89.5274 15.2579 90.6507 13.4912 90.6507H9.39565C7.62894 90.6507 6.58498 89.5274 6.58498 87.7622V59.3591C6.58498 58.4766 6.26376 57.9952 5.54102 57.9952C4.81828 57.9952 4.01523 58.3963 3.29249 58.5568C2.32884 58.958 1.44548 58.4766 0.963656 56.9521L0.321219 54.2241C-0.321219 52.5392 -8.70278e-08 51.5764 1.28487 50.8543C2.97127 49.8915 5.1395 49.5705 6.74559 49.5705C10.7608 49.5705 14.1336 51.4961 14.8564 56.23C17.5064 52.2183 21.8429 49.5705 27.8657 49.5705C33.8886 49.5705 38.4659 52.0578 41.1963 56.3102C44.1676 52.2985 48.9055 49.5705 55.1693 49.5705Z" fill="#E9531E" />
                                        <path d="M86.9574 43.4727C83.424 43.4727 80.533 40.5842 80.533 37.0539C80.533 33.5236 83.424 30.6351 86.9574 30.6351C90.4908 30.6351 93.3818 33.5236 93.3818 37.0539C93.3818 40.5842 90.4908 43.4727 86.9574 43.4727ZM84.9498 90.6507C83.1028 90.6507 82.1391 89.5274 82.1391 87.7622V53.0206C82.1391 51.2554 83.1028 50.1322 84.9498 50.1322H88.965C90.812 50.1322 91.7757 51.2554 91.7757 53.0206V87.7622C91.7757 89.5274 90.812 90.6507 88.965 90.6507H84.9498Z" fill="#E9531E" />
                                    </svg>
                                    {err ? <span className="error-label">Los datos ingresados no son correctos</span> : null}
                                    <br /><br />
                                    <form className="mx-auto">
                                        <input type="text" className={err ? "form-control mb-10 error" : "form-control mb-10"} placeholder="Nombre de usuario" onChange={value => setUserName(value.target.value)}></input>
                                        <input type="password" onKeyDown={handleKeyDown} className={err ? 'form-control mb-20 error' : 'form-control mb-20'} placeholder="Contraseña" onChange={value => setPassword(value.target.value)}></input>
                                        <button type="button" onClick={() => login()} className="btn-sl w-100 mb-4 py-10">Iniciar Sesión</button>
                                    </form>
                                </div>
                                {/* <div className="col-12 text-center">
                                    <p data-toggle="modal" data-target="#exampleModalCenter">¿Olvido su contraseña?</p>
                                </div> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Modal */}
            <div className="modal fade" id="exampleModalCenter" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body form mx-auto">
                            <p>Este modulo le ayudara a recuperar la información de acceso al sistema, para esto debe ingresar el correo electrónico asociado a su cuenta de usuario</p>
                            <div className="mx-auto">
                                <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Ingrese su email" onChange={val => setEmail(val.target.value)} />
                            </div>
                        </div>
                        <div className="modal-footer mx-auto">
                            <button data-toggle="modal" data-target="#result" data-dismiss="modal" aria-label="Close" type="button" onClick={() => recoveryPassword()} className="btn-sl my-1">Enviar</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="modal fade" id="result" tabindex="-1" role="dialog" aria-labelledby="resultTitle" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body form mx-auto">
                            <h4>¡Mensaje enviado!</h4>
                            <p>Hemos enviado un mensaje a ejemplo@email.com para que puedas elegir tu nueva contraseña.</p>
                            <p>¿No has recibido el correo? <a data-toggle="modal" data-target="#exampleModalCenter" data-dismiss="modal" aria-label="Close">Inténtalo de nuevo</a></p>
                        </div>
                        <div className="modal-footer mx-auto"></div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}



export default Login;
