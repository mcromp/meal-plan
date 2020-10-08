import React, { useRef } from "react";
import ReactToPrint, { useReactToPrint } from "react-to-print";
import Week from "../Week";

const PrintableWeek = () => {
  const componentRef = useRef(null);
  return (
    <div>
      <ReactToPrint
        trigger={() => <a href="#">Print this out!</a>}
        content={() => componentRef.current}
      />
      <Week ref={componentRef} />
    </div>
  );
}
export default PrintableWeek