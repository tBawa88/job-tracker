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
     * At any given time there can be at max be 7 buttons on the screen. The first, last, active , one before, one after , and 2 elipsis buttons
     * And at minimum there can be 4 buttons. The first, last, one either after First or before last, and one elipsisis button
     * So it is easier to manually construct an array of buttons depending on currentPage  
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