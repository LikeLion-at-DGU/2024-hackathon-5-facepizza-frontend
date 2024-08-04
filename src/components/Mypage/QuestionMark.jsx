import React from "react";

// props로 isHovering을 받아야 합니다.
const QuestionMark = ({ isHovering }) => {
    return (
        <>
            {isHovering && (
                <div className="QuestionMark">
                    <p className="QContents">꾸준히 들어와 표정 트래킹과 표정 스냅을 실천해 보세요!
                    <br/>굳어있던 냉동치즈가 성장하며 표정이 풍부해진답니다 :D</p>
                    <div id="NextStep">다음성장일: 2살</div>
                </div>
            )}
        </>
    );
};

export default QuestionMark;
