import {headers, responseToObject} from 'config/apis';
import CONSTANTS from 'config/constants';
import {replaceBold} from 'lib/util';
const {BASE_API_URL, BASE_STREAM_URL} = CONSTANTS;

class Lyrics {
    constructor(props){
        this.nativeProps = {...props};
    }
    get id() { return `${this.nativeProps.receipt_no}:${this.nativeProps.reg_no}`}
    get receipt_no() { return this.nativeProps.receipt_no}
    get reg_no() { return this.nativeProps.reg_no}
    get status() { return this.nativeProps.status}
    get open_dt() { return this.nativeProps.open_dt}
    get track_no() { return this.nativeProps.track_no}
    get attach_path() { return this.nativeProps.attach_path}
    get attach_name() { return this.nativeProps.attach_name}
    get label_no() { return this.nativeProps.label_no}
    get runtime() { return this.nativeProps.runtime}
    get song_name() { return this.nativeProps.song_name}
    get song_name_bold() { return replaceBold(this.nativeProps.song_name) }
    get dlbr_rslt() { return this.nativeProps.dlbr_rslt}
    get dlbr_rslt_nm() { return this.nativeProps.dlbr_rslt_nm}
    get lyrics() { return this.nativeProps.lyrics}
    get lyrics_bold() { return replaceBold(this.nativeProps.lyrics)}
    get lyricist() { return this.nativeProps.lyricist}
    get eval_imagePath() {
        return `${BASE_API_URL}/Video/small_image/${this.label_no}.JPG`
    }
}


const createLyrics = (apiResult, baseApiUrl=BASE_API_URL, baseStreamUrl=BASE_STREAM_URL) => {
    const fdata = apiResult?.fdata? apiResult.fdata: [];
    const lyricsPropsArray = responseToObject(fdata, headers.lyrics)
    const lyrics = lyricsPropsArray.map(lyricsProps => {
        const lyricsClass = new Lyrics(lyricsProps);
        return lyricsClass;
    })
    return lyrics;
}

export default createLyrics;