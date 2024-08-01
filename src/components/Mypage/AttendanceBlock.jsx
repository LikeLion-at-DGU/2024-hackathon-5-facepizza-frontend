import React from "react";

const AttendanceBlock = () => {
  const rows = 5,
    cols = 6;
  const Calendar = [];
  const EmptyBox = <img src="src\assets\EmptySpace.svg" />;
  for (let i = 0; i < rows; i++) {
    Calendar[i] = [];
    for (let j = 0; j < cols; j++) Calendar[i][j] = EmptyBox;
  }

  return (
    <div className="Block">
      {Calendar.map((row, rowIndex) => (
        <div key={rowIndex} style={{ display: "flex" }}>
          {row.map((item, colIndex) => (
            <div key={colIndex} style={{ margin: "5.7px 8.55px" }}>
              {item}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default AttendanceBlock;
