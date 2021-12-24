import React from 'react'
import Box from '@mui/material/Box';
import AlbumBox from 'Components/Album/AlbumBox';
import styled from 'styled-components';
import SearchResultAlbumsScroll from './SearchResultAlbumsScroll';
import ScrollBarWithColor from 'Components/Common/ScrollBarWithColor';
import CONSTANTS from 'config/constants';
import {withRouter} from 'react-router-dom';
import queryString from 'query-string';
import {getString} from 'lib/util';
import useInfiniteData from 'hooks/useInfiniteData';
import useSearchMusicAllInfinite from 'hooks/useSearchMusicAllInfinite';
const {SEARCH_SONG_PAGE_SIZES} = CONSTANTS;

const Container = styled(Box)`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
    height: ${prop => prop.height || "auto"};
    width: ${prop => prop.height || "auto"};
    margin-right: 10px;
`

function SearchResultAlbums(props) {
    const {history, match, location } = props;
    const {page_sizes=31, page_num=1} = props;
    const query = queryString.parse(location.search)
    const {keyword, exactSearch, artistName, songName} = query;
    const now = new Date();
    const currentTime = getString(now, {sep:''}).substr(0,12);
    const needExactSearch = React.useMemo(() => exactSearch === 'yes',[exactSearch])
    const params = needExactSearch ? {
        scn: 'album', 
        query: `(song_name_str like '*${songName}*' and artist_str = '${artistName}') and open_time<='${currentTime}' and status='Y'`,
        orderby: 'order by release_year desc,album_name_str asc'
    }:
    {
        scn: 'album', 
        query: `(album_idx = '${keyword}' allwordthruindexsyn or release_year='${keyword}' or arrang_type_nm='${keyword}' or label_no='${keyword}'and status='Y')
                and open_time<='${currentTime}' and status='Y'`,
        orderby: 'order by release_year desc,album_name_str asc'
    };
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
    } = useSearchMusicAllInfinite({params, page_sizes, page_num});
    const [albums, total] = useInfiniteData(data, 'albums');
    const replaceRequired = false;
    console.log('@@@@:', data, albums);

    return (
        <ScrollBarWithColor 
            moveScrollToTop={replaceRequired} 
            getMoreItem={fetchNextPage} 
            autoHide 
            style={{ width:'100%', height: 'calc(100vh - 100px)' }}
        >
            <Container>
                {albums.map((album,index) => (  
                    // <RenderIfVisible defaultHeight={270}>
                    <AlbumBox 
                        album={album}
                        key={album.receipt_no}
                        // receipt_no={album.receipt_no}
                        // nameAlbum={album.album_name_bold} 
                        // nameArtist={album.artist_bold}
                        // matched={album.artist_matched}
                        // imagePath={album.eval_imagePath}
                        // releaseYear={album.release_year}
                        history={history}
                        lazyLoaing={true}
                        preserveHtmlTag={true}
                    ></AlbumBox>
                    // </RenderIfVisible>
                ))}
            </Container>
        </ScrollBarWithColor>
    )
}

export default React.memo(withRouter(SearchResultAlbums))