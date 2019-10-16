import styled from 'styled-components';

export const Container = styled.div.attrs(props => ({
  disabled: props.loading ? true : false,
}))`
  margin-top: 10px;
  align-self: stretch;
  border-radius: 5px;

  label {
    &[disabled] {
      cursor: not-allowed;
      opacity: 0.5;
    }
    cursor: pointer;
    width: 100%;
    height: 300px;
    overflow: hidden;
    display: block;
    margin-bottom: 10px;
    background: rgba(0, 0, 0, 0.2);
    border-radius: 4px;

    &:hover {
      opacity: 0.7;
    }

    img {
      width: 100%;
      border-radius: 10px;
    }
    input {
      display: none;
    }
    h4 {
      display: flex;
      padding-top: 120px;
      justify-content: center;
      align-items: center;
      color: #eee;
      opacity: .4;

      svg {
        font-size: 25px;
        margin-right: 10px;
      }
    }
  }
`;
