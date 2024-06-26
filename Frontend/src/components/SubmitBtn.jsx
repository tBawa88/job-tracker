const SubmitBtn = ({ isSubmitting, isFormBtn, isDisabled }) => {
    let btnClass = 'btn btn-block ';
    if (isFormBtn)
        btnClass += 'form-btn'
    return (
        <button
            type='submit'
            className={ btnClass }
            disabled={ isDisabled ?? isSubmitting }
        >
            { isSubmitting ? 'submitting...' : 'submit' }
        </button>
    )
}
export default SubmitBtn