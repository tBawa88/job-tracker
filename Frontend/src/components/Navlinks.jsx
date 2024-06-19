import { NavLink } from "react-router-dom"
import { useDashboardContext } from "../pages/DashboardLayout"
import links from "../utils/links"

const Navlinks = ({ isBigSidebar }) => {
    const { toggleSidebar, user } = useDashboardContext();
    return (
        <div className="nav-links">
            {
                links.map(link => (
                    <NavLink
                        className={ ({ isActive }) => (isActive ? 'nav-link active' : 'nav-link') }
                        key={ link.text }
                        onClick={ !isBigSidebar ? toggleSidebar : null }
                        to={ link.path }
                        end
                    >
                        <span className='icon'> { link.icon }</span>

                        { link.text }
                    </NavLink>))
            }
        </div>
    )
}
export default Navlinks