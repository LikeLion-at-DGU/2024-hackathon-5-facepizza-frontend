import React from "react";
// import EmptySpace from 'src/assets/EmptySpace.svg'

const AttendanceBlock = () => {
  var now = new Date();
  var last = new Date(now.getFullYear(), now.getMonth() + 1, 0); // 이번 달의 마지막 날을 가져옴
  var date = last.getDate();

  const cols = 6;
  let rows = Math.ceil(date / cols); // 필요한 행의 수를 계산함
  const Calendar = [];
  const EmptyBox = <img src={EmptySpace}/>;
  
  // 날짜에 맞는 아이템 생성
  for (let i = 0; i < rows; i++) {
    Calendar[i] = [];
    for (let j = 0; j < cols; j++) {
      const currentDate = i * cols + j + 1;
      if (currentDate <= date) {
        Calendar[i][j] = EmptyBox;
      } else {
        Calendar[i][j] = null; // 날짜를 초과하는 경우 null로 설정
      }
    }
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
