import React from 'react';
import useFetch from 'use-http';
import {baseUrl, apiMap, responseToObject} from '../config/apis';
import {getString} from '../lib/util';

const SERVER_NAME = 'musicbank';
const API_NAME = 'searchAlbum';

export default function useFetchRecentAlbums(count) {
    const [albums, setRecentAlbums] = React.useState([]);
    const api = apiMap[API_NAME];
    const {uri, headers} = api;
    const fetchOptions = {
        headers: {
            'Content-type': 'application/x-www-form-urlencoded;charset=UTF-8',
        }
    }
    const {post, response, error, loading} = useFetch(fetchOptions);
    React.useEffect(()=>{
        async function fetchData(){
            const now = new Date();
            const currentDateTimeString = getString(now, {sep:''}).substring(0,12);
            const searchParam = new URLSearchParams();
            searchParam.append('page_num', 1);
            searchParam.append('page_sizes', count);
            searchParam.append('scn', 'album');
            searchParam.append('query', `status='Y' and open_time <= '${currentDateTimeString}'`);
            searchParam.append('orderby', "order by open_dt desc");
            searchParam.append('bool', "true");
            const newAlbums = await post(uri, searchParam);
            if(response.ok && newAlbums.cols !== undefined){
                const {fdata} = newAlbums;
                const albums = responseToObject(fdata, headers);
                const imagePathAttachedAlbums = albums.map(album => {
                    return {...album, eval_imagePath: `${baseUrl[SERVER_NAME]}/Video/small_image/${album.label_no}.JPG`}
                })
                setRecentAlbums(imagePathAttachedAlbums)
            }
        }
        fetchData();
    },[]);

    return {albums, error, loading};
}
