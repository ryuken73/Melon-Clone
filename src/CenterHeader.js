import React from 'react';
import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import {withRouter} from 'react-router-dom';
import styled from 'styled-components';
import CenterHeaderNav from './CenterHeaderNav';
import AutoComplete from './Components/Common/AutoComplete';
import TextBox from 'Components/Common/TextBox';
import HoverButton from 'Components/Common/ButtonHover';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import useMediaQueryEasy from 'hooks/useMediaQueryEasy';
import useAppState from 'hooks/useAppState';
import useQueryLogout from 'hooks/useQueryLogout';
import useSessionStorage from 'hooks/useSessionStorage';
import useLocalStorage from 'hooks/useLocalStorage';
import colors from 'config/colors';

const Container = styled(Box)`
    display: flex;
    padding: 5px;
    justify-content: flex-start;
    align-items: center;
    background: transparent;
    margin-bottom: 15px;
`
const StyledMenu = styled(Menu)`
    .MuiPaper-root {
        background: ${colors.highCenterPane};
        ul {
            li.MuiMenuItem-root {
                color: white;
                font-size: 12px;
            }
        }
    }
`
const OutlinedText = styled(Box)`
    color: white;
    font-weight: bold;
    /* -webkit-text-stroke-width: 2px; */
    /* -webkit-text-stroke-color: white; */
    font-size: 20px;
    opacity: 0.9;
    cursor: pointer;
`
const CustomTextBox = styled(TextBox)`
    margin-left: 10px;
    margin-right: 10px;
    font-weight: bold;
    font-size: 14px;
`

const CenterHeader = props => {
    const {history} = props;
    const {loginId, saveLoginId} = useAppState();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const [historyPushedCount, setHistoryPushedCount] = React.useState(0);
    const [lastUserInSessionStg, storeInSessionStorage] = useSessionStorage('login', null);
    const [lastUserInLocalStg, storeInLocalStorage] = useLocalStorage('lastUserId', null);
    const {hideRightPane} = useMediaQueryEasy();
    const {searchResultPath} = useAppState();
    const {refetch: logout} = useQueryLogout();
    const onClickMenu = React.useCallback(event => {
        setAnchorEl(event.currentTarget)
    },[])
    const onClickTitle = React.useCallback(event => {
        history.push('/');
    },[history])
    const handleClose = React.useCallback(event => {
        const category = event.target.id;
        category === 'home' && history.push('/');
        category === 'archive' && history.push('/program/powerFM');
        category === 'podcast' && history.push('/podcastProgram/onair');
        setAnchorEl(null);
    },[history])
    const onClickLogout = React.useCallback(()=>{
        logout();
        storeInLocalStorage(null);
        storeInSessionStorage(null);
        saveLoginId(null);
        history.push('/');
    },[logout, storeInLocalStorage, storeInSessionStorage, saveLoginId, history])
    return (
        <Container>
            <HoverButton 
                id="basic-button"
                aria-controls="basic-menu"
                aria-haspopup="true"
                aria-expanded={open ? 'true':undefined}
                onClick={onClickMenu} 
                opacitynormal='1' 
                opacityhover='1' 
                disabled={!hideRightPane}
            >
                <MenuIcon></MenuIcon>
            </HoverButton>
            <StyledMenu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button'
                }}
            >
                <MenuItem id="home" onClick={handleClose}>홈</MenuItem>
                <MenuItem id="archive" onClick={handleClose}>아카이브</MenuItem>
                <MenuItem id="podcast" onClick={handleClose}>팟캐스트</MenuItem> 
            </StyledMenu>
            <OutlinedText onClick={onClickTitle}>MUSICKBANK</OutlinedText>
            <CenterHeaderNav historyPushedCount={historyPushedCount} setHistoryPushedCount={setHistoryPushedCount}></CenterHeaderNav>
            <AutoComplete searchResultPath={searchResultPath}></AutoComplete>
            <Box ml="auto" display="flex" flextDirection="row" alignItems="center">
                <HoverButton>
                    <AccountCircleIcon></AccountCircleIcon>
                    <CustomTextBox text={loginId}></CustomTextBox>
                    <CustomTextBox clickable onClick={onClickLogout} opacity="0.9" text={"로그아웃"}></CustomTextBox>
                </HoverButton>
            </Box>
        </Container>
    )
}

export default React.memo(withRouter(CenterHeader));