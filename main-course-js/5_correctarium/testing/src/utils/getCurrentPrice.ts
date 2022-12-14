export const getCurrentPrice = (
  textvalue: number,
  language: string,
  doctype?: string
) => {
  let minPrice;
  let multiplier;
  if (language === "Українська" || language === "Російська") {
    minPrice = 50;
    multiplier = 0.05;
  } else {
    minPrice = 120;
    multiplier = 0.12;
  }
  if (language === "Українська" || language === "Російська") {
    if (
      doctype === ".doc" ||
      doctype === ".docx" ||
      doctype === ".rtf" ||
      doctype === undefined
    ) {
      return textvalue > 1000 ? textvalue * multiplier : minPrice;
    } else {
      return textvalue > 1000 ? textvalue * multiplier * 1.2 : minPrice;
    }
  } else if (language === "Англійська") {
    if (
      doctype === ".doc" ||
      doctype === ".docx" ||
      doctype === ".rtf" ||
      doctype === undefined
    ) {
      return textvalue > 1000 ? textvalue * multiplier : minPrice;
    } else {
      return textvalue > 1000 ? textvalue * multiplier * 1.2 : minPrice;
    }
  } else {
    return 0;
  }
};
