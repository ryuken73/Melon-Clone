import React from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import styled from 'styled-components';
import colors from '../../config/colors';

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

const SmallButton = styled(Button)`
    && {
        color: white;
        font-size: ${props => props.fontsize || '10px'};
        background: ${props => props.background || 'transparent'};
        border-radius: 10px;
        &:hover {
            background:${props => props.background || 'transparent'};
        }
    }
`

const TabHeader = props => {
    const {
        activeTabId='song', 
        setActiveTabId=()=>{}
     } = props;

    const onClickTabHaderButton = React.useCallback(event => {
        setActiveTabId(event.target.id);
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
                        곡
                    </SmallButton>
                    <SmallButton 
                        id='playlist' 
                        onClick={onClickTabHaderButton} 
                        background={activeTabId === 'playlist' && colors.centerPane} 
                        fontsize='11px'
                    >
                        플레이리스트
                    </SmallButton>
                </ButtonWrapper>
            </Container>
    )
}

export default TabHeader
