import moment from "moment";

export const dateCalculation = (startTime: number, duration: number) => {
  let resultDate: any = moment(startTime);

  do {
    if (resultDate.day() === 0 || resultDate.day() === 6) {
      resultDate.set(resultDate.add({ day: 1 }));
      resultDate.set(resultDate.hour(10).minute(0));
    } else if (resultDate.hour() < 10) {
      resultDate.set(resultDate.hour(10).minute(0) + duration);
    } else if (resultDate.hour() < 19) {
      const timeLeft =
        (18 - resultDate.hour()) * 60 * 60 * 1000 +
        (60 - resultDate.minute()) * 60 * 1000;
      if (duration > timeLeft) {
        duration -= timeLeft;
        resultDate.set(resultDate.add({ day: 1 }));
        resultDate.set(resultDate.hour(10).minute(0) + duration);
      } else {
        if (duration < 60 * 60 * 1000) {
          resultDate.set(resultDate.add({ ms: 60 * 60 * 1000 }));
          duration = 0;
        } else {
          resultDate.set(resultDate.add({ ms: duration }));
          duration = 0;
        }
      }
    } else {
      resultDate.set(resultDate.add({ day: 1 }));
      resultDate.set(resultDate.hour(10).minute(0) + duration);
    }
  } while (
    duration !== 0 &&
    resultDate.hour() >= 10 &&
    resultDate.hour() <= 19
  );
  return resultDate.format("DD.MM.YYYY o HH:mm", "uk");
};
