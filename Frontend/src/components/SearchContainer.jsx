import { FormRow, FormSelect, SubmitButton } from '../components'

import Wrapper from '../assets/wrappers/DashboardFormPage'
import { useRef } from 'react'
const jobStatusList = ['all', 'pending', 'interview', 'declined']
const johTypeList = ['all', 'full-time', 'part-time', 'intern']
const sortList = ['newest', 'oldest', 'a-z', 'z-a']



const SearchContainer = () => {

    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        console.log('Current formdata = ', formData);
    }

    return (
        <Wrapper>
            <form method='POST' onSubmit={ handleSubmit } className='form' >
                <h5 className='form-title'>Filter Jobs</h5>
                <div className="form-center">
                    <FormRow
                        label='company'
                        name='company'
                        className='form-input'
                        type='text'
                    />
                    <SubmitButton isFormBtn />
                </div>
            </form>
        </Wrapper>
    )
}
export default SearchContainer