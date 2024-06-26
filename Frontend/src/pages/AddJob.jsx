import { useOutletContext, useNavigate } from "react-router-dom"
import { FormRow, FormSelect, SubmitButton } from "../components";
import Wrapper from '../assets/wrappers/DashboardFormPage';
import { useMutation } from "@tanstack/react-query";
import { JOB_STATUS, JOB_TYPE, JOB_SORT_BY } from "../../../utils/constants";
import { createNewJob } from "../utils/httpHelpers";
import { queryClient } from "../utils/customFetch";
import { toast } from "react-toastify";

const AddJob = () => {
    const user = useOutletContext(); //we could also use useDashboardContext
    const navigate = useNavigate();
    const { mutate, isPending, isError, error } = useMutation({
        mutationFn: createNewJob,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['jobs, user'],
                refetchType: "all"
            })
            toast.success('New Job created!', { autoClose: 2000 })
            navigate('/dashboard/all-jobs');
        },
        onError: () => {
            toast.error('Error, could not create a new Job', { autoClose: 1000 })
        }
    })

    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData(event.target)
        const newJob = Object.fromEntries(formData);
        mutate(newJob)
    }

    return <Wrapper>
        <form method='POST' className='form' onSubmit={ handleSubmit }>
            <h4 className='form-title'>add job</h4>
            <div className='form-center'>
                <FormRow
                    label='Position'
                    type='text'
                    name='position'
                    className='form-input'
                />
                <FormRow
                    label='Company'
                    type='text'
                    name='company'
                    className='form-input'
                />
                <FormRow
                    type='text'
                    label='job location'
                    name='location'
                    className='form-input'
                />
                <FormSelect
                    label='job type'
                    name='jobType'
                    list={ Object.values(JOB_TYPE) }
                />
                <FormSelect
                    label='job status'
                    name='jobStatus'
                    list={ Object.values(JOB_STATUS) }
                />
                <SubmitButton isSubmitting={ isPending } isFormBtn />
            </div>
        </form>
    </Wrapper>
}
export default AddJob


// export const action = async ({ request, params }) => {
//     // const formData = await request.formData();
//     // const newJob = Object.fromEntries(formData);
//     // console.log("New job data ", newJob)
//     return null
// }