import React from 'react'
import Box from '@mui/material/Box';
import styled from 'styled-components';
import TextBox from '../Common/TextBox';
import TextBoxHighlight from '../Common/TextBoxHighlight';
import Divider from '../Common/Divider';

const Container = styled(Box)`
    display: flex;
    flex-direction: column;
    height: ${prop => prop.height || "auto"};
    width: ${prop => prop.width || "auto"};
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

const AlbumDetailTab = props => {
    const {history, location} = props;
    const {pathname} = location;
    const onClickSongList = React.useCallback(()=>{
        history.push('/album/144/songList');
    },[history.location])
    const onClickAlbumInfo = React.useCallback(()=>{
        history.push('/album/144/albumInfo');
    },[history.location])
    return (
        <Container>
            <SubContainer width="150px">
                <TextBoxHighlight active={pathname.includes('songList')} onClick={onClickSongList} fontSize="15px" text="수록곡"></TextBoxHighlight>
                <TextBoxHighlight active={pathname.includes('albumInfo')} onClick={onClickAlbumInfo} fontSize="15px" text="상세정보"></TextBoxHighlight>
            </SubContainer>
            <Divider margin="0px"></Divider>
        </Container>
    )
}

export default React.memo(AlbumDetailTab)