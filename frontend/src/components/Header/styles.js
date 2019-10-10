import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  background: rgba(36, 45, 54,.6);
  padding: 0 30px;
`;

export const Content = styled.div`
  height: 80px;
  max-width: 900px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;

  nav {
    display: flex;
    align-items: center;

    a {
      display: flex;
      align-items: center;
      font-weight: bold;
      font-size: 14px;
      color: #2ea2ef;
      transition: 0.4s;

      svg {
        margin-right: 7px;
      }

      &:hover {
        color: ${darken(0.3, '#2ea2ef')};
        transition: 0.4s;
      }
    }
  }

  aside {
    display: flex;
    align-items: center;
  }
`;

export const Profile = styled.div`
  display: flex;
  margin-left: 20px;
  padding-left: 20px;
  align-items: center;
  flex-direction: row;

  button {
    display: flex;
    padding: 10px 27px 10px 27px;
    margin-left: 22px;
    border-radius: 3px;
    background: #2ea2ef;
    color: #fff;
    border: 2px solid #2ea2ef;
    transition: 0.3s;

    &:hover {
      background: #0f0f17;
      border: 2px solid #2ea2ef;
      color: #2ea2ef;
      transition: 0.3s;
    }
  }

  div {
    text-align: right;

    h3 {
      color: #fff;
    }

    a {
      margin-top: 2px;
      font-size: 12px;
      color: #eee;
      font-size: 14px;
      transition: 0.4s;

      &:hover {
        color: ${darken(0.3, '#eee')};
        transition: 0.4s;
      }
    }
  }
`;
