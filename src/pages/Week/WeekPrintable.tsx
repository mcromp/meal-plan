import React, { useRef } from "react";
import ReactToPrint from "react-to-print";
import Week from ".";
import './styles/week.css'
import printer from './utils/printer.svg'
const PrintableWeek = () => {
  const componentRef = useRef(null);
  return (
    <div className="print">
      <ReactToPrint
        trigger={() => <a href="#/" ><img className="icon" src={printer} alt="Printer Icon" /></a>}
        content={() => componentRef.current}
      />
      <Week ref={componentRef} />
    </div>
  );
}
export default PrintableWeek