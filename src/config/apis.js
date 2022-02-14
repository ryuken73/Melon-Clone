import CONSTANTS from 'config/constants';
const {
    SEARCH_PAGE_NUM,
    SEARCH_PAGE_SIZE,
    AUTOCOMPLETE_URL,
    OPEN_API_URL,
    PODCAST_CLIENT_ID
} = CONSTANTS;

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
    ],
    archive: [
        'media_id',
        'chan_cd',
        'pgm_nm',
        'pgm_cd',
        'episode',
        'brd_dd',
        'brd_time',
        'sch_gb',
        'dj',
        'artist',
        'prgs_type',
        'duration',
        'attach_name',
        'search_summary',
        'attach_path',
        'file_size',
        'bora_archive_yn',
        'bora_archive_open_yn'
    ],
    podcast: [
        'pgm_title',
        'brad_day',
        'cast_nm',
        'cmplt_yn',
        'link',
        'media_id',
        'episode_title'
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
            url: `${AUTOCOMPLETE_URL}/searchSong/withWorkers/${searchKeyword}?userId=null&supportThreeWords=true&count=100`,
            fetchOptions: {
                method: 'GET'
            }
        }
    },
    // get Radio Program List
    'doProgramList': (b_ipp, b_page, channel) => {
        const postBody = new URLSearchParams();
        postBody.append('b_ipp', b_ipp);
        postBody.append('b_page', b_page);
        postBody.append('channel', channel);
        return {
            url: `/mbs/searchRadio/doProgramList.mb`,
            fetchOptions: {
                method: 'POST',
                body: postBody,
                ...DEFAULT_FETCH_OPTIONS
            }
        }
    },
    // get archive info and ops media_id from musicbank media_id
    'doValueRadio.mb': (media_id) => {
        const postBody = new URLSearchParams();
        postBody.append('media_id', media_id);
        return {
            url: `/mbs/regist402/doValueRadio.mb`,
            fetchOptions: {
                method: 'POST',
                body: postBody,
                ...DEFAULT_FETCH_OPTIONS
            }
        }
    },
    // get Bora Attach info (get download and streaming url)
    'doListBoraRadioAttach.mb': (asset_id, bora_archive_yn) => {
        return {
            url: `/mbs/regist402/doListBoraRadioAttach.mb?asset_id=${asset_id}&bora_archive_yn=${bora_archive_yn}`,
            fetchOptions: {
                method: 'GET'
            }
        }
    },
    // get all program list
    'doPgmListSearch.mb': options => {
        const {
            start_dd='',
            end_dd='',
            pgm_nm='',
            use_yn='Y',
            on_air='Y',
            chan_cd='',
            week_yn='',
            b_ipp=1,
            b_page=500,
            order_column='pgm_nm',
            order_direction='asc'
        } = options;
        const postBody = new URLSearchParams();
        postBody.append('start_dd', start_dd);
        postBody.append('end_dd', end_dd);
        postBody.append('pgm_nm', pgm_nm);
        postBody.append('use_yn', use_yn);
        postBody.append('on_air', on_air);
        postBody.append('chan_cd', chan_cd);
        postBody.append('week_yn', week_yn);
        postBody.append('b_ipp', b_ipp);
        postBody.append('b_page', b_page);
        postBody.append('order_column', order_column);
        postBody.append('order_direction', order_direction);
        return {
            url: `/mbs/regist201/doPgmListSearch.mb`,
            fetchOptions: {
                method: 'POST',
                body: postBody,
                ...DEFAULT_FETCH_OPTIONS
            }
        }
    },
    // get program info by pgm_cd
    'doValueAlbum2.mb': options => {
        const {pgm_cd} = options;
        const postBody = new URLSearchParams();
        postBody.append('pgm_cd', pgm_cd);
        return {
            url: `/mbs/regist202/doValueAlbum2.mb`,
            fetchOptions: {
                method: 'POST',
                body: postBody,
                ...DEFAULT_FETCH_OPTIONS
            }
        }
    },
    // get podcast program list
    'doPodCastPgmListSearch.mb': options => {
        const {
            b_ipp=0,
            b_page=99,
            cmplt_yn='N',
            service_yn='Y',
            start_dd='',
            end_dd='',
            use_yn='',
            on_air='',
            chan_cd='',
            week_yn='',
            order_column='',
            order_directions='',
        } = options;
        const postBody = new URLSearchParams();
        postBody.append('b_ipp', b_ipp);
        postBody.append('b_page', b_page);
        postBody.append('cmplt_yn', cmplt_yn);
        postBody.append('service_yn', service_yn);
        postBody.append('start_dd', start_dd);
        postBody.append('end_dd', end_dd);
        postBody.append('use_yn', use_yn);
        postBody.append('on_air', on_air);
        postBody.append('chan_cd', chan_cd);
        postBody.append('week_yn', week_yn);
        postBody.append('order_column', order_column);
        postBody.append('order_directions', order_directions);
        return {
            url: `/mbs/regist502/doPodCastPgmListSearch.mb`,
            fetchOptions: {
                method: 'POST',
                body: postBody,
                ...DEFAULT_FETCH_OPTIONS
            }
        }
    },
    // get podcast program detail from audio_pgm_id
    'doPodCastPgmSelectView.mb': options => {
        const {audio_pgm_id} = options;
        console.log('^^^^', audio_pgm_id);
        const postBody = new URLSearchParams();
        postBody.append('audio_pgm_id', audio_pgm_id);
        return {
            url: `/mbs/regist502/doPodCastPgmSelectView.mb`,
            fetchOptions: {
                method: 'POST',
                body: postBody,
                ...DEFAULT_FETCH_OPTIONS
            }
        }
    },
    // get podcast pgminfo(especially audio_pgm_tms_id) by media_id
    'doPodCastPgmInfoSelectView.mb': options => {
        const {media_id} = options;
        console.log('^^^^', media_id);
        const postBody = new URLSearchParams();
        postBody.append('media_id', media_id);
        return {
            url: `/mbs/regist505/doPodCastPgmInfoSelectView.mb`,
            fetchOptions: {
                method: 'POST',
                body: postBody,
                ...DEFAULT_FETCH_OPTIONS
            }
        }
    },
    // get download path of podcast by audio_pgm_tms_id
    'doPodAttach.mb': options => {
        const {audio_pgm_tms_id} = options;
        const postBody = new URLSearchParams();
        postBody.append('audio_pgm_tms_id', audio_pgm_tms_id);
        return {
            url: `/mbs/regist503q/doPodAttach.mb`,
            fetchOptions: {
                method: 'POST',
                body: postBody,
                ...DEFAULT_FETCH_OPTIONS
            }
        }
    },
    // get streaming path of podcast (get from ops openapi)
    'queryMediaUrl': (audio_pgm_tms_id, clientid=PODCAST_CLIENT_ID) => {
        return {
            url: `${OPEN_API_URL}/api/sbs/video/audioInfo.json?audio_pgm_tms_id=${audio_pgm_tms_id}&clientid=${clientid}`,
            fetchOptions: {
                method: 'GET'
            }
        }
    },
    // login
    'doView.do': options => {
        const {userid, password, play_chk=true} = options;
        const postBody = new URLSearchParams();
        postBody.append('userid', userid);
        postBody.append('password', password);
        postBody.append('play_chk', play_chk);
        postBody.append('music_down_path', '');
        postBody.append('iniPath', '');
        return {
            url: `/mbs/sysUser/doView.do`,
            fetchOptions: {
                method: 'POST',
                body: postBody,
                ...DEFAULT_FETCH_OPTIONS
            }
        }
    },
    // logout
    'logoutRtnNo.do': () => {
        const postBody = new URLSearchParams();
        postBody.append('p', 'p');
        return {
            url: `/mbs/sysUser/logoutRtnNo.do`,
            fetchOptions: {
                method: 'POST',
                body: postBody,
                ...DEFAULT_FETCH_OPTIONS
            }
        }
    }
}