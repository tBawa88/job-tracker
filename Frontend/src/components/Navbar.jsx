import Wrapper from '../assets/wrappers/Navbar'
import { IoMenu } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";
import { useDashboardContext } from '../pages/DashboardLayout';
import Logo from './Logo';
import LogoutContainer from './LogoutContainer';
import ThemeToggle from './ThemeToggle';
const Navbar = () => {
    const { toggleSidebar, showSidebar } = useDashboardContext()
    return (
        <Wrapper>
            <div className='nav-center'>
                <button type='button'
                    className='toggle-btn'
                    onClick={ toggleSidebar }
                >
                    { !showSidebar && <IoMenu /> }
                    { showSidebar && <RxCross2 /> }
                </button>
                <div>
                    <Logo />
                    <h4 className='logo-text'>dashboard</h4>
                </div>
                <div className="btn-container">
                    <ThemeToggle />
                    <LogoutContainer />
                </div>
            </div>
        </Wrapper>
    )

}
export default Navbar