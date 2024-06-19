import { Link, Form } from "react-router-dom"
import Wrapper from "../assets/wrappers/RegisterAndLoginPage"
import { FormRow, Logo } from "../components"

const Login = () => {
    return <Wrapper>
        <Form className="form">
            <Logo />
            <h4>Login</h4>
            <FormRow
                label='email'
                name='email'
                type='email'
                id='email'
                defaultValue='john@gmail.com'
                required
                className='form-input'
            />
            <FormRow
                label='email'
                name='email'
                type='email'
                id='email'
                defaultValue='john@gmail.com'
                required
                className='form-input'
            />
            <button type="submit" className="btn btn-block">
                Login
            </button>
            <button type="button" className="btn btn-block">
                Explore the app
            </button>
            <p>
                Not a memeber yet?
                <Link to='/register' className="member-btn">Register</Link>
            </p>
        </Form>
    </Wrapper>

}
export default Login