import React, { useState, useEffect } from 'react';
import { MdAddCircleOutline } from 'react-icons/md';
import { FaArrowRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';

import { Container, Top } from './styles';

import api from '../../services/api';

export default function Dashboard() {
  const [meetups, setMeetups] = useState([]);

  useEffect(() => {
    async function loadMeetups() {
      const response = await api.get(`meetups/`);

      setMeetups(response.data);
    }

    loadMeetups();
  }, []);

  return (
    <>
      <Container>
        <Top>
          <h1>Meus meetups</h1>
          <button type="button" > <MdAddCircleOutline /> Novo meetup</button>
        </Top>
        <ul>
          {meetups.map(meetup => (
            <li key={meetup.title}>
              <Link to={`/meetup/${meetup.id}`}>
                <h3>{meetup.title}</h3>
                <span>{meetup.formatted_date} <FaArrowRight /></span>
              </Link>
            </li>
          ))}

        </ul>
      </Container>
    </>
  );
}
