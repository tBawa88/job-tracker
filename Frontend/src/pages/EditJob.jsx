import { useParams, useNavigate, Form, redirect } from 'react-router-dom'
import { useMutation, useQuery } from "@tanstack/react-query"
import { queryClient } from "../utils/customFetch"
import { editJob, fetchJob } from '../utils/httpHelpers'
import { FormRow, FormSelect, SubmitButton } from '../components';
import Wrapper from '../assets/wrappers/DashboardFormPage';
import { toast } from 'react-toastify'
import { JOB_STATUS, JOB_TYPE } from '../../../utils/constants';

const EditJob = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { data: job, isPending } = useQuery({
        queryKey: ['user', { jobId: id }],
        queryFn: ({ signal }) => fetchJob(id, signal),
        onError: () => {
            toast('Error fetching this Job', { autoClose: 1200 })
            navigate('..')
        },
        staleTime: 2000,
    })

    //optimistic caching of data and rollback on error
    const { mutate } = useMutation({
        mutationFn: editJob,
        onMutate: async ({ updatedJobData }) => {
            const oldJobData = queryClient.getQueryData(['user', { jobId: id }]);
            await queryClient.cancelQueries({ queryKey: ['user', { jobId: id }] })
            queryClient.setQueryData(['user', { jobId: id }], updatedJobData)
            toast.success("Job Edited", { autoClose: 1500 })
            return { oldJobData }
        },
        onError: (data, error, context) => {
            const message = data?.message || 'Error Creating a new Job'
            toast.error(message, { autoClose: 1500 })
            queryClient.setQueryData(['user', { jobId: id }], context.oldJobData)
        },
        onSettled: () => {
            queryClient.invalidateQueries({
                queryKey: ['user', { jobId: id }]
            })
            navigate('/dashboard/all-jobs')
        }
    })


    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const updatedJobData = Object.fromEntries(formData);
        mutate({ updatedJobData, id });
    }

    return (
        <Wrapper>
            <form method='post' className='form' onSubmit={ handleSubmit }>
                <h4 className='form-title'>edit job</h4>
                <div className='form-center'>
                    <FormRow type='text'
                        className='form-input'
                        name='position'
                        defaultValue={ job?.position }
                    />
                    <FormRow type='text'
                        className='form-input'
                        name='company'
                        defaultValue={ job?.company }
                    />
                    <FormRow
                        type='text'
                        className='form-input'
                        label='job location'
                        name='location'
                        defaultValue={ job?.location }
                    />

                    <FormSelect
                        name='jobStatus'
                        label='job status'
                        defaultValue={ job?.jobStatus }
                        list={ Object.values(JOB_STATUS) }
                    />
                    <FormSelect
                        name='jobType'
                        label='job type'
                        defaultValue={ job?.jobType }
                        list={ Object.values(JOB_TYPE) }
                    />
                    <SubmitButton isFormBtn isSubmitting={ isPending } />
                </div>
            </form>
        </Wrapper>
    );
}
export default EditJob