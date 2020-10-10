import React, { useRef } from "react";
import ReactToPrint from "react-to-print";
import Week from ".";

const PrintableWeek = () => {
  const componentRef = useRef(null);
  return (
    <>
      <ReactToPrint
        trigger={() => <a href="#/"><button>Print</button></a>}
        content={() => componentRef.current}
      />
      <Week ref={componentRef} />
    </>
  );
}
export default PrintableWeek