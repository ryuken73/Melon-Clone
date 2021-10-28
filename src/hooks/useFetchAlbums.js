import React from 'react';
import useFetch from 'use-http';
import {baseUrl, apiMap, responseToObject} from '../config/apis';
import {getString} from '../lib/util';

const SERVER_NAME = 'musicbank';
const API_NAME = 'searchAlbum';

export default function useFetchRecentAlbums(pathname, pageNum, count) {
    const [albums, setAlbums] = React.useState([]);
    const api = apiMap[API_NAME];
    const {uri, headers} = api;
    const fetchOptions = {
        headers: {
            'Content-type': 'application/x-www-form-urlencoded;charset=UTF-8',
        }
    }
    const genre = {
        'kpop': 4,
        'pop': 58,
        'classic': 144,
        'etc': 0
    }
    const {post, response, error, loading} = useFetch(fetchOptions);
    
    React.useEffect(() => {
        setAlbums([]);
    },[pathname])

    React.useEffect(()=>{
        async function fetchData(pathname, pageNum, count){
            const now = new Date();
            const currentDateTimeString = getString(now, {sep:''}).substring(0,12);
            const genreParam = pathname === 'all' ? '' : `and top_genre=${genre[pathname]}`
            const searchParam = new URLSearchParams();
            searchParam.append('page_num', pageNum);
            searchParam.append('page_sizes', count);
            searchParam.append('scn', 'album');
            searchParam.append('query', `status='Y' and open_time <= '${currentDateTimeString}' ${genreParam}`);
            searchParam.append('orderby', "order by open_dt desc");
            searchParam.append('bool', "true");
            const newAlbums = await post(uri, searchParam);
            if(response.ok && newAlbums.cols !== undefined){
                const {fdata} = newAlbums;
                const albums = responseToObject(fdata, headers);
                const imagePathAttachedAlbums = albums.map(album => {
                    return {...album, eval_imagePath: `${baseUrl[SERVER_NAME]}/Video/small_image/${album.label_no}.JPG`}
                })
                setAlbums(albums => [...albums, ...imagePathAttachedAlbums])
            }
        }
        console.log(pathname, pageNum, count)
        fetchData(pathname, pageNum, count);
    },[pageNum, count]);

    return {albums, error, loading};
}
