import React from 'react'
import Box from '@mui/material/Box';
import styled from 'styled-components';
import AlbumBoxImage from 'Components/Album/AlbumBoxImage';
import TextBox from '../Common/TextBox';
import ImageBox from '../Common/ImageBox';
import LinkArtist from 'Components/Links/LinkArtist';

const Container = styled(Box)`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-right: 5px;
    margin-top: 15px;
    padding: 5px;
    height: ${prop => prop.height || "auto"};
    width: ${prop => prop.height || "auto"};
    /* border: 2px solid grey; */
    border-radius: 5px;
`

const ArchiveBox = props => {
    const {
        // receipt_no=0,
        // nameAlbum="잊어야 한다는", 
        // nameArtist="김광석", 
        // matched,
        // imagePath="/images/no_image_black.jpg", 
        program = {},
        resizeOnHover=true,
        preserveHtmlTag=false,
        history,
        lazyLoading=true,
        // releaseYear
    } = props;
    const {
        pgm_cd,
        pgm_nm,
        eval_imagePath,
    } = program;

    const handleClickProgram = React.useCallback(()=> {
        history.push(`/archive/${pgm_cd}/archiveList`, {pgm_cd})
    },[history, pgm_cd])

    return (
        <Container>
            <ImageBox 
                key={pgm_cd}
                width="100%"
                height="auto"
                objectFit="contain"
                aspectRatio="0"
                src={eval_imagePath}
                withoutSrcExtension={true}
            ></ImageBox>
            <Box marginTop="5px"></Box>
            <TextBox 
                fontSize="14px" 
                color="white" 
                opacity="0.7" 
                opacityOnHover="0.9"
                text={pgm_nm}
                preserveHtmlTag={preserveHtmlTag}
                onClick={handleClickProgram}
            >
            </TextBox>
            <Box display="flex" flexDirection="row" alignItems="center" width="100%">
            </Box>
        </Container>
    )
}

export default React.memo(ArchiveBox)
