import CONSTANTS from 'config/constants';
const {BASE_API_URL, BASE_STREAM_URL} = CONSTANTS;

class Song {
    constructor(props){
        this.nativeProps = {...props};
    }
    // set baseStreamUrl(url) { this._baseStreamUrl = url }
    // get baseStreamUrl() { return this._baseStreamUrl }
    // set baseApiUrl(url) { this._baseApiUrl = url }
    // get baseApiUrl() { return this._baseApiUrl }
    set albumImgSrc(src) { this._albumImgSrc = src }
    get albumImgSrc() { return this._albumImgSrc }
}


const createSong = (props, baseApiUrl=BASE_API_URL, baseStreamUrl=BASE_STREAM_URL) => {
    const song = new Song(props);
    song.albumImgSrc = `${baseApiUrl}/Video/small_image/${props.info.label_no}.JPG`;
    return song;
}

export default createSong;