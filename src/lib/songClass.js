import CONSTANTS from 'config/constants';
import { secondsToTime } from './util';
import {headers, responseToObject} from 'config/apis';
const {BASE_API_URL, BASE_STREAM_URL} = CONSTANTS;

class Song {
    constructor(props){
        this.nativeProps = {...props};
    }
    get id() { return `${this.nativeProps.receipt_no}:${this.nativeProps.reg_no}`}
    set albumImgSrc(src) { this._albumImgSrc = src }
    get albumImageSrc() { return this._albumImgSrc }
    get receipt_no() { return this.nativeProps.receipt_no}
    get label_no() { return this.nativeProps.label_no}
    get runtime() { return this.nativeProps.runtime}
    get song_name() { return this.nativeProps.song_name}
    get artist() { return this.nativeProps.artist}
    get album_name() { return this.nativeProps.album_name}
    get top_genre() { return this.nativeProps.top_genre}
    get album_type() { return this.nativeProps.album_type}
    get version() { return this.nativeProps.version}
    get duration() { return secondsToTime(parseInt(this.nativeProps.runtime))}
    get src() {
        const {
            attach_path,
            attach_name,
            label_no,
        } = this.nativeProps
        const label = label_no.substr(0,3);
        return `${CONSTANTS.BASE_STREAM_URL}${attach_path}/${label}/${label_no}/${attach_name}.mp3/playlist.m3u8`
    }
}


const createSong = (apiResult, baseApiUrl=BASE_API_URL, baseStreamUrl=BASE_STREAM_URL) => {
    console.log('&&: createSong :', apiResult)
    console.log('&&: createSong :', apiResult?.fdata)
    const fdata = apiResult?.fdata? apiResult.fdata : [];
    const songPropsArray = responseToObject(fdata, headers.song);
    const songs = songPropsArray.map(songProps => {
        console.log('&&: ', songProps); 
        const song = new Song(songProps);
        song._albumImgSrc = songProps && `${baseApiUrl}/Video/small_image/${songProps.label_no}.JPG`;
        return song
    })
    return songs 
}

export default createSong;