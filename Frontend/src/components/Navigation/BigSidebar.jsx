import Wrapper from "../../assets/wrappers/BigSidebar"
import Navlinks from "./Navlinks"
import { useDashboardContext } from "../../pages/DashboardLayout"
import Logo from "../Logo";

const BigSidebar = () => {
    const { toggleSidebar, showSidebar } = useDashboardContext();
    return <Wrapper>
        <div className={ showSidebar ? 'sidebar-container show-sidebar' : 'sidebar-container ' }>
            <div className="content">
                <header>
                    <Logo />
                </header>
                <Navlinks isBigSidebar />
                {/* so as to not close the sidebar when a link is clicked */ }
            </div>
        </div>
    </Wrapper>

}
export default BigSidebar