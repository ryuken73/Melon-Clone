import React from 'react';
import Box from '@mui/material/Box';
import styled from 'styled-components';
import ProgramBox from 'Components/Archive/ProgramBox';
import ProgramEnd from 'Components/Archive/ProgramEnd';
import TextBox from 'Components/Common/TextBox';
import ScrollBarSmooth from 'Components/Common/ScrollBarSmooth';
import useQueryPodcastProgramList from 'hooks/useQueryPodcastProgramList';
import useQueryProgramList from 'hooks/useQueryProgramList';
import useMediaQueryEasy from 'hooks/useMediaQueryEasy';
import createPodcastProgram from 'lib/podcastProgramClass';

const Container = styled(Box)`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
    height: ${prop => prop.height || "auto"};
    width: ${prop => prop.height || "auto"};

`
const replaceRequired = false;
const categoryToCompleteFlag = {
    'onair': 'N',
    'end': 'Y',
}

const PodcastProgramList = props  => {
    const {category} = props;
    const completeFlag = categoryToCompleteFlag[category];
    const result = useQueryPodcastProgramList({cmplt_yn:completeFlag});
    const mst_list = result.isSuccess ? result.data.mst_list : [];
    const podcastPrograms = mst_list.map(mst => createPodcastProgram(mst));
    console.log('^^^:', podcastPrograms)

    const {fullViewHeightMediaQuery} = useMediaQueryEasy();
    return (
        <ScrollBarSmooth
            height={`calc(${fullViewHeightMediaQuery} - 100px)`}
        >
            <Container>
                {completeFlag === 'Y' && result.isSuccess && (
                    podcastPrograms.map(program => (
                        <ProgramBox
                            key={program.pgm_cd}
                            program={program}
                            objectFit="contain"
                            category="podcast"
                            // aspectRatio="6/3"
                            // width="100%"
                        ></ProgramBox>
                    ))
                )}
                {completeFlag === 'N' && (
                    podcastPrograms.map(program => (
                        <ProgramBox 
                            key={program.pgm_cd}
                            program={program}
                            category="podcast"
                        ></ProgramBox>
                    ))
                )}
           </Container>
        </ScrollBarSmooth>
    )
}

export default React.memo(PodcastProgramList);
