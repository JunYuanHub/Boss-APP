import React from 'react';
import ReactDom from 'react-dom';
import { createStore,applyMiddleware,compose } from "redux";
import thunk from 'redux-thunk';
import { Provider } from 'react-redux'
import { BrowserRouter,Switch,Route } from "react-router-dom";
import AuthRoute from './compoennt/authroute/authroute'
import DashBoard from './compoennt/dashboard/dashboard'

import reducer from './reducer'
import './config'
import './index.css'
import Login from "./container/login/login";
import Chat from "./compoennt/chat/chat";
import Register from "./container/register/register";
import { GlobalStyle } from './style'
import EmployerInfo from './container/employerInfo/employerInfo'
import EmployeeInfo from './container/employeeInfo/employeeInfo'


// const store = createStore(reducer,compose(
//     applyMiddleware(thunk),
//     window.devToolsExtension?window.window.devToolsExtension():f=>f
// ));
//使用redux-dev-extension开发工具配置；需要引入compose模块，并创建enhancer，在createstore里加入enhancer
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer,composeEnhancers(
    applyMiddleware(thunk)
));


ReactDom.render(
    (
    <Provider store={store}>
        <GlobalStyle/>
        <BrowserRouter>
            <AuthRoute/>
            <Switch>
                <Route path={'/employeeInfo'} component={EmployeeInfo}/>
                <Route path={'/employerInfo'} component={EmployerInfo}/>
                <Route path={'/login'} component={Login}/>
                <Route path={'/register'} component={Register}/>
                <Route path={'/chat/:user'} component={Chat}/>
                <Route component={DashBoard}/>
            </Switch>
        </BrowserRouter>
    </Provider>),
    document.getElementById('root')
);












// 实现antd按需加载，装饰器功能实现，@connect
// npm install babel-plugin-import --save-dev
// "babel-plugin-import": "^1.12.0",
//
// "babel": {
//     "presets": [
//         "react-app"
//     ],
//         "plugins":[
//         [
//             "import",
//             {
//                 "libraryName": "antd-mobile",
//                 "style": "css"
//             }
//         ],
//         "transform-decorators-legacy"
//     ]
// },