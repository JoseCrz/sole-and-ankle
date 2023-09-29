import React from "react";
import styled from "styled-components/macro";

import { COLORS, WEIGHTS } from "../../constants";
import { formatPrice, pluralize, isNewShoe } from "../../utils";
import Spacer from "../Spacer";

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

  return (
    <Link href={`/shoe/${slug}`}>
      <Wrapper>
        <ImageWrapper>
          <Image alt="" src={imageSrc} />
        </ImageWrapper>
        <Spacer size={12} />
        <ColumnWrapper>
          <Column>
            <Name>{name}</Name>
            <ColorInfo>{pluralize("Color", numOfColors)}</ColorInfo>
          </Column>
          <Column>
            {salePrice ? (
              <>
                <Price isOnSale>{formatPrice(price)}</Price>
                <SalePrice>{formatPrice(salePrice)}</SalePrice>
              </>
            ) : (
              <Price>{formatPrice(price)}</Price>
            )}
          </Column>
        </ColumnWrapper>
        <Flag variant={variant} />
      </Wrapper>
    </Link>
  );
};

const flagStyles = {
  "new-release": {
    flagBackground: COLORS.secondary,
    flagText: "Just Released!",
  },
  "on-sale": {
    flagBackground: COLORS.primary,
    flagText: "Sale",
  },
  default: {},
};

function Flag({ variant = "default" }) {
  if (variant === "default") return null;

  const { flagBackground, flagText } = flagStyles[variant];

  return (
    <FlagBox
      style={{
        "--flag-background": flagBackground,
      }}
    >
      {flagText}
    </FlagBox>
  );
}

const FlagBox = styled.div`
  top: 12px;
  right: -4px;
  position: absolute;
  padding: 8px 12px;
  background-color: var(--flag-background);
  font-weight: ${WEIGHTS.bold};
  color: ${COLORS.white};
  letter-spacing: 0.5px;
  border-radius: 2px;
`;

const ColumnWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Link = styled.a`
  text-decoration: none;
  color: inherit;
`;

const Wrapper = styled.article`
  position: relative;
`;

const ImageWrapper = styled.div`
  position: relative;
`;

const Image = styled.img`
  width: 100%;
`;

const Column = styled.div`
  font-size: 1rem;
`;

const Name = styled.h3`
  font-weight: ${WEIGHTS.medium};
  color: ${COLORS.gray[900]};
`;

const Price = styled.span`
  display: block;
  text-decoration: ${(props) => props.isOnSale && "line-through"};
  color: ${(props) => (props.isOnSale ? COLORS.gray[700] : "inherit")};
`;

const ColorInfo = styled.p`
  color: ${COLORS.gray[700]};
`;

const SalePrice = styled.span`
  font-weight: ${WEIGHTS.medium};
  color: ${COLORS.primary};
`;

export default ShoeCard;
