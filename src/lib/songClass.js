import CONSTANTS from 'config/constants';
import { secondsToTime, replaceIllegalCharacters} from './util';
import {headers, responseToObject} from 'config/apis';
import {replaceBold, removeBold} from 'lib/util';
const {BASE_API_URL, BASE_STREAM_URL} = CONSTANTS;

class Song {
    constructor(props){
        this.nativeProps = {...props};
    }
    get id() { return `${this.nativeProps.receipt_no}:${this.nativeProps.reg_no}`}
    set albumImgSrc(src) { this._albumImgSrc = src }
    get albumImageSrc() { return this._albumImgSrc }
    get attach_path() { return this.nativeProps.attach_path }
    get attach_name() { return this.nativeProps.attach_name }
    get receipt_no() { return this.nativeProps.receipt_no}
    get release_year() { return this.nativeProps.release_year}
    get reg_no() { return this.nativeProps.reg_no}
    get label_no() { return this.nativeProps.label_no}
    get runtime() { return this.nativeProps.runtime}
    get song_name() { return this.nativeProps.song_name}
    get song_name_bold() { return replaceBold(this.nativeProps.song_name) }
    get artist() { return this.nativeProps.artist}
    get artist_bold() { return replaceBold(this.nativeProps.artist) }
    get artist_matched() { 
        const matched = this.nativeProps.artist.match(/<b>(.*)<\/b>/);
        if(matched !== null){
            return matched[1];
        }
        return this.nativeProps.artist;
    }
    get album_name() { return this.nativeProps.album_name}
    get album_name_bold() { return replaceBold(this.nativeProps.album_name) }
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
    get download_url() {
        const {
            attach_path,
            attach_name,
            label_no,
        } = this.nativeProps
        const label = label_no.substr(0,3);
        const pathmap = {
            "Audio_WAVE1"       : "onair_wave1",
            "Audio_WAVE2"       : "onair_wave2",
            "Audio_WAVE3"       : "onair_wave3",
            "music/onair_wave1" : "onair_wave1",
            "music/onair_wave2" : "onair_wave2",
            "music/onair_wave3" : "onair_wave3"
        }
        return `${CONSTANTS.DOWNLOAD_URL}/${pathmap[attach_path]}/${label}/${label_no}/${attach_name}.wav`
    }
    get saveTo() {
        const {song_name} = this.nativeProps;
        return `${replaceIllegalCharacters(song_name)}_hhmmss.wav`
    }
    get getFileSizeParams() {
        const {
            attach_path,
            attach_name,
            receipt_no,
            reg_no,
            label_no
        } = this.nativeProps
        return  `${attach_name};${attach_path};${receipt_no};${reg_no};${label_no}---`
    }
    get parsed() {
        return {
            id: this.id,
            albumImageSrc: this.albumImageSrc,
            attach_path: this.attach_path,
            attach_name: this.attach_name,
            receipt_no: this.receipt_no,
            label_no: this.label_no,
            reg_no: this.reg_no,
            runtime: this.runtime,
            song_name: this.song_name,
            artist: this.artist,
            album_name: this.album_name,
            top_genre: this.top_genre,
            album_type: this.album_type,
            version: this.version,
            duration: this.duration,
            src: this.src,
            download_url: this.download_url,
            saveTo: this.saveTo,
            getFileSizeParams: this.getFileSizeParams
        }
    }
    get parsedWithoutBTag() {
        return {
            ...this.parsed,
            song_name: removeBold(this.song_name),
            album_name: removeBold(this.album_name),
            artist: removeBold(this.artist)
        }
    }
}


const createSong = (apiResult, baseApiUrl=BASE_API_URL, baseStreamUrl=BASE_STREAM_URL) => {
    const fdata = apiResult?.fdata? apiResult.fdata : [];
    const songPropsArray = responseToObject(fdata, headers.song);
    const songs = songPropsArray.map(songProps => {
        const song = new Song(songProps);
        song._albumImgSrc = songProps && `${baseApiUrl}/Video/small_image/${songProps.label_no}.JPG`;
        return song
    })
    return songs 
}

export default createSong;