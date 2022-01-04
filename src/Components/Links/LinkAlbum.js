import React from 'react'
import TextBox from 'Components/Common/TextBox';
import {withRouter} from 'react-router-dom';

const LinkAlbum = props => {
    const {history} = props;
    const {album_name, receipt_no, preserveHtmlTag=true} = props;
    const onClick = React.useCallback(()=>{
        history.push(`/album/${receipt_no}/songList`, {receipt_no})
    },[history, receipt_no])
    return (
        <TextBox 
            fontSize="14px" 
            color="darkgrey" 
            opacity="0.7" 
            opacityOnHover="0.9"
            text={album_name}
            preserveHtmlTag={preserveHtmlTag}
            onClick={onClick}
        >
        </TextBox>
    )
}

export default React.memo(withRouter(LinkAlbum))
