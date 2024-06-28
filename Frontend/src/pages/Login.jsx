import { Link, Form, redirect, useSubmit } from "react-router-dom"
import Wrapper from "../assets/wrappers/RegisterAndLoginPage"
import { FormRowDebounced, Logo, LoginButton } from "../components"
import customFetch from "../utils/customFetch"
import { toast } from "react-toastify"


const Login = () => {
    const submit = useSubmit();
    const handleExploreApp = () => {
        submit({ intent: 'LOGIN-DEMO' }, { method: 'POST', action: '/login' })
    }

    return <Wrapper>
        <Form className="form" method="POST">
            <Logo />
            <h4>Login</h4>
            <FormRowDebounced
                label='email'
                name='email'
                type='email'
                id='email'
                required
                className='form-input'
            />
            <FormRowDebounced
                label='password'
                name='password'
                type='password'
                id='password'
                required
                className='form-input'
            />
            <LoginButton value='LOGIN'>
                Login
            </LoginButton>
            <button onClick={ handleExploreApp } className="btn btn-block">
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
    const intent = formData.get('intent')

    switch (intent) {
        case 'LOGIN':
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
        case 'LOGIN-DEMO':
            try {
                await customFetch.post('/auth/login-demoUser');
                toast.success('Welcome to a Demo Session')
                return redirect('/dashboard')
            } catch (error) {
                console.log("Error ", error)
                const message = error.response?.data?.messae || 'Error loggin in as Demo user'
                toast.error(message)
                return null;
            }
    }
}