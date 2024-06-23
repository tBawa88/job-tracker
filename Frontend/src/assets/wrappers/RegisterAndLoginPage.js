import styled from 'styled-components';

const Wrapper = styled.section`
  min-height: 100vh;
  display: grid;
  align-items: center;
  .logo{
    display: block;
    margin: 0  auto;
    margin-bottom: 1.5rem;
  }
  .form {
    max-width: 400px;
    border-top : 5px solid var(--primary-500);
  }
  h4{
    text-align: center;
    margin: 0 auto;
    margin-bottom: 1.5rem;
    font-weight: 500;
  }
  p {
    margin-top : 1rem;
    text-align: center;
    line-height: 1;
  }
  .btn{
    margin-top : 1rem;
  }
  .member-btn {
    color: var(--primary-500);
    margin-left: 0.3rem;
    letter-spacing: var(--letter-spacing);
  }
  .invalid {
    font-size: 0.9rem;
    color: red;
  }
  .valid {
    font-size: 0.9rem;
    color : rgb(49, 196, 64);
  }
`;
export default Wrapper;
