import React from 'react';
import { Link } from 'react-router-dom';

import logo from '../../assets/images/logo.svg';

import { Container, Content, Profile } from './styles';

export default function Header() {
  return (
    <Container>
      <Content>
        <nav>
          <Link to="/dashboard">
            <img src={logo} width="40" alt="Logo Meetup" />
          </Link>
        </nav>

        <aside>
          <Profile>
            <div>
              <Link to="/profile">Perfil</Link>
            </div>
          </Profile>
        </aside>
      </Content>
    </Container>
  );
}
