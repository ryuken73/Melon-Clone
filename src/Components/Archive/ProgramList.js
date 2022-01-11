import React from 'react';
import Box from '@mui/material/Box';
import styled from 'styled-components';
import ProgramBox from 'Components/Archive/ProgramBox';
import ProgramEnd from 'Components/Archive/ProgramEnd';
import TextBox from 'Components/Common/TextBox';
import ScrollBarWithColor from 'Components/Common/ScrollBarWithColor';
import useQueryProgramList from 'hooks/useQueryProgramList';
import useMediaQueryEasy from 'hooks/useMediaQueryEasy';
import createProgramList from 'lib/programInfoClass';

const Container = styled(Box)`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
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
                {chan_cd !== 'END' && result.isSuccess && (
                    allPrograms.map(program => (
                        <ProgramBox
                            key={program.pgm_cd}
                            program={program}
                        ></ProgramBox>
                    ))
                )}
                {chan_cd === 'END' && (
                    allPrograms.map(program => (
                        <ProgramEnd 
                            key={program.pgm_cd}
                            program={program}
                        ></ProgramEnd>
                    ))
                )}
           </Container>
        </ScrollBarWithColor>
    )
}

export default React.memo(ProgramList);
