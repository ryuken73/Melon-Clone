import {headers, responseToObject} from 'config/apis';
import CONSTANTS from 'config/constants';
import {removeBold, replaceIllegalCharacters, getTimeString} from './util';
const {BASE_API_URL, BASE_STREAM_URL} = CONSTANTS;

class Archive {
    constructor(props){
        this.nativeProps = {...props};
    }
    get id() { return this.nativeProps.media_id}
    get media_id() { return this.nativeProps.media_id}
    get attach_path() { return this.nativeProps.attach_path}
    get attach_size() { return this.nativeProps.attach_size}
    get chan_cd() { return this.nativeProps.chan_cd}
    get chan_cd_full() { return this.nativeProps.chan_cd === 'A' ? 'AM':'FM'}
    get pgm_nm() { return this.nativeProps.pgm_nm}
    get pgm_cd() { return this.nativeProps.pgm_cd}
    get episode() { return this.nativeProps.episode || '1부'}
    get brd_dd() { return this.nativeProps.brd_dd}
    get brd_time() { return this.nativeProps.brd_time}
    get sch_gb() { return this.nativeProps.sch_gb}
    get dj() { return this.nativeProps.dj}
    get artist() { return this.nativeProps.artist}
    get prgs_type() { return this.nativeProps.prgs_type}
    get duration() { return this.nativeProps.duration}
    get search_summary() { return this.nativeProps.search_summary}
    get file_size() { return this.nativeProps.file_size}
    get bora_archive_yn() { return this.nativeProps.bora_archive_yn}
    get bora_archive_open_yn() { return this.nativeProps.bora_archive_open_yn}
    get src() {
        const {
            attach_path,
            attach_name
        } = this.nativeProps;
        return `${CONSTANTS.BASE_STREAM_URL_ONAIR}${attach_path}/${attach_name}/playlist.m3u8`
    }
    get download_url(){
        const {
            attach_path,
            attach_name
        } = this.nativeProps
        return `${CONSTANTS.DOWNLOAD_URL}/${attach_path}/${attach_name}`
    }
    get saveTo() {
        const {song_name} = this.nativeProps;
        const date = new Date();
        return `${replaceIllegalCharacters(song_name)}_${getTimeString(date)}.wav`
    }
    get parsed() {
        return {
            id: this.id,
            song_name: `${this.pgm_nm} [${this.episode}]`,
            artist: this.dj,
            src: this.src,
            duration: this.duration,
            chan_cd_full: this.chan_cd_full,
            download_url: this.download_url,
            saveTo: this.saveTo
        }
    }
    get parsedWithoutBTag() {
        return {
            ...this.parsed,
            song_name: removeBold(this.parsed.song_name),
            artist: removeBold(this.parsed.artist)
        }
    }
}


const createArchive = (apiResult, baseApiUrl=BASE_API_URL, baseStreamUrl=BASE_STREAM_URL) => {
    const fdata = apiResult?.fdata? apiResult.fdata : [];
    const archivePropsArray = responseToObject(fdata, headers.archive);
    const archives = archivePropsArray.map(archiveProps => {
        const archive = new Archive(archiveProps);
        return archive
    })
    return archives 
}

export default createArchive;