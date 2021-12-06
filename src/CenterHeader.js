import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import {withRouter} from 'react-router-dom';
import styled from 'styled-components';
import path from 'path';
import ButtonSmall from './Components/Common/ButtonSmall';
import CenterHeaderNav from './CenterHeaderNav';
import AutoComplete from './Components/Common/AutoComplete';

const Container = styled(Box)`
    display: flex;
    padding: 5px;
    justify-content: flex-start;
    align-items: center;
    background: transparent;
    margin-bottom: 15px;
`
const views = [
    {id: 'portal', url:'/'},
    {id: 'album', url:'/album'},
    {id: 'song', url:'/song'},
    {id: 'artist', url:'/artist'},

]

const CenterHeader = props => {
    const {history} = props;
    const [historyPushedCount, setHistoryPushedCount] = React.useState(0);

    const handleClickButton = React.useCallback(event=>{
        history.push(path.join(event.target.id, historyPushedCount.toString()));
    },[history, historyPushedCount])

    const download = React.useCallback(() => {
    	window.DEXT5UPLOAD.DeleteSelectedFile("chrome_downloader");
        window.doStartDownload_chrome_show();
        window.DEXT5UPLOAD.AddUploadedFile('100', 'ryu.txt', '/ryu.txt', 1024, '', "chrome_downloader");
        window.DEXT5UPLOAD.SetSelectItem('-1', '1', 'chrome_downloader');
        window.DEXT5UPLOAD.DownloadAllFile("chrome_downloader");
    },[])

    return (
        <Container>
            <CenterHeaderNav historyPushedCount={historyPushedCount} setHistoryPushedCount={setHistoryPushedCount}></CenterHeaderNav>
            <AutoComplete></AutoComplete>
            <Button onClick={download}>download</Button>
            {/* {views.map(view => (
                <Box key={view.id} mx="2px">
                    <ButtonSmall id={view.url} background="grey" onClick={handleClickButton}>{view.id}</ButtonSmall>
                </Box>
            ))} */}
        </Container>
    )
}

export default withRouter(CenterHeader);
