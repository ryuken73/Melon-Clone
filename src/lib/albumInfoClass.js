import createSongInAlbum from './songInAlbum';
import CONSTANTS from 'config/constants';
const {BASE_API_URL, BASE_STREAM_URL} = CONSTANTS;

const replaceBold = str => {
    return str.replace(/<b>/g,'<span style=color:yellow;>').replace(/<\/b>/g,'</span>')
}
const removeBold = str => {
    return str.replace(/<b>/g,'').replace(/<\/b>/g,'')
}

class AlbumInfo {
    constructor(props){
        this.nativeProps = {...props};
    }
    get album_id() { return this.nativeProps.album_id}
    get album_name() { return this.nativeProps.album_name}
    get album_name_bold() { return replaceBold(this.nativeProps.album_name)}
    get album_place() { return this.nativeProps.album_place}
    get album_type() { return this.nativeProps.album_type}
    get arrang_type() { return this.nativeProps.arrang_type}
    get artist() { return this.nativeProps.artist}
    get artist_bold() { return replaceBold(this.nativeProps.artist)}
    get attach_path() { return this.nativeProps.attach_path}
    get brd_time() { return this.nativeProps.brd_time}
    get collect_dt() { return this.nativeProps.collect_dt}
    get collect_src() { return this.nativeProps.collect_src}
    get collect_type() { return this.nativeProps.collect_type}
    get content_yn() { return this.nativeProps.content_yn}
    get digital_yn() { return this.nativeProps.digital_yn}
    get genre() { return this.nativeProps.genre}
    get genre_nm() { return this.nativeProps.genre_nm}
    get label_no() { return this.nativeProps.label_no}
    get mod_dt() { return this.nativeProps.mod_dt}
    get modr() { return this.nativeProps.modr}
    get offerer_tel() { return this.nativeProps.offerer_tel}
    get open_dt() { return this.nativeProps.open_dt}
    get planner() { return this.nativeProps.planner}
    get price_unit() { return this.nativeProps.price_unit}
    get price_value() { return this.nativeProps.price_value}
    get producer() { return this.nativeProps.producer}
    get receipt_no() { return this.nativeProps.receipt_no}
    get reg_dt() { return this.nativeProps.reg_dt}
    get regr() { return this.nativeProps.regr}
    get release_year() { return this.nativeProps.release_year}
    get remark() { return this.nativeProps.remark}
    get remark_ext() { return this.nativeProps.remark_ext}
    get status() { return this.nativeProps.status}
    get thema() { return this.nativeProps.thema}
    get thema_nm() { return this.nativeProps.thema_nm}
    get title_song() { return this.nativeProps.title_song}
    get eval_imagePath() {
        return `${BASE_API_URL}/Video/small_image/${this.label_no}.JPG`
    }
    get list_song(){
        return this.nativeProps.list_song;
    }
}


const createAlbumInfo = (apiResult, baseApiUrl=BASE_API_URL, baseStreamUrl=BASE_STREAM_URL) => {
    const info = apiResult?.info? apiResult.info: {};
    const list_song = apiResult?.list_song? apiResult.list_song: [];
    info.list_song  = list_song.map(song => {
        return createSongInAlbum(song, info.label_no);
    })
    const albumInfo = new AlbumInfo(info)
    return albumInfo;
}

export default createAlbumInfo;