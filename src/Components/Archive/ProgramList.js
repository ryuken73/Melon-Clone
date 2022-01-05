import React from 'react';
import Box from '@mui/material/Box';
import Masonry from '@mui/lab/Masonry';
import styled from 'styled-components';
import ImageBox from 'Components/Common/ImageBox';
import ScrollBarWithColor from 'Components/Common/ScrollBarWithColor';
import useQueryProgramList from 'hooks/useQueryProgramList';
import useMediaQueryEasy from 'hooks/useMediaQueryEasy';
import createProgramList from 'lib/programInfoClass';

const Container = styled(Box)`
    /* display: grid; */
    /* grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr; */
    /* display: flex; */
    /* flex-wrap: wrap; */
    height: ${prop => prop.height || "auto"};
    width: ${prop => prop.height || "auto"};
`
const replaceRequired = false;
const categoryToChanCd = {
    'powerFM': 'F',
    'loveFM': 'A',
    'onair': 'ONAIR',
    'end': 'END'
}

const ProgramList = props  => {
    const {category} = props;
    // const result = useQueryProgramList('ALL');
    // const allPrograms = createProgramList(result.data);
    // console.log('^^^:', allPrograms)
    const chan_cd = categoryToChanCd[category];
    const result = useQueryProgramList(chan_cd);
    const allPrograms = createProgramList(result.data);
    console.log('^^^:', allPrograms)
    const {fullViewHeightMediaQuery} = useMediaQueryEasy();
    return (
        <ScrollBarWithColor 
            moveScrollToTop={replaceRequired} 
            category={category}
            autoHide 
            style={{ width:'100%', height: `calc(${fullViewHeightMediaQuery} - 100px)` }}
        >
            <Container>
                <Masonry columns={5} spacing={1}>
                    {allPrograms.map(program => (
                        <ImageBox
                            key={program.pgm_cd}
                            width="100%"
                            height="auto"
                            objectFit="contain"
                            aspectRatio="0"
                            src={program.eval_imagePath}
                            withoutSrcExtension={true}
                        ></ImageBox>
                    ))}
                </Masonry>
           </Container>
        </ScrollBarWithColor>
    )
}

export default React.memo(ProgramList);
