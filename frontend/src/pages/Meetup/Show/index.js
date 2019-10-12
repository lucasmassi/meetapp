import React, { useState, useEffect } from 'react';

import api from '../../../services/api';

import { Container } from './styles';

export default function Show({ props }) {
  const [meetup, setMeetup] = useState([]);

  useEffect(() => {
    async function loadMeetup() {
      const response = await api.get(`meetups/`);

      const meetup = response.data.map(r => {
        if (r.id === 16) {
          return r;
        }
      });

      setMeetup(meetup[0]);
    }

    loadMeetup();
  }, []);

  console.log(meetup);

  return (
    <Container>
      <h3>{meetup.title}</h3>
      <h3>{meetup.description}</h3>
      <h3>{meetup.date}</h3>
    </Container >
  );
}
