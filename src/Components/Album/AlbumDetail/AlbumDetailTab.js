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
    const {history, location, match} = props;
    const {pathname} = location;
    const {receipt_no} = match.params;
    const onClickTab = React.useCallback(()=>{
        history.push(`/album/${receipt_no}/songList`);
    },[history.location])
    const onClickAlbumInfo = React.useCallback(()=>{
        history.push(`/album/${receipt_no}/albumInfo`);
    },[history.location])
    return (
        <Container>
            <SubContainer width="150px">
                <TextBoxHighlight active={pathname.includes('songList')} onClick={onClickTab} fontSize="15px" text="수록곡"></TextBoxHighlight>
                <TextBoxHighlight active={pathname.includes('albumInfo')} onClick={onClickAlbumInfo} fontSize="15px" text="상세정보"></TextBoxHighlight>
            </SubContainer>
            <Divider margin="0px"></Divider>
        </Container>
    )
}

export default React.memo(AlbumDetailTab)