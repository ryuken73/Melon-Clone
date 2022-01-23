import React from 'react'
import Box from '@mui/material/Box';
import styled from 'styled-components';
import colors from 'config/colors';
import ButtonIcon from 'Components/Common/ButtonIcon';
import ButtonSmall from 'Components/Common/ButtonSmall';
import TextBox from 'Components/Common/TextBox';
import ArrowDownward from '@mui/icons-material/ArrowDownward';
import ArrowUpward from '@mui/icons-material/ArrowUpward';
import CheckIcon from '@mui/icons-material/Check';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SongListInAlbumDetail from 'Components/Song/SongListInAlbumDetail';
import SongListInSearchAll from 'Components/Song/SongListInSearchAll';
import SongItemHeaderInSongsScroll from 'Components/Song/SongItemHeaderInSongsScroll';
import SongHelper from 'Components/SongHelper';
import ScrollBarSmooth from 'Components/Common/ScrollBarSmooth';
import useInfiniteData from 'hooks/useInfiniteData';
import useSearchMusicAllInfinite from 'hooks/useSearchMusicAllInfinite';
import useCurrentPlaylist from 'hooks/useCurrentPlaylist';
import useSongHelper from 'hooks/useSongHelper';
import useMediaQueryEasy from 'hooks/useMediaQueryEasy';
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
    justify-content: flex-start;
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
    const [orderRecent, setOrderRecent] = React.useState(true);
    const [orderAlpha, setOrderAlpha] = React.useState(true);
    const [orderBy, setOrderBy] = React.useState('order by album_name_str asc');

    const params = {
        scn: 'song',
        query: `artist = '${artist_name}' allwordthruindexsyn and status='Y'`,
        orderby: orderBy,
        bool: true
    }

    const uniqKeys = {
        artist_name,
        lastKey: 'artistDetailSong'
    }
    
    console.log('re-render ArtistDetailSongList')
    React.useEffect(() => {
        return () => {
            console.log('ArtistDetailSong umounted!')
        }
    },[])

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

    const {addSongsToCurrentPlaylist} = useCurrentPlaylist();
    const {clearChecked, toggleAllSongChecked} = useSongHelper();

    const toggleOrderRecent = React.useCallback(()=>{
        setOrderRecent(orderRecent => {
            const newOrderRecent = !orderRecent;
            setOrderBy(`order by release_year ${newOrderRecent ? 'asc':'desc'} , song_name_str ${orderAlpha ? 'asc':'desc'}`)
            return newOrderRecent;
        });
    },[setOrderRecent, setOrderBy, orderAlpha]);

    const toggleOrderAlpha = React.useCallback(()=>{
        setOrderAlpha(orderAlpha => {
            const newOrderAlpha = !orderAlpha
            setOrderBy(`order by song_name_str ${newOrderAlpha ? 'asc':'desc'}, release_year ${orderRecent ? 'asc':'desc'}`)
            return newOrderAlpha
        });
    },[setOrderAlpha, setOrderBy, orderRecent]);

    const toggleAllChecked = React.useCallback(()=>{
        toggleAllSongChecked(songs);
    },[toggleAllSongChecked, songs])

    const addAllSongNPlay = React.useCallback(() => {
        addSongsToCurrentPlaylist(songs, true);
        clearChecked();
    },[addSongsToCurrentPlaylist, songs, clearChecked])

    const ArrowOrderRecent = orderRecent ? ArrowDownward : ArrowUpward;
    const ArrowOrderAlpha = orderAlpha ? ArrowDownward : ArrowUpward;

    const replaceRequired = false;
    const rootForObservation = React.useRef();
    const {fullViewHeightMediaQuery} = useMediaQueryEasy();
    return (
        <Container>
            <ButtonContainer>
                <ButtonIcon
                    text="최신순"
                    iconComponent={<ArrowOrderRecent fontSize="small"></ArrowOrderRecent>}
                    border="1px solid rgba(255, 255, 255, .5)"
                    hoverBorder="1px solid rgba(255, 255, 255, 0.8)"
                    onClick={toggleOrderRecent}
                ></ButtonIcon>
                <ButtonIcon
                    text="가나다순"
                    iconComponent={<ArrowOrderAlpha fontSize="small"></ArrowOrderAlpha>}
                    border="1px solid rgba(255, 255, 255, .5)"
                    hoverBorder="1px solid rgba(255, 255, 255, 0.8)"
                    onClick={toggleOrderAlpha}
                ></ButtonIcon>
                <Box ml="auto">
                    <ButtonIcon 
                        text="전체선택" 
                        iconComponent={<CheckIcon fontSize="small"></CheckIcon>} 
                        border="1px solid rgba(255, 255, 255, .5)"
                        hoverBorder="1px solid rgba(255, 255, 255, 0.8)"
                        onClick={toggleAllChecked}
                        ml="auto"
                    ></ButtonIcon>
                </Box>
                 <ButtonIcon 
                        text="전체재생" 
                        iconComponent={<PlayArrowIcon fontSize="small"></PlayArrowIcon>} 
                        border="1px solid rgba(255, 255, 255, .5)"
                        hoverBorder="1px solid rgba(255, 255, 255, 0.8)"
                        onClick={addAllSongNPlay}
                    ></ButtonIcon>
            </ButtonContainer>
            <SongContainer>
                <SongItemHeaderInSongsScroll
                    songs={songs}
                    total={total}
                ></SongItemHeaderInSongsScroll>
                <ScrollBarSmooth
                    getMoreItem={fetchNextPage} 
                    height={`calc(${fullViewHeightMediaQuery} - 400px)`}
                    ref={rootForObservation}
                >
                    <SongListInSearchAll renderIfVisible={true} rootRef={rootForObservation} songs={songs}></SongListInSearchAll>
                </ScrollBarSmooth>
                {isFetching && (
                    <Box m="10px">
                        <TextBox fontSize="14px" text={`Getting More Data..`}></TextBox>
                    </Box>
                )}
            </SongContainer>
            <SongHelper></SongHelper>
        </Container>
    )
}

export default React.memo(ArtistDetailSongList)