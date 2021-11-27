import {headers, responseToObject} from 'config/apis';
import CONSTANTS from 'config/constants';
const {BASE_API_URL, BASE_STREAM_URL} = CONSTANTS;

const replaceBold = str => {
    return str.replace(/<b>/g,'<span style=color:yellow;>').replace(/<\/b>/g,'</span>')
}
const removeBold = str => {
    return str.replace(/<b>/g,'').replace(/<\/b>/g,'')
}

class Artist {
    constructor(props){
        this.nativeProps = {...props};
    }
    get key() { return this.nativeProps.key}
    get artist() { return this.nativeProps.artist}
    get artist_bold() { return replaceBold(this.nativeProps.artist)}
    get artist_type() { return this.nativeProps.artist_type}
    get genre() { return this.nativeProps.genre}
    get debut_song() { return this.nativeProps.debut_song}
    get title_song() { return this.nativeProps.title_song}
    get belong() { return this.nativeProps.belong}
    get member() { return this.nativeProps.member}
    get album_name() { return this.nativeProps.album_name}
    get attach_path() { return this.nativeProps.attach_path}
    get attach_name() { return this.nativeProps.attach_name}
    get attach_size() { return this.nativeProps.attach_size}
    get genre_nm() { return this.nativeProps.genre_nm}
    get nm_idx() { return this.nativeProps.nm_idx}
    get nm_hex() { return this.nativeProps.nm_hex}
    get nm_asc() { return this.nativeProps.nm_asc}
    get eval_imagePath() {
        return `${BASE_API_URL}/Video/artist/${this.attach_path}/${this.attach_name}`
    }
}


const createArtist = (apiResult, baseApiUrl=BASE_API_URL, baseStreamUrl=BASE_STREAM_URL) => {
    const fdata = apiResult?.fdata? apiResult.fdata: [];
    const artistPropsArray = responseToObject(fdata, headers.artist)
    const artist = artistPropsArray.map(artistProps => {
        const artist = new Artist(artistProps);
        return artist;
    })
    return artist;
}

export default createArtist;