import styled from "styled-components";
import { useUser } from "../features/authentication/useUser";
import Spinner from "./Spinner";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const FullPage = styled.div`
  height: 100vh;
  background-color: var(--color-grey-50);
  display: flex;
  justify-content: center;
  align-items: center;
`;

function ProtectedRoute({ children }) {
  /**1) Load the authenticated user */
  const { isLoading, isAuthenticated } = useUser();

  /**2) If there is no authenticated user redirect to /login */
  const navigate = useNavigate();
  useEffect(
    function () {
      if (!isAuthenticated && !isLoading) navigate("/login");
    },
    [isLoading, isAuthenticated, navigate]
  );
  /**3) While loading show the spinner */
  if (isLoading)
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );
  /**4) If there is a authenticated user render the app */
  if (isAuthenticated) {
    return <>{children}</>;
  }
}

export default ProtectedRoute;
