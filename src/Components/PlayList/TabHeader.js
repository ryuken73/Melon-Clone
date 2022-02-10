import React from 'react'
import Box from '@mui/material/Box';
import styled from 'styled-components';
import ButtonSmall from '../Common/ButtonSmall';
import TextBox from '../Common/TextBox';
import colors from 'config/colors';
import useCurrentPlaylist from 'hooks/useCurrentPlaylist';

const Container = styled(Box)`
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 12px;
    height: 45px;
`

const ButtonWrapper = styled(Box)`
    background: ${props => props.mode === 'flat' ? 'transparent' : 'black'};
    border-radius: 10px;
    margin: 2px;
`
const TabHeader = props => {
    const {
        activeTabId='song', 
        setActiveTabId=()=>{},
        mode
     } = props;
     const {currentPlaylist} = useCurrentPlaylist();

    const onClickTabHaderButton = React.useCallback(event => {
        setActiveTabId(event.currentTarget.id);
    },[setActiveTabId])
    const activeColor = mode === 'flat' ? 'darkred':colors.lightCenterPane;
    const textColor = 'white';
    return (
            <Container>
                <ButtonWrapper mode={mode}>
                    <ButtonSmall 
                        id='song' 
                        onClick={onClickTabHaderButton} 
                        background={activeTabId === 'song' ? activeColor:'transparent'} 
                        // hoverBackground={colors.highCenterPane}
                        hoverBackground="darkred"
                        fontSize='11px'
                    >
                        <TextBox color={textColor} text={`곡 ${currentPlaylist.length}`}></TextBox>
                    </ButtonSmall>
                    <ButtonSmall 
                        id='playlist' 
                        onClick={onClickTabHaderButton} 
                        background={activeTabId === 'playlist' ? activeColor:'transparent'} 
                        // hoverBackground={colors.highCenterPane}
                        hoverBackground="darkred"
                        fontSize='11px'
                    >
                        <TextBox color={textColor} text="플레이리스트"></TextBox>
                    </ButtonSmall>
                </ButtonWrapper>
            </Container>
    )
}

export default React.memo(TabHeader)
