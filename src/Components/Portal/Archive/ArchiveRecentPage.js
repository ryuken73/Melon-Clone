import React from 'react';
import CommonPageHeader from 'Components/Common/CommonPageHeader';
import {withRouter} from 'react-router-dom';
import TextBox from 'Components/Common/TextBox'; 
import ArchiveList from 'Components/Portal/Archive/ArchiveList';

const ArchiveRecentPage = props => {
    const {history} = props;
    const handleOnClick = React.useCallback(()=>{
        console.log('### history.location changed', history)
        history.push('/archive')
    },[history.location])
    return (
        <CommonPageHeader>
            <TextBox 
                fontSize="20px" 
                color="white" 
                opacity="0.7" 
                opacityOnHover="0.9" 
                text="최신 아카이브 >"
                onClick={handleOnClick}>
            </TextBox>
            <ArchiveList></ArchiveList>
        </CommonPageHeader>
    )
}

export default React.memo(withRouter(ArchiveRecentPage));
