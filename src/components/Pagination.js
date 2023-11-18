import React, { useEffect, useState } from "react";

const Pagination = ({ goNextPage, goPrevPage, offset, LIMIT }) => {
  return (
    <div>
      <button disabled={offset < LIMIT} onClick={goPrevPage}>
        -
      </button>
      <button onClick={goNextPage}>+</button>
    </div>
  );
};

export default Pagination;
