import React from 'react'

const Pagination = ({ page_number, set_page_number, has_token, data }) => {
  return (
    <div className="d-flex flex-column align-items-center mt-3">
      <div className="d-felx mb-2 ">
        <button
          className="main-button-icon-gray mx-1"
          disabled={page_number <= 1}
          onClick={() => set_page_number((p) => p - 1)}
        >
          <i className="fas fa-arrow-circle-left"></i>
        </button>
        <span className='page-number rounded px-3 py-2 mx-3'>{page_number}</span>
        <button
          className="main-button-icon-gray mx-1"
          disabled={!has_token(page_number + 1) || !data?.nextPageToken}
          onClick={() => set_page_number((p) => p + 1)}
        >
          <i className="fas fa-arrow-circle-right"></i>
        </button>
      </div>
    </div>
  )
}

export default Pagination
