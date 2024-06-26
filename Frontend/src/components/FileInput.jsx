const FileInput = () => {
    return <div className="form-row">
        <label htmlFor='image' className='form-label'>
            Select an image file (max 0.5 MB):
        </label>
        <input
            type='file'
            id='avatar'
            name='avatar'
            className='form-input'
            accept='image/*'
        />
    </div>
}
export default FileInput