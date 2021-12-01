import React from 'react';
import TextBox from 'Components/Common/TextBox';
import {withRouter} from 'react-router-dom';
import useArtistId from 'hooks/useArtistId';

const LinkArtist = props => {
    const {artist} = props;
    const {history} = props;
    const [hasArtistId, setHasArtistId] = React.useState(false);
    const {isSuccess, data} = useArtistId(artist);
    React.useEffect(() => {
        data?.list?.length > 0 && setHasArtistId(true);
    },[data])
    const onClick = React.useCallback(event=>{
        if(!hasArtistId){
            alert('artist not found');
            return;
        }
        const artist = event.target.innerText;
        history.push(`/artist/${artist}/songList`)
    },[history, hasArtistId])
    return (
        <TextBox preserveHtmlTag text={artist} onClick={onClick}></TextBox>
    )
}

export default React.memo(withRouter(LinkArtist))