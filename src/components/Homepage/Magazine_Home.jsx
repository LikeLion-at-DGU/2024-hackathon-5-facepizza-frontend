import React from "react";
import * as H from '../../styles/HomeStyled';
import * as S from '../../styles/StyledComponents';

const Magazine_Home = () => {

    return (
        <H.AboutUs_Home>
            <H.ComponentName>
                <h2>인사이트 창고</h2>
            </H.ComponentName>
            <H.Sectin_G>
                <S.Blink to='/Magzine'>
                    <H.FlexRow>
                        <H.Example />
                        <H.Example />
                        {/* <H.Example /> */}
                    </H.FlexRow>
                </S.Blink>
            </H.Sectin_G>
        </H.AboutUs_Home>
    );
}

export default Magazine_Home;
