import { Link, Form, redirect, json } from "react-router-dom"
import Wrapper from "../assets/wrappers/RegisterAndLoginPage"
import { FormRow, Logo } from "../components"
import customFetch from "../utils/customFetch"
import { toast } from "react-toastify"


const Login = () => {
    return <Wrapper>
        <Form className="form" method="POST">
            <Logo />
            <h4>Login</h4>
            <FormRow
                label='email'
                name='email'
                type='email'
                id='email'
                required
                className='form-input'
            />
            <FormRow
                label='password'
                name='password'
                type='password'
                id='password'
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


export const action = async ({ request, params }) => {
    const formData = await request.formData();
    const user = Object.fromEntries(formData);
    try {
        const response = await customFetch.post('/auth/login', { ...user });
        toast.success(`Welcome back, ${response.data.username}`)
        return redirect('/dashboard')
    } catch (error) {
        console.log("Error occured while logging in ", error)
        toast.error("Error loggin in, Try again later")
        return null
    }
    return null;
}