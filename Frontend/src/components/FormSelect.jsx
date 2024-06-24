
const FormRowSelect = ({ name, label, list, }) => {
    return (
        <div className='form-row'>
            <label htmlFor={ name } className='form-label'>
                { label || name }
            </label>
            <select
                name={ name }
                id={ name }
                className='form-select'
            >
                { list.map((itemValue) => {
                    return (
                        <option key={ itemValue } value={ itemValue }>
                            { itemValue }
                        </option>
                    );
                }) }
            </select>
        </div>
    );
};
export default FormRowSelect;