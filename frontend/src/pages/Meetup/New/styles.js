import styled, { keyframes } from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  max-width: 900px;
  margin: 50px auto;

  form {
    display: flex;
    flex-direction: column;
    margin-top: 30px;

    input, textarea {
      flex: 1;
      border: 3px solid rgb(25, 24, 31);
      padding: 15px 15px;
      border-radius: 5px;
      font-size: 16px;
      margin-top: 10px;
      width: 100%;
      justify-content: center;
      background: rgb(25, 24, 31);
      color: #fff;
      margin-bottom: 10px;

      &:focus {
        border-color: #2ea2ef;
        transition: 0.4s;
      }

      &::placeholder {
        color: #575561;
      }
    }

    hr {
      border: 0;
      height: 1px;
      background: rgba(255, 255, 255, 0.2);
      margin: 20px 0 10px;
    }

    span {
      color: #ed311c;
      align-self: flex-start;
      margin: 0 0 10px;
    }
  }
`;

export const SubmitButton = styled.div`
  background: #2ea2ef;
  margin-top: 20px;
  color: rgb(25, 24, 31);
  border: 0;
  padding: 16px;
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 150px;
  color: #fff;
  transition: 0.5s;
  font-size: 16px;
  cursor: pointer;

  &[disabled] {
    cursor: not-allowed;
    opacity: 0.5;
  }

  &:hover {
    border-color: #2ea2ef;
    background: ${darken(0.05, '#2ea2ef')};
    transition: 0.5s;
  }

  svg {
    margin-right: 10px;
  }
`;

