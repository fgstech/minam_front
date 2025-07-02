import React, { useEffect } from 'react';
import { BrowserRouter, Switch, Route, useHistory } from 'react-router-dom';
import { Middleware } from './lib/Router'
import Layout from './layouts/layout/index';
import './index.css';
import { CookiesProvider } from 'react-cookie';

import Login from './layouts/login/index';
import RecoveryPassword from './layouts/login/recoverPassword';
import NavigationService from './utils/history';
import Application from './application/Applications';
import CVView from './insfrastructure/pages/cv';

require('./utils/prototypes');

function App() {
	window.onerror = function (message, source, lineno, colno, error) {
		console.log(`Error global: ${message} en ${source}:${lineno}:${colno}`, error);
	};

	window.addEventListener('unhandledrejection', function (event) {
		console.log('Unhandled rejection:', event.reason);
	});

	return (
		<CookiesProvider>
			<BrowserRouter>
				<NavigationHandler />
				<Switch>
					<Route exact path="/login" component={Login}></Route>
					<Route exact path="/recovery" component={RecoveryPassword}></Route>
					<Route path="/profile/:id" component={CVView} />
					<Route path="/" component={() => Middleware(Layout)} />
				</Switch>
			</BrowserRouter>
		</CookiesProvider>
	);
}

const NavigationHandler = () => {
	const history = useHistory(); // useHistory debe estar dentro de un Router

	React.useEffect(() => {
		NavigationService.setHistory(history);
	}, [history]);

	return null;
};



export default App;
