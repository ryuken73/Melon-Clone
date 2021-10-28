import React from 'react';
import Box from '@mui/material/Box';
import styled from 'styled-components';
import CommonPageHeader from '../Common/CommonPageHeader';
import {Switch, Route, withRouter} from 'react-router-dom';
import TextBox from '../Common/TextBox';
import TextBoxHighlight from '../Common/TextBoxHighlight';
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
const paths = {
    all: '/albumList/all',
    kpop: '/albumList/kpop',
    pop: '/albumList/pop',
    classic: '/albumList/classic',
    etc: '/albumList/etc'
}

const AlbumListPage = props => {
    const {history, location} = props;
    const {pathname='/albumList/all'} = location;
    const onClickAll = React.useCallback(()=>{history.push(paths['all'])},[history.location])
    const onClickKpop = React.useCallback(()=>{history.push(paths['kpop'])},[history.location])
    const onClickPop = React.useCallback(()=>{history.push(paths['pop'])},[history.location])
    const onClickClassic = React.useCallback(()=>{history.push(paths['classic'])},[history.location])
    const onClickEtc = React.useCallback(()=>{history.push(paths['etc'])},[history.location])
    return (
        <Container>
            <CommonPageHeader>
                <SubContainer>
                    <TextBox 
                        fontSize="20px" 
                        color="white" 
                        opacity="0.7" 
                        opacityOnHover="0.7" 
                        cursor="auto"
                        text="최신 앨범">
                    </TextBox>
                    <TextBoxHighlight text="종합" active={pathname === paths['all']} onClick={onClickAll}></TextBoxHighlight>
                    <TextBoxHighlight text="가요" active={pathname === paths['kpop']} onClick={onClickKpop}></TextBoxHighlight>
                    <TextBoxHighlight text="팝송" active={pathname === paths['pop']} onClick={onClickPop}></TextBoxHighlight>
                    <TextBoxHighlight text="클래식" active={pathname === paths['classic']} onClick={onClickClassic}></TextBoxHighlight>
                    <TextBoxHighlight text="기타" active={pathname === paths['etc']} onClick={onClickEtc}></TextBoxHighlight>
                </SubContainer>
                <Switch>
                    <Route path="/albumList/:area?" render={(routerProps)=> <AlbumList {...routerProps} />}>
                    </Route>
                </Switch>
            </CommonPageHeader>
        </Container>

    )
}

export default React.memo(withRouter(AlbumListPage));