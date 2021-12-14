import React from 'react'
import Box from '@mui/material/Box';
import styled from 'styled-components';
import TextBox from 'Components/Common/TextBox';
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
    const {artist_name, category} = match.params;
    const query = queryString.parse(location.search)
    const {sch_id} = query;

    const onClickSongList = React.useCallback(()=>{
        history.push(`/artist/${artist_name}/songList?sch_id=${sch_id}`);
    },[history, artist_name, sch_id])

    const onClickAlbumList = React.useCallback(()=>{
        history.push(`/artist/${artist_name}/albumList?sch_id=${sch_id}`);
    },[history, artist_name, sch_id])
    
    const onClickDetailInfo = React.useCallback(()=>{
        history.push(`/artist/${artist_name}/detailInfo?sch_id=${sch_id}`);
    },[history, artist_name, sch_id])

    return (
        <Container>
            <SubContainer width="150px">
                <TextBoxHighlight active={pathname.includes('songList')} onClick={onClickSongList} fontSize="15px" text="곡"></TextBoxHighlight>
                <TextBoxHighlight active={pathname.includes('albumList')} onClick={onClickAlbumList} fontSize="15px" text="앨범"></TextBoxHighlight>
                <TextBoxHighlight active={pathname.includes('detailInfo')} onClick={onClickDetailInfo} fontSize="15px" text="상세정보"></TextBoxHighlight>
            </SubContainer>
            <Divider margin="0px"></Divider>
        </Container>
    )
}

export default React.memo(withRouter(ArtistDetailTab))