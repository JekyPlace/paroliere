import Modal from "../components/containers/Modal/Modal";
import Home from "../Home";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function WordOpen() {
  const [isModalOpen] = useState(true);
  const navigate = useNavigate();
  return (
    <>
      <Home />
      <Modal onClose={() => navigate("/")} open={isModalOpen}></Modal>
    </>
  );
}

export default WordOpen;
