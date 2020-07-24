import axios from "axios";
import {put, delay} from "redux-saga/effects";

import * as actions from "../actions";


export function* logoutSaga(action) {
	localStorage.removeItem("token");
	localStorage.removeItem("userId");
	localStorage.removeItem("expirationDate");
	yield put(actions.logoutSucceed());
}

export function* checkAuthTimeoutSaga(action) {
	yield delay(action.expirationTime * 1000);
	yield put(actions.logout());
}

export function* authUserSaga(action) {
	yield put(actions.authStart());
	const authData = {
		email: action.email,
		password: action.password,
		returnSecureToken: true
	};
	let url =
		"https://identitytoolkit.googleapis.com/v1/" +
		"accounts:signUp?key=AIzaSyD3kD2L40VFXJp5x1pcAeyQMXT4fJzCJf4";
	if (!action.isSignup) {
		url =
			'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' +
			'AIzaSyD3kD2L40VFXJp5x1pcAeyQMXT4fJzCJf4';
	}
	try {
		const response = yield axios.post(url, authData);

		const expirationDate = new Date(
			new Date().getTime() + response.data.expiresIn * 1000
		);
		localStorage.setItem("token", response.data.idToken);
		localStorage.setItem("expirationDate", expirationDate);
		localStorage.setItem("userId", response.data.localId);
		yield put(
			actions.authSuccess(response.data.idToken, response.data.localId)
		);
		yield put(actions.checkAuthTimeout(response.data.expiresIn));
	} catch (error) {
		yield put(actions.authFail(error.response.data.error));
	}
}

export function* authCheckStateSaga(action) {
	const token = localStorage.getItem("token");
	if (!token) {
		yield put(actions.logout());
	} else {
		const expirationDate = new Date( localStorage.getItem("expirationDate")
		);
		if (expirationDate <= new Date()) {
			yield put(actions.logout());
		} else {
			const userId = localStorage.getItem("userId");
			yield put(actions.authSuccess(token, userId));
			yield put(
				actions.checkAuthTimeout(
					(expirationDate.getTime() - new Date().getTime()) / 1000
				)
			);
		}
	}
}
