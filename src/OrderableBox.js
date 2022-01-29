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
  const {page, orderByString, ...rest} = props;
  const active = orderByString === orderByStrings[page];
  const orderByDirection = orderByDirections[page] || 'asc';
  const handleClick = React.useCallback(() => {
      const needToggle = active;
      const newOrderByDirection = needToggle ? toggle(orderByDirection) : orderByDirection;
      const orderby = `${orderByString} ${newOrderByDirection}`;
      setOrderBy({
          page,
          orderby
      })
      setOrderByStringPart({
          page,
          orderByString
      })
      setOrderByDirectionPart({
          page,
          orderByDirection: newOrderByDirection
      })
  },[setOrderBy, setOrderByStringPart, setOrderByDirectionPart, orderByString, orderByDirection, page, active])
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