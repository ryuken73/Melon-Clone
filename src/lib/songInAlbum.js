import CONSTANTS from 'config/constants';
import { secondsToTime, replaceIllegalCharacters} from './util';
import {replaceBold, removeBold} from 'lib/util';

class SongInAlbum {
    constructor(props, label_no){
        this.nativeProps = {...props, label_no};
    }
    get album_id() { return this.nativeProps.album_id }
    get album_place() { return this.nativeProps.album_place }
    get artist() { return this.nativeProps.artist}
    get artist_bold() { return replaceBold(this.nativeProps.artist) }
    get artist_type() { return this.nativeProps.artist_type}
    get attach_name() { return this.nativeProps.attach_name }
    get attach_path() { return this.nativeProps.attach_path }
    get dat_flag() { return this.nativeProps.dat_flag }
    get del_flag() { return this.nativeProps.del_flag }
    get dlbr_rslt() { return this.nativeProps.dlbr_rslt }
    get dlbr_rslt2() { return this.nativeProps.dlbr_rslt2 }
    get down_limit_id() { return this.nativeProps.down_limit_id }
    get encode_yn() { return this.nativeProps.encode_yn }
    get id() { return `${this.nativeProps.receipt_no}:${this.nativeProps.reg_no}`}
    get label_no() { return this.nativeProps.label_no }
    get lyrics_chk() { return this.nativeProps.lyrics_chk }
    get modr() { return this.nativeProps.modr }
    get prgs_type() { return this.nativeProps.prgs_type }
    get receipt_no() { return this.nativeProps.receipt_no}
    get reg_no() { return this.nativeProps.reg_no}
    get release_year() { return this.nativeProps.release_year}
    get rownum() { return this.nativeProps.rownum}
    get runtime() { return this.nativeProps.runtime}
    get size() { return this.nativeProps.size}
    get song_name() { return this.nativeProps.song_name}
    get song_name_bold() { return replaceBold(this.nativeProps.song_name) }
    get top_genre() { return this.nativeProps.top_genre}
    get track_no() { return this.nativeProps.track_no}
    get version() { return this.nativeProps.version}
    get duration() { return secondsToTime(parseInt(this.nativeProps.runtime))}
    get parsed() {
        return {
            album_id: this.album_id,
            album_place: this.album_place,
            albumImageSrc: this.albumImageSrc,
            artist: this.artist,
            artist_type: this.artist_type,
            attach_name: this.attach_name,
            attach_path: this.attach_path,
            download_url: this.download_url,
            getFileSizeParams: this.getFileSizeParams,
            id: this.id,
            receipt_no: this.receipt_no,
            reg_no: this.reg_no,
            rownum: this.rownum,
            runtime: this.runtime,
            saveTo: this.saveTo,
            song_name: this.song_name,
            src: this.src,
            top_genre: this.top_genre,
            version: this.version,
            duration: this.duration,
        }
    } 
    get albumImageSrc() {
        return `${CONSTANTS.BASE_API_URL}/Video/small_image/${this.label_no}.JPG`
    }
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
    get parsedWithoutBTag() {
        return {
            ...this.parsed,
            song_name: removeBold(this.song_name),
            artist: removeBold(this.artist)
        }
    }
}


const createSongInAlbum = (songInList, label_no) => {
    console.log('&&: createSongInAlbum :', songInList)
    const song = new SongInAlbum(songInList, label_no);
    return song 
}

export default createSongInAlbum;