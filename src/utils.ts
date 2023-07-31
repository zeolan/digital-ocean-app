export const getRandomVerbsOrder = (numVerbs: number): string[] => {
  let verbsOrder = [];
  let cnt = 0;
  while (cnt < numVerbs - 1) {
    let verbIdInt;
    do {
      verbIdInt = Math.floor(Math.random() * (numVerbs - 1));
    } while (verbsOrder.includes(verbIdInt));
    verbsOrder.push(verbIdInt);
    cnt++;
  }
  return verbsOrder;
};

export const getVerbByIdx = (verbs: any[], idx: number): any => {
  const foundVerb = verbs.find((verb) => verb.id === idx);
  return foundVerb;
};
