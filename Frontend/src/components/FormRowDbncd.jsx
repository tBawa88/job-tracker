import debounceWrapper from "../utils/debounceWrapper"

const DebouncedFormInput = ({ label, handleUsername, handlePassword, handleFilter, ...props }) => {

    const handleInputChange = (event) => {
        if (handleUsername)
            handleUsername(event.target.value.trim())
        if (handlePassword)
            handlePassword(event.target.value.trim())
        if (handleFilter)
            handleFilter()
    }

    return <div className="form-row">
        <label htmlFor={ props.id } className="form-label">
            { label }
        </label>
        <input onChange={ debounceWrapper(handleInputChange) }
            { ...props } />
    </div>

}
export default DebouncedFormInput


