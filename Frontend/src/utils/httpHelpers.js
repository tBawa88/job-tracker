import customFetch from "./customFetch";

export const getCurrentUser = async () => {
    try {
        const response = await customFetch.get('/users/current-user');
        const { user, isTestUser } = response.data;
        return { user, isTestUser };
    } catch (error) {
        // console.log(error)
        const tempError = { message: 'Error while fetching the current user' }
        throw tempError;
    }
}

export const fetchAllJobs = async () => {
    try {
        const response = await customFetch.get('/jobs');
        return response.data.jobs;
    } catch (error) {
        // console.log("Some error occured while fetching All jobs", error)
        throw { message: 'Error, could not fetch jobs' }
    }
}

export const createNewJob = async (newJobData) => {
    try {
        const response = await customFetch.post('/jobs', newJobData);
        return response.data.job;
    } catch (error) {
        if (error.response.status === 403) {
            throw { message: error.response.data.message || 'Could not perform the action' }
        }
        throw { message: 'Error, could not create a new job. Try again later' }
    }
}
export const fetchJob = async (id) => {
    try {
        const response = await customFetch.get(`/jobs/${id}`);
        return response.data.job;
    } catch (error) {
        // console.log("Error fetching job", error)
        throw { message: 'Error, could not fetch Job data' }
    }
}

export const editJob = async ({ updatedJobData, id }) => {
    try {
        const response = await customFetch.patch(`/jobs/${id}`, { ...updatedJobData })
        return response.data.job;
    } catch (error) {
        if (error.response.status === 403) {
            throw { message: error.response.data.message || 'Could not perform the action' }
        }
        // console.log("Error while updating the Job data")
        throw { message: 'Error, could not update this Job atm.' }
    }
}

export const delteJob = async ({ id }) => {
    try {
        await customFetch.delete(`/jobs/${id}`)
        return null;
    } catch (error) {
        if (error.response.status === 403) {
            throw { message: error.response.data.message || 'Could not perform the action' }
        }
        // console.log("Error while deleting the jobid", id)
        throw { message: 'Error, could not delete the Job atm.' }
    }
}

export const fetchJobStats = async () => {
    try {
        const response = await customFetch.get('/jobs/get-stats');
        const { totalJobStats, monthlyJobStats } = response.data;
        return { totalJobStats, monthlyJobStats }
    } catch (error) {
        // console.log("Error occured while fetching stats,", error)
        throw { message: error.message || 'Failed to fetch stats' }
    }
}