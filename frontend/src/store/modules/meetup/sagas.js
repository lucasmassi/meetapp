import { takeLatest, call, put, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import api from '../../../services/api';
import history from '../../../services/history';

import { createMeetupFailure, updateMeetupSuccess, updateMeetupFailure } from './actions';

export function* createMeetup({ payload }) {
  try {
    const { title, description, address, banner_id } = payload;
    const date = '2019-10-18T15:00:00-03:00';

    yield call(api.post, 'meetups', {
      title,
      description,
      address,
      banner_id,
      date
    });

    history.push('/');

    toast.success('Meetup criado com sucesso!');
  } catch (error) {
    toast.error('Erro ao criar sua conta, verifique seus dados');

    yield put(createMeetupFailure());
  }
}

export function* updateMeetup({ payload }) {
  try {
    const { id, title, description, address, banner_id, date } = payload.data;

    const meetup = Object.assign(
      { title, description, address, banner_id, date }
    );

    const response = yield call(api.put, `meetups/${id}`, meetup);

    toast.success('Meetup atualizado com sucesso');

    yield put(updateMeetupSuccess(response.data));
  } catch (err) {
    toast.error('Erro ao atualizar meetup, confira os dados');
    yield put(updateMeetupFailure());
  }
}

export default all([
  takeLatest('@meetup/CREATE_MEETUP_REQUEST', createMeetup),
  takeLatest('@meetup/UPDATE_MEETUP_REQUEST', updateMeetup),
]);
