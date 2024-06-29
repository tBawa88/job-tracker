import mongoose from "mongoose"
/**
 * A function that takes in a string representing the sorting value, and returns pipeline object
 * @param {string} sort - 'sort' query string from the url 
 * @returns {Object}  An object that can be used as $sort stage of aggregation, be default sorts the createdAt in descending order Meaning latest added will apear first
 */
export const getSortStage = (sort) => {
    let sortCriteria = { $sort: { createdAt: -1 } }

    if (sort === 'oldest') {
        sortCriteria = { $sort: { createdAt: 1 } }
    } else if (sort === 'a-z') {
        sortCriteria = { $sort: { company: 1 } }
    } else if (sort === 'z-a') {
        sortCriteria = { $sort: { company: -1 } }
    }
    return sortCriteria;

}

/**
 * A function that takes in one or more query string values and returns a $match pipeline object
 * @param {string} _id - _id (mongoose string id) of current user
 * @param {string} position - Value of position query string 
 * @param {string} company - Value of company query string 
 * @param {string} jobStatus - Value of jobStatus query string
 * @param {string} jobType - Value of jobType query string
 * @returns {Object}  An object that can be used as the first stage of aggregation
 */
export const getMatchStage = (_id, position, company, jobStatus, jobType) => {
    const matchStage = {
        $match: {
            ownerId: new mongoose.Types.ObjectId(_id),
            ...(position && { position: { $regex: position, $options: 'i' } }),
            ...(company && { company: { $regex: company, $options: 'i' } }),
            ...(jobStatus && jobStatus !== 'all' && { jobStatus }),
            ...(jobType && jobType !== 'all' && { jobType })
        }
    }
    return matchStage
}

/**
 * 
 * @param {string} _id - mongoose id of current user
 * @param {string} position - Value of position query string
 * @param {string} company - Value of company query string
 * @param {string} jobStatus - Value of jobStatus query string
 * @param {string} jobType - Value of jobType query string
 * @returns An object that can be used to filter the results and count the result queries 
 */
export const getQueryObject = (_id, position, company, jobStatus, jobType) => {
    const queryObject = {
        ownerId: _id,
        ...(position && { position: { $regex: position, $options: 'i' } }),
        ...(company && { company: { $regex: company, $options: 'i' } }),
        ...(jobStatus && jobStatus !== 'all' && { jobStatus }),
        ...(jobType && jobType !== 'all' && { jobType })
    }


    return queryObject
}