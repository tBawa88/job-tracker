import { Link, useRouteError } from "react-router-dom"
import notFound from '../assets/images/not-found.svg'
import Wrapper from "../assets/wrappers/ErrorPage";
const Error = () => {
    const error = useRouteError();
    console.log("Error data in error page", error.error);

    if (error.status === 404) {
        return <Wrapper>
            <div>
                <img src={ notFound } alt="Not found" />
                <h3>Page not found :/</h3>
                <p>We can't seem to find the page you're looking for</p>
                <Link to='/dashboard'>back to dashboard</Link>
            </div>
        </Wrapper>
    }
    return <Wrapper>
        <div>
            <h3>Oops.. Something went wrong </h3>
        </div>
    </Wrapper>

}
export default Error