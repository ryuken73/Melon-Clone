import React from 'react';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';
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
    const {history} = props;
    const {program={}, total=0, chan_cd_full='', chan_cd} = props;
    const {
        pgm_nm,
        start_dd_with_weekday='-',
        end_dd_with_weekday='-',
        brd_time_str="-"
    } = program;
    const handleOnClickChannel = React.useCallback(() => {
        chan_cd === 'A' && history.push(`/program/loveFM`, {chan_cd})
        chan_cd === 'F' && history.push(`/program/powerFM`, {chan_cd})
    },[chan_cd, history])
    return (
        <CommonPageHeader>
            <SubContainer>
                <TextBox
                    clickable
                    fontSize="20px" 
                    color={chan_cd === 'A' ?'burlywood':'lightskyblue'}
                    opacity={"0.7"}
                    text={`[${chan_cd_full}] `}
                    onClick={handleOnClickChannel}
                >

                </TextBox>
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

export default React.memo(withRouter(ArchiveListTitle)); 