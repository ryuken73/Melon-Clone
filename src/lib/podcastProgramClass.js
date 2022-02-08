import CONSTANTS from 'config/constants';
import {number, getWeekDay} from './util';
const {BASE_API_URL} = CONSTANTS;

class PodcastProgram {
    constructor(program){
        this.nativeProps = {...program};
    }
    get attach_name() { return this.nativeProps.attach_name}
    get attach_path() { return this.nativeProps.attach_path}
    get pgm_cd() { return this.nativeProps.audio_pgm_id}
    get pgm_nm() { return this.nativeProps.title}
    get eval_imagePath() {
        return `${BASE_API_URL}${this.attach_path}${this.attach_name}`
    }
    get brd_dd() { return this.nativeProps.created?.replace(/-/g, '')||''}
    get start_dd_with_weekday() { 
        const year = parseInt(this.brd_dd.substr(0,4));
        const month = parseInt(this.brd_dd.substr(4,2));
        const day = parseInt(this.brd_dd.substr(6,2));
        const date = new Date(year, month-1, day);
        const weekday = getWeekDay(date);
        if(weekday === undefined) return '-';
        return `${year}년 ${number.padZero(month)}월 ${number.padZero(day)}일(${weekday})`
    }
}

const createPodcastProgram = (program) => {
    const podcastProgram = new PodcastProgram(program);
    return podcastProgram
}

export default createPodcastProgram;