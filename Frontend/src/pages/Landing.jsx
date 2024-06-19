import main from '../assets/images/job-hunt.svg'
import Wrapper from '../assets/wrappers/LandingPage';
import { Logo } from '../components';
import { Link } from 'react-router-dom';


const Landing = () => {
    return <>
        <Wrapper>
            <nav>
                <Logo />
            </nav>
            <div className="container page">
                <div className="info">
                    <h1>job <span>tracking</span> app</h1>
                    <p>
                        { `Are you tired of losing track of your job applications? Do you struggle to remember which companies
                        you've applied to, when you submitted your resume, or when you should follow up?
                        JobTracker is here to help!`}
                    </p>
                    <Link to='register' className='btn register-link'>
                        Register
                    </Link>
                    <Link to='login' className='btn'>
                        Login
                    </Link>
                </div>
                <img src={ main } alt="Job hunt image" className='img main-img' />
            </div>
        </Wrapper>
    </>

}
export default Landing