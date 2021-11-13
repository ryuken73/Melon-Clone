import CONSTANTS from 'config/constants';
const {BASE_API_URL, BASE_STREAM_URL} = CONSTANTS;

class Album {
    constructor(props){
        const {info, list_song} = props;
        this.nativeProps = {...props};
    }
    set pathname(pathname) { this._pathname = pathname }
    get pathname() { return this._pathname }
    set baseApiUrl(url) { this._baseApiUrl = url }
    get baseApiUrl() { return this._baseApiUrl }

}


const createAlbum = (props, baseApiUrl=BASE_API_URL, baseStreamUrl=BASE_STREAM_URL) => {
    const album = new Album(props)
    album.baseApiUrl = baseApiUrl;
    return album;
}

export default createAlbum;