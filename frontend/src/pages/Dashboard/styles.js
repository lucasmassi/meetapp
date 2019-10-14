import styled from 'styled-components';

export const Container = styled.div`
  padding: 0 30px;
  margin-top: 20px;

  ul {
    max-width: 900px;
    margin: 0 auto;
    display: grid;
    margin-top: 35px;
    grid-template-columns: repeat(1, 1fr);
    grid-gap: 15px;
    margin-bottom: 35px;

    li {
      max-width: 900px;
      display: flex;
      justify-content: center;
      align-items: center;

      a {
        width: 100%;
        padding: 20px;
        background: rgba(36, 45, 54,.6);
        border-radius: 5px;
        justify-content: space-between;
        align-items: center;
        display: flex;
        color: #fff;

        h3 {
          font-size: 20px;
        }

        span {
          justify-content: center;
          align-items: center;
          display: flex;
          color: #eee;

          svg {
            margin-left: 10px;
            font-size: 20px;
            color: #fff;
          }
        }

        &:hover {
          background: linear-gradient(-190deg, #2d3a47, #242d36);
        }

      }
    }

  }
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

  }

`;
