import React from 'react'
import Box from '@mui/material/Box';
import styled from 'styled-components';
import ButtonSmall from '../Common/ButtonSmall';
import TextBox from '../Common/TextBox';
import colors from 'config/colors';

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
                    <ButtonSmall 
                        id='song' 
                        onClick={onClickTabHaderButton} 
                        background={activeTabId === 'song' ? colors.lightCenterPane:'transparent'} 
                        hoverBackground={colors.highCenterPane}
                        fontSize='11px'
                    >
                        <TextBox text="곡"></TextBox>
                    </ButtonSmall>
                    <ButtonSmall 
                        id='playlist' 
                        onClick={onClickTabHaderButton} 
                        background={activeTabId === 'playlist' ? colors.lightCenterPane:'transparent'} 
                        hoverBackground={colors.highCenterPane}
                        fontSize='11px'
                    >
                        <TextBox text="플레이리스트"></TextBox>
                    </ButtonSmall>
                </ButtonWrapper>
            </Container>
    )
}

export default React.memo(TabHeader)
