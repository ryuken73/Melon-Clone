import {headers, responseToObject} from 'config/apis';
import CONSTANTS from 'config/constants';
import {removeBold, replaceIllegalCharacters, number, getWeekDay} from './util';
const {BASE_API_URL, BASE_STREAM_URL, SRC_TYPE, DEFAULT_PROGRAM_ATTACH_PATH} = CONSTANTS;

class Archive {
    constructor(props){
        this.nativeProps = {...props};
    }
    get id() { return this.nativeProps.media_id}
    get media_id() { return this.nativeProps.media_id}
    get attach_name() { return this.nativeProps.attach_name}
    get attach_path() { return this.nativeProps.attach_path}
    get attach_size() { return this.nativeProps.attach_size}
    get chan_cd() { return this.nativeProps.chan_cd}
    // get chan_cd_full() { return this.nativeProps.chan_cd === 'A' ? 'L·FM':'P·FM'}
    get chan_cd_full() { return this.nativeProps.chan_cd === 'A' ? '러브FM':'파워FM'}
    get pgm_nm() { return this.nativeProps.pgm_nm}
    get pgm_cd() { return this.nativeProps.pgm_cd}
    get episode() { return this.nativeProps.episode || '1부'}
    get song_name() { return `${this.nativeProps.pgm_nm} [${this.episode}]`}
    get brd_dd() { return this.nativeProps.brd_dd}
    get brd_dd_with_weekday() { 
        const year = parseInt(this.brd_dd.substr(0,4));
        const month = parseInt(this.brd_dd.substr(4,2));
        const day = parseInt(this.brd_dd.substr(6,2));
        const date = new Date(year, month-1, day);
        const weekday = getWeekDay(date);
        return `${year}년-${number.padZero(month)}월-${number.padZero(day)}일(${weekday})`

    }
    get brd_time() { return this.nativeProps.brd_time}
    get brd_time_str() { return `${this.brd_time?.slice(0,2)}시${this.brd_time?.slice(2,4)}분`}
    get sch_gb() { return this.nativeProps.sch_gb}
    get dj() { return this.nativeProps.dj}
    get artist() { return this.nativeProps.artist}
    get prgs_type() { return this.nativeProps.prgs_type}
    get duration() { return this.nativeProps.duration}
    get search_summary() { return this.nativeProps.search_summary}
    get file_size() { return this.nativeProps.file_size}
    get wavsize() { return this.nativeProps.file_size}
    get bora_archive_yn() { return this.nativeProps.bora_archive_yn}
    get bora_archive_open_yn() { return this.nativeProps.bora_archive_open_yn}
    get src_type() { return SRC_TYPE.SONG}
    get getFileSizeParams() { return 'archive'}
    get eval_imagePath() {
        return `${BASE_API_URL}${DEFAULT_PROGRAM_ATTACH_PATH}${this.pgm_cd}.JPG`
    }
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
        return `${CONSTANTS.DOWNLOAD_URL_ONAIR}/${attach_path}${attach_name}`
    }
    get saveTo() {
        return `${replaceIllegalCharacters(this.song_name)}_hhmmss.wav`
    }
    set albumImgSrc(src) { this._albumImageSrc = src }
    // get albumImageSrc() { return this.eval_imagePath }
    get albumImageSrc() { return this._albumImageSrc } // correct image url from program info
    get parsed() {
        return {
            id: this.id,
            song_name: this.song_name,
            artist: this.dj,
            src: this.src,
            duration: this.duration,
            chan_cd_full: this.chan_cd_full,
            download_url: this.download_url,
            saveTo: this.saveTo,
            file_size: this.file_sizea,
            getFileSizeParams: this.getFileSizeParams,
            receipt_no: this.id,
            wavsize: this.file_size,
            reg_no: this.episode,
            albumImageSrc: this.albumImageSrc,
            eval_imagePath: this.eval_imagePath,
            src_type: this.src_type,
            brd_dd: this.brd_dd
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