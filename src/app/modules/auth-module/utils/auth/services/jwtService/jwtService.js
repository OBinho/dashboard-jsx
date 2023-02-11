import FuseUtils from '../../../../../../../@fuse/utils/FuseUtils';
import { Alert, alertClasses } from '@mui/material';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { showMessage } from '../../../../../../stores/fuse/messageSlice';
/* eslint-disable camelcase */

// const backendUrl = "http://192.168.6.188:8080";
const backendUrl = "http://localhost:8080";

class JwtService extends FuseUtils.EventEmitter {
	init() {
		this.setInterceptors();
		this.handleAuthentication();
	}

	setInterceptors = () => {
		axios.interceptors.response.use(
			response => {
				return response;
			},
			err => {
				return new Promise((resolve, reject) => {

					if (err.response.status === 401 && err.config && !err.config.__isRetryRequest) {
						// if you ever get an unauthorized response, logout the user
						this.emit('onAutoLogout', 'Token de acesso inválido.');
						this.setSession(null);
					}
					throw err;
				});
			}
		);
	};

	handleAuthentication = () => {
		const access_token = this.getAccessToken();

		if (!access_token) {
			this.emit('onNoAccessToken');

			return;
		}

		if (this.isAuthTokenValid(access_token)) {
			this.setSession(access_token);
			this.emit('onAutoLogin', true);
		} else {
			this.setSession(null);
			this.emit('onAutoLogout', 'access_token expired');
		}
	};

	createUser = data => {
		return new Promise((resolve, reject) => {
			axios.post('/api/auth/register', data).then(response => {
				if (response.data.user) {
					this.setSession(response.token);
					resolve(response.data.user);
					this.emit('onLogin', response.data.user);
				} else {
					reject(response.data.error);
				}
			});
		});
	};

	signInWithEmailAndPassword = (email, password) => {
		return new Promise((resolve, reject) => {
			axios
				.post(backendUrl + '/auth', {
					'email': email,
					'password': password
				})
				.then(response => {
					if (response.data.user) {
						this.setSession(response.data.token);
						resolve(response.data.user);
						this.emit('onLogin', response.data.user);
					} else {
						alert('Erro');
						reject(response.data.error);
					}
				}).catch(responseError => {
					
				});
		});
	};

	signInWithToken = () => {
		return new Promise((resolve, reject) => {
			axios
				.post(backendUrl + '/auth/access-token', {
					access_token: this.getAccessToken()
				})
				.then(response => {
					if (response.data.user) {
						this.setSession(response.data.token);
						resolve(response.data.user);
					} else {
						this.logout();
						reject(new Error('Faça seu login novamente'));
					}
				})
				.catch(error => {
					this.logout();
					reject(new Error('Faça seu login novamente'));
				});
		});
	};

	updateUserData = user => {
		console.log('update');
		return axios.post('/api/auth/user/update', {
			user
		});
	};

	setSession = access_token => {
		if (access_token) {
			localStorage.setItem('jwt_access_token', access_token);
			axios.defaults.headers.common.Authorization = `Bearer ${access_token}`;
		} else {
			localStorage.removeItem('jwt_access_token');
			delete axios.defaults.headers.common.Authorization;
		}
	};

	logout = () => {
		this.setSession(null);
		this.emit('onLogout', 'Logged out');
	};

	isAuthTokenValid = access_token => {
		if (!access_token) {
			return false;
		}
		const decoded = jwtDecode(access_token);
		const currentTime = Date.now() / 1000;
		if (decoded.exp < currentTime) {
			console.warn('access token expired');
			return false;
		}

		return true;
	};

	getAccessToken = () => {
		return window.localStorage.getItem('jwt_access_token');
	};
}

const instance = new JwtService();

export default instance;
