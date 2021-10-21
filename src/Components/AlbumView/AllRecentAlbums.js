import React from 'react';
import Box from '@mui/material/Box';
import styled from 'styled-components';
import CommonPageHeader from '../Common/CommonPageHeader';
import {Switch, Route, withRouter} from 'react-router-dom';
import TextBox from '../Common/TextBox';
import AllAlbumList from './AllAlbumList';
// import AlbumList from './AlbumList';

const SubContainer = styled(Box)`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: baseline;
    width: 260px;
`
const SubTextBox = props => {
    const {text} = props;
    return (
        <TextBox 
            fontSize="14px" 
            color="yellow" 
            opacity="0.7" 
            opacityOnHover="0.9" 
            text={text}
            {...props}>
        </TextBox>
    )
}

const AlbumList = props => {
    const {match} = props;
    console.log(props)
    return (
        <TextBox 
            fontSize="14px" 
            color="yellow" 
            opacity="0.7" 
            opacityOnHover="0.9" 
            text={match.params.area}>
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

const AllRecentAlbums = props => {
    const {history} = props;
    const onClickAll = React.useCallback(()=>{history.push('/albumList/all')},[history.location])
    const onClickDomestic = React.useCallback(()=>{history.push('/albumList/domestic')},[history.location])
    const onClickOverseas = React.useCallback(()=>{history.push('/albumList/overseas')},[history.location])
    return (
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
                <SubTextBox text="전체" onClick={onClickAll}></SubTextBox>
                <SubTextBox text="국내" onClick={onClickDomestic}></SubTextBox>
                <SubTextBox text="해외" onClick={onClickOverseas}></SubTextBox>
            </SubContainer>
            <Switch>
                <Route path="/albumList/:area?" render={(routerProps)=> <AllAlbumList albums={albums} {...routerProps} />}>
                </Route>
            </Switch>
            {/* <AlbumList albums={albums}></AlbumList> */}
        </CommonPageHeader>
    )
}

export default React.memo(withRouter(AllRecentAlbums));