import React from 'react'
import Box from '@mui/material/Box';
import styled from 'styled-components';
import {withRouter} from 'react-router-dom';
import TextBox from './Components/Common/TextBox';

const Container = styled(Box)`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    background: transparent;
    height: 100px;
    margin-top: 100px;
`
const SubTextBox = props => {
    const {text} = props;
    return (
        <TextBox 
            fontSize="14px" 
            color="white" 
            opacity="0.7" 
            opacityOnHover="0.9" 
            text={text}
            {...props}>
        </TextBox>
    )
}


const VerticalMenu = props => {
    const {history} = props;
    const onClickHome = React.useCallback(()=>{history.push('/')},[history.location])
    const onClickArchive = React.useCallback(()=>{history.push('/program/powerFM')},[history.location])

    return (
        <Container>
                <SubTextBox text="홈" onClick={onClickHome}></SubTextBox>
                <SubTextBox text="아카이브" onClick={onClickArchive}></SubTextBox>
                <SubTextBox text="팟캐스트" onClick={onClickHome}></SubTextBox>
        </Container>
    )
}

export default React.memo(withRouter(VerticalMenu))
