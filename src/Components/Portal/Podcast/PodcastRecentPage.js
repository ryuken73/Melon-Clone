import React from 'react';
import Box from '@mui/material/Box'
import CommonPageHeader from 'Components/Common/CommonPageHeader';
import {withRouter} from 'react-router-dom';
import TextBox from 'Components/Common/TextBox'; 
import useQueryPodcast from 'hooks/useQueryPodcast'
import createPodcasts from 'lib/podcastClass';
import PodcastList from 'Components/Portal/Podcast/PodcastList';
import {getString} from 'lib/util';

const getDateString = (dayBefore, sep='') => {
    const targetDate = new Date(new Date().getTime() + dayBefore*24*60*60*1000);
    return getString(targetDate, {dateSep:sep}).substring(0,10);
}

const PodcastRecentPage = props => {
    const {history} = props;
    const handleOnClick = React.useCallback(()=>{
        console.log('### history.location changed', history)
        history.push('/podcastProgram/onair')
    },[history])

    const queryOptions = {
        page_sizes: 30,
        query: `brad_day >= '${getDateString(-7, '-')}'`,
    }

    const {data, refetch, isLoading} = useQueryPodcast(queryOptions);
    const podcasts = createPodcasts(data);
    console.log('@@@', data, podcasts)

    const refresh = React.useCallback(()=>{
        refetch()
    },[refetch])

    return (

        <CommonPageHeader>
            {podcasts.length > 0 &&  (
                <Box display="flex" flexDisplay="row" alignItems="center" mb="5px">
                    <TextBox 
                        clickable
                        fontSize="20px" 
                        color="yellow" 
                        opacity="0.7" 
                        opacityOnHover="0.9" 
                        text="최신 팟캐스트 >"
                        onClick={handleOnClick}>
                    </TextBox>
                    <TextBox
                        clickable
                        fontSize="12px"
                        color="grey"
                        opacity="0.7"
                        opacityOnHover="0.9" 
                        text="새로고침" 
                        ml="20px"
                        onClick={refresh}
                    >
                    </TextBox>
                </Box>
            )}
           <PodcastList podcasts={podcasts}></PodcastList>
        </CommonPageHeader>
    )
}

export default React.memo(withRouter(PodcastRecentPage));

