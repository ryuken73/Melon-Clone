const dev = {
    "BASE_API_URL": 'http://musicbank.sbs.co.kr',
    "BASE_STREAM_URL": 'http://10.11.31.51:1935/music/_definst/mp3:',
    "BASE_STREAM_URL_ONAIR": 'http://10.11.31.51:1935/onair/_definst/mp3:',
    "DOWNLOAD_URL": 'http://10.11.31.51:8554/music',
    "DOWNLOAD_URL_ONAIR": 'http://10.11.31.51:8554/onair',
    "AUTOCOMPLETE_URL": 'http://10.11.31.51:3010',
    "GET_MORE_WAIT_SEC_DEBOUNCE": 100,
    "ALBUM_PAGE_SIZE": 20,
    "IMAGE_LAZY_SHOW_THRESHOLD": 0.2,
    "SEARCH_DEBOUNCE_MILLISECONDS": 100,
    "SEARCH_PAGE_NUM": 1,
    "SEARCH_PAGE_SIZE": 10,
    "SEARCH_SONG_PAGE_SIZES": 50,
    "SWIPE_SLIDE_TO_SHHOW": 6,
    "SWIPE_SLIDE_TO_SCROLL": 5,
    "SWIPE_SLIDE_SPEED": 500,
    "WIDTH_TO_HIDE_SIDE_PANEL": "1250px"
}

const prd = {
    ...dev,
    "BASE_API_URL": 'https://mbk-api.sbs.co.kr',
    "BASE_STREAM_URL": 'https://mbk-stream.sbs.co.kr/music/_definst/mp3:',
    "BASE_STREAM_URL_ONAIR": 'https://mbk-stream.sbs.co.kr/onair/_definst/mp3:',
    "DOWNLOAD_URL": 'http://mbk-down.sbs.co.kr/music',
    "DOWNLOAD_URL_ONAIR": 'http://mbk-down.sbs.co.kr/onair',
    "AUTOCOMPLETE_URL": 'http://mbk-suggest.sbs.co.kr'
}
export default process.env.NODE_ENV === 'development' ? dev:prd;