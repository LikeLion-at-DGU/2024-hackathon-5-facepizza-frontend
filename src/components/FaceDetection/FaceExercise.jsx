import React, { useEffect, useRef, useState } from "react";
import FaceExpression from "./FaceExpression";

const FaceExercise = ({ ExercisingType, ExerciseCount }) => {
    const videoRef = useRef();
    const [matching, setMatching] = useState(false);

    useEffect(() => {
        if (matching) {
            console.log("얼굴 처리 중...");
            const timer = setTimeout(() => {
                if (videoRef.current) {
                    console.log("매칭 중...");
                } else {
                    console.error("비디오가 null입니다.");
                }
            }, 1000); // 1초 동안 처리
            return () => clearTimeout(timer);
        } else {
            console.log("매칭되지 않음...");
        }
    }, [matching]); // 'matching' 상태에 의존하도록 수정

    useEffect(() => {
        console.log("업데이트된 matching 상태: ", matching);
    }, [matching]); // 'matching' 상태가 변경될 때 로그

    const handleExercise = (expressions) => {
        const { maxKey, maxValue } = expressions;

        if (ExercisingType === maxKey && maxValue > 0.5) {
            setMatching(true);
        } else {
            setMatching(false);
        }
    };

    return <FaceExpression videoRef={videoRef} onExpressions={handleExercise} />;
};

export default FaceExercise;
