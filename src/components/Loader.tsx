import React from "react";

const Loader: React.FC = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-100 bg-opacity-75 z-50">
      <div className="relative">
        <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-[#ee523d]"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="h-16 w-16 bg-[#ee523d] rounded-full animate-pulse" />
        </div>
      </div>
    </div>
  );
};

export default Loader;
