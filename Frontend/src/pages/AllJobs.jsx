import { useQuery } from "@tanstack/react-query"
import { fetchAllJobs } from "../utils/httpHelpers"

//need to make a fetch query to the backend to fetch all jobs of the current logged in user
const AllJobs = () => {
    const { data, isPending, isError, error } = useQuery({
        queryKey: ['user', 'jobs'],
        queryFn: fetchAllJobs,
        staleTime: 10000
    })

    let content;
    if (isPending)
        content = <p>Loading Jobs...</p>
    if (isError)
        content = <p>Error loading User's jobs</p>
    if (data)
        content = <ul>
            { data.map(job => (
                <li key={ job._id }>{ job.title }</li>
            )) }
        </ul>


    return (
        <>
            <h1>AllJobs</h1>
            { content }
        </>
    )
}
export default AllJobs