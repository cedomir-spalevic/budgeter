const monthList = [
   "January",
   "February",
   "March",
   "April",
   "May",
   "June",
   "July",
   "August",
   "September",
   "October",
   "November",
   "December"
];

export const getCurrentMonthSpan = (): string => {
   const date = new Date();
   const next = new Date();
   next.setMonth(next.getMonth() + 1);
   return `${monthList[date.getMonth()]}, ${date.getFullYear()} - ${
      monthList[date.getMonth()]
   }, ${date.getFullYear()}`;
};

export const formatDate = (date: Date): string =>
   `${monthList[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
