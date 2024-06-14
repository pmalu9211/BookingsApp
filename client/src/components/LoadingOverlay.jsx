import React from "react";

const LoadingOverlay = () => {
  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-10">
        <div className="w-14 h-14 border-4 border-t-primary border-red-5 rounded-full animate-spin"></div>
      </div>
      <div className="relative z-100 mx-auto my-16 ">
        If not used might take some time to fetch
      </div>
    </>
  );
};

export default LoadingOverlay;
