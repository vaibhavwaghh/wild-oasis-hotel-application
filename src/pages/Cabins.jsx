import Heading from "../ui/Heading";
import Row from "../ui/Row";
import CabinTable from "../features/cabins/CabinTable";
import Button from "../ui/Button";
import { useState } from "react";
import CreateCabinForm from "../features/cabins/CreateCabinForm";
function Cabins() {
  const [showForm, setShowForm] = useState(false);
  function handleClick() {
    setShowForm(!showForm);
  }
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All cabins</Heading>
        <p>Filter/sort</p>
      </Row>
      <Row>
        <CabinTable />
      </Row>
      <Button onClick={handleClick}>Add new Cabin</Button>
      {showForm && <CreateCabinForm />}
    </>
  );
}

export default Cabins;
