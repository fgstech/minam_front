import React from 'react';
import { Switch } from 'react-router-dom';
import { RoleBasedRouting } from '../lib/permission'
// import { ADMIN_GROUPS, PROVIDERS_ADMINS_GROUPS, PROVIDERS_GROUPS, RECEPCIONIST_GROUPS } from '../lib/roles';

// VIEWS GENERAL
import PanelView from '../insfrastructure/pages/panel';
import CoursesView from '../insfrastructure/pages/academy/courses';
import OrdersView from '../insfrastructure/pages/marketplace/orders';

const Rutas = () => (
        <Switch>
                {/* rutas globales */}
                <RoleBasedRouting path="/" exact component={CoursesView}></RoleBasedRouting>
                <RoleBasedRouting path="/academia/cursos" exact component={CoursesView}></RoleBasedRouting>
                <RoleBasedRouting path="/empleo/practicas" exact component={PanelView}></RoleBasedRouting>
                <RoleBasedRouting path="/empleo/trabajos" exact component={PanelView}></RoleBasedRouting>
                <RoleBasedRouting path="/mercado/canjes" exact component={OrdersView}></RoleBasedRouting>                
        </Switch>
);

export default Rutas;