import styled from 'styled-components';

const Wrapper = styled.section`
  margin-top: 4rem;
  text-align: center;
  .chart-toggle{
    text-align: end;
  }
  button {
    font-size: 1rem !important;
    background: transparent;
    border: 2px solid var(--primary-500) ;
    text-transform: capitalize;
    color: var(--primary-500);
    font-size: 1.25rem;
    cursor: pointer;
    padding: 0.4rem;
    border-radius: 0.4rem;
  }
  button:active {
    transform: translateY(2px);
  }
  h4 {
    text-align: center;
    margin-bottom: 0.75rem;
  }
`;

export default Wrapper;
