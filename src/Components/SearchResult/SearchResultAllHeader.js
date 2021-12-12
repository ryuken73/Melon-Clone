import React from 'react';
import Box from '@mui/material/Box';
import styled from 'styled-components';
import TextBox from 'Components/Common/TextBox';
import CommonPageHeader from 'Components/Common/CommonPageHeader';

const SubContainer = styled(Box)`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: baseline;
    width: 350px;
    margin-bottom: 10px;
`
const categoryMap = {
    'album': '앨범',
    'song': '곡',
    'artist': '아티스트',
    'lyrics': '가사',
}

function SearchResultAllHeader(props) {
    const {category, searchCount, showAllResults} = props;
    return (
        <CommonPageHeader>
            <SubContainer>
                <TextBox 
                    fontSize="20px" 
                    color="white" 
                    opacity={searchCount === 0 ? "0.2":"0.7"}
                    opacityOnHover={searchCount === 0 ? "0.2":"0.9"}
                    onClick={showAllResults}
                    text={`${categoryMap[category]}(${searchCount}) >`}>
                </TextBox>
            </SubContainer>
        </CommonPageHeader>
    )
}

export default React.memo(SearchResultAllHeader);
