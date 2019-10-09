import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Form, Input } from '@rocketseat/unform';
import { FaSpinner } from 'react-icons/fa';
import * as Yup from 'yup';

import logo from '../../assets/images/logo.svg';

import { signInRequest } from '../../store/modules/auth/actions';

import { SubmitButton, NewRegister, Text } from './styles';

const schema = Yup.object().shape({
  email: Yup.string()
    .email('Insert an valid e-mail')
    .required('E-mail is required'),
  password: Yup.string().required('Password is required'),
});

export default function Login() {
  const dispatch = useDispatch();
  const loading = useSelector(state => state.auth.loading);

  function handleSubmit({ email, password }) {
    dispatch(signInRequest(email, password));
  }

  return (
    <>
      <img src={logo} width="90" alt="Logo Meetapp" />
      <Form schema={schema} onSubmit={handleSubmit}>
        <Input type="text" name="email" placeholder="E-mail" id="" />
        <Input type="password" name="password" placeholder="Senha" id="" />
        <SubmitButton type="submit">
          {loading ? <FaSpinner size={25} /> : 'ENTRAR'}
        </SubmitButton>

        <NewRegister>
          Você ainda não tem registro?
          <Link to="/register"> Criar uma conta </Link>
        </NewRegister>
      </Form>
    </>
  );
}
