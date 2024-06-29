import { FormRowDebounced, FormSelect } from '.'
import { useJobsContext } from '../pages/AllJobs'
import Wrapper from '../assets/wrappers/SearchContainerForm'
import { useRef } from 'react'
import { JOB_STATUS, JOB_TYPE, SORT_LIST } from '../utils/filterFormContants'


const SearchFormContainer = () => {
    const { filterAllJobs } = useJobsContext();
    const formRef = useRef()


    const handleFilter = () => {
        const formData = new FormData(formRef.current);
        const formValues = Object.fromEntries(formData)
        filterAllJobs(formValues)
    }
    const handleResetFiler = () => {
        formRef.current.reset();
        filterAllJobs({})
    }

    return (
        <Wrapper>
            <form method='POST' className='form' ref={ formRef }>
                <h5 className='form-title'>Filter Jobs</h5>
                <button type='button'
                    className='btn form-btn'
                    id='filter-btn'
                    onClick={ handleResetFiler }
                >
                    Reset Filter
                </button>
                <div className="form-center">
                    <FormRowDebounced
                        label='filter by position'
                        name='position'
                        className='form-input'
                        type='text'
                        handleFilter={ handleFilter }
                    />
                    <FormRowDebounced
                        label='filter by company'
                        name='company'
                        className='form-input'
                        type='text'
                        handleFilter={ handleFilter }
                    />
                    <FormSelect
                        name='jobStatus'
                        label='job status'
                        list={ JOB_STATUS }
                        handleFilter={ handleFilter } />
                    <FormSelect
                        name='jobType'
                        label='job status'
                        list={ JOB_TYPE }
                        handleFilter={ handleFilter } />
                    <FormSelect
                        name='sort'
                        label='sort by'
                        list={ SORT_LIST }
                        handleFilter={ handleFilter } />
                </div>
            </form>
        </Wrapper>
    )
}
export default SearchFormContainer