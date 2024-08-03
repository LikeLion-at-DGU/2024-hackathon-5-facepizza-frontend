import React from "react";
import * as H from '../../styles/HomeStyled';
import * as S from '../../styles/StyledComponents';

const Album_Home = () => {

    return (
        <H.Magazine_Home>
            <H.ComponentName>
                <h2>표정 앨범</h2>
            </H.ComponentName>
            <H.Sectin_G>
                <S.Blink to='/album'>
                    <H.FlexRow>
                        <H.Example />
                        <H.Example />
                        {/* <H.Example /> */}
                    </H.FlexRow>
                </S.Blink>
            </H.Sectin_G>
        </H.Magazine_Home>
    );
}

export default Album_Home;
