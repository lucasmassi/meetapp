import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Input } from '@rocketseat/unform';
import {MdAddCircleOutline} from 'react-icons/md';

import BannerInput from '../BannerInput';
import MaDatePicker from '../DatePicker';

import { Container, SubmitButton, Text } from './styles';

export default function New() {
  const [date, setDate] = useState();

  return (
    <Container>
      <Form>
        <BannerInput name="banner_id" />
        <Input name="title" placeholder="Título" />
        <Input multiline name="description" placeholder="Descrição" />
        <Input name="address" placeholder="Endereço" />
        
        <SubmitButton type="submit">
          <MdAddCircleOutline size={20} color="#fff" />
          Criar
        </SubmitButton>
      </Form>
    </Container >
  );
}
