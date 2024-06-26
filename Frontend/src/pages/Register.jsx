import { Link, Form, redirect, useNavigation } from "react-router-dom"
import { Logo, FormRow, SubmitButton, ErrorText } from "../components"
import Wrapper from "../assets/wrappers/RegisterAndLoginPage"
import customFetch from "../utils/customFetch"
import useValidateCredentials from "../hooks/useValidateCredentials"
import { toast } from "react-toastify"


const Register = () => {
    const { state } = useNavigation();
    const {
        usernameErrorMessage,
        passwordErrorMessage,
        isCheckingPassword,
        isCheckingUsername,
        setIsCheckingPassword,
        setIsCheckingUsername,
        checkPasswordValid,
        checkUsernameUnique,
        isUsernameInvalid,
        isPasswordInvalid
    } = useValidateCredentials();


    const handleUsername = (name) => {
        if (name !== '') {
            setIsCheckingUsername(true)
            checkUsernameUnique(name);
        } else {
            setIsCheckingUsername(false)
        }
    }

    const handlePassword = (password) => {
        if (password !== '') {
            setIsCheckingPassword(true);
            checkPasswordValid(password)
        } else {
            setIsCheckingPassword(false);
        }
    }

    const isSubmitting = state === 'submitting';
    return <Wrapper>
        <Form className='form' method="POST">
            <Logo />
            <h4>Register</h4>
            <ErrorText isChecking={ isCheckingUsername } isError={ isUsernameInvalid } errorMessage={ usernameErrorMessage } />
            <FormRow
                label='name'
                name='name'
                type='text'
                id='name'

                required
                className='form-input'
                handleUsername={ handleUsername }
            />
            <FormRow
                label='email'
                name='email'
                type='email'
                id='email'
                required
                className='form-input'
            />
            <FormRow
                label='location'
                name='location'
                type='location'
                id='location'

                required
                className='form-input'
            />
            <ErrorText isChecking={ isCheckingPassword } isError={ isPasswordInvalid } errorMessage={ passwordErrorMessage } />
            <FormRow
                label='password'
                name='password'
                type='password'
                id='password'

                required
                className='form-input'
                handlePassword={ handlePassword }
            />
            <SubmitButton
                isDisabled={ isUsernameInvalid || isPasswordInvalid || isSubmitting }
                isSubmitting={ isSubmitting } />
            <p>
                Already a member?
                <Link to='/login' className="member-btn">Login</Link>
            </p>
        </Form>
    </Wrapper>
}
export default Register


export const loader = async () => {
    try {
        const response = await customFetch.get('/auth/status');
        if (response.data.authenticated) {
            toast.error("User needs to logout first", { autoClose: 1000 })
            return redirect('/dashboard')
        }
        return null;
    } catch (error) {
        const message = error.response?.data?.message || 'Failed to load user'
        toast.error(message)
        return redirect('/login')
    }
}

export const action = async ({ request, params }) => {
    const formData = await request.formData();
    const newUser = Object.fromEntries(formData)
    try {
        await customFetch.post('/auth/register', { ...newUser })
        toast.success('Welcome to Jobify!')
        return redirect('/dashboard')
    } catch (error) {
        const message = error.response?.data?.message || 'Registration Failed :('
        toast.error(message)
        return null;
    }
}