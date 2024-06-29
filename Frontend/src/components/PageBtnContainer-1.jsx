import { HiChevronDoubleLeft, HiChevronDoubleRight } from 'react-icons/hi';
import Wrapper from '../assets/wrappers/PageBtnContainer';
import { useJobsContext } from '../pages/AllJobs';
import { PageArray } from '.';



const PageBtnContainer = () => {
    const { data: { totalPages, currentPage }, changeCurrentPage } = useJobsContext();
    const pageButtonArray = Array.from({ length: totalPages }, (_, i) => i + 1)

    // console.log("pages array = ", pageButtonArray)
    // console.log("inside page btn container, total pages = ", totalPages, "current page = ", currentPage)

    const handlePageChange = (pageValue) => {
        if (pageValue > 0 && pageValue <= totalPages)
            changeCurrentPage(pageValue)
    }

    return <Wrapper>
        <button className='btn btn-prev' onClick={ () => handlePageChange(currentPage - 1) }>
            <HiChevronDoubleLeft />
            Prev
        </button>

        <PageArray
            pageArray={ pageButtonArray }
            currentPage={ currentPage }
            onPageChange={ handlePageChange } />

        <button className='btn btn-next' onClick={ () => handlePageChange(currentPage + 1) }>
            next
            <HiChevronDoubleRight />
        </button>
    </Wrapper>

}
export default PageBtnContainer