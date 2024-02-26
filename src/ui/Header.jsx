import styled from "styled-components";

function Header() {
  const StyledHeader = styled.header`
    padding: 1.2rem 4.8rem;
    border-bottom: 1px solid var(--color-grey-100);
    background-color: var(--color-grey-0);
    /* background-color: red; */
  `;
  return <StyledHeader>HEADER</StyledHeader>;
}

export default Header;
