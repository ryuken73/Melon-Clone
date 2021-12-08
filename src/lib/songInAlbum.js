import CONSTANTS from 'config/constants';
import { secondsToTime } from './util';

const replaceBold = str => {
    return str.replace(/<b>/g,'<span style=color:yellow;>').replace(/<\/b>/g,'</span>')
}
const removeBold = str => {
    return str.replace(/<b>/g,'').replace(/<\/b>/g,'')
}

class SongInAlbum {
    constructor(props){
        this.nativeProps = {...props};
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
    get lyrics_chk() { return this.nativeProps.lyrics_chk }
    get modr() { return this.nativeProps.modr }
    get prgs_type() { return this.nativeProps.prgs_type }
    get receipt_no() { return this.nativeProps.receipt_no}
    get reg_no() { return this.nativeProps.reg_no}
    get release_year() { return this.nativeProps.release_year}
    get row_num() { return this.nativeProps.row_num}
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
            artist: this.artist,
            artist_type: this.artist_type,
            attach_name: this.attach_name,
            attach_path: this.attach_path,
            receipt_no: this.receipt_no,
            reg_no: this.reg_no,
            runtime: this.runtime,
            song_name: this.song_name,
            top_genre: this.top_genre,
            version: this.version,
            duration: this.duration,
        }
    }
    get parsedWithoutBTag() {
        return {
            ...this.parsed,
            song_name: removeBold(this.song_name),
            artist: removeBold(this.artist)
        }
    }
}


const createSongInAlbum = (songInList) => {
    console.log('&&: createSongInAlbum :', songInList)
    const song = new SongInAlbum(songInList);
    return song 
}

export default createSongInAlbum;