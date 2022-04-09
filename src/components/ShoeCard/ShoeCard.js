import React from 'react';
import styled from 'styled-components/macro';

import { COLORS, WEIGHTS } from '../../constants';
import { formatPrice, pluralize, isNewShoe } from '../../utils';
import Spacer from '../Spacer';

const ShoeCard = ({
  slug,
  name,
  imageSrc,
  price,
  salePrice,
  releaseDate,
  numOfColors,
}) => {
  // There are 3 variants possible, based on the props:
  //   - new-release
  //   - on-sale
  //   - default
  //
  // Any shoe released in the last month will be considered
  // `new-release`. Any shoe with a `salePrice` will be
  // on-sale. In theory, it is possible for a shoe to be
  // both on-sale and new-release, but in this case, `on-sale`
  // will triumph and be the variant used.
  // prettier-ignore
  const variant = typeof salePrice === 'number'
    ? 'on-sale'
    : isNewShoe(releaseDate)
      ? 'new-release'
      : 'default'

  let flagText;
  let flagColor;
  let priceOnSale;

  if(variant === 'on-sale'){
    flagText = 'Sale';
    flagColor = `${COLORS.primary}`;
    priceOnSale = formatPrice(salePrice);
  } else if(variant === 'new-release'){
    flagText = 'Just Released!'
    flagColor = `${COLORS.secondary}`;
  } else if(variant === 'default'){
    flagText = '';
    flagColor = 'transparent';
  } else{
    throw new Error(`Invalid variant : ${variant}`);
  }

  return (
    <Link href={`/shoe/${slug}`}>
      <Wrapper>
        <ImageWrapper>
          <Image alt="" src={imageSrc} />
          <Flag style={{'--flag': flagColor}}>{flagText}</Flag>
        </ImageWrapper>
        <Spacer size={12} />
        <Row>
          <Name>{name}</Name>
          <Price>{formatPrice(price)}</Price>
        </Row>
        <Row>
          <ColorInfo>{pluralize('Color', numOfColors)}</ColorInfo>
          <SalePrice>{priceOnSale}</SalePrice>
        </Row>
      </Wrapper>
    </Link>
  );
};

const Link = styled.a`
  text-decoration: none;
  color: inherit;
`;

const Wrapper = styled.article`
  display: flex;
  flex-direction: column;
`;

const ImageWrapper = styled.div`
  position: relative;
`;

const Image = styled.img`
  border-radius: 16px 16px 4px 4px;
  width: 100%;
`; 

const Row = styled.div`
  font-size: 1rem;
  display: flex;
  justify-content: space-between;
`; 

const Name = styled.h3`
  font-weight: ${WEIGHTS.medium};
  color: ${COLORS.gray[900]};
`;

const Price = styled.span`
  font-weight: ${WEIGHTS.normal};
  color: ${COLORS.gray[900]};
  
`;

const ColorInfo = styled.p`
  margin-top: 4px;
  color: ${COLORS.gray[700]};
`;

const SalePrice = styled.span`
  font-weight: ${WEIGHTS.medium};
  color: ${COLORS.primary};
`;

const Flag = styled.div`
  position: absolute;
  top: 12px;
  right: -4px;
  background-color: var(--flag);
  border-radius: 2px;
  padding: 7px 11px 9px 9px;
  color: ${COLORS.white};
`;

export default ShoeCard;
