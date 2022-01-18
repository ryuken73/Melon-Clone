
import {headers, responseToObject} from 'config/apis';
import CONSTANTS from 'config/constants';
import {replaceBold, getWeekDay, number} from 'lib/util';
const {BASE_API_URL, BASE_STREAM_URL} = CONSTANTS;

class Podcast {
    constructor(props){
        this.nativeProps = {...props};
    }
    get id() { return this.nativeProps.media_id}
    get pgm_title() { return this.nativeProps.pgm_title}
    get brad_day() { return this.nativeProps.brad_day}
    get brad_day_with_weekday() {
        const brad_day_split = this.brad_day.split('-');
        const year = parseInt(brad_day_split[0])
        const month = parseInt(brad_day_split[1])
        const day = parseInt(brad_day_split[2])
        const date = new Date(year, month-1, day);
        const weekday = getWeekDay(date);
        return `${year}년-${number.padZero(month)}월-${number.padZero(day)}일(${weekday})`
    }
    get cast_nm() { return this.nativeProps.cast_nm}
    get cmplt_yn() { return this.nativeProps.cmplt_yn}
    get link() { return this.nativeProps.link}
    get media_id() { return this.nativeProps.media_id}
    get episode_title() { return this.nativeProps.episode_title}
    get song_name() { return this.nativeProps.episode_title}
}


const createPodcasts = (apiResult, baseApiUrl=BASE_API_URL, baseStreamUrl=BASE_STREAM_URL) => {
    const fdata = apiResult?.fdata? apiResult.fdata: [];
    const podcastPropsArray = responseToObject(fdata, headers.podcast)
    const podcasts = podcastPropsArray.map(podcastProps => {
        const podcastClass = new Podcast(podcastProps);
        return podcastClass;
    })
    return podcasts;
}

export default createPodcasts;