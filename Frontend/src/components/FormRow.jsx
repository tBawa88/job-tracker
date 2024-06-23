import debounceWrapper from "../utils/debounceWrapper"

const FormRow = ({ label, handleUsername, handlePassword, ...props }) => {

    const handleInputChange = (event) => {
        if (handleUsername)
            handleUsername(event.target.value.trim())
        if (handlePassword)
            handlePassword(event.target.value.trim())
    }

    return <div className="form-row">
        <label htmlFor={ props.id } className="form-label">
            { label }
        </label>
        <input onChange={ debounceWrapper(handleInputChange) }
            { ...props } />
    </div>

}
export default FormRow


