import React from 'react'
import Box from '@mui/material/Box';
import styled from 'styled-components';
import TextBox from 'Components/Common/TextBox';

const TextBoxWithNoramlCursor =  styled(TextBox)`
    font-size: 14px;
`

const ItemTitle = styled(TextBoxWithNoramlCursor)`
    font-weight: string;
    color: grey;
    opacity: 0.8;
    width: 120px;
`
const ItemValue = styled(TextBoxWithNoramlCursor)`
    font-weight: string;
    color: grey;
    opacity: 1.0;
`

const ItemContainer = styled(Box)`
    display: flex;
    flex-direction: row;
    margin-top: 5px;
    margin-bottom: 5px;
`

const ItemWithTitleNValue = props => {
    const {
        title, 
        value,
        titleProps={},
        valueProps={}
    } = props;
    return (
        <ItemContainer>
            <ItemTitle text={title} {...titleProps}></ItemTitle>
            <ItemValue text={value} {...valueProps}></ItemValue>
        </ItemContainer>
    )
}

export default React.memo(ItemWithTitleNValue)
