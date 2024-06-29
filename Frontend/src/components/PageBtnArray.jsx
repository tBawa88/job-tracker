const PageBtnArray = ({ pageArray, currentPage, onPageChange }) => {

    const handlePageChange = (pageValue) => {
        console.log("Swtich to page no. ", pageValue)
    }

    return (
        <div className='btn-container'>
            { pageArray.map(pageValue => {
                return <button key={ pageValue }
                    className={ `btn page-btn ${pageValue === currentPage && 'active'}` }
                    onClick={ () => onPageChange(pageValue) }
                >
                    { pageValue }
                </button>
            }) }
        </div>
    )
}
export default PageBtnArray