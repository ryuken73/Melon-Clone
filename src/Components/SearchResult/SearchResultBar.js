import React from 'react';
import Box from '@mui/material/Box';
import styled from 'styled-components';
import CommonPageHeader from 'Components/Common/CommonPageHeader';
import TextBox from 'Components/Common/TextBox';
import TextBoxHighlight from 'Components/Common/TextBoxHighlight';
import queryString from 'query-string';
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

const PATHS = {
    '통합검색': '/searchResult/all',
    '곡': '/searchResult/songs',
    '앨범': '/searchResult/albums',
    '아티스트': '/searchResult/artists',
    '가사': '/searchResult/lyrics'
}

const findPathKeyByCategory = category => {
    const index = Object.values(PATHS).findIndex(path => path.endsWith(category));
    return Object.keys(PATHS)[index] || '통합검색';
}

function SearchResultBar(props) {
    const {history, match, location} = props;
    const {category} = match.params;
    const query = queryString.parse(location.search);
    const {keyword, exactSearch, artistName, songName} = query;
    const [activeTab, setActiveTab] = React.useState('통합검색');
    React.useEffect(()=>{
        const tabname = findPathKeyByCategory(category)
        setActiveTab(tabname);
    },[category])
    console.log('&&&&:', category, keyword, exactSearch)
    const qs = exactSearch === 'yes' ?
               `exactSearch=${exactSearch}&keyword=${keyword}&artistName=${artistName}&songName=${songName}`:
               `exactSearch=${exactSearch}&keyword=${keyword}`

    const handleClick = React.useCallback(event => {
        const tabName = event.target.innerText;
        // setActiveTab(tabName);
        history.push(`${PATHS[tabName]}?${qs}`, {tabName, qs});
    },[history, qs])

    return (
        <Container>
            <CommonPageHeader>
                <SubContainer>
                    <TextBox 
                        fontSize="25px" 
                        color="white" 
                        opacity="0.7" 
                        opacityOnHover="0.7" 
                        cursor="auto"
                        text="검색">
                    </TextBox>
                    {Object.keys(PATHS).map(category => (
                        <TextBoxHighlight key={category} text={category} active={activeTab === category} onClick={handleClick}></TextBoxHighlight>
                    ))}
                </SubContainer>
            </CommonPageHeader>
        </Container>
    )
}

export default React.memo(withRouter(SearchResultBar));
