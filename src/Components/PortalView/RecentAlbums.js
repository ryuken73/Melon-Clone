import React from 'react';
import Box from '@mui/material/Box';
import styled from 'styled-components';
import {withRouter} from 'react-router-dom';
import TextBox from '../Common/TextBox';
import AlbumList from './AlbumList';

const Container = styled(Box)`
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    background: transparent;
    position: relative;
    margin-left: 20px;
    margin-right: 20px;
`

const albums = [
    {id:1, nameAlbum:'잊혀진 계절', nameArtist:'이용'},
    {id:2, nameAlbum:'유미의 세포들 OST Part8', nameArtist:'멜로망스'},
    {id:3, nameAlbum:'iScreaM Vol.11:Queendom Remix', nameArtist:'Red Velvet(레드벨벳)'},
    {id:4, nameAlbum:'iScreaM Vol.11:Queendom Remix', nameArtist:'Red Velvet(레드벨벳)'},
    {id:5, nameAlbum:'iScreaM Vol.11:Queendom Remix', nameArtist:'Red Velvet(레드벨벳)'},
    {id:6, nameAlbum:'iScreaM Vol.11:Queendom Remix', nameArtist:'Red Velvet(레드벨벳)'},
]

const RecentAlbums = props => {
    const {history} = props;
    const handleOnClick = React.useCallback(()=>{
        console.log('### history.location changed', history)
        history.push('/albumList')
    },[history.location])
    return (
        <Container>
            <TextBox 
                fontSize="20px" 
                color="white" 
                opacity="0.7" 
                opacityOnHover="0.9" 
                text="최신 앨범 >"
                onClick={handleOnClick}>
            </TextBox>
            <AlbumList albums={albums}></AlbumList>
        </Container>
    )
}

export default withRouter(RecentAlbums);
