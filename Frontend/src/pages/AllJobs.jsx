import { useQuery } from "@tanstack/react-query"
import { fetchAllJobs } from "../utils/httpHelpers"
import { SearchJobsForm, JobsContainer } from "../components"
import { useOutletContext } from "react-router-dom"
import { useEffect, useState, createContext, useContext } from "react"
import { queryClient } from "../utils/customFetch"

const JobsContext = createContext();
const AllJobs = () => {

    const user = useOutletContext();    //using this to create a better queryKey
    const [queryStrings, setQueryStrings] = useState({})
    const { data, isLoading, isError } = useQuery({
        queryKey: ['user', 'jobs', { userId: user?._id }, queryStrings],    //adding queryStrings as a queryKey made it work
        queryFn: () => fetchAllJobs(queryStrings),
        staleTime: 2000
    })

    useEffect(() => {
        queryClient.invalidateQueries({
            queryKey: [queryStrings],
            refetchType: 'all',
        })
    }, [queryStrings, queryClient, user?._id])


    const changeCurrentPage = (pageValue) => {
        setQueryStrings(oldqueryStrings => {
            return { ...oldqueryStrings, pg: pageValue }
        })
    }
    const filterAllJobs = (queryObject) => {
        setQueryStrings(queryObject)
    }

    let content;
    if (isLoading)
        content = <p>Loading Jobs...</p>
    if (isError)
        content = <p>Error loading User's jobs</p>
    if (data)
        content = <JobsContainer />


    return (
        <JobsContext.Provider value={ { data: data || {}, filterAllJobs, changeCurrentPage } }>
            <SearchJobsForm />
            { content }
        </JobsContext.Provider>
    )
}

export const useJobsContext = () => useContext(JobsContext);

export default AllJobs