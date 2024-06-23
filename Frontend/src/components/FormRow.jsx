const FormRow = ({ label, ...props }) => {




    return <div className="form-row">
        <label htmlFor={ props.id } className="form-label">
            { label }
        </label>
        <input
            { ...props } />
    </div>

}
export default FormRow


const debounceWrapper = (fn) => {
    let timeoutId;
    return (event) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            fn(event)
        }, 800);
    }
} 