
const FormRowSelect = ({ name, label, list, handleFilter }) => {
    return (
        <div className='form-row'>
            <label htmlFor={ name } className='form-label'>
                { label || name }
            </label>
            <select
                name={ name }
                id={ name }
                className='form-select'
                onChange={ handleFilter }
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