import React from "react";

import { styled } from '@mui/system';
import Tooltip from "@mui/material/Tooltip";


const TooltipCustom = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))(`
    & .MuiTooltip-tooltip {
      color: black;
      margin-bottom: -10px !important;
    }
`);

export default React.memo(TooltipCustom)