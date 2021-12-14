import React from 'react'
import Box from '@mui/material/Box';
import styled from 'styled-components';
import colors from 'config/colors';
import ButtonIcon from 'Components/Common/ButtonIcon';
import TextBox from 'Components/Common/TextBox';
import CheckIcon from '@mui/icons-material/Check';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SongListInAlbumDetail from 'Components/Song/SongListInAlbumDetail';
import SongListInSearchAll from 'Components/Song/SongListInSearchAll';
import SongItemHeaderInSongsScroll from 'Components/Song/SongItemHeaderInSongsScroll';
import ScrollBarWithColor from 'Components/Common/ScrollBarWithColor';
import useInfiniteData from 'hooks/useInfiniteData';
import useSearchMusicAllInfinite from 'hooks/useSearchMusicAllInfinite';
// import useSongsInAlbum from 'hooks/useSongsInAlbum';

const Container = styled(Box)`
    display: flex;
    flex-direction: column;
    height: ${prop => prop.height || "auto"};
    width: ${prop => prop.height || "auto"};
    margin-top: 10px;
    margin-right: 15px;
`
const ButtonContainer = styled(Box)`
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    height: ${prop => prop.height || "auto"};
    width: ${prop => prop.height || "auto"};
    .MuiSvgIcon-root {
        color: ${props => props.color || 'white'};
        opacity: ${props => props.opacitynormal || '0.7'};
    }
`
const SongContainer = styled(Box)`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    background: transparent;
`

const ArtistDetailSongList = props => {
    const {match} = props;
    const {artist_name, category} = match.params;

    const params = React.useMemo(() => {
        return {
            scn: 'song',
            query: `artist = '${artist_name}' allwordthruindexsyn and status='Y'`,
            orderby: 'order by song_name_str asc',
            bool: true
        }
    },[artist_name])
    const uniqKeys = React.useMemo(() => {
        return {
            artist_name,
            lastKey: 'artistDetailSong'
        }
    },[artist_name])

    const {
        data,
        error,
        fetchNextPage,
        hasNextPage,
        isFetching,
        isFetchingNextPage,
        status,
        isSuccess
    // } = useSearchSongsScroll({keyword, exactSearch, artistName, songName, page_sizes, page_num});
    } = useSearchMusicAllInfinite({params, page_sizes:50, page_num:1, uniqKeys});

    console.log('@@@@:', data);
    const [songs, total] = useInfiniteData(data, 'songs');
    console.log('&&: in artist detail all song:', data, songs);
    const replaceRequired = false;
    const rootForObservation = React.useRef();
    return (
        <Container>
            <ButtonContainer>
                <ButtonIcon 
                    text="전체선택" 
                    iconComponent={<CheckIcon fontSize="small"></CheckIcon>} 
                    border="1px solid rgba(255, 255, 255, .5)"
                    hoverBorder="1px solid rgba(255, 255, 255, 0.8)"
                ></ButtonIcon>
                <ButtonIcon 
                    text="전체재생" 
                    iconComponent={<PlayArrowIcon fontSize="small"></PlayArrowIcon>} 
                    border="1px solid rgba(255, 255, 255, .5)"
                    hoverBorder="1px solid rgba(255, 255, 255, 0.8)"
                ></ButtonIcon>
            </ButtonContainer>
            <SongContainer>
                <SongItemHeaderInSongsScroll
                    songs={songs}
                    total={total}
                ></SongItemHeaderInSongsScroll>
                <ScrollBarWithColor
                    moveScrollToTop={replaceRequired} 
                    getMoreItem={fetchNextPage} 
                    category={category}
                    autoHide 
                    style={{ width:'100%', height: 'calc(100vh - 410px)' }}
                    ref={rootForObservation}
                >
                    <SongListInSearchAll renderIfVisible={false} rootRef={rootForObservation} songs={songs}></SongListInSearchAll>
                </ScrollBarWithColor>
                {isFetching && (
                    <Box m="10px">
                        <TextBox fontSize="14px" text={`Getting More Data..`}></TextBox>
                    </Box>
                )}
            </SongContainer>
        </Container>
    )
}

export default React.memo(ArtistDetailSongList)