import React from 'react';
import Box from '@mui/material/Box';
import styled from 'styled-components';
import CommonPageHeader from '../Common/CommonPageHeader';
import {Switch, Route, withRouter} from 'react-router-dom';
import TextBox from '../Common/TextBox';
import AlbumList from './AlbumList';
// import AlbumList from './AlbumList';

const Container = styled(Box)`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    background: transparent;
`

const SubContainer = styled(Box)`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: baseline;
    width: 260px;
    margin-bottom: 10px;
`
const SubTextBox = props => {
    const {text, active} = props;
    const opacity = active === true ? "1" : "0.7";
    return (
        <TextBox 
            fontSize="14px" 
            color="yellow" 
            opacity={opacity}
            opacityOnHover="0.9" 
            text={text}
            {...props}>
        </TextBox>
    )
}

const albums = [
    {id:1, nameAlbum:'잊혀진 계절', nameArtist:'이용'},
    {id:2, nameAlbum:'유미의 세포들 OST Part8', nameArtist:'멜로망스'},
    {id:3, nameAlbum:'iScreaM Vol.11:Queendom Remix', nameArtist:'Red Velvet(레드벨벳)'},
    {id:4, nameAlbum:'iScreaM Vol.11:Queendom Remix', nameArtist:'Red Velvet(레드벨벳)'},
    {id:5, nameAlbum:'iScreaM Vol.11:Queendom Remix', nameArtist:'Red Velvet(레드벨벳)'},
    {id:6, nameAlbum:'iScreaM Vol.11:Queendom Remix', nameArtist:'Red Velvet(레드벨벳)'},
    {id:7, nameAlbum:'iScreaM Vol.11:Queendom Remix', nameArtist:'Red Velvet(레드벨벳)'},
    {id:8, nameAlbum:'iScreaM Vol.11:Queendom Remix', nameArtist:'Red Velvet(레드벨벳)'},
    {id:9, nameAlbum:'iScreaM Vol.11:Queendom Remix', nameArtist:'Red Velvet(레드벨벳)'},
    {id:10, nameAlbum:'iScreaM Vol.11:Queendom Remix', nameArtist:'Red Velvet(레드벨벳)'},
]

const paths = {
    all: '/albumList/all',
    domestic: '/albumList/domestic',
    overseas: '/albumList/overseas'
}

const AlbumListPage = props => {
    const {history, location} = props;
    const {pathname='/albumList/all'} = location;
    console.log(location)

    const onClickAll = React.useCallback(()=>{history.push(paths['all'])},[history.location])
    const onClickDomestic = React.useCallback(()=>{history.push(paths['domestic'])},[history.location])
    const onClickOverseas = React.useCallback(()=>{history.push(paths['overseas'])},[history.location])
    return (
        <Container>
            <CommonPageHeader>
                <SubContainer>
                    <TextBox 
                        fontSize="20px" 
                        color="white" 
                        opacity="0.7" 
                        opacityOnHover="0.7" 
                        cursor="auto"
                        text="최신 앨범">
                    </TextBox>
                    <SubTextBox text="전체" active={pathname === paths['all']} onClick={onClickAll}></SubTextBox>
                    <SubTextBox text="국내" active={pathname === paths['domestic']} onClick={onClickDomestic}></SubTextBox>
                    <SubTextBox text="해외" active={pathname === paths['overseas']} onClick={onClickOverseas}></SubTextBox>
                </SubContainer>
                <Switch>
                    <Route path="/albumList/:area?" render={(routerProps)=> <AlbumList albums={albums} {...routerProps} />}>
                    </Route>
                </Switch>
            </CommonPageHeader>
        </Container>

    )
}

export default React.memo(withRouter(AlbumListPage));