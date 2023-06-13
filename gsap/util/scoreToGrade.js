export const scoreToGrade = (score) => {
  if (score > 216 && score < 278) {
    return "A";
  } else if (score > 278 && score < 343) {
    return "B";
  } else if (score > 343 && score < 407) {
    return "C";
  } else if (score > 407 && score < 470) {
    return "D";
  } else if (score > 470 && score < 533) {
    return "E";
  }
};
export const gradeToScore = (grade) => {
  switch (grade) {
    case "A":
      return 5;
    case "B":
      return 4;

    case "C":
      return 3;

    case "D":
      return 2;
    case "E":
      return 1;
  }
};
