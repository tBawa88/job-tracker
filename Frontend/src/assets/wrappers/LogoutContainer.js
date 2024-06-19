import styled from 'styled-components';

const Wrapper = styled.div`
 position: relative;
 .logout-btn{
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0 0.5rem;
  padding : 0.5rem
 }
 .img{
  width: 25px;
  height: 25px;
  border-radius: 50%;
 }
 .dropdown{
  position: absolute;
  top: 40px;
  left: 0;
  width: 100%;
  text-align: center;
  visibility: hidden;
  box-shadow: var(--shadow-2);
  background: var(--primary-500);
  border-radius: var(--border-radius);
 }
 .show-dropdown{
  visibility: visible;
 }
 .dropdown-btn{
  border-radius: var(--border-radius);
  background: transparent;
  border-color: transparent;
  color: var(--white);
  letter-spacing: var(--letter-spacing);
  text-transform: capitalize;
  cursor: pointer;
  width: 100%;
  height: 100%;
  padding: 0.3rem;
 }


`;

export default Wrapper;
