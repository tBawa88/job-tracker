import { Link, Form, redirect } from "react-router-dom"
import { Logo, FormRow } from "../components"
import Wrapper from "../assets/wrappers/RegisterAndLoginPage"
import customFetch from "../utils/customFetch"
import useValidateCredentials from "../hooks/useValidateCredentials"

const Register = () => {
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

    return <Wrapper>
        <Form className='form' method="POST">
            <Logo />
            <h4>Register</h4>
            { isCheckingUsername && <span className={ isUsernameInvalid ? 'invalid' : 'valid' }>{ usernameErrorMessage }</span> }
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

            { isCheckingPassword && <span className={ isPasswordInvalid ? 'invalid' : 'valid' }>{ passwordErrorMessage }</span> }
            <FormRow
                label='password'
                name='password'
                type='password'
                id='password'

                required
                className='form-input'
                handlePassword={ handlePassword }
            />

            <button type="submit" className="btn btn-block" disabled={ (isUsernameInvalid || isPasswordInvalid) }>Submit</button>
            <p>
                Already a member?
                <Link to='/login' className="member-btn">Login</Link>
            </p>
        </Form>
    </Wrapper>
}
export default Register

export const action = async ({ request, params }) => {
    const formData = await request.formData();
    const newUser = Object.fromEntries(formData)
    try {
        const response = await customFetch.post('/auth/register', { ...newUser })
        console.log(response.data)
        return redirect('/dashboard')
    } catch (error) {
        console.log(error.response);
        return null;
    }
}