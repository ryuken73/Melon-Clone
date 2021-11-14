import React from 'react'
import Box from '@mui/material/Box';
import styled from 'styled-components';
import AlbumBox from 'Components/Album/AlbumBox';
import Swiper from 'Components/Common/Swiper';
import useFetchAlbums from 'hooks/useFetchAlbums';
import {getString} from 'lib/util';

const Container = styled(Box)`
    display: flex;
    height: ${prop => prop.height || "auto"};
    width: ${prop => prop.height || "auto"};
    margin-top: 10px;
`
const PAGE_NUM = 1;
const FETCH_COUNT = 15;

const getDateTimeString = () => {
    const now = new Date();
    return getString(now, {sep:''}).substring(0,12);
}

const AlbumList = props => {
    const {history} = props;
    const [options, setOptions] = React.useState({});
    React.useEffect(()=>{
        const fetchOptions = {
            'page_num': PAGE_NUM,
            'page_sizes': FETCH_COUNT,
            'scn': 'album',
            'query': `status='Y' and open_time <= '${getDateTimeString()}'`,
            'orderby': "order by open_dt desc",
            'bool': true            
        }
        setOptions(fetchOptions);
    },[])

    const {albums, error, loading} = useFetchAlbums(options);
    return (
        <Container width="100%">
            {albums.length > 0 &&
                <Swiper>
                    {albums.map(album => (
                        <AlbumBox 
                            key={album.receipt_no}
                            receipt_no={album.receipt_no}
                            nameAlbum={album.album_name} 
                            nameArtist={album.artist}
                            imagePath={album.eval_imagePath}
                            history={history}
                            resizeOnHover={false}
                        ></AlbumBox>
                    ))}
                </Swiper>
            }
        </Container>
    )
}

export default React.memo(AlbumList)