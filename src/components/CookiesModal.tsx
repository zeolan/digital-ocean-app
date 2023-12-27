import React, { useState } from "react";
import { useCookies } from "react-cookie";

import { Box, Button } from "@mui/material";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute" as "absolute",
  bottom: "0",
  textAlign: "center",
  width: "100vw",
  border: "2px solid #000",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 2,
};

const CookiesModal: React.FC = () => {
  const [cookies, setCookies] = useCookies(["showCookiesModal"]);
  const [isOpen, setIsOpen] = useState<boolean>(
    cookies.showCookiesModal === true || cookies.showCookiesModal === undefined
  );
  const handleClick = (e: any) => {
    setIsOpen(false);
    setCookies("showCookiesModal", false);
  };

  return (
    <div>
      <Modal
        open={isOpen}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          This site uses cookies to improve user experience.
          <Button
            onClick={handleClick}
            variant="contained"
            sx={{ marginLeft: "30px" }}
          >
            I agree
          </Button>
        </Box>
      </Modal>
    </div>
  );
};

export default CookiesModal;
