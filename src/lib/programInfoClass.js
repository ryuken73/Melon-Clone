import {headers, responseToObject} from 'config/apis';
import CONSTANTS from 'config/constants';
import {replaceBold} from 'lib/util';
const {BASE_API_URL, BASE_STREAM_URL} = CONSTANTS;

class ProgramInfoClass {
    constructor(props){
        this.nativeProps = {...props};
    }
    get attach_name() { return this.nativeProps.attach_name}
    get attach_path() { return this.nativeProps.attach_path}
    get attach_size() { return this.nativeProps.attach_size}
    get brd_time() { return this.nativeProps.brd_time}
    get dat_flag() { return this.nativeProps.dat_flag}
    get del_flag() { return this.nativeProps.del_flag}
    get end_ddt() { return this.nativeProps.end_ddt}
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
    get use_yn() { return this.nativeProps.use_yn}
    get view_name() { return this.nativeProps.view_name}
    get week_yn() { return this.nativeProps.week_yn}
}


const createProgramList = (apiResult, baseApiUrl=BASE_API_URL, baseStreamUrl=BASE_STREAM_URL) => {
    const get = apiResult?.get? apiResult.get: [];
    const programList = get.map(program => {
        return new ProgramInfoClass(program);
    })
    return programList;
}

export default createProgramList;