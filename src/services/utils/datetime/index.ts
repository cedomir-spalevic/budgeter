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
]

export const getCurrentMonthSpan = () => {
   let date = new Date();
   let next = new Date();
   next.setMonth(next.getMonth() + 1);
   return `${monthList[date.getMonth()]}, ${date.getFullYear()} - ${monthList[date.getMonth()]}, ${date.getFullYear()}`;
}

export const formatDate = (date: Date) => `${monthList[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;