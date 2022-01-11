import React from 'react'
import TextBox from '../Common/TextBox';
import {withRouter} from 'react-router-dom';

const ProgramEnd = props => {
    const {program={}, history} = props;
    const {
        pgm_cd,
        pgm_nm
    } = program;
    const handleClickProgram = React.useCallback(()=> {
        history.push(`/archive/${pgm_cd}/archiveList`, {pgm_cd})
    },[history, pgm_cd])

    return (
        <TextBox
            onClick={handleClickProgram}
            text={pgm_nm}
        >
        </TextBox>
    )
}

export default React.memo(withRouter(ProgramEnd));
