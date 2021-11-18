import React from 'react';
import Box from '@mui/material/Box';
import {Switch, Route, withRouter} from 'react-router-dom';

function SearchResultAll(props) {
    const {history, match } = props;
    const {keyword} = match.params;
    return (
        <Box>
           {keyword}
        </Box>
    )
}

export default React.memo(withRouter(SearchResultAll));