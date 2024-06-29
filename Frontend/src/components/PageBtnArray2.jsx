const PageBtnArray = ({ pageArray, currentPage, lastPage, onPageChange }) => {

    /**
     * 
     * @param {Object} buttonInfo - An object containing info for the current button
     * @param {number} buttonInfo.pageValue - page value of the button to be rendered
     * @param {boolean} buttonInfo.active - is the current page button active or not
     * @returns {JSX.Element} The rendered button element
     */
    const addPage = ({ pageValue, active }) => (
        <button key={ pageValue } className={ `btn page-btn ${active && 'active'}` } onClick={ () => onPageChange(pageValue) }>
            { pageValue }
        </button>
    )

    /**
     * Think in terms of a QUEUE data structure and consider the following conditions
     * -First in the queue is the 'First' button, always there no matter what
     * -After First comes the left elipsis button, the condition for that is the current page must be more than 3
     * -After that comes the 'One before current' button, condition for that is current !== 1 && !== 2 (if it's 2 then 1 is always visible anyways)
     * -After that comes 'current' button, condition for that current !== first and !== last (since they're always rendered no matter what)
     * -Next is queue is the 'One after current' button, condition for that is current !== last and !== last - 1
     * -Then comes the right elipsis button, which should only be rendered if current is less than last - 1
     * -Finally the last button, which is always rendered
     * 
     * @returns {[JSX.Element]} An array of `<button>` JSX elements to be rendered on screen
     */
    const renderPageButtons = () => {
        const pages = [];
        //first button
        pages.push(addPage({ pageValue: 1, active: currentPage === 1 }))

        //left elipsis button
        if (currentPage > 3)
            pages.push(<span className="page-btn dots" key='dots-1'>...</span>)

        //one before current page
        if (currentPage !== 1 && currentPage !== 2)
            pages.push(addPage({ pageValue: currentPage - 1, active: false }))
        //current page
        if (currentPage !== 1 && currentPage !== lastPage)
            pages.push(addPage({ pageValue: currentPage, active: true }))
        //one after current page
        if (currentPage !== lastPage && currentPage !== lastPage - 1)
            pages.push(addPage({ pageValue: currentPage + 1, active: false }))

        //right elipsis button
        if (currentPage < 8)
            pages.push(<span className="page-btn dots" key='dots-2'>...</span>)


        //last button
        pages.push(addPage({ pageValue: lastPage, active: currentPage === lastPage }))
        return pages;
    }


    return (
        <div className='btn-container'>
            { renderPageButtons() }
        </div>
    )
}
export default PageBtnArray