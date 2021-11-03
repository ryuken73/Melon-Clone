import React from 'react';
import CommonPageHeader from 'Components/Common/CommonPageHeader';
import {withRouter} from 'react-router-dom';
import TextBox from 'Components/Common/TextBox';
import AlbumListSwiper from './AlbumListSwiper';

const AlbumListSwiperPage = props => {
    const {history} = props;
    const handleOnClick = React.useCallback(()=>{
        console.log('### history.location changed', history)
        history.push('/albumList/all')
    },[history.location])
    return (
        <CommonPageHeader>
            <TextBox 
                fontSize="20px" 
                color="white" 
                opacity="0.7" 
                opacityOnHover="0.9" 
                text="최신 앨범 >"
                onClick={handleOnClick}>
            </TextBox>
            <AlbumListSwiper history={history}></AlbumListSwiper>
        </CommonPageHeader>
    )
}

export default React.memo(withRouter(AlbumListSwiperPage));
