import React from 'react'
import Box from '@mui/material/Box';
import styled from 'styled-components';
import TextBox from 'Components/Common/TextBox';
import TextBoxHighlight from 'Components/Common/TextBoxHighlight';
import Divider from 'Components/Common/Divider';

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
    const {artist_id=1} = match.params;

    const onClickSongList = React.useCallback(()=>{
        history.push(`/artist/${artist_id}/songList`);
    },[history.location])

    const onClickAlbumList = React.useCallback(()=>{
        history.push(`/artist/${artist_id}/all`);
    },[history.location])
    
    return (
        <Container>
            <SubContainer width="80px">
                <TextBoxHighlight active={pathname.includes('songList')} onClick={onClickSongList} fontSize="15px" text="곡"></TextBoxHighlight>
                <TextBoxHighlight active={pathname.includes('albumList')} onClick={onClickAlbumList} fontSize="15px" text="앨범"></TextBoxHighlight>
            </SubContainer>
            <Divider margin="0px"></Divider>
        </Container>
    )
}

export default React.memo(ArtistDetailTab)