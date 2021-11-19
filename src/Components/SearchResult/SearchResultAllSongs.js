import React from 'react';
import Box from '@mui/material/Box';
import useSearchAllSongs from 'hooks/useSearchAllSongs';
import {Switch, Route, withRouter} from 'react-router-dom';

function SearchResultAllSongs(props) {
    const {history, match } = props;
    const {keyword} = match.params;
    const result = useSearchAllSongs(keyword)
    return (
        <Box>
           {keyword}
        </Box>
    )
}

export default React.memo(withRouter(SearchResultAllSongs));