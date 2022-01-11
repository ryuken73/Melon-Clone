import {headers, responseToObject} from 'config/apis';
import CONSTANTS from 'config/constants';
import {number, getWeekDay} from './util';
const {BASE_API_URL, BASE_STREAM_URL, DEFAULT_PROGRAM_ATTACH_PATH} = CONSTANTS;

class ProgramInfoClass {
    constructor(props){
        this.nativeProps = {...props};
    }
    get attach_name() { return this.nativeProps.attach_name || `${this.nativeProps.pgm_cd}.jpg`}
    get attach_path() { return this.nativeProps.attach_path || DEFAULT_PROGRAM_ATTACH_PATH}
    get attach_size() { return this.nativeProps.attach_size}
    get brd_time() { return this.nativeProps.brd_time}
    get brd_time_str() { return `${this.brd_time?.slice(0,2)}시${this.brd_time?.slice(2,4)}분`}
    get dat_flag() { return this.nativeProps.dat_flag}
    get del_flag() { return this.nativeProps.del_flag}
    get end_dd() { return this.nativeProps.end_dd}
    get erp_pgm_id() { return this.nativeProps.erp_pgm_id}
    get genre() { return this.nativeProps.genre}
    get mod_dt() { return this.nativeProps.mod_dt}
    get modr() { return this.nativeProps.modr}
    get p_pgm_cd() { return this.nativeProps.p_pgm_cd}
    get p_pgm_nm() { return this.nativeProps.p_pgm_nm}
    get pgm_cd() { return this.nativeProps.pgm_cd}
    get pgm_nm() { return this.nativeProps.pgm_nm}
    get reg_dt() { return this.nativeProps.reg_dt}
    get regr() { return this.nativeProps.regr}
    get row_num() { return this.nativeProps.row_num}
    get rownum() { return this.nativeProps.rownum}
    get start_dd() { return this.nativeProps.start_dd}
    get brd_dd() { return this.nativeProps.start_dd}
    get start_dd_with_weekday() { 
        const year = parseInt(this.brd_dd.substr(0,4));
        const month = parseInt(this.brd_dd.substr(4,2));
        const day = parseInt(this.brd_dd.substr(6,2));
        const date = new Date(year, month-1, day);
        const weekday = getWeekDay(date);
        if(weekday === undefined) return '-';
        return `${year}년 ${number.padZero(month)}월 ${number.padZero(day)}일(${weekday})`
    }
    get end_dd_with_weekday() { 
        const year = parseInt(this.end_dd.substr(0,4));
        const month = parseInt(this.end_dd.substr(4,2));
        const day = parseInt(this.end_dd.substr(6,2));
        const date = new Date(year, month-1, day);
        const weekday = getWeekDay(date);
        if(weekday === undefined) return '-';
        return `${year}년 ${number.padZero(month)}월 ${number.padZero(day)}일(${weekday})`
    }
    get use_yn() { return this.nativeProps.use_yn}
    get view_name() { return this.nativeProps.view_name}
    get week_yn() { return this.nativeProps.week_yn}
    get eval_imagePath() {
        return `${BASE_API_URL}${this.attach_path}${this.attach_name}`
    }
}


const createProgramList = (apiResult, baseApiUrl=BASE_API_URL, baseStreamUrl=BASE_STREAM_URL) => {
    const get = apiResult?.get? apiResult.get: apiResult?.mst_list? apiResult.mst_list: [];
    if(Array.isArray(get)){
        const programList = get.map(program => {
            return new ProgramInfoClass(program);
        })
        return programList;
    } else {
        return new ProgramInfoClass(get);
    }
}

export default createProgramList;