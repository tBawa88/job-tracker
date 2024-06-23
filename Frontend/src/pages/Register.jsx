import { Link, Form } from "react-router-dom"
import { Logo, FormRow } from "../components"
import Wrapper from "../assets/wrappers/RegisterAndLoginPage"

const Register = () => {

    return <Wrapper>
        <Form className='form'>
            <Logo />
            <h4>Register</h4>
            <FormRow
                label='name'
                name='name'
                type='text'
                id='name'
                defaultValue='john'
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
            <FormRow
                label='location'
                name='location'
                type='location'
                id='location'
                defaultValue='city'
                required
                className='form-input'
            />
            <FormRow
                label='password'
                name='password'
                type='password'
                id='password'
                defaultValue='john'
                required
                className='form-input'
            />

            <button type="submit" className="btn btn-block">Submit</button>
            <p>
                Already a member?
                <Link to='/login' className="member-btn">Login</Link>
            </p>
        </Form>
    </Wrapper>
}
export default Register

export const action = async () => { }