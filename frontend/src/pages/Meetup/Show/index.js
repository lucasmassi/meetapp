import React, { useState, useEffect } from 'react';
import { MdEdit, MdDelete } from 'react-icons/md';
import { FiCalendar, FiMapPin } from 'react-icons/fi';

import api from '../../../services/api';
import history from '../../../services/history';

import { Container, Top, Body } from './styles';

export default function Show(props) {
  const [meetup, setMeetup] = useState([]);

  useEffect(() => {
    async function loadMeetup() {
      const id = props.match.params.id;

      const response = await api.get(`meetups/${id}`);

      setMeetup(response.data);
    }

    loadMeetup();
  }, []);

  return (
    <>
      <Container>
        <Top>
          <h1>{meetup.title}</h1>
          <div>
            <button type="button" onClick={() => history.push(`meetup/${meetup.id}`)} > <MdEdit /> Editar</button>
            {!meetup.past && (
              <button
                type="button"
              >
                <MdDelete />
                Cancelar
            </button>
            )}
          </div>
        </Top>
        <Body>
          <div>
            {meetup.banner_id && (
              <img src={meetup.file.url} alt="" />
            )}
            <p>{meetup.description}</p>
          </div>
          <div>
            <span><FiCalendar /> {meetup.formatted_date}</span>
            <span><FiMapPin /> {meetup.address}</span>
          </div>
        </Body>

      </Container>
    </>
  );
}
