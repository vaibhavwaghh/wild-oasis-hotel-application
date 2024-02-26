import styled, { css } from "styled-components";

const test = css`
  text-align: center;
`;
const Heading = styled.h1`
  ${(props) =>
    props.type === "h1" &&
    css`
      font-size: 1rem;
    `}
  ${(props) =>
    props.type === "h1" &&
    css`
      font-size: 2rem;
    `}
      ${(props) =>
    props.type === "h1" &&
    css`
      font-size: 4rem;
    `}
  /* font-size: ${20 > 650 ? "20px" : "10px"}; */
  font-weight: 600;
  color: black;
  ${test}
`;

export default Heading;
