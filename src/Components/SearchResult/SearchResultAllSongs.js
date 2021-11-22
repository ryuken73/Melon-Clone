import React from 'react';
import Box from '@mui/material/Box';
import styled from 'styled-components';
import useSearchAllSongs from 'hooks/useSearchAllSongs';
import createSong from 'lib/songClass';
import CommonPageHeader from 'Components/Common/CommonPageHeader';
import SongListInSearchAll from 'Components/Song/SongListInSearchAll';
import TextBox from 'Components/Common/TextBox';
import {Switch, Route, withRouter} from 'react-router-dom';

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
    width: 350px;
    margin-bottom: 10px;
`

function SearchResultAllSongs(props) {
    const {history, match } = props;
    const {keyword} = match.params;
    const result = useSearchAllSongs(keyword);
    const songs = React.useMemo(() => createSong(result.data),[result.data]);
    const searchCount = result.isSuccess ? result.data.total : '...';
    const showAllResults = React.useCallback(() => {}, []);
    console.log('&&: in search all song:', result.data, songs)
    return (
        <Container>
            <CommonPageHeader>
                <SubContainer>
                    <TextBox 
                        fontSize="20px" 
                        color="white" 
                        opacity="0.7" 
                        opacityOnHover="0.7" 
                        onClick={showAllResults}
                        text={`곡(${searchCount}) >`}>
                    </TextBox>
                </SubContainer>
            </CommonPageHeader>
            <SongListInSearchAll songs={songs}></SongListInSearchAll>
        </Container>
    )
}

export default React.memo(withRouter(SearchResultAllSongs));