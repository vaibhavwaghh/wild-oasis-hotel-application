import styled from "styled-components";
function App() {
  const H1 = styled.h1`
    font-size: 20px;
    font-weight: 300;
    color: green;
  `;
  const Button = styled.button`
    font-size: 1.4rem;
    cursor: pointer;
    padding: 1.2rem 6rem;
  `;
  return (
    <>
      <H1>HELLO WORLD</H1>
      <Button onClick={() => alert("BUTTON CLICKED")}>CLICK</Button>
    </>
  );
}

export default App;
