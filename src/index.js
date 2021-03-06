import React from 'react'
import { render } from 'react-dom'
//登录login
import { LocaleProvider } from 'antd';
import './index.less';
import lazyLoadComponent from 'lazy-load-component'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import moment from 'moment';
import 'moment/locale/zh-cn';
//顶级根目录页面
import App from './App'
//懒加载
const Login = lazyLoadComponent(() => import('./components/login'));
const Register = lazyLoadComponent(() => import('./components/register'));
const index = lazyLoadComponent(() => import('./components/main'));
const management = lazyLoadComponent(() => import('./components/management'));
moment.locale('zh-cn');

render(
	<LocaleProvider>
			<BrowserRouter>
				<Switch>
					<Route exact path='/login' component={Login} />
					<Route path='/register' component={Register} />
					<Route path='/index' component={index} />
					<Route path='/management' component={management} />
					<App>
						<Switch>
						</Switch>
					</App>
				</Switch>
			</BrowserRouter>
		</LocaleProvider >,
	document.getElementById('root')
)