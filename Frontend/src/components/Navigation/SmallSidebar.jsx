import { FaTimes } from 'react-icons/fa';
import Wrapper from '../../assets/wrappers/SmallSidebar'
import { useDashboardContext } from '../../pages/DashboardLayout'
import Logo from '../Logo';
import Navlinks from './Navlinks';
const SmallSidebar = () => {
    const { showSidebar, toggleSidebar } = useDashboardContext();

    return <Wrapper>
        <div className={ showSidebar ? 'sidebar-container show-sidebar' : 'sidebar-container' }>
            <div className="content">
                <button type='button'
                    className='close-btn'
                    onClick={ toggleSidebar }>
                    <FaTimes />
                </button>
                <header>
                    <Logo />
                </header>
                <Navlinks />
                {/* contains the list of all the navlinks */ }
            </div>
        </div>
    </Wrapper>

}
export default SmallSidebar