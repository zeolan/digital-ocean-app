import React, { useState } from "react";
import { useCookies } from "react-cookie";

import { Box, Button, Modal } from "@mui/material";

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

const USER_MESSAGE = `This site uses cookies to create anonymous statistics.`;

const CookiesModal: React.FC<{ cookieName: string }> = ({ cookieName }) => {
  const [cookies, setCookies] = useCookies([cookieName]);
  const [isOpen, setIsOpen] = useState<boolean>(
    cookies[cookieName] === true ||
      cookies[cookieName] === undefined ||
      cookies[cookieName] === null
  );
  const handleClick = () => {
    setIsOpen(false);
    setCookies(cookieName, false);
  };

  return (
    <div>
      <Modal
        open={isOpen}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {USER_MESSAGE}
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
