const LoginButton = ({ value, children }) => {
    return (
        <button
            type='submit'
            className='btn btn-block'
            name='intent'
            value={ value }>
            { children }
        </button>
    )
}
export default LoginButton