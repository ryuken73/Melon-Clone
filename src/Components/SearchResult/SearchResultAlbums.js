import React from 'react'
import SearchResultAlbumsScroll from './SearchResultAlbumsScroll';
import CONSTANTS from 'config/constants';
import {withRouter} from 'react-router-dom';
const {SEARCH_SONG_PAGE_SIZES} = CONSTANTS;

function SearchResultAlbums(props) {
    const {history, match, location } = props;
    const query = queryString.parse(location.search)
    const {keyword, exactSearch, artistName, songName} = query;
    const now = new Date();
    const currentTime = getString(now, {sep:''}).substr(0,12);
    const needExactSearch = React.useMemo(() => exactSearch === 'yes',[exactSearch])
    const params = needExactSearch ? {
        scn: 'album', 
        query: `(song_name_str = '${songName}' and artist_str = '${artistName}') and open_time<='${currentTime}' and status='Y'`,
        orderby: 'order by release_year desc,song_name_str asc'
    }:
    {
        scn: 'album', 
        query: `(album_idx = '${keyword}' allwordthruindexsyn or release_year='${keyword}' or label_no='${keyword}'and status='Y'
                or song_name_str like '*${keyword}*' or artist_str like '*${keyword}*') and open_time<='${currentTime}' and status='Y'`,
        orderby: 'order by release_year desc,song_name_str asc'
    };


    return (
        <SearchResultAlbumsScroll
            page_sizes={SEARCH_SONG_PAGE_SIZES}
            page_num={1}
        >
        </SearchResultAlbumsScroll>
    )
}

export default React.memo(withRouter(SearchResultAlbums))