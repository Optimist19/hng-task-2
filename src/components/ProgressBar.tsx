import React from "react";

interface PropsType {
  value: number;
}

function ProgressBar(props: PropsType) {
  const value = props.value;


  return (
    <div className="flex items-center gap-2 md:gap-4">
      <div
        className={`flex-1 h-1 rounded-full bg-[#0E464F] overflow-hidden`}>
        <div
          className={`h-full rounded-full bg-[#24A0B5] transition-all duration-300`}
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}

export default ProgressBar;