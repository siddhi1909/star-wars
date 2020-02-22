import React from "react";

const Pagination = (props) => {
    let count = props.count;
    let recordsPerPage = props.recordsPerPage;
    let currentPage = props.currentPage;
    let planetList = props.planetList;
    let searchText = props.searchText;
    let setCurrentPage = props.setCurrentPage;
    let searchPlanet = props.searchPlanet;

    /*
    * Array for Storing page numbers
    * */
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(count / recordsPerPage); i++) {
        pageNumbers.push(i);
    }

    /*
    * Renders page number based on pageNumbers array
    * */
    const renderPageNumbers = pageNumbers.map(number => {
        let pageClass = ['custom-pagination-class', 'page-item', 'page-link'];
        if (number === currentPage) {
            pageClass.push('active')
        }
        return (
            <li className={pageClass.join(' ')} key={number}
                onClick={e => {
                    setCurrentPage(number);
                    searchPlanet(searchText,number);
                }}>
                {number}
            </li>
        );
    });

    return (
        <>
            {planetList.length > 0 ?
                (<nav aria-label="Page navigation example">
                    <ul className="pagination justify-content-center">
                        {renderPageNumbers}
                    </ul>
                </nav>) :
                ''}
        </>
    )
}

export default Pagination;