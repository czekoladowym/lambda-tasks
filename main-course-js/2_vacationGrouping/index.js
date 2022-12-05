const fs = require("fs");

const data = JSON.parse(fs.readFileSync("./data.json", "utf-8"));

function groupVacations(data) {
  const usersVacations = [];
  for (const vacation of data) {
    const i = usersVacations.findIndex(
      (user) => user.userId === vacation.user._id
    );
    if (i > 0) {
      usersVacations[i].holidayDates.push({
        startDate: vacation.startDate,
        endDate: vacation.endDate,
      });
    } else {
      usersVacations.push({
        userId: vacation.user._id,
        name: vacation.user.name,
        holidayDates: [
          {
            startDate: vacation.startDate,
            endDate: vacation.endDate,
          },
        ],
      });
    }
  }
  return usersVacations;
}
fs.writeFileSync("./newData.json", JSON.stringify(groupVacations(data)));

console.log(groupVacations(data));
