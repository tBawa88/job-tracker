import customFetch from "./customFetch";

export const getCurrentUser = async () => {
    try {
        const response = await customFetch.get('/users/current-user');
        console.log('Current user ', response.data.user)
        return response.data.user;
    } catch (error) {
        console.log(error)
        const tempError = { message: 'Error while fetching the current user' }
        throw tempError;
    }
}

export const fetchAllJobs = async () => {
    try {
        const response = await customFetch.get('/jobs');
        return response.data.jobs;
    } catch (error) {
        console.log("Some error occured while fetching All jobs")
        throw { message: 'Error, could not fetch jobs' }
    }
}