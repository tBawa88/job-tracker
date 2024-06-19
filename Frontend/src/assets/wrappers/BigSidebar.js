import styled from 'styled-components';

const Wrapper = styled.aside`
 display: none;
 @media (min-width : 992px){
  display: block;
  box-shadow: 1px 0px 0px rgba(0,0,0,0.2);
  .sidebar-container{
    background: var(--background-secondary-color);
    min-height: 100vh;
    height: 100%;
    width: 250px;
    margin-left: -250px;
    transition: margin-left 0.3s ease-in-out;
  }
  .show-sidebar{
    margin-left: 0;
  }
  .content{
    position: sticky;
    top: 0;
  }
  header{
    height: 6rem;
    display: flex;
    align-items: center;
    padding-left: 2.5rem;
  }
  .nav-links{
    padding-top: 2rem;
    display: flex;
    flex-direction: column;
  }
  .nav-link{
    display: flex;
    align-items: center;
    color: var(--text-secondary-color);
    text-transform: capitalize;
    padding: 1rem 0;
    padding-left: 2rem;
    transition: padding-left 0.3s ease-in-out;
    font-weight: 500;
  }
  .nav-link:hover{
    padding-left: 2.5rem;
    color: var(--primary-500);
    transition: var(--transition);
  }
  .icon{
    font-size: 1.5rem;
    display: grid;
    place-items: center;
    margin-right: 1rem;
  }
  .active{
    color: var(--primary-500);
  }
  .pending{
    background: var(--background-color);
  }
 }
`;
export default Wrapper;
