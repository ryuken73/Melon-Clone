import React from 'react'
import Box from '@mui/material/Box';
import styled from 'styled-components';
import {withRouter} from 'react-router-dom';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import HoverButton from './Components/Common/ButtonHover';

const Container = styled(Box)`
    display: flex;
    padding: 5px;
    justify-content: center;
    align-items: center;
    background: transparent;
`
const CenterHeaderNav = props => {
    const {history, historyPushedCount, setHistoryPushedCount} = props;
    const [currentHistoryIndex, setCurrentHistoryIndex] = React.useState(0);

    React.useEffect(() => {
        console.log('history changed', history)
        if(history.action === 'PUSH'){
            setHistoryPushedCount(count => {
                setCurrentHistoryIndex(index => {
                    if(count === index){
                        return index+1;
                    } else {
                        return count+1;
                    }
                })
                return count+1;
            })
        }
    }, [history.location])

    const goBack = React.useCallback(()=>{
        history.go(-1);
        setCurrentHistoryIndex(index => {
            return index === 0 ? index : index -1;
        })
    },[history])

    const goForward = React.useCallback(()=>{
        history.go(1);
        setCurrentHistoryIndex(index => {
            return index === historyPushedCount ? historyPushedCount : index + 1;
        })
    },[history, historyPushedCount]);

    const disabledBack = currentHistoryIndex === 0;
    const disabledForward = currentHistoryIndex === historyPushedCount;


    return (
        <Container>
            <Box mx="2px">
                <HoverButton 
                    disabled={disabledBack} 
                    onClick={goBack}
                ><ArrowBackIosIcon fontSize="small">
                </ArrowBackIosIcon>
            </HoverButton>
            </Box>
            <Box mx="2px">
                <HoverButton 
                    disabled={disabledForward} 
                    onClick={goForward}
                ><ArrowForwardIosIcon fontSize="small">
                </ArrowForwardIosIcon>
            </HoverButton>
            </Box>
        </Container>
    )
}

export default withRouter(CenterHeaderNav);
