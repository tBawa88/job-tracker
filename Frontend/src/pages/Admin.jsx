import { FaCalendarCheck, FaUserFriends } from 'react-icons/fa';
import { StatItem } from '../components';
import { useLoaderData, redirect } from 'react-router-dom';
import customFetch from '../utils/customFetch';
import Wrapper from '../assets/wrappers/StatsContainer';
import { toast } from 'react-toastify';


const Admin = () => {
    const { users, jobs } = useLoaderData();    //For consistency sake, should use react query here too
    return (
        <Wrapper>
            <StatItem
                title='current users'
                count={ users }
                color="#e9b949"
                bcg="#fcefc7"
                icon={ <FaUserFriends /> }
            />
            <StatItem
                title='current jobs'
                count={ jobs }
                color="#647acb"
                bcg="#e0e8f9"
                icon={ <FaCalendarCheck /> }
            />
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