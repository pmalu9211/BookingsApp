import React from "react";

const LoadingOverlay = () => {
  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-10">
        <div className="w-14 h-14 border-4 border-t-primary border-red-5 rounded-full animate-spin"></div>
      </div>
      <div className="relative z-100 mx-auto my-16 font-bold text-2xl">
        Deployed on a free plan might take some time 🥹
      </div>
    </>
  );
};

export default LoadingOverlay;
