import React from 'react';
import Box from '@mui/material/Box';
import styled from 'styled-components';
import CommonPageHeader from 'Components/Common/CommonPageHeader';
import TextBox from 'Components/Common/TextBox';
import TextBoxHighlight from 'Components/Common/TextBoxHighlight';
import queryString from 'query-string';
import {qsToNavigateInSearchResult} from 'lib/util';
import {Switch, Route, withRouter} from 'react-router-dom';

const Container = styled(Box)`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    background: transparent;
`

const SubContainer = styled(Box)`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: baseline;
    width: 450px;
    margin-bottom: 10px;
`

const PATHS = {
    '방송중': '/program/onair',
    '방송종료': '/program/end',
    'POWER FM': '/program/powerFM',
    'LOVE FM': '/program/loveFM'
}

const findPathKeyByCategory = category => {
    const index = Object.values(PATHS).findIndex(path => path.endsWith(category));
    return Object.keys(PATHS)[index] || '방송중';
}

function ProgramPageBar(props) {
    const {history, match, location} = props;
    const {category} = match.params;
    const [activeTab, setActiveTab] = React.useState('방송중');
    React.useEffect(()=>{
        const tabname = findPathKeyByCategory(category)
        setActiveTab(tabname);
    },[category])

    const handleClick = React.useCallback(event => {
        const tabName = event.target.innerText;
        // setActiveTab(tabName);
        history.push(`${PATHS[tabName]}`, {tabName});
    },[history])

    return (
        <Container>
            <CommonPageHeader>
                <SubContainer>
                    <TextBox 
                        fontSize="25px" 
                        color="white" 
                        opacity="0.7" 
                        opacityOnHover="0.7" 
                        cursor="auto"
                        text="라디오 아카이브">
                    </TextBox>
                    {Object.keys(PATHS).map(category => (
                        <TextBoxHighlight key={category} text={category} active={activeTab === category} onClick={handleClick}></TextBoxHighlight>
                    ))}
                </SubContainer>
            </CommonPageHeader>
        </Container>
    )
}

export default React.memo(withRouter(ProgramPageBar));
