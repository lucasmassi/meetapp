import { takeLatest, call, put, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import api from '../../../services/api';

import { updateMeetupSuccess, updateMeetupFailure } from './actions';

export function* updateMeetup({ payload }) {
  try {
    const { title, description, address, date } = payload.data;

    const meetup = Object.assign(
      { title, description, address, date }
    );

    const response = yield call(api.put, 'meetup', meetup);

    toast.success('Meetup atualizado com sucesso');

    yield put(updateMeetupSuccess(response.data));
  } catch (err) {
    toast.error('Erro ao atualizar meetup, confira os dados');
    yield put(updateMeetupFailure);
  }
}

export function* deleteMeetup({ payload }) {
  try {
    const { id } = payload.data;

    const meetup = Object.assign(
      { id }
    );

    const response = yield call(api.delete, 'meetup', meetup);

    toast.success('Meetup deletado com sucesso');

    yield put(updateMeetupSuccess(response.data));
  } catch (err) {
    toast.error('Erro ao atualizar meetup, confira os dados');
    yield put(updateMeetupFailure);
  }
}

export default all([takeLatest('@meetup/UPDATE_MEETUP_REQUEST', updateMeetup)]);
