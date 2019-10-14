import styled from 'styled-components';

export const Container = styled.div`

`;

export const Top = styled.div`
  max-width: 900px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 35px;

  h1 {
    color: #fff;
  }

  div {
    display: flex;

    button {
      padding: 5px 10px 5px 10px;
      border-radius: 5px;
      background: #2ea2ef;
      color: #fff;
      border: 2px solid #2ea2ef;
      font-size: 15px;
      justify-content: center;
      align-items: center;
      display: flex;
      transition: 0.3s;
      margin-left: 10px;

      svg {
        margin-right: 10px;
        font-size: 20px;
      }

      &:hover {
        background: #0f0f17;
        border: 2px solid #2ea2ef;
        color: #2ea2ef;
        transition: 0.3s;
      }

      &:nth-child(2) {
        background: #e3122b;
        border: 2px solid #e3122b;

        &:hover {
          background: #0f0f17;
          border: 2px solid #e3122b;
          color: #e3122b;
          transition: 0.3s;
        }
      }
    }

  }

`;

export const Body = styled.div`
  max-width: 900px;
  margin: 0 auto;
  display: block;
  justify-content: left;
  align-items: center;
  margin-top: 35px;
  color: #fff;

  div {
    margin-bottom: 15px;
    margin-top: 15px;

    img {
      width: 100%;
      height: 300px;
      margin-bottom: 20px;
      border-radius: 3px;
    }

    p {
      color: #eee;
      font-size: 15px;
    }

    span {
      margin-right: 30px;
      color: #c6c6c6;
      opacity: .5;
    }
  }

`;
