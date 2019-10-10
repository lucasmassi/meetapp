import React from 'react';
import { MdAddCircleOutline } from 'react-icons/md';
import { FaArrowRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';

import { Container, Top } from './styles';

import api from '../../services/api';

export default function Dashboard() {

  return (
    <>
      <Container>
        <Top>
          <h1>Meus meetups</h1>
          <button type="button" > <MdAddCircleOutline /> Novo meetup</button>
        </Top>
        <ul>
          <li>
            <Link to="/">
              <h3>Meetup de React Native</h3>
              <span>24 de Junho, ás 20h <FaArrowRight /></span>
            </Link>
          </li>

          <li>
            <Link to="/">
              <h3>Meetup de React Native</h3>
              <span>24 de Junho, ás 20h <FaArrowRight /></span>
            </Link>
          </li>

        </ul>
      </Container>
    </>
  );
}
