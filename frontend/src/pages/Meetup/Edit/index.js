import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Form, Input } from '@rocketseat/unform';
import { parseISO } from 'date-fns';
import { toast } from 'react-toastify';

import api from '../../../services/api';
import history from '../../../services/history';

import { updateMeetupRequest } from '../../../store/modules/meetup/actions';

import BannerInput from '../BannerInput';

import { Container } from './styles';

export default function Edit(props) {
  const dispatch = useDispatch();

  const id = props.match.params.id;
  const [meetup, setMeetup] = useState(null);
  const [loading, setLoading] = useState(true);
  const [bannerId, setBannerId] = useState(null);

  useEffect(() => {
    async function loadMeetup() {
      try {
        const response = await api.get(`meetups/${id}`);

        setMeetup(response.data);
        setBannerId(response.data.banner_id);

        setLoading(false);
      } catch (err) {
        toast.error('Meetup não encontrado');
        history.push('/');
      }
    }

    loadMeetup();
  }, [id]);

  function handleSubmit(data) {
    dispatch(updateMeetupRequest(data));
  }

  return (
    <>
      <Container>
        <Form initialData={meetup} onSubmit={handleSubmit}>
          <BannerInput name="banner_id" />
          <Input name="title" placeholder="Título" />
          <Input name="address" placeholder="Endereço" />
          <Input name="description" placeholder="Descrição" />
          <Input type="date" name="date" placeholder="Data" />

          <button type="submit">Atualizar</button>
        </Form>

      </Container>
    </>
  );
}
