import data from "./data.json";

const numberOfVerbs = data.length;

export const getNextVerb = () => {
  let locStorage = JSON.parse(localStorage.getItem("verbs") || "[]");
  let verbId = "";
  let cnt = 0;
  while (cnt < numberOfVerbs * 50) {
    verbId = (Math.random() * (numberOfVerbs - 1)).toFixed(0).toString();
    if (!locStorage.includes(verbId)) {
      locStorage.push(verbId);
      break;
    }
    cnt++;
  }
  if (cnt >= numberOfVerbs * 50) {
    locStorage = [verbId];
  }

  localStorage.setItem("verbs", JSON.stringify(locStorage));
  const foundVerb = data.find((verb) => {
    return verb.id === parseInt(verbId);
  });
  return foundVerb;
};
