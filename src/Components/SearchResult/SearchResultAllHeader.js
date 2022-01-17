import React from 'react';
import Box from '@mui/material/Box';
import styled from 'styled-components';
import TextBox from 'Components/Common/TextBox';
import CommonPageHeader from 'Components/Common/CommonPageHeader';
import AnimatedNumber from 'Components/Common/AnimatedNumber';

const SubContainer = styled(Box)`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: baseline;
    width: 350px;
    margin-bottom: 10px;
    cursor: pointer;
`

const NumberContainer = styled(Box)`
    font-size: 20px;
    color: yellow;
    opacity: ${props => props.searchCount === 0 ? "0.2": "0.7"};
`
const categoryMap = {
    'album': '앨범',
    'song': '곡',
    'artist': '아티스트',
    'lyrics': '가사',
    'archives': '아카이브'
}

function SearchResultAllHeader(props) {
    const {category, searchCount, showAllResults} = props;
    return (
        <CommonPageHeader>
            <SubContainer onClick={showAllResults}>
                <TextBox 
                    fontSize="20px" 
                    color="yellow" 
                    opacity={searchCount === 0 ? "0.2":"0.7"}
                    opacityOnHover={searchCount === 0 ? "0.2":"0.9"}
                    
                    text={`${categoryMap[category]}(`}>
                </TextBox>
                <NumberContainer searchCount={searchCount}>
                    <AnimatedNumber from={0} to={searchCount}></AnimatedNumber>
                </NumberContainer>
                <TextBox 
                    fontSize="20px" 
                    color="yellow" 
                    opacity={searchCount === 0 ? "0.2":"0.7"}
                    opacityOnHover={searchCount === 0 ? "0.2":"0.9"}
                    text={`) >`}>
                </TextBox>
            </SubContainer>
        </CommonPageHeader>
    )
}

export default React.memo(SearchResultAllHeader);
