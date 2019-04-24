import React from 'react'
import { render } from 'react-dom'
//登录login
import { LocaleProvider } from 'antd';
import './index.css';
import lazyLoadComponent from 'lazy-load-component'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import moment from 'moment';
import 'moment/locale/zh-cn';
//顶级根目录页面
import App from './App'
//懒加载
const Login = lazyLoadComponent(() => import('./App'));
const Register = lazyLoadComponent(() => import('./components/register'));
moment.locale('zh-cn');

render(
	<LocaleProvider>
			<BrowserRouter>
				<Switch>
					<Route exact path='/login' component={Login} />
					<Route path='/register' component={Register} />
					<App>
						<Switch>
						</Switch>
					</App>
				</Switch>
			</BrowserRouter>
		</LocaleProvider >,
	document.getElementById('root')
)