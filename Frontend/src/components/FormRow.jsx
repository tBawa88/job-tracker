
const FormInput = ({ label, ...props }) => {

    return <div className="form-row">
        <label htmlFor={ props.id } className="form-label">
            { label }
        </label>
        <input { ...props } />
    </div>

}
export default FormInput


