export const calculateHours = (
  textvalue: number,
  language: string,
  doctype?: string
) => {
  let editingSpeed;
  if (language === "Українська" || language === "Російська") {
    editingSpeed = 1333;
  } else {
    editingSpeed = 333;
  }
  let halftime = 0.5;
  const fullTime = (textvalue / editingSpeed + halftime) * 60 * 60 * 1000;
  if (
    doctype === ".doc" ||
    doctype === ".docx" ||
    doctype === ".rtf" ||
    doctype === undefined
  ) {
    return fullTime <= 3600 ? 3600 : fullTime;
  } else {
    return fullTime <= 3600 ? 3600 * 1.2 : fullTime;
  }
};
