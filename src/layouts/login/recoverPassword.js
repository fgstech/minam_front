import React, { Component, Fragment } from 'react';
// import Logo from '../../assets/img/logos/logo.png';
// import LogoSalfa from '../../assets/img/logos/logo-salfa.png';
// import Bg from '../../assets/img/bg/bg-login.png';
import './style.css';

class RecoverPassword extends Component {

    render() {
        return (
            <Fragment>
                <nav className="navbar d-flex align-items-center d-flex justify-content-start">
                    {/* <img src={Logo} className="img-fluid" alt="Logo"></img> */}
                </nav>
                <div className="container-fluid pl-0">
                    <div className="row">
                        <div className="col-12 col-md-6">
                            {/* <img src={Bg} className="img-fluid" alt="Bg Login"></img> */}
                        </div>
                        <div className="col-12 col-md-6 d-flex align-items-center d-flex justify-content-center">
                            <div className="row form">
                                <div className="col-12 text-center">
                                    {/* <img src={LogoSalfa} className="img-fluid" alt="Logo"></img> */}
                                    <h2>Restablece tu Contraseña</h2>
                                    <form className="mx-auto">
                                        <input type="password" className="form-control mb-10" placeholder="Nueva contraseña"></input>
                                        <input type="password" className="form-control mb-20" placeholder="Repite tu nueva contraseña"></input>
                                        <button type="submit" className="btn-sl w-100 mb-4 py-10">Aceptar</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body form mx-auto">
                                <p>Tu contraseña ha sido cambiada exitosamente</p>
                            </div>
                            <div className="modal-footer mx-auto">
                                <button data-dismiss="modal" aria-label="Close" type="button" className="btn-sl my-1">Aceptar</button>
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
        )
    }
}

export default RecoverPassword;
