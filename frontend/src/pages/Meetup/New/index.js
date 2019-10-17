import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Input } from '@rocketseat/unform';
import { MdAddCircleOutline } from 'react-icons/md';
import * as Yup from 'yup';

import BannerInput from '../BannerInput';

import { Container } from './styles';

import { createMeetupRequest } from '../../../store/modules/meetup/actions';

const schema = Yup.object().shape({
  banner_id: Yup.number().required('O banner é obrigatório'),
  title: Yup.string().required('O título é obrigatório'),
  description: Yup.string().required('A descrição é obrigatória'),
  address: Yup.string().required('O endereço é obrigatório'),
});

export default function New() {
  const dispatch = useDispatch();

  const [date, setDate] = useState(new Date());
  const [loading, setLoading] = useState(false);

  function handleSubmit({ title, description, address, banner_id }) {
    console.tron.log(title, description, address, banner_id);
    dispatch(createMeetupRequest(title, description, address, banner_id));
  }

  return (
    <>
      <Container>
        <Form schema={schema} onSubmit={handleSubmit}>
          <BannerInput name="banner_id" />
          <Input name="title" placeholder="Título" />
          <Input multiline name="description" placeholder="Descrição" />
          <Input name="address" placeholder="Endereço" />

          <button type="submit">
            <MdAddCircleOutline size={20} color="#fff" />
            Criar
          </button>
        </Form>
      </Container >
    </>
  );
}
