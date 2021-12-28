import React from 'react'
import Box from '@mui/material/Box';
import AlbumBox from 'Components/Album/AlbumBox';
import styled from 'styled-components';
import {withRouter} from 'react-router-dom';
import ScrollBarWithColor from 'Components/Common/ScrollBarWithColor';
import useInfiniteData from 'hooks/useInfiniteData';
import useSearchMusicAllInfinite from 'hooks/useSearchMusicAllInfinite';
import useMediaQueryEasy from 'hooks/useMediaQueryEasy';

const Container = styled(Box)`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
    height: ${prop => prop.height || "auto"};
    width: ${prop => prop.height || "auto"};
    margin-right: 10px;
`

const ArtistDetailAlbumList = props => {
    const {history, match} = props;
    const {artist_name, category} = match.params;
    const {fullViewHeightMediaQuery} = useMediaQueryEasy();

    const params = React.useMemo(() => {
        return {
            scn: 'album',
            query: `album_idx = '${artist_name}' allwordthruindexsyn and status='Y'`,
            orderby: 'order by release_year desc' ,
            bool: true
        }
    },[artist_name])

    const uniqKeys = React.useMemo(() => {
        return {
            artist_name,
            lastKey: 'artistDetailAlbum'
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
    } = useSearchMusicAllInfinite({params, page_sizes:22, page_num:1, uniqKeys});

    const [albums] = useInfiniteData(data, 'albums');
    console.log('&&: in artist detail all album:', data, albums);
    const replaceRequired = false;

    return (
        <ScrollBarWithColor 
            moveScrollToTop={replaceRequired} 
            getMoreItem={fetchNextPage} 
            category={category}
            autoHide 
            style={{ width:'100%', height: `calc(${fullViewHeightMediaQuery} - 270px)`  }}
        >
            <Container>
                {albums.map((album,index) => (  
                    <AlbumBox 
                        key={album.receipt_no}
                        album={album}
                        // receipt_no={album.receipt_no}
                        // nameAlbum={album.album_name_bold} 
                        // nameArtist={album.artist_bold}
                        preserveHtmlTag={true}
                        // matched={album.artist_matched}
                        // imagePath={album.eval_imagePath}
                        history={history}
                        lazyLoaing={true}
                    ></AlbumBox>
                ))}
            </Container>
        </ScrollBarWithColor>
    )
}

export default React.memo(withRouter(ArtistDetailAlbumList))