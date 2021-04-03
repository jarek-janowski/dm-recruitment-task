const Pagination = ({
    videosPerPage, 
    totalVideos, 
    paginate, 
    totalFavourites,
    currentFilter
}) => {

    const pageNumbers = [];
    const total = currentFilter ? totalVideos : totalFavourites
    
    for (let i = 1; i <= Math.ceil( total / videosPerPage); i++){
        pageNumbers.push(i);
    }

    return ( 
        <nav>
            <ul className="pagination">
                {pageNumbers.map(number => (
                    <li key={number} className="page-item"> 
                        <button onClick={() => paginate(number)} className="page-link">
                            {number}
                        </button>
                    </li>
                ))}
            </ul>
        </nav> 
    );
}
 
export default Pagination;