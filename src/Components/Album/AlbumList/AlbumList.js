import React from 'react'
import Box from '@mui/material/Box';
import styled from 'styled-components';
import AlbumBox from '../AlbumBox';
import ScrollBarSmooth from 'Components/Common/ScrollBarSmooth';
import {withRouter} from 'react-router-dom';
// import useAlbumList from 'hooks/useAlbumList';
// import createAlbum from 'lib/albumClass';
// import RenderIfVisible from 'react-render-if-visible';
import useSearchMusicAllInfinite from 'hooks/useSearchMusicAllInfinite';
import useMediaQueryEasy from 'hooks/useMediaQueryEasy';
import useInfiniteData from 'hooks/useInfiniteData';
import {genre} from 'config/apis';
import {getDateTimeString} from 'lib/util';
import CONSTANTS from 'config/constants';
const {QUERY_MAX_PAGES} = CONSTANTS;


const Container = styled(Box)`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
    height: ${prop => prop.height || "auto"};
    width: ${prop => prop.height || "auto"};
    margin-right: 10px;
`
// const FETCH_COUNT=12;

const AlbumList = props => {
    const {history} = props;
    const {match} = props;
    const {category} = match.params;
    const replaceRequired = false;
    React.useEffect(() => {console.log('re-mount AlbumList')},[])
    const genreNum = genre[category];
    const additionalQuery = category === 'all' ? '' : `and top_genre=${genreNum}`;
    const currentTimeString = React.useMemo(() => getDateTimeString(),[additionalQuery]);
    const params = {
        scn: 'album', 
        query: `status='Y' and open_dt <= '${currentTimeString}' ${additionalQuery}`,
        orderby: 'order by open_dt desc',
        bool: true
    }
    const {
        data,
        // error,
        fetchNextPage,
        // hasNextPage,
        // isFetching,
        // isFetchingNextPage,
        // status,
        // isSuccess
    } = useSearchMusicAllInfinite({params, page_sizes:31, page_num:1, max_pages:QUERY_MAX_PAGES.ALBUMS});
    const [albums] = useInfiniteData(data, 'albums');
    // console.log('%% result: ', data, albums)
    const {fullViewHeightMediaQuery} = useMediaQueryEasy();

    return (
        <ScrollBarSmooth
            getMoreItem={fetchNextPage} 
            height={`calc(${fullViewHeightMediaQuery} - 100px)`}
        >
            <Container>
                {albums.map((album,index) => (  
                    // <RenderIfVisible defaultHeight={270}>
                    <AlbumBox 
                        album={album}
                        key={album.receipt_no}
                        // receipt_no={album.receipt_no}
                        // nameAlbum={album.album_name} 
                        // nameArtist={album.artist_bold}
                        // matched={album.artist_matched}
                        // imagePath={album.eval_imagePath}
                        // releaseYear={album.release_year}
                        history={history}
                        lazyLoaing={true}
                    ></AlbumBox>
                    // </RenderIfVisible>
                ))}
            </Container>
        </ScrollBarSmooth>
    )
}

export default React.memo(withRouter(AlbumList))
