import React from 'react'
import Box from '@mui/material/Box';
import styled from 'styled-components';
import ImageBox from 'Components/Common/ImageBox';
import TextBox from 'Components/Common/TextBox';

const Container = styled(Box)`
    display: flex;
    flex-direction: row;
    height: ${prop => prop.height || "auto"};
    width: ${prop => prop.height || "auto"};
`
const InfoContainer = styled(Box)`
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-left: 20px;
`

const AlbumDetailInfo = props => {
    return (
        <InfoContainer>
            <TextBox mb="20px" fontSize="14px" text="싱글"></TextBox>
            <TextBox mt="10px" fontSize="18px" color="white" text="2021 월간 윤종신 Repair 10월호"></TextBox>
            <TextBox my="5px" fontSize="15px" opacity="0.9" text="윤종신"></TextBox>
            <TextBox fontSize="14px" text="2021.10.21"></TextBox>
        </InfoContainer>
    )
}

const AlbumDetailHeader = () => {
    return (
        <Container>
            <ImageBox width="150px" height="150px"></ImageBox>
            <AlbumDetailInfo></AlbumDetailInfo>
        </Container>
    )
}

export default React.memo(AlbumDetailHeader)