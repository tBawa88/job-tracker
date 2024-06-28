import { useQuery } from "@tanstack/react-query"
import { fetchAllJobs } from "../utils/httpHelpers"
import { SearchContainer, JobsContainer } from "../components"
import { useOutletContext } from "react-router-dom"

const AllJobs = () => {
    const user = useOutletContext();    //using this to create a better queryKey
    const { data, isPending, isError, error } = useQuery({
        queryKey: ['user', 'jobs', { userId: user?._id }],
        queryFn: fetchAllJobs,
        staleTime: 2000,
    })
    // console.log("Current Job data from server ", data)
    let content;
    if (isPending)
        content = <p>Loading Jobs...</p>
    if (isError)
        content = <p>Error loading User's jobs</p>
    if (data)
        content = <JobsContainer jobs={ data } />


    return (
        <>
            <SearchContainer />
            { content }
        </>
    )
}
export default AllJobs