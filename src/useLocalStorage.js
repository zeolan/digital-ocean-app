import React, { useState } from "react";

const useLocalStorage = () => {
  const usedVerbs = localStorage.getItem("verbs") || "[]";
  const [ls, setLs] = useState(usedVerbs);

  return JSON.parse(usedVerbs);
};

export default useLocalStorage;
