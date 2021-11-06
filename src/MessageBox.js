import React from 'react';
import SnackBar from 'Components/Common/SnackBar';
import TextBox from 'Components/Common/TextBox';
import { useSelector } from 'react-redux';
import colors from 'config/colors';

const MessageBox = props => {
    const isMessageBoxHidden = useSelector(state => state.app.isMessageBoxHidden);
    const messageBoxText = useSelector(state => state.app.messageBoxText);
    return (
        <SnackBar hidden={isMessageBoxHidden} containerProps={{bgcolor:'black', width:'auto'}}>
            <TextBox 
                containerProps={{margin: '10px'}}
                text={messageBoxText}
                fontSize="15px"
                color="white"
            ></TextBox>
        </SnackBar>
    )
}

export default React.memo(MessageBox)