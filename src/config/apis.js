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

const fetchOptions = {
    headers: {
        'Content-type': 'application/x-www-form-urlencoded;charset=UTF-8',
    }
}

const headers = {
    song: [
        'receipt_no',    
        'reg_no',        
        'status',        
        'open_dt',       
        'track_no',      
        'attach_name',   
        'attach_path',   
        'label_no',      
        'runtime',       
        'song_name',
        'form_type',    
        'form_type_nm',  
        'artist',
        'album_name',
        'release_year',
        'dlbr_rslt',
        'dlbr_rslt_nm',
        'version',
        'top_genre',    
        'src_regr',      
        'album_type',    
        'lyrics_chk',    
        'encode_yn',     
        'new_flag',      
        'subtitle',      
        'artist_2',      
        'artist_3',      
        'down_limit_id' 
    ]
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
    },
    'searchMusicAll': ({page_num, page_sizes, scn, query, orderby, bool=true})  => {
        const searchParam = new URLSearchParams();
        searchParam.append('page_num', page_num);
        searchParam.append('page_sizes', page_sizes);
        searchParam.append('scn', scn);
        searchParam.append('query', query);
        searchParam.append('orderby', orderby);
        searchParam.append('bool', bool);
        return {
            uri: '/mbs/searchEngin/doListSearchMusicAll.mb',
            method: 'POST',
            searchParam,
            fetchOptions,
            responseKey: 'fdata',
            headers: headers[scn]
        }
    },
    'doListAlbum': {
        uri: '/mbs/searchMusic/doListAlbum.mb',
        method: 'POST',
        headers: [
            "receipt_no",
            "song_name",
            "dlbr_rslt2",
            "release_year",
            "runtime",
            "del_flag",
            "artist_type",
            "dat_flag",
            "reg_no",
            "size",
            "album_place",
            "version",
            "album_id",
            "rownum",
            "top_genre",
            "lyrics_chk",
            "attach_name",
            "encode_yn",
            "artist",
            "attach_path",
            "track_no",
            "prgs_type",
            "dlbr_rslt",
            "modr"
        ]
    },
    'doListArtist': sch_artist => {
        const searchParam = new URLSearchParams();
        searchParam.append('sch_artist', sch_artist);
        return {
            uri: '/mbs/regist300e/doListArtist.mb',
            method: 'POST',
            searchParam,
            fetchOptions
        }
    },
    'doGetArtistInfo': sch_id => {
        const searchParam = new URLSearchParams();
        searchParam.append('sch_id', sch_id);
        return {
            uri: '/mbs/regist300e/doGet.mb',
            method: 'POST',
            searchParam,
            fetchOptions
        }
    },
}