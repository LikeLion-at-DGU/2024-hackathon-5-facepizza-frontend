import React from "react";
import * as H from '../../styles/HomeStyled';
import * as S from '../../styles/StyledComponents';
import { Magajine_data } from "../../data/Magajine_data";
import { useNavigate } from "react-router-dom";

const Magazine_Home = () => {

    // 최신 글 두 개를 가져오는 함수
    const getLatestPosts = () => {
        return [...Magajine_data].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 2);
    };

    const latestPosts = getLatestPosts();

    const Example_mag = ({ post }) => {

        const navigate = useNavigate();
        const handleClick = () => {
            navigate(`Magzine/detail/${post.postID}`);
        };

        return (
            <H.Example_mag onClick={handleClick}>
                <img src={post.thumbnail} alt={post.title} />
                <h3>{post.title}</h3>
            </H.Example_mag>
        );
    };

    return (
        <H.Magazine_Home>
            <H.ComponentName>
                <h2>인사이트 창고</h2>
            </H.ComponentName>
            <H.Sectin_G>
                <H.FlexCol>
                    <H.Clink to='/Magzine' style={{width: '100%'}}>
                            자세히 보기 ▶
                    </H.Clink>
                    {latestPosts.map(post => (
                        <Example_mag key={post.postID} post={post} />
                    ))}
                </H.FlexCol>
            </H.Sectin_G>
        </H.Magazine_Home>
    );
}

export default Magazine_Home;
