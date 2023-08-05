export const getRandomVerbsOrder = (numVerbs: number): number[] => {
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

export const getSortedVerbsOrder = (verbs: any[]): number[] => {
  verbs.sort((a: any, b: any) => {
    var nameA = a.nameRo[0];
    if (nameA.indexOf("(se) ") !== -1) {
      nameA = nameA.slice("(se) ".length);
    } else if (nameA.indexOf("se ") !== -1) {
      nameA = nameA.slice("se ".length);
    }
    var nameB = b.nameRo[0];
    if (nameB.indexOf("(se) ") !== -1) {
      nameB = nameB.slice("(se) ".length);
    } else if (nameB.indexOf("se ") !== -1) {
      nameB = nameB.slice("se ".length);
    }
    return nameA > nameB ? 1 : nameA < nameB ? -1 : 0;
  });
  return verbs.map((verb: any) => verb.id);
};

export const getVerbByIdx = (verbs: any[], idx: number): any => {
  const foundVerb = verbs.find((verb) => verb.id === idx);
  return foundVerb;
};
