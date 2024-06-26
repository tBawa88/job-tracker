import { Link, Form, redirect, json } from "react-router-dom"
import Wrapper from "../assets/wrappers/RegisterAndLoginPage"
import { FormRow, Logo, SubmitButton } from "../components"
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
            <p>
                Not a memeber yet?
                <Link to='/register' className="member-btn">Register</Link>
            </p>
        </Form>
    </Wrapper>

}
export default Login

export const loader = async () => {
    try {
        const response = await customFetch.get('/auth/status');
        if (response.data.authenticated) {
            toast.error("User needs to logout first", { autoClose: 1000 })
            return redirect('/dashboard')
        }
        return null;
    } catch (error) {
        toast.error("Error while checking user status, Pls Login")
        return redirect('/login')
    }
}

export const action = async ({ request, params }) => {
    const formData = await request.formData();
    const user = Object.fromEntries(formData);
    try {
        const response = await customFetch.post('/auth/login', { ...user });
        toast.success(`Welcome back, ${response.data.username}`)
        return redirect('/dashboard')
    } catch (error) {
        const message = error.response?.data?.message || 'Error Loggin in'
        toast.error(message)
        return null
    }
}