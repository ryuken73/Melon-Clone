import React from 'react'
import Box from '@mui/material/Box';
import styled from 'styled-components';
import ProgramBoxImage from 'Components/Archive/ProgramBoxImage';
import TextBox from '../Common/TextBox';
import {withRouter} from 'react-router-dom';

const Container = styled(Box)`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-right: 5px;
    margin-top: 15px;
    padding: 5px;
    height: ${prop => prop.height || "auto"};
    width: ${prop => prop.height || "auto"};
    border-radius: 5px;
`

const ProgramBox = props => {
    const {
        program = {},
        preserveHtmlTag=false,
        history,
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
            <ProgramBoxImage 
                pgm_cd={pgm_cd}
                title={pgm_nm}
                resizeOnHover={false}
                objectFit="contain"
                src={eval_imagePath}
                aspectRatio="9/5"
                lazyLoading={true}
                withoutSrcExtension={true}
                onClick={handleClickProgram}
            ></ProgramBoxImage>
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

export default React.memo(withRouter(ProgramBox));
