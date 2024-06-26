import { FileInput, FormRow, SubmitButton } from '../components';
import Wrapper from '../assets/wrappers/DashboardFormPage';
import { useNavigation, Form, } from 'react-router-dom';
import { useDashboardContext } from './DashboardLayout';
import customFetch from '../utils/customFetch';
import { toast } from 'react-toastify';
import { queryClient } from '../utils/customFetch';

const Profile = () => {
    const { user } = useDashboardContext();
    const navigation = useNavigation();
    const isSubmitting = navigation.state === 'submitting';
    return <Wrapper>
        <Form method='POST' className='form' encType='multipart/form-data'>
            <h4 className='form-title'>profile</h4>

            <div className='form-center'>
                <FileInput />
                <FormRow
                    label='name'
                    type='text'
                    name='name'
                    className='form-input'
                    defaultValue={ user.name }
                />
                <FormRow
                    label='email'
                    type='email'
                    name='email'
                    className='form-input'
                    defaultValue={ user.email } />
                <FormRow
                    label='location'
                    type='text'
                    name='location'
                    className='form-input'
                    defaultValue={ user.location } />

                <SubmitButton isSubmitting={ isSubmitting } isFormBtn />
            </div>
        </Form>
    </Wrapper>

}
export default Profile

export const action = async ({ request }) => {
    const formData = await request.formData();
    const file = formData.get('avatar');
    if (file && file.size > 500000) {
        toast.error("File size too large")
        return null;
    }

    try {
        await customFetch.patch('/users/update-user', formData)
        toast.success('User info updated')
        queryClient.invalidateQueries({ queryKey: ['user'] })
    } catch (error) {
        const message = error?.response?.data?.message || 'Something went wrong while updating user info'
        toast.error(message)
    }
    return null;
}