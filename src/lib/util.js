export const number = {
    group1000(number){
        return new Intl.NumberFormat().format(number)
    },
    toByteUnit({number, unit='KB', point=0}){
        if(unit === 'KB') return (number/1024).toFixed(point);
        if(unit === 'MB') return (this.toByteUnit({number, unit:'KB',point})/1024).toFixed(point);
        if(unit === 'GB') return (this.toByteUnit({number, unit:'MB',point})/1024).toFixed(point);
        if(unit === 'TB') return (this.toByteUnit({number, unit:'GB',point})/1024).toFixed(point);
        return number;
    },
    padZero(num){
        if(num < 10){
            return `0${num}`;
        }
        return num.toString();
    }
}

export const getString = (date, separator={}) => {
    const {
        dateSep='', 
        timeSep='', 
        sep='.'
    } = separator;
    const year = date.getFullYear();
    const month = number.padZero(date.getMonth() + 1);
    const day = number.padZero(date.getDate());
    const hour = number.padZero(date.getHours());
    const minute = number.padZero(date.getMinutes());
    const second = number.padZero(date.getSeconds());
    const dateString = `${year}${dateSep}${month}${dateSep}${day}`;
    const timeString = `${hour}${timeSep}${minute}${timeSep}${second}`;
    return `${dateString}${sep}${timeString}`;
}

export const getWeekDay = date => {
    const WEEK_DAYS = ['일', '월', '화', '수', '목', '금', '토'];
    if(date instanceof Date){
        return WEEK_DAYS[date.getDay()];
    } else {
        throw Error('date should be type of Date.')
    }
}

export const getTimeString = date => {
    return getString(date).split('.')[1];
}

export const getDateTimeString = () => {
  const now = new Date();
  return getString(now, {sep:''}).substring(0,8);
}

export const secondsToTime = seconds => {
    if(typeof(seconds) !== 'number' || seconds === Infinity){
        return '00:00'
    }
    return new Date(seconds*1000).toISOString().substr(14,5)
}

export const debounce = (callback, timeout) => {
	let id;
	return (...args) => {
        clearTimeout(id)
		return (id = setTimeout(() => callback(...args), timeout))
	}
}

export const replaceIllegalCharacters = (str, target="-") => {
    return str.replace(/[/\\?%*:|"<>]/g, target);
}

export const qsToNavigateInSearchResult = query => {
    const {keyword, exactSearch, artistName, songName} = query;
    const encodedKeyword = encodeURIComponent(keyword);
    const encodedArtist = encodeURIComponent(artistName);
    const encodedSong = encodeURIComponent(songName);
    
    const qs = exactSearch === 'yes' ?
            `exactSearch=${exactSearch}&keyword=${encodedKeyword}&artistName=${encodedArtist}&songName=${encodedSong}`:
            `exactSearch=${exactSearch}&keyword=${encodedKeyword}`
    return qs;
}

export const replaceBold = str => {
    try {
        const replaced =  str.replace(/<b>/g,'<span style=color:yellow;>').replace(/<\/b>/g,'</span>')
        return replaced;
    } catch (error) {
        console.error(str, error)
        return str;
    }
}
export const removeBold = str => {
    try {
        const removed = str.replace(/<b>/g,'').replace(/<\/b>/g,'');
        return removed;
    } catch (error) {
        console.error(str, error)
        return str;
    }
}