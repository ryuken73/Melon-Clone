import CONSTANTS from 'config/constants';
const {
    SEARCH_PAGE_NUM,
    SEARCH_PAGE_SIZE
} = CONSTANTS;

export const baseUrl = {
    'musicbank': 'http://musicbank.sbs.co.kr'
}

export const genre = {
  'kpop': 4,
  'pop': 58,
  'classic': 144,
  'etc': 0
}

export const responseToObject = (fdata, headers) => {
    return fdata.map(responses => {
        return responses.reduce((acc, response, index) => {
            acc[headers[index]] = response;
            return acc;
        },{})
    })
}

const DEFAULT_FETCH_OPTIONS = {
    headers: {
        'Content-type': 'application/x-www-form-urlencoded;charset=UTF-8',
    }
}

export const headers = {
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
    ], 
    album: [
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
    ],
    artist: [
        'key',
        'artist',
        'artist_type',
        'genre',
        'debut_song',
        'title_song',
        'belong',
        'member',
        'attach_name',
        'attach_size',
        'attach_path',
        'genre_nm',
        'nm_idx',
        'nm_hex',
        'nm_asc'
    ],
    lyrics: [
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
        'dlbr_rslt',
        'dlbr_rslt_nm',
        'lyrics',
        'lyricist'
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
    'searchMusicAll': ({page_num=SEARCH_PAGE_NUM, page_sizes=SEARCH_PAGE_SIZE, scn, query, orderby, bool=true})  => {
        const searchParam = new URLSearchParams();
        searchParam.append('page_num', page_num);
        searchParam.append('page_sizes', page_sizes);
        searchParam.append('scn', scn);
        searchParam.append('query', query);
        searchParam.append('orderby', orderby);
        searchParam.append('bool', bool);
        return {
            url: '/mbs/searchEngin/doListSearchMusicAll.mb',
            fetchOptions: {
                method: 'POST',
                body: searchParam,
                ...DEFAULT_FETCH_OPTIONS
            },
            responseMap: {
                key: 'fdata',
                headers: headers[scn]
            }
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
    // doListAlbum.mb
    // returns album info like collect_dt, remark..
    'doListAlbum.mb': receipt_no => {
        const searchParam = new URLSearchParams();
        searchParam.append('receipt_no', receipt_no);
        return {
            url: '/mbs/searchMusic/doListAlbum.mb',
            fetchOptions: {
                method: 'POST',
                body: searchParam,
                ...DEFAULT_FETCH_OPTIONS
            }
        }

    },
    // doListArtist
    // returns {"sch_artist":"하은","list":[{"id":30034,"artist":"하은"}],"dataMap":{}}
    'doListArtist': sch_artist => {
        const searchParam = new URLSearchParams();
        searchParam.append('sch_artist', sch_artist);
        return {
            url: '/mbs/regist300e/doListArtist.mb',
            fetchOptions: {
                method: 'POST',
                body: searchParam,
                ...DEFAULT_FETCH_OPTIONS
            }
        }
    } ,

    // doGetArtistInfo
    // returns {
    // dataMap: {}
    // info: {genre: "2", member: "", attach_org_name: "장하은.jpg", belong: "", artist_type: "여성솔로", id: 28087,…}
    // artist: "장하은"
    // artist_type: "여성솔로"
    // attach_name: "a-1c3458a-d3eb-41e3-8ab7-97729a6ef417.jpg"
    // attach_org_name: "장하은.jpg"
    // attach_path: "20120606"
    // attach_size: "14460"
    // belong: ""
    // debut_song: "단물 쪽"
    // genre: "3"
    // genre_nm: "/국내음악/가요/트로트"
    // id: 28085
    // member: ""
    // title_song: ""
    // sch_id: "28085"
    // }
    'doGetArtistInfo': sch_id => {
        // console.log('^^ called sch_id=', sch_id)
        const searchParam = new URLSearchParams();
        searchParam.append('sch_id', sch_id);
        return {
            url: '/mbs/regist300e/doGet.mb',
            fetchOptions: {
                method: 'POST',
                body: searchParam,
                ...DEFAULT_FETCH_OPTIONS
            }
        }
    },
    // doFileSize
    // returns {
    // dataMap: {}
    // gubun: 'M'
    // params: "4MB029515_Track01;Audio_WAVE1;2021110386;001;4MB029515---"
    // song_list: [
    //     {
    //         file_path: "Audio_WAVE1"
    //         label_no: "4MB029515"
    //         receipt_no: "2021110386"
    //         reg_no: "001"
    //         size: 0
    //         track_no: "4MB029515_Track01"
    //         wavsize: 28873466
    //     }
    // ]
    //}
    'doFileSize': (params, gubun='M') => {
        const postBody = new URLSearchParams();
        postBody.append('params', params);
        return {
            url: `/mbs/help_file/doFileSize.mb?gubun=${gubun}`,
            fetchOptions: {
                method: 'POST',
                body: postBody,
                ...DEFAULT_FETCH_OPTIONS
            }
        }

    },
    // get artist info by sch_id
    // 'doGet.mb': (params) => {
    //     const postBody = new URLSearchParams();
    //     postBody.append('params', params);
    //     return {
    //         url: `/mbs/regist300e/doGet.mb`,
    //         fetchOptions: {
    //             method: 'POST',
    //             body: postBody,
    //             ...DEFAULT_FETCH_OPTIONS
    //         }
    //     }
    // },
    'querySuggest': searchKeyword => {
        return {
            url: `http://10.11.31.51:3010/searchSong/withWorkers/${searchKeyword}?userId=null&supportThreeWords=true&count=100`,
            fetchOptions: {
                method: 'GET'
            }
        }
    }
}