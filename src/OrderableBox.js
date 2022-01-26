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
      setOrderByString, 
      setOrderByDirection
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
      setOrderByString({
          page,
          orderByString
      })
      setOrderByDirection({
          page,
          orderByDirection: newOrderByDirection
      })
  },[setOrderBy, setOrderByString, setOrderByDirection, orderByString, orderByDirection, page, active])
  const ArrowOrderRecent = orderByDirection === 'asc' ? ArrowDownward : ArrowUpward;
  return (
      <Box onClick={handleClick} {...rest}>
          <Box display="flex" flexDirect="row" alignItems="center">
            {props.children}
            {active && <ArrowOrderRecent fontSize="8px" sx={{opacity:'0.7', color: 'yellow'}}></ArrowOrderRecent>}
          </Box>
      </Box>
  )
}

export default React.memo(OrderableBox)