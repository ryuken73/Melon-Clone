import {headers, responseToObject} from 'config/apis';
import CONSTANTS from 'config/constants';
const {BASE_API_URL, BASE_STREAM_URL} = CONSTANTS;

const replaceBold = str => {
    return str.replace(/<b>/g,'<span style=color:yellow;>').replace(/<\/b>/g,'</span>')
}
const removeBold = str => {
    return str.replace(/<b>/g,'').replace(/<\/b>/g,'')
}

class Album {
    constructor(props){
        this.nativeProps = {...props};
    }
    get receipt_no() { return this.nativeProps.receipt_no}
    get status() { return this.nativeProps.status}
    get open_dt() { return this.nativeProps.open_dt}
    get label_no() { return this.nativeProps.label_no}
    get attach_path() { return this.nativeProps.attach_path}
    get attach_name() { return this.nativeProps.attach_name}
    get attach_size() { return this.nativeProps.attach_size}
    get song_cnt() { return this.nativeProps.song_cnt}
    get album_name() { return this.nativeProps.album_name}
    get album_name_bold() { return replaceBold(this.nativeProps.album_name)}
    get title_song() { return this.nativeProps.title_song}
    get release_year() { return this.nativeProps.release_year}
    get arrang_type() { return this.nativeProps.arrang_type}
    get arrang_type_nm() { return this.nativeProps.arrang_type_nm}
    get artist() { return this.nativeProps.artist}
    get artist_bold() { return replaceBold(this.nativeProps.artist)}
    get reg_dt() { return this.nativeProps.reg_dt}
    get new_flag() { return this.nativeProps.new_flag}
    get brd_time() { return this.nativeProps.brd_time}
    get digital_yn() { return this.nativeProps.digital_yn}
    get eval_imagePath() {
        return `${BASE_API_URL}/Video/small_image/${this.label_no}.JPG`
    }
}


const createAlbum = (apiResult, baseApiUrl=BASE_API_URL, baseStreamUrl=BASE_STREAM_URL) => {
    const fdata = apiResult?.fdata? apiResult.fdata: [];
    const albumPropsArray = responseToObject(fdata, headers.album)
    const albums = albumPropsArray.map(albumProps => {
        const album = new Album(albumProps);
        return album;
    })
    return albums;
}

export default createAlbum;