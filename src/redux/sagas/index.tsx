import { all, put, takeLatest, call } from "redux-saga/effects";
import { ACTIONS } from "../actionTypes";
import axios from "axios";
import { API_URL } from "../../config";

export function* initialAuthCheck() {
  const token = yield localStorage.getItem("token");
  yield put({ type: ACTIONS.CORE.FINISH, payload: token });
  yield put({ type: ACTIONS.FETCH_DONATIONS.START });
  if (token) {
    try {
      const response = yield call(axios.post, API_URL + "/users/validate", {}, {
        headers: {
          Authorization: "Bearer " + token
        }
      });
      const { accountType } = response.data;
      yield put({ type: ACTIONS.UPDATE_ACCOUNT_TYPE, payload: accountType });
    } catch (err) {}
  }
}

export function* fetchDonations() {
  try {
    const response = yield call(axios.get, API_URL + "/donations");
    const { donations } = response.data;
    yield put({ type: ACTIONS.FETCH_DONATIONS.SUCCESS, payload: donations });
  } catch (err) {
    yield put({ type: ACTIONS.FETCH_DONATIONS.FAILURE });
  }
}

export function* watchInitialAuthCheck() {
  yield takeLatest(ACTIONS.CORE.STARTUP, initialAuthCheck);
}

export function* watchFetchDonations() {
  yield takeLatest(ACTIONS.FETCH_DONATIONS.START, fetchDonations);
}

export default function* rootSaga() {
  yield all([watchInitialAuthCheck(), watchFetchDonations()]);
}
