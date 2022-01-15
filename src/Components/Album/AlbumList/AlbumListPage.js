import React from 'react';
import Box from '@mui/material/Box';
import styled from 'styled-components';
import CommonPageHeader from 'Components/Common/CommonPageHeader';
import {Switch, Route, withRouter} from 'react-router-dom';
import TextBox from 'Components/Common/TextBox';
import TextBoxHighlight from 'Components/Common/TextBoxHighlight';
import AlbumList from './AlbumList';

// import AlbumList from './AlbumList';
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
    '종합': '/albumList/all',
    '가요': '/albumList/kpop',
    '팝송': '/albumList/pop',
    '클래식': '/albumList/classic',
    '기타': '/albumList/etc'
}

const findPathKeyByUrl = url => {
    const index = Object.values(PATHS).findIndex(path => path === url);
    return Object.keys(PATHS)[index] || '종합';
}

const AlbumListPage = props => {
    const {history} = props;
    const [activeTab, setActiveTab] = React.useState('종합');
    React.useEffect(()=>{
        const {pathname} = history.location;
        const tabName = findPathKeyByUrl(pathname);
        setActiveTab(tabName);
    },[history.location])

    const handleClick = React.useCallback(event => {
        const tabName = event.target.innerText;
        setActiveTab(tabName);
        history.push(PATHS[tabName], {tabName});
    },[history, setActiveTab])

    return (
        <Container>
            <CommonPageHeader>
                <SubContainer>
                    <TextBox 
                        fontSize="20px" 
                        color="white" 
                        opacity="0.7" 
                        opacityOnHover="0.7" 
                        text="최신 앨범">
                    </TextBox>
                    {Object.keys(PATHS).map(category => (
                        <TextBoxHighlight clickable key={category} text={category} active={activeTab === category} onClick={handleClick}></TextBoxHighlight>
                    ))}
                </SubContainer>
                <Switch>
                    <Route path="/albumList/:category?" render={(routerProps)=> <AlbumList {...routerProps} />}>
                    </Route>
                </Switch>
            </CommonPageHeader>
        </Container>

    )
}

export default React.memo(withRouter(AlbumListPage));