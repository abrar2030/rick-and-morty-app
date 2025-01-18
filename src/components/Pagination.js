import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const pages = [...Array(totalPages).keys()].map(num => num + 1);

    return (
        <div>
            {pages.map((page) => (
                <button
                    key={page}
                    onClick={() => onPageChange(page)}
                    className={currentPage === page ? 'active' : ''}
                >
                    {page}
                </button>
            ))}
        </div>
    );
};

export default Pagination;
