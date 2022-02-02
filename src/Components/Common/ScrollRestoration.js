import React from 'react';
import {withRouter} from 'react-router-dom';

const ScrollRestoration = props => {
    const {history} = props;
    return (
        <React.Fragment>
            {props.children}
        </React.Fragment>
    )
}

export default React.memo(withRouter(ScrollRestoration));
