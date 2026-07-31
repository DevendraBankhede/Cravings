import React from "react";
import NoDataFoundGif from "../assets/NoDataFound.gif";

const NoDataFound = ({ height, width, text }) => {
  return (
    <>
      <div
        className="flex flex-col justify-center items-center"
        style={{ height: height || "100%", width: width || "100%" }}
      >
        <div className="w-30 h-30 flex justify-center items-center">
          <img
            src={NoDataFoundGif}
            alt="No Data Found"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="text-center mt-4">
          <h2 className="text-2xl font-bold text-(--color-neutral)">
            {text || "No Data Found"}
          </h2>
        </div>
      </div>
    </>
  );
};

export default NoDataFound;