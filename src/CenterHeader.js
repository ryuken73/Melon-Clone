import React from 'react';
import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import {withRouter} from 'react-router-dom';
import styled from 'styled-components';
import CenterHeaderNav from './CenterHeaderNav';
import AutoComplete from './Components/Common/AutoComplete';
import HoverButton from 'Components/Common/ButtonHover';
import MenuIcon from '@mui/icons-material/Menu';
import useMediaQueryEasy from 'hooks/useMediaQueryEasy';
import useAppState from 'hooks/useAppState';
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
    }
`
const CenterHeader = props => {
    const {history} = props;
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const [historyPushedCount, setHistoryPushedCount] = React.useState(0);
    const {hideRightPane} = useMediaQueryEasy();
    const {searchResultPath} = useAppState();
    const onClickMenu = React.useCallback(event => {
        setAnchorEl(event.currentTarget)
    },[])
    const handleClose = React.useCallback(event => {
        const category = event.target.id;
        category === 'home' && history.push('/');
        category === 'archive' && history.push('/program/powerFM');
        category === 'podcast' && history.push('/podcastProgram/onair');
        setAnchorEl(null);
    },[history])

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
            <CenterHeaderNav historyPushedCount={historyPushedCount} setHistoryPushedCount={setHistoryPushedCount}></CenterHeaderNav>
            <AutoComplete searchResultPath={searchResultPath}></AutoComplete>
        </Container>
    )
}

export default React.memo(withRouter(CenterHeader));