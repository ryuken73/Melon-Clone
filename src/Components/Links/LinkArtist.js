import React from 'react';
import TextBox from 'Components/Common/TextBox';
import Box from '@mui/material/Box';
import {withRouter} from 'react-router-dom';
import useArtistId from 'hooks/useArtistId';

const LinkArtist = props => {
    const {artist='', matched} = props;
    const {history} = props;
    const artistsWithOneSeparator = artist.replace('&', ',');
    const artistsArray = artistsWithOneSeparator.split(',');
    const queryArtistIdBatch = useArtistId(artistsArray, matched);
    const onClick = React.useCallback(event=>{
        const queryArtistId = queryArtistIdBatch[parseInt(event.currentTarget.id)];
        queryArtistId.refetch()
        .then(result => {
            // console.log(result)
            if(result.isSuccess && result.data.list.length > 0){
                history.push(`/artist/${result.data.list[0].id}/songList`)
            } else {
                alert('artist not found');
                return;
            }
        })
    },[queryArtistIdBatch, history])
    return (
        <Box display="flex" alignItems="center">
            {artistsArray.map((artist, index) => (
                <Box display="flex">
                    <TextBox id={index} preserveHtmlTag text={artist} onClick={onClick}></TextBox>
                    {artistsArray.length > 1 && 
                     index !== artistsArray.length -1 && 
                    <TextBox text={","} cursor="auto"></TextBox>}
                </Box>
            ))}
        </Box>
    )
}

export default React.memo(withRouter(LinkArtist))