import {
  addDays,
  differenceInCalendarDays,
  differenceInCalendarMonths,
} from "date-fns"

export const currentYear = new Date().getFullYear()
export const currentMonth = parseInt(new Date().getMonth() + 1)
export const currentDay = new Date().getDate()

export const remainingPTO = (
  hireYear,
  hireMonth,
  hireDay,
  hoursUsed,
  pending
) => {
  const result = differenceInCalendarDays(
    new Date(currentYear, currentMonth, currentDay),
    new Date(hireYear, hireMonth, hireDay)
  )
  return pending
    ? `${Math.floor(result / 91) * 10 - hoursUsed} - (${pending
        .map(({ hours }) => hours)
        .join(` + `)} Pending)`
    : Math.floor(result / 91) * 10 - hoursUsed
}

export const daysUntil10Hrs = (hireYear, hireMonth, hireDay) => {
  const result = differenceInCalendarDays(
    new Date(currentYear, currentMonth, currentDay),
    new Date(hireYear, hireMonth, hireDay)
  )
  return 91 - (result % 91)
}

export const dateFor10Hrs = (hireYear, hireMonth, hireDay) => {
  const result = addDays(
    new Date(currentYear, currentMonth, currentDay),
    daysUntil10Hrs(hireYear, hireMonth, hireDay)
  )
  return `${parseInt(
    result.getMonth()
  )}/${result.getDate()}/${result.getFullYear()}`
}

export const monthsWorked = (year, day, month) => {
  const result = differenceInCalendarMonths(
    new Date(currentYear, currentMonth, currentDay),
    new Date(year, day, month)
  )
  return result
}
export const lifetimePTO = (hireYear, hireMonth, hireDay) => {
  const result = differenceInCalendarDays(
    new Date(currentYear, currentMonth, currentDay),
    new Date(hireYear, hireMonth, hireDay)
  )
  return Math.floor(result / 91) * 10
}
