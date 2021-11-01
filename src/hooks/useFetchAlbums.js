import React from 'react';
import useFetch from 'use-http';
import {baseUrl, apiMap, responseToObject} from '../config/apis';

const SERVER_NAME = 'musicbank';
const API_NAME = 'searchAlbum';

const api = apiMap[API_NAME];
const {uri, headers} = api;
const fetchOptions = {
    headers: {
        'Content-type': 'application/x-www-form-urlencoded;charset=UTF-8',
    }
}

export default function useFetchAlbums(options, newFetchRequired=true) {
    const [albums, setAlbumsFetched] = React.useState([]);
    const {post, response, error, loading} = useFetch(fetchOptions);
    const fetchData = React.useCallback(async () => {
        const searchParam = new URLSearchParams();
        Object.keys(options).forEach(optionKey => {
            searchParam.append(optionKey, options[optionKey])
        })
        const newAlbums = await post(uri, searchParam);
        if(response.ok && newAlbums.cols !== undefined){
            const {fdata} = newAlbums;
            const albums = responseToObject(fdata, headers);
            const imagePathAttachedAlbums = albums.map(album => {
                return {...album, eval_imagePath: `${baseUrl[SERVER_NAME]}/Video/small_image/${album.label_no}.JPG`}
            })
            setAlbumsFetched(imagePathAttachedAlbums)
        }
    },[options])
    React.useEffect(()=>{
        console.log('useFetchAlbum:', options, newFetchRequired)
        if(newFetchRequired){
            fetchData();
        } else {
            setAlbumsFetched([]);
        }
    },[options, newFetchRequired]);
    return {albums, error, loading, fetchData};
}
