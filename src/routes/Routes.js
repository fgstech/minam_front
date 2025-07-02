import React from 'react';
import { Switch } from 'react-router-dom';
import { RoleBasedRouting } from '../lib/permission'
// import { ADMIN_GROUPS, PROVIDERS_ADMINS_GROUPS, PROVIDERS_GROUPS, RECEPCIONIST_GROUPS } from '../lib/roles';

// VIEWS GENERAL
import PanelView from '../insfrastructure/pages/panel';
import CoursesView from '../insfrastructure/pages/academy/courses';
import OrdersView from '../insfrastructure/pages/marketplace/orders';
import RankingView from '../insfrastructure/pages/ranking';
import WalletView from '../insfrastructure/pages/wallet';
import ProfileView from '../insfrastructure/pages/profile';

const Rutas = () => (
        <Switch>
                {/* rutas globales */}
                <RoleBasedRouting path="/" exact component={PanelView}></RoleBasedRouting>
                <RoleBasedRouting path="/academia/cursos" exact component={CoursesView}></RoleBasedRouting>
                <RoleBasedRouting path="/mercado/canjes" exact component={OrdersView}></RoleBasedRouting>                
                <RoleBasedRouting path="/ranking" exact component={RankingView}></RoleBasedRouting>                
                <RoleBasedRouting path="/wallet" exact component={WalletView}></RoleBasedRouting>                
                <RoleBasedRouting path="/perfil" exact component={ProfileView}></RoleBasedRouting>                
        </Switch>
);

export default Rutas;