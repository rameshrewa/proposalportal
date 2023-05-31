import React from "react";
import ReactPaginate from "react-paginate";

const MatchingPagination = ({
  countlist,
  setSearchUsersData,
  paginateData,
  searchValue,
  searchUsersData,
}) => {
  const handlePageClick = (data) => {
    let currentPage = data.selected + 1;
    paginateData(currentPage, searchValue);
    if (setSearchUsersData !== undefined) {
      // setSearchUsersData(commentsFormServer);
    }
  };
  // const TotalPageCount = allUsersData?.total;
  //   const pageSize = allUsersData?.per_page
  // const page = allUsersData?.current_page;

  return (
    <>
      <div className="mt-4">
        {/* <small>
          {TotalPageCount ? page : 0} -{" "}
          {page * offsetList + offsetList <= TotalPageCount
            ? page * offsetList + offsetList
            : TotalPageCount || 0}
          {" of "}
          {TotalPageCount || 0}
         
        </small> */}
      </div>
      {searchUsersData?.total === 0 ? (
        ""
      ) : (
        <ReactPaginate
          previousLabel={"previous"}
          nextLabel={"next"}
          breakLabel={"..."}
          pageCount={countlist}
          marginPagesDisplayed={countlist}
          pageRangeDisplayed={countlist}
          onPageChange={handlePageClick}
          containerClassName={"pagination justify-content-end "}
          pageClassName={"page-item"}
          pageLinkClassName={"page-link"}
          previousClassName={"page-item"}
          previousLinkClassName={"page-link"}
          nextClassName={"page-item"}
          nextLinkClassName={"page-link"}
          breakClassName={"page-item"}
          breakLinkClassName={"page-link"}
          activeClassName={"active"}
        />
      )}
    </>
  );
};

export default MatchingPagination;
