import React from 'react';
import styled from 'styled-components';
import Box from '@mui/material/Box';
import TextBox from 'Components/Common/TextBox';
import CommonPageHeader from 'Components/Common/CommonPageHeader';
import AnimatedNumber from 'Components/Common/AnimatedNumber';
import {getWeekDay} from 'lib/util';

const SubContainer = styled(Box)`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    margin-bottom: 10px;
`

const NumberContainer = styled(Box)`
    font-size: 20px;
    opacity: 0.7;
`

const ArchiveListTitle = props => {
    const {program={}, total=0} = props;
    const {
        pgm_nm,
        start_dd_with_weekday='-',
        end_dd_with_weekday='-',
        brd_time_str="-"
    } = program;
    return (
        <CommonPageHeader>
            <SubContainer>
                <TextBox 
                    fontSize="20px" 
                    color="white" 
                    opacity={"0.7"}
                    text={`${pgm_nm||'-'} (`}
                >
                </TextBox>
                <NumberContainer>
                    <AnimatedNumber from={0} to={total||0}></AnimatedNumber>
                </NumberContainer>
                <TextBox 
                    fontSize="20px" 
                    color="white" 
                    opacity={"0.7"}
                    text={`) >`}>
                </TextBox>
                <TextBox
                    ml="10px"
                    fontSize="14px"
                    text={`${start_dd_with_weekday} ~ ${end_dd_with_weekday}`}
                >
                </TextBox>
                <TextBox
                    ml="10px"
                    fontSize="14px"
                    text={brd_time_str}
                >
                </TextBox>
            </SubContainer>
        </CommonPageHeader>
    )
}

export default React.memo(ArchiveListTitle); 