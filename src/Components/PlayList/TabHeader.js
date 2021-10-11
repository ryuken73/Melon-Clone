import React from 'react'
import Box from '@mui/material/Box';
import styled from 'styled-components';
import colors from '../../config/colors';
import SmallButton from '../Common/SmallButton';
import TextBox from '../Common/TextBox';

const Container = styled(Box)`
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 12px;
    height: 45px;
`

const ButtonWrapper = styled(Box)`
    background: ${props => props.background || 'black'};
    border-radius: 10px;
    margin: 2px;
`



const TabHeader = props => {
    const {
        activeTabId='song', 
        setActiveTabId=()=>{}
     } = props;

    const onClickTabHaderButton = React.useCallback(event => {
        setActiveTabId(event.currentTarget.id);
    },[])
    return (
            <Container>
                <ButtonWrapper>
                    <SmallButton 
                        id='song' 
                        onClick={onClickTabHaderButton} 
                        background={activeTabId === 'song' && colors.centerPane} 
                        fontsize='11px'
                    >
                        <TextBox text="곡"></TextBox>
                    </SmallButton>
                    <SmallButton 
                        id='playlist' 
                        onClick={onClickTabHaderButton} 
                        background={activeTabId === 'playlist' && colors.centerPane} 
                        fontsize='11px'
                    >
                        <TextBox text="플레이리스트"></TextBox>
                    </SmallButton>
                </ButtonWrapper>
            </Container>
    )
}

export default TabHeader
