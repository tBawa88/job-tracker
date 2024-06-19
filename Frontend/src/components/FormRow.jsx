const FormRow = ({ label, ...props }) => {
    return <div className="form-row">
        <label htmlFor={ props.name } className="form-label">
            { label }
        </label>
        <input { ...props } />
    </div>

}
export default FormRow