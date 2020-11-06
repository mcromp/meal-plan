import React, { useRef } from "react";
import ReactToPrint from "react-to-print";
import Week from ".";
import printer from '../../assets/printer.svg';
import './styles/week.css';

//this is a wrapper created for use with react-to-print

const PrintableWeek = () => {
  const componentRef = useRef(null);
  return (
    <div className="print">
      <ReactToPrint
        trigger={() => <a href="#/" ><img className="print__icon" src={printer} alt="Printer Icon" /></a>}
        content={() => componentRef.current}
      />
      <Week ref={componentRef} />
    </div>
  );
};

export default PrintableWeek;