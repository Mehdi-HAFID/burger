import { takeEvery} from "redux-saga/effects";

import * as actionTypes from "../actions/actionTypes"
import {authCheckStateSaga, authUserSaga, checkAuthTimeoutSaga, logoutSaga} from "./auth";
import {initIngredientsSaga} from "./burgerBuilder";
import {fetchOrdersSaga, purchaseBurgerSaga} from "./order";

export function* watchAuth() {
	yield takeEvery(actionTypes.AUTH_INITIATE_LOGOUT, logoutSaga);
	yield takeEvery(actionTypes.AUTH_CHECK_TIMEOUT, checkAuthTimeoutSaga);
	yield takeEvery(actionTypes.AUTH_USER, authUserSaga);
	yield takeEvery(actionTypes.AUTH_CHECK_STATE, authCheckStateSaga);
}

export function* watchBurgerBuilder() {
	yield takeEvery(actionTypes.INIT_INGREDIENTS, initIngredientsSaga);
}

export function* watchOrder() {
	// eslint-disable-next-line no-undef
	yield takeEvery(actionTypes.PURCHASE_BURGER, purchaseBurgerSaga);
	yield takeEvery(actionTypes.FETCH_ORDERS, fetchOrdersSaga);
}