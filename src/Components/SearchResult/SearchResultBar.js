import React from 'react';
import Box from '@mui/material/Box';
import styled from 'styled-components';
import CommonPageHeader from 'Components/Common/CommonPageHeader';
import TextBox from 'Components/Common/TextBox';
import TextBoxHighlight from 'Components/Common/TextBoxHighlight';
import PushPinIcon from '@mui/icons-material/PushPin';
import queryString from 'query-string';
import {qsToNavigateInSearchResult} from 'lib/util';
import {withRouter} from 'react-router-dom';
import useAppState from 'hooks/useAppState';
import useMessageBox from 'hooks/useMessageBox';

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
    width: 500px;
    margin-bottom: 10px;
`
const GreyPushPinIcon = styled(PushPinIcon)`
    color: gold;
    opacity: ${props => props.show ? 0.7 : 0};
    font-size: 15px;
    margin-left: 2px;
    &:hover {
        opacity: 1;
        cursor: pointer;
        color: grey;
    }
`

const PATHS = {
    '통합검색': '/searchResult/all',
    '곡': '/searchResult/songs',
    '앨범': '/searchResult/albums',
    '아티스트': '/searchResult/artists',
    '가사': '/searchResult/lyrics',
    '아카이브': '/searchResult/archives'
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
    const {searchResultPath, toggleResultPath} = useAppState();
    const {showMessageBox} = useMessageBox();
    React.useEffect(()=>{
        const tabname = findPathKeyByCategory(category)
        setActiveTab(tabname);
    },[category])
    console.log('&&&&:', category, keyword, exactSearch)
    const qs = qsToNavigateInSearchResult(query)

    const handleClick = React.useCallback(event => {
        const tabName = event.target.innerText;
        // setActiveTab(tabName);
        history.push(`${PATHS[tabName]}?${qs}`, {tabName, qs});
    },[history, qs])

    const PinIcon = props => {
        const {qs, path, pathString, toggleResultPath, history, ...rest} = props
        const setDefaultPath = React.useCallback(event => {
            toggleResultPath(path);
            history.push(`${path}?${qs}`, {path, qs});
            showMessageBox(`검색결과를 ${pathString}기준으로 먼저 표시합니다.`, 2000)
        },[toggleResultPath, path, pathString, qs, history])
        return (
            <GreyPushPinIcon 
                onClick={setDefaultPath} 
                {...rest}
            ></GreyPushPinIcon>
        )
    }

    return (
        <Container>
            <CommonPageHeader>
                <SubContainer>
                    <TextBox 
                        fontSize="25px" 
                        color="white" 
                        opacity="0.7" 
                        opacityOnHover="0.7" 
                        text="검색">
                    </TextBox>
                    {Object.keys(PATHS).map(category => (
                        <Box key={category} display="flex" flexDirection="row" alignItems="center">
                            <TextBoxHighlight clickable text={category} active={activeTab === category} onClick={handleClick}></TextBoxHighlight>
                            <PinIcon
                                qs={qs}
                                show={searchResultPath === PATHS[category]} 
                                path={PATHS[category]} 
                                pathString={category}
                                fontSize="15px"
                                history={history}
                                toggleResultPath={toggleResultPath}
                            ></PinIcon>
                            {/* <GreyPushPinIcon 
                                show={searchResultPath === PATHS[category]} 
                                id={PATHS[category]} 
                                onClick={setDefaultPath} 
                            ></GreyPushPinIcon> */}
                        </Box>
                    ))}
                </SubContainer>
            </CommonPageHeader>
        </Container>
    )
}

export default React.memo(withRouter(SearchResultBar));
