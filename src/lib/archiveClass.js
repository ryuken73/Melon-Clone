import {headers, responseToObject} from 'config/apis';
import CONSTANTS from 'config/constants';
import {replaceBold} from 'lib/util';
const {BASE_API_URL, BASE_STREAM_URL} = CONSTANTS;

class Archive {
    constructor(props){
        this.nativeProps = {...props};
    }
    get media_id() { return this.nativeProps.media_id}
    get attach_path() { return this.nativeProps.attach_path}
    get attach_size() { return this.nativeProps.attach_size}
    get chan_cd() { return this.nativeProps.chan_cd}
    get pgm_nm() { return this.nativeProps.pgm_nm}
    get pgm_cd() { return this.nativeProps.pgm_cd}
    get episode() { return this.nativeProps.episode}
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