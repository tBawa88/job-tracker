import { useQuery } from "@tanstack/react-query"
import { fetchAllJobs } from "../utils/httpHelpers"
import { SearchContainer, JobsContainer } from "../components"
import { useOutletContext } from "react-router-dom"
import { useEffect, useState } from "react"
import { queryClient } from "../utils/customFetch"

const AllJobs = () => {

    const user = useOutletContext();    //using this to create a better queryKey
    const [queryStrings, setQueryStrings] = useState({})

    useEffect(() => {
        queryClient.invalidateQueries({
            queryKey: ['user', 'jobs', { userId: user?._id }, queryStrings],
            refetchType: 'all'
        })
    }, [queryStrings, queryClient, user?._id])

    const { data, isLoading, isError, error, } = useQuery({
        queryKey: ['user', 'jobs', { userId: user?._id }, queryStrings],
        queryFn: () => fetchAllJobs(queryStrings),
    })

    const filterAllJobs = (queryObject) => {
        setQueryStrings(queryObject)
    }

    let content;
    if (isLoading)
        content = <p>Loading Jobs...</p>
    if (isError)
        content = <p>Error loading User's jobs</p>
    if (data)
        content = <JobsContainer jobs={ data } />


    return (
        <>
            <SearchContainer filterAllJobs={ filterAllJobs } />
            { content }
        </>
    )
}
export default AllJobs