import React from 'react';
import styled from 'styled-components/macro';

import SHOES from '../../data';
import ShoeCard from '../ShoeCard';

const ShoeGrid = () => {
  return (
    <Wrapper>
      
      {SHOES.map((shoe) => (
        <Cards key={shoe.slug}>
        <ShoeCard  {...shoe} />
        </Cards>
      ))}
    
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  gap: 36px;
  flex-wrap: wrap;
`;
 
const Cards = styled.div`
  min-width: 275px;
  flex: 1;
`;

export default ShoeGrid;
