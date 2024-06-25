import { FaSuitcaseRolling, FaCalendarCheck } from 'react-icons/fa';

import { useLoaderData, redirect } from 'react-router-dom';
import customFetch from '../utils/customFetch';
import Wrapper from '../assets/wrappers/StatsContainer';
import { toast } from 'react-toastify';


const Admin = () => {
    const { users, jobs } = useLoaderData();
    console.log({ users, jobs })
    return (
        <Wrapper>
            <h2>admin page</h2>
        </Wrapper>
    );
};
export default Admin;


export const loader = async () => {
    try {
        const response = await customFetch.get('/users/admin/app-stats');
        const { userCount, jobCount } = response.data
        return { users: userCount, jobs: jobCount }
    } catch (error) {
        toast.error('User is not authorized to access this page')
        return redirect('/dashboard');
    }
}