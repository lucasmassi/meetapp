import React from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { Form, Input } from '@rocketseat/unform';

import { updateMeetupRequest } from '../../../store/modules/meetup/actions';

import { Container, SubmitButton } from './styles';

export default function Edit() {
  const dispatch = useDispatch();
  const meetup = useSelector(state => state.meetup.meetup);

  function handleSubmit(data) {
    dispatch(updateMeetupRequest(data));
  }

  return (
    <>
      <Container>
        <Form initialData={meetup} onSubmit={handleSubmit}>
          <Input name="title" placeholder="Título" />
          <Input name="address" placeholder="Endereço" />
          <Input name="description" placeholder="Descrição" />
          <Input type="date" name="date" placeholder="Data" />

          <SubmitButton type="submit">Atualizar</SubmitButton>
        </Form>

      </Container>
    </>
  );
}
