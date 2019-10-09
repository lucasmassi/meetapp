import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';

import logo from '../../assets/images/logo.svg';

import { SubmitButton, NewRegister, Text } from './styles';

import { signUpRequest } from '../../store/modules/auth/actions';

const schema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  email: Yup.string()
    .email('Insert an valid e-mail')
    .required('E-mail is required'),
  password: Yup.string()
    .min(6, 'Min characteres is 6')
    .required('Password is required'),
});

export default function Register() {
  const dispatch = useDispatch();

  function handleSubmit({ name, email, password }) {
    dispatch(signUpRequest(name, email, password));
  }

  return (
    <>
      <Text> <img src={logo} width="20" alt="Logo Meetup" /> Crie sua conta pessoal</Text>
      <Form schema={schema} onSubmit={handleSubmit}>
        <Input name="name" type="text" placeholder="Insira seu nome completo" />
        <Input name="email" type="text" placeholder="Insira seu e-mail" />
        <Input name="password" type="password" placeholder="Insira sua senha" />

        <SubmitButton type="submit">CADASTRAR</SubmitButton>

        <NewRegister>
          Você tem uma conta?
          <Link to="/"> Fazer login </Link>
        </NewRegister>
      </Form>
    </>
  );

}
