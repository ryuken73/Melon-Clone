import React from 'react'
import Box from '@mui/material/Box';
import styled from 'styled-components';
import TextBoxHighlight from 'Components/Common/TextBoxHighlight';
import Divider from 'Components/Common/Divider';
import queryString from 'query-string';
import {withRouter} from 'react-router-dom';

const Container = styled(Box)`
    display: flex;
    flex-direction: column;
    height: ${prop => prop.height || "auto"};
    width: ${prop => prop.width || "auto"};
    margin-right: 10px;
`
const SubContainer = styled(Box)`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    height: ${prop => prop.height || "auto"};
    width: ${prop => prop.width || "auto"};
    margin-top: 20px;
    margin-bottom: 10px;
`

const ArtistDetailTab = props => {
    const {history, location, match} = props;
    const {pathname} = location;
    const {artist_name} = match.params;
    const query = queryString.parse(location.search)
    const {sch_id} = query;

    const onClickSongList = React.useCallback(()=>{
        const encodedArtist = encodeURIComponent(artist_name);
        history.push(`/artist/${encodedArtist}/songList?sch_id=${sch_id}`);
    },[history, artist_name, sch_id])

    const onClickAlbumList = React.useCallback(()=>{
        const encodedArtist = encodeURIComponent(artist_name);
        history.push(`/artist/${encodedArtist}/albumList?sch_id=${sch_id}`);
    },[history, artist_name, sch_id])
    
    return (
        <Container>
            <SubContainer width="80px">
                <TextBoxHighlight clickable active={pathname.includes('songList')} onClick={onClickSongList} fontSize="15px" text="곡"></TextBoxHighlight>
                <TextBoxHighlight clickable active={pathname.includes('albumList')} onClick={onClickAlbumList} fontSize="15px" text="앨범"></TextBoxHighlight>
            </SubContainer>
            <Divider margin="0px"></Divider>
        </Container>
    )
}

export default React.memo(withRouter(ArtistDetailTab))