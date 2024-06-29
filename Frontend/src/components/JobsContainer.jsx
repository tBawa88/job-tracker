import Job from './Job';
import Wrapper from '../assets/wrappers/JobsContainer';
import { useJobsContext } from '../pages/AllJobs';
// import { PageBtnContainer1 } from '.';
import { PageBtnContainer2 } from '.';


const JobsContainer = () => {
    const { data: { jobs, totalJobsFound } } = useJobsContext()

    if (jobs?.length === 0) {
        return (
            <Wrapper>
                <h2>No jobs to display...</h2>
            </Wrapper>
        );
    }

    return (
        <Wrapper>
            <h5>{ totalJobsFound } job{ totalJobsFound !== 1 ? 's' : '' }</h5>
            <div className='jobs'>
                { jobs?.map((job) => {
                    return <Job key={ job._id } { ...job } />;
                }) }
            </div>
            { totalJobsFound > 10 && <PageBtnContainer2 /> }
        </Wrapper>
    );
}
export default JobsContainer



