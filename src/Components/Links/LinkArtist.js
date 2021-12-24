import React from 'react';
import TextBox from 'Components/Common/TextBox';
import Box from '@mui/material/Box';
import {withRouter} from 'react-router-dom';
import useArtistId from 'hooks/useArtistId';
import useMessageBox from 'hooks/useMessageBox';

const LinkArtist = props => {
    const {artist='', matched} = props;
    const {history} = props;
    const {showMessageBox} = useMessageBox();
    const artistsWithOneSeparator = artist.replace('&', ',');
    const artistsArray = artistsWithOneSeparator.split(',');
    const queryArtistIdBatch = useArtistId(artistsArray, matched);
    const onClick = React.useCallback(event=>{
        const queryArtistId = queryArtistIdBatch[parseInt(event.currentTarget.id)];
        queryArtistId.refetch()
        .then(result => {
            console.log(result)
            if(result.isSuccess && result.data.list.length > 0){
                const sch_artist = result.data.list[0].artist;
                const sch_id = result.data.list[0].id;
                const encodedArtist = encodeURIComponent(sch_artist);
                history.push(`/artist/${encodedArtist}/songList?sch_id=${sch_id}`)
            } else {
                // alert('등록된 아티스트가 없습니다.');
                showMessageBox('등록된 아티스트가 없습니다.', 1000, 'error')
                return;
            }
        })
    },[queryArtistIdBatch, history, showMessageBox])
    return (
        <Box display="flex" alignItems="center">
            {artistsArray.map((artist, index) => (
                <Box key={index} display="flex" flexShrink={index<5 && "0"}>
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