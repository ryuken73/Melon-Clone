export const baseUrl = {
    'musicbank': 'http://musicbank.sbs.co.kr'
}

export const responseToObject = (fdata, headers) => {
    return fdata.map(responses => {
        return responses.reduce((acc, response, index) => {
                    acc[headers[index]] = response;
                    return acc;
                },{})
    })
}

export const apiMap = {
    'searchAlbum': {
        uri: '/mbs/searchEngin/doListSearchMusicAll.mb',
        method: 'POST',
        headers: [
            'receipt_no',
            'status',
            'open_dt',
            'label_no',
            'attach_path',
            'attach_name',
            'attach_size',
            'song_cnt',
            'album_name',
            'title_song',
            'release_year',
            'arrang_type',
            'arrang_type_nm',
            'artist',
            'reg_dt',
            'new_flag',
            'brd_time',
            'digital_yn'
        ]
    }
}