
import { FaLocationArrow, FaBriefcase, FaCalendarAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Wrapper from '../assets/wrappers/Job';
import JobInfo from './JobInfo';
import { Form } from 'react-router-dom';
import day from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import { queryClient } from '../utils/customFetch';
import { useMutation } from '@tanstack/react-query';
import { delteJob } from '../utils/httpHelpers';
import { toast } from 'react-toastify';

day.extend(advancedFormat);

const Job = ({
    _id,
    position,
    company,
    jobLocation,
    jobType,
    createdAt,
    jobStatus,
}) => {
    const date = day(createdAt).format('MMM Do, YYYY');
    const { mutate } = useMutation({
        mutationFn: delteJob,
        //optimistic state updation, and rollback on error :)
        onMutate: async () => {
            const oldData = queryClient.getQueryData(['user', { jobId: _id }]);
            await queryClient.cancelQueries({ queryKey: ['user', { jobId: _id }] })
            queryClient.removeQueries({ queryKey: ['user', { jobId: _id }] })
            return { oldData };
        },
        onError: (data, error, context) => {
            const message = data?.message || 'Error Creating a new Job'
            toast.error(message, { autoClose: 1500 })
            queryClient.setQueryData(['user', { jobId: _id }], context.oldData)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['user', 'jobs', 'stats'],
                refetchType: 'all'
            })
            toast.warning('Job deleted', { autoClose: 2000 })
        },
        onSettled: () => {
            queryClient.invalidateQueries({
                queryKey: ['user', 'jobs', 'stats'],
                refetchType: 'all'
            })
        }
    })


    const handleDelete = () => {
        const proceed = window.confirm('Are you sure you want to Delete this Job?')
        if (proceed)
            mutate({ id: _id })
    }

    return (
        <Wrapper>
            <header>
                <div className='main-icon'>{ company.charAt(0) }</div>
                <div className='info'>
                    <h5>{ position }</h5>
                    <p>{ company }</p>
                </div>
            </header>
            <div className='content'>
                <div className='content-center'>
                    <JobInfo icon={ <FaLocationArrow /> } text={ jobLocation } />
                    <JobInfo icon={ <FaCalendarAlt /> } text={ date } />
                    <JobInfo icon={ <FaBriefcase /> } text={ jobType } />
                    <div className={ `status ${jobStatus}` }>{ jobStatus }</div>
                </div>

                <footer className='actions'>
                    <Link className='btn edit-btn' to={ `/dashboard/edit-job/${_id}` }>Edit</Link>
                    <Form>
                        <button type='submit'
                            className='btn delete-btn'
                            onClick={ handleDelete }>
                            Delete
                        </button>
                    </Form>
                </footer>
            </div>
        </Wrapper>
    );
};

export default Job;