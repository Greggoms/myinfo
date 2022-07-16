import {
  addDays,
  differenceInCalendarDays,
  differenceInCalendarMonths,
  format,
} from "date-fns"

export const currentYear = new Date().getFullYear()
export const currentMonth = new Date().getMonth() + 1
export const currentDay = new Date().getDate()

export const getRemainingPto = (
  hireYear,
  hireMonth,
  hireDay,
  hoursUsed,
  pending
) => {
  const result = differenceInCalendarDays(
    new Date(),
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
    new Date(),
    daysUntil10Hrs(hireYear, hireMonth, hireDay)
  )
  return format(result, `PPPP`)
}

export const monthsWorked = (year, month, day) => {
  const result = differenceInCalendarMonths(
    new Date(),
    new Date(year, month - 1, day)
  )
  return result
}
export const lifetimePTO = (hireYear, hireMonth, hireDay) => {
  const result = differenceInCalendarDays(
    new Date(),
    new Date(hireYear, hireMonth, hireDay)
  )
  return Math.floor(result / 91) * 10
}

export const timeForReview = (name, lastRaise, hireDate, position) => {
  // if (!lastRaise) {
  //   console.log(`${name} has never been reviewed!`)
  // }
  // if (!hireDate) {
  //   console.log(`${name} has no hire date!`)
  // }
  if (lastRaise || hireDate) {
    const result = differenceInCalendarMonths(
      new Date(currentYear, currentMonth, currentDay),
      new Date(
        lastRaise ? lastRaise.split("-")[0] : hireDate.split("-")[0],
        lastRaise ? lastRaise.split("-")[1] : hireDate.split("-")[1],
        lastRaise ? lastRaise.split("-")[2] : hireDate.split("-")[2]
      )
    )
    if (
      position !== "Assist Mngr" &&
      position !== "Manager" &&
      position !== "VHD Manager"
    ) {
      return result >= 3
    } else {
      return result >= 6
    }
  }
  return null
}
