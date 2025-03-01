import React from 'react';
import './style.css';
import { useHistory } from 'react-router-dom'
import { Icon } from '../icons'

const Navbar = (props) => {
	const history = useHistory();
	const goTo = (path) => {
		history.push(path);
	}

	return (
		<nav className="navbar d-flex align-items-center">
			<div className="col-10 d-flex justify-content-start p-0 align-items-center pl-3">
				
			</div>
			<div className="col-2 d-flex justify-content-end align-items-center">
				<div className="mobile-none">
					<div className="dropdown">
						<button className="container-avatar" onClick={()=> goTo("/")}>
							<Icon name="calendar_month"/>
						</button>
					</div>
				</div>
			</div>
		</nav>
	)
}


export default Navbar;


