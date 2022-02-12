import React from 'react';
import Box from '@mui/material/Box'
import CommonPageHeader from 'Components/Common/CommonPageHeader';
import {withRouter} from 'react-router-dom';
import TextBox from 'Components/Common/TextBox';
import AlbumListSwiper from './AlbumListSwiper';
import useQueryAlbums from 'hooks/useQueryAlbums';
import createAlbum from 'lib/albumClass';

const PAGE_NUM = 1;
const FETCH_COUNT = 15;

const AlbumListSwiperPage = props => {
    const {history} = props;
    const {data, refetch, isSuccess, isLoading} = useQueryAlbums(PAGE_NUM, FETCH_COUNT);
    const albums = React.useMemo(() => createAlbum(data),[data])
    const handleOnClick = React.useCallback(()=>{
        console.log('### history.location changed', history)
        history.push('/albumList/all')
    },[history.location])
    const refresh = React.useCallback(() => {
        refetch()
    },[refetch])
    return (
        <CommonPageHeader>
            {albums.length > 0 && (
                <Box display="flex" flexDisplay="row" alignItems="center">
                    <TextBox 
                        clickable
                        fontSize="20px" 
                        color="yellow" 
                        opacity="0.7" 
                        opacityOnHover="0.9" 
                        text="최신 앨범 >"
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
           <AlbumListSwiper history={history} albums={albums} isLoading={isLoading}></AlbumListSwiper>
        </CommonPageHeader>
    )
}

export default React.memo(withRouter(AlbumListSwiperPage));
