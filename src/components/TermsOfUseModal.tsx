import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { Box, Button, Modal } from "@mui/material";

import { getShowTermsOfUse, setShowTermsOfUse } from "../store/reducer.ts";

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

const USER_MESSAGE = `This site collects anonymous statistics to improve application`;

const TermsOfUseModal: React.FC = () => {
  const dispatch = useDispatch();
  const isOpen = useSelector(getShowTermsOfUse);
  const handleClick = () => {
    dispatch(setShowTermsOfUse(false));
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

export default TermsOfUseModal;
