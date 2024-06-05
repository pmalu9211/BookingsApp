import React from "react";

const LoadingOverlay = () => {
  return (
    <div className="fixed inset-0 bg-white bg-opacity-70 flex items-center justify-center z-50">
      <div className="w-16 h-16 border-4 border-t-blue-500 border-blue-200 rounded-full animate-spin"></div>
    </div>
  );
};

export default LoadingOverlay;
