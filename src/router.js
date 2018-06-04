
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import asyncComponent from './components/AsyncComponent';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';// redux 和react-redux（关联react和redux）

import thunk from 'redux-thunk';
import root from './reducers';// reducers 状态树state和逻辑操作
import storage from './utils/storage';

const Login = asyncComponent(() => import('./components/Login'));

// 生成状态树对象
const store = createStore(
    root,
    applyMiddleware(thunk)
);

const RouteWithSubRoutes = route => (
    <Route
        path={route.path}
        exact={route.exact}
        render={(props) => {
            // pass the sub-routes down to keep nesting
            // let { isAuthenticated } = store.getState().login; // 刷新后就取不到值了
            // const isAuthenticated = storage.get(STORAGE_NAME.ACCESS_TOKEN);
            // if (isAuthenticated) {
            //     return (<route.component {...props} routes={route.routes} />);
            // }
            // return (<Redirect to={PATH.ROOT}/>);

            return (<route.component {...props} routes={route.routes} />);
        }}
    />
);


export default class Router extends Component {
    render() {
        return (
            <Provider store={store}>
                <Router>
                    <Switch>
                        <Route path={PATH.ROOT} exact={true} component={Login} />
                        {ROUTES.map((route, i) => <RouteWithSubRoutes key={i} {...route} />)}
                    </Switch>
                </Router>
            </Provider >
        )
    }
}
