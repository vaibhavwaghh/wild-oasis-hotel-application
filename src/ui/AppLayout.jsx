import { Outlet } from "react-router-dom";
import Header from "./Header";
import SideBar from "./SideBar";
import styled from "styled-components";
function AppLayout() {
  const StyledAppLayout = styled.div`
    display: grid;
    height: 100vh;
    grid-template-columns: 26rem 1fr;
    grid-template-rows: auto 1fr;
  `;
  const Main = styled.main`
    padding: 4rem 4.8rem 6.4rem;
  `;
  return (
    <StyledAppLayout>
      <Header />
      <SideBar />
      <Main>
        <Outlet />
      </Main>
    </StyledAppLayout>
  );
}

export default AppLayout;
