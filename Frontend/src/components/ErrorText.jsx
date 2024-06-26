const ErrorText = ({ errorMessage, isError, isChecking }) => {

    if (!isChecking)
        return null;

    if (isChecking)
        return <span className={ isError ? 'invalid' : 'valid' }>{ errorMessage }</span>

}
export default ErrorText