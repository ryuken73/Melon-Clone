import React from 'react';
import Box from '@mui/material/Box';
import useAppState from 'hooks/useAppState';
import ArrowDownward from '@mui/icons-material/ArrowDownward';
import ArrowUpward from '@mui/icons-material/ArrowUpward';

const toggle = orderByDirection => {
    return orderByDirection === 'asc' ? 'desc':'asc';
}

const OrderableBox = props => {
  const {
      setOrderBy, 
      orderByStrings, 
      orderByDirections, 
      setOrderByStringPart, 
      setOrderByDirectionPart
  } = useAppState();
  const {targetPage, orderByString, ...rest} = props;
  const active = orderByString === orderByStrings[targetPage];
  const orderByDirection = orderByDirections[targetPage] || 'asc';
  const handleClick = React.useCallback(() => {
      if(targetPage === undefined) return;
      const needToggle = active;
      const newOrderByDirection = needToggle ? toggle(orderByDirection) : orderByDirection;
      const orderby = `${orderByString} ${newOrderByDirection}`;
      setOrderBy({
          page:targetPage,
          orderby
      })
      setOrderByStringPart({
          page:targetPage,
          orderByString
      })
      setOrderByDirectionPart({
          page:targetPage,
          orderByDirection: newOrderByDirection
      })
  },[setOrderBy, setOrderByStringPart, setOrderByDirectionPart, orderByString, orderByDirection, targetPage, active])
  const ArrowOrderRecent = orderByDirection === 'asc' ? ArrowDownward : ArrowUpward;
  return (
      <Box onClick={handleClick} display="flex" sx={{height: '100%', position: 'relative'}} {...rest}>
        <Box display="flex" flexDirect="row" alignItems="center">
        {props.children}
        {active && <ArrowOrderRecent fontSize="8px" sx={{opacity:'0.7', color: 'yellow'}}></ArrowOrderRecent>}
        </Box>
      </Box>
  )
}

export default React.memo(OrderableBox)