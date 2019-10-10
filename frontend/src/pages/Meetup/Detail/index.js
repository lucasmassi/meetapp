import React from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { Form, Input, FileInput } from '@rocketseat/unform';

import { showMeetupRequest } from '../../store/modules/meetup/actions';
import { updateMeetupRequest } from '../../store/modules/meetup/actions';

import { Container, SubmitButton, LogoutButton } from './styles';

export default function Profile() {
  const dispatch = useDispatch();
  const meetup = useSelector(state => state.meetup.details);

  function handleSubmit(data) {
    dispatch(updateProfileRequest(data));
  }

  function handleSignOut() {
    dispatch(signOut());
  }

  return (
    <Container>
      <Form initialData={profile} onSubmit={handleSubmit}>
        <Input name="name" placeholder="Nome completo" />
        <Input name="email" placeholder="Seu e-mail" />

        <hr />

        <Input
          type="password"
          name="oldPassword"
          placeholder="Sua senha atual"
        />
        <Input type="password" name="password" placeholder="Nova senha" />
        <Input
          type="password"
          name="confirmPassword"
          placeholder="Confirmação de senha"
        />

        <SubmitButton type="submit">Atualizar</SubmitButton>
      </Form>

      <LogoutButton type="button" onClick={handleSignOut}>
        Deslogar
      </LogoutButton>
    </Container >
  );
}
