import React from 'react';
import TextBox from 'Components/Common/TextBox';
import {withRouter} from 'react-router-dom';

const LinkArtist = props => {
    const {artist} = props;
    const {history} = props;
    const onClick = React.useCallback(event=>{
        const artist = event.target.innerText;
        history.push(`/artist/${artist}/songList`)
    },[history])
    return (
        <TextBox text={artist} onClick={onClick}></TextBox>
    )
}

export default React.memo(withRouter(LinkArtist))