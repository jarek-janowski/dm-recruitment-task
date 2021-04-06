import { PaginationItem } from 'reactstrap';

const Pagination = ({
    videosPerPage, 
    totalVideos, 
    paginate, 
    totalFavourites,
    currentFilter,
    currentPage
}) => {

    const pageNumbers = [];
    const total = currentFilter ? totalVideos : totalFavourites
    
    for (let i = 1; i <= Math.ceil( total / videosPerPage); i++){
        pageNumbers.push(i);
    }

    return ( 
        <nav style={{marginTop: 32}}>
            <ul className="pagination">
                {pageNumbers.map(number => (
                    <PaginationItem active={currentPage === number} key={number} className="page-item"> 
                        <button onClick={() => paginate(number)} className="page-link">
                            {number}
                        </button>
                    </PaginationItem>
                ))}
            </ul>
        </nav> 
    );
}
 
export default Pagination;