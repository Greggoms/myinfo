// import React from "react"
import { differenceInCalendarDays } from "date-fns"

export const currentYear = new Date().getFullYear()
export const currentMonth = parseInt(new Date().getMonth() + 1)
export const currentDay = new Date().getDate()
const lifetimePTO = (hireYear, hireMonth, hireDay) => {
  const result = differenceInCalendarDays(
    new Date(currentYear, currentMonth, currentDay),
    new Date(hireYear, hireMonth, hireDay)
  )
  return Math.floor(result / 91) * 10
}
const remainingPTO = (hireYear, hireMonth, hireDay, hoursUsed, pending) => {
  const result = differenceInCalendarDays(
    new Date(currentYear, currentMonth, currentDay),
    new Date(hireYear, hireMonth, hireDay)
  )
  return pending
    ? `${Math.floor(result / 91) * 10 - hoursUsed} - ${pending} (Pending)`
    : Math.floor(result / 91) * 10 - hoursUsed
}

const daysUntil10Hrs = (hireYear, hireMonth, hireDay) => {
  const result = differenceInCalendarDays(
    new Date(currentYear, currentMonth, currentDay),
    new Date(hireYear, hireMonth, hireDay)
  )
  return 91 - (result % 91)
}

const hireDate = (hireYear, hireMonth, hireDay) =>
  `${hireYear}/${hireMonth}/${hireDay}`

export const columns = [
  {
    Header: "First Name",
    accessor: "firstName",
  },
  {
    Header: "Last Name",
    accessor: "lastName",
  },
  {
    Header: "Position",
    accessor: "position",
  },
  {
    Header: "Location",
    accessor: "location",
  },
  {
    Header: "Hire Date",
    accessor: "hireDate",
  },
  {
    Header: "Lifetime PTO Hours",
    accessor: "lifetimePTO",
  },
  {
    Header: "Remaining PTO Hours",
    accessor: "remainingPTO",
  },
  {
    Header: "Days until +10hrs",
    accessor: "daysUntil10Hrs",
  },
]

export const data = [
  {
    firstName: "Drake",
    lastName: "Gallion",
    location: "VW/AR Chenal",
    hireDate: hireDate(2021, 12, 9),
    lifetimePTO: lifetimePTO(2021, 12, 9),
    remainingPTO: remainingPTO(2021, 12, 9, 0, 0),
    daysUntil10Hrs: daysUntil10Hrs(2021, 12, 9),
    email: "javangallion@gmail.com",
    position: "Associate",
  },
  {
    firstName: "Jake",
    lastName: "Elrod",
    location: "VW North LR",
    hireDate: hireDate(2021, 12, 6),
    lifetimePTO: lifetimePTO(2021, 12, 6),
    remainingPTO: remainingPTO(2021, 12, 6, 0, 0),
    daysUntil10Hrs: daysUntil10Hrs(2021, 12, 6),
    email: "jakepk1@gmail.com",
    position: "Associate",
  },
  {
    firstName: "Micheal",
    lastName: "Kifer",
    location: "Warehouse",
    hireDate: hireDate(2021, 11, 29),
    lifetimePTO: lifetimePTO(2021, 11, 29),
    remainingPTO: remainingPTO(2021, 11, 29, 0, 0),
    daysUntil10Hrs: daysUntil10Hrs(2021, 11, 29),
    email: "mkifer.1994@gmail.com",
    position: "Associate",
  },
  {
    firstName: "Johnathan",
    lastName: "Garcia",
    location: "AR Texarkana",
    hireDate: hireDate(2021, 11, 23),
    lifetimePTO: lifetimePTO(2021, 11, 23),
    remainingPTO: remainingPTO(2021, 11, 23, 0, 0),
    daysUntil10Hrs: daysUntil10Hrs(2021, 11, 23),
    email: "learza_rowan@yahoo.com",
    position: "Associate",
  },
  {
    firstName: "Timothy",
    lastName: "Crawford",
    location: "AR University",
    hireDate: hireDate(2021, 11, 18),
    lifetimePTO: lifetimePTO(2021, 11, 18),
    remainingPTO: remainingPTO(2021, 11, 18, 0, 0),
    daysUntil10Hrs: daysUntil10Hrs(2021, 11, 18),
    email: "tcbeachbum27@yahoo.com",
    position: "Associate",
  },
  {
    firstName: "Brandon",
    lastName: "Chamblee",
    location: "AR Jacksonville",
    hireDate: hireDate(2021, 11, 8),
    lifetimePTO: lifetimePTO(2021, 11, 8),
    remainingPTO: remainingPTO(2021, 11, 8, 0, 0),
    daysUntil10Hrs: daysUntil10Hrs(2021, 11, 8),
    email: "brandonkchamblee@gmail.com",
    position: "Associate",
  },
  {
    firstName: "Zach",
    lastName: "Ehemann",
    location: "AR Jacksonville",
    hireDate: hireDate(2021, 11, 2),
    lifetimePTO: lifetimePTO(2021, 11, 2),
    remainingPTO: remainingPTO(2021, 11, 2, 0, 0),
    daysUntil10Hrs: daysUntil10Hrs(2021, 11, 2),
    email: "ehemannzach@yahoo.com",
    position: "Associate",
  },
  {
    firstName: "Damon",
    lastName: "Hoover",
    location: "AR Sherwood",
    hireDate: hireDate(2021, 11, 1),
    lifetimePTO: lifetimePTO(2021, 11, 1),
    remainingPTO: remainingPTO(2021, 11, 1, 0, 0),
    daysUntil10Hrs: daysUntil10Hrs(2021, 11, 1),
    email: "dchoover1987@yahoo.com",
    position: "Associate",
  },
  {
    firstName: "Maya",
    lastName: "Kewak",
    location: "VW HS Albert Pike",
    hireDate: hireDate(2021, 10, 13),
    lifetimePTO: lifetimePTO(2021, 10, 13),
    remainingPTO: remainingPTO(2021, 10, 13, 0, 0),
    daysUntil10Hrs: daysUntil10Hrs(2021, 10, 13),
    email: "maya.kewak@outlook.com",
    position: "Associate",
  },
  {
    firstName: "Richard",
    lastName: "Wyllia",
    location: "AR Otter Creek",
    hireDate: hireDate(2021, 10, 11),
    lifetimePTO: lifetimePTO(2021, 10, 11),
    remainingPTO: remainingPTO(2021, 10, 11, 0, 0),
    daysUntil10Hrs: daysUntil10Hrs(2021, 10, 11),
    email: "rdwyllia@gmail.com",
    position: "Associate",
  },
  {
    firstName: "Caleb",
    lastName: "Borders",
    location: "VW North LR",
    hireDate: hireDate(2021, 10, 4),
    lifetimePTO: lifetimePTO(2021, 10, 4),
    remainingPTO: remainingPTO(2021, 10, 4, 0, 0),
    daysUntil10Hrs: daysUntil10Hrs(2021, 10, 4),
    email: "Boworld@yahoo.com",
    position: "Associate",
  },
  {
    firstName: "Justin",
    lastName: "Lee",
    location: "Warehouse",
    hireDate: hireDate(2021, 9, 18),
    lifetimePTO: lifetimePTO(2021, 9, 18),
    remainingPTO: remainingPTO(2021, 9, 18, 10, 0),
    daysUntil10Hrs: daysUntil10Hrs(2021, 9, 18),
    email: "justinm.lee1221@gmail.com",
    position: "Associate",
    accepted: [
      {
        dates: ["12/23/2021", "12/26/2021"],
        hours: 10,
      },
    ],
  },
  {
    firstName: "Rolland",
    lastName: "Strong",
    location: "VW Bryant",
    hireDate: hireDate(2021, 9, 6),
    lifetimePTO: lifetimePTO(2021, 9, 6),
    remainingPTO: remainingPTO(2021, 9, 6, 0, 0),
    daysUntil10Hrs: daysUntil10Hrs(2021, 9, 6),
    email: "Thouxanbans100@gmail.com",
    position: "Associate",
  },
  {
    firstName: "Garrett",
    lastName: "Hatzell",
    location: "AR University",
    hireDate: hireDate(2021, 9, 6),
    lifetimePTO: lifetimePTO(2021, 9, 6),
    remainingPTO: remainingPTO(2021, 9, 6, 0, 0),
    daysUntil10Hrs: daysUntil10Hrs(2021, 9, 6),
    email: "ghatzell23@gmail.com",
    position: "Associate",
  },
  {
    firstName: "Lauren",
    lastName: "Forthman",
    location: "VW Benton",
    hireDate: hireDate(2021, 9, 1),
    lifetimePTO: lifetimePTO(2021, 9, 1),
    remainingPTO: remainingPTO(2021, 9, 1, 0, 0),
    daysUntil10Hrs: daysUntil10Hrs(2021, 9, 1),
    email: "sherphea@gmail.com",
    position: "Associate",
  },
  {
    firstName: "Ricki",
    lastName: "Boas",
    location: "AR Sherwood",
    hireDate: hireDate(2021, 8, 30),
    lifetimePTO: lifetimePTO(2021, 8, 30),
    remainingPTO: remainingPTO(2021, 8, 30, 0, 0),
    daysUntil10Hrs: daysUntil10Hrs(2021, 8, 30),
    email: "rickilouann@gmail.com",
    position: "Associate",
  },
  {
    firstName: "Evan",
    lastName: "Atkinson",
    location: "VW Bryant",
    hireDate: hireDate(2021, 8, 30),
    lifetimePTO: lifetimePTO(2021, 8, 30),
    remainingPTO: remainingPTO(2021, 8, 30, 0, 0),
    daysUntil10Hrs: daysUntil10Hrs(2021, 8, 30),
    email: "e.atkinson2017@yahoo.com",
    position: "Associate",
  },
  {
    firstName: "Ra'Shawn",
    lastName: "Canada",
    location: "AR Maumelle",
    hireDate: hireDate(2021, 8, 25),
    lifetimePTO: lifetimePTO(2021, 8, 25),
    remainingPTO: remainingPTO(2021, 8, 25, 0, 0),
    daysUntil10Hrs: daysUntil10Hrs(2021, 8, 25),
    email: "montycanada91@gmail.com",
    position: "Assist Mngr",
  },
  {
    firstName: "River",
    lastName: "Allbritton",
    location: "Warehouse",
    hireDate: hireDate(2021, 8, 23),
    lifetimePTO: lifetimePTO(2021, 8, 23),
    remainingPTO: remainingPTO(2021, 8, 23, 0, 0),
    daysUntil10Hrs: daysUntil10Hrs(2021, 8, 23),
    email: "river.j.allbritton@gmail.com",
    position: "Associate",
  },
  {
    firstName: "Justin (Gary)",
    lastName: "Adkins",
    location: "AR Jacksonville",
    hireDate: hireDate(2021, 8, 11),
    lifetimePTO: lifetimePTO(2021, 8, 11),
    remainingPTO: remainingPTO(2021, 8, 11, 0, 0),
    daysUntil10Hrs: daysUntil10Hrs(2021, 8, 11),
    email: "jadkins210@outlook.com",
    position: "Assist Mngr",
  },
  {
    firstName: "Andrew",
    lastName: "Thompson",
    location: "AR Jacksonville",
    hireDate: hireDate(2021, 7, 27),
    lifetimePTO: lifetimePTO(2021, 7, 27),
    remainingPTO: remainingPTO(2021, 7, 27, 0, 0),
    daysUntil10Hrs: daysUntil10Hrs(2021, 7, 27),
    email: "badger69.dt@gmail.com",
    position: "Associate",
  },
  {
    firstName: "Jonathon",
    lastName: "Janssen",
    location: "AR Maumelle",
    hireDate: hireDate(2021, 7, 26),
    lifetimePTO: lifetimePTO(2021, 7, 26),
    remainingPTO: remainingPTO(2021, 7, 26, 0, 0),
    daysUntil10Hrs: daysUntil10Hrs(2021, 7, 26),
    email: "jonjansocialmail@gmail.com",
    position: "Associate",
  },
  {
    firstName: "Horace",
    lastName: "Kelley",
    location: "VW Rodney Parham",
    hireDate: hireDate(2021, 7, 14),
    lifetimePTO: lifetimePTO(2021, 7, 14),
    remainingPTO: remainingPTO(2021, 7, 14, 0, 0),
    daysUntil10Hrs: daysUntil10Hrs(2021, 7, 14),
    email: "horacekelley@gmail.com",
    position: "Associate",
  },
  {
    firstName: "Nicholas (Nick)",
    lastName: "Ammons",
    location: "VW Benton",
    hireDate: hireDate(2021, 7, 12),
    lifetimePTO: lifetimePTO(2021, 7, 12),
    remainingPTO: remainingPTO(2021, 7, 12, 8, 0),
    daysUntil10Hrs: daysUntil10Hrs(2021, 7, 12),
    email: "nammons88@gmail.com",
    position: "Associate",
    accepted: [
      {
        dates: ["Sometime between 11/29/21 & 12/12/21"],
        hours: 8,
      },
    ],
  },
  {
    firstName: "Austin",
    lastName: "Gilbert",
    location: "VW HS Central Ave",
    hireDate: hireDate(2021, 7, 8),
    lifetimePTO: lifetimePTO(2021, 7, 8),
    remainingPTO: remainingPTO(2021, 7, 8, 0, 0),
    daysUntil10Hrs: daysUntil10Hrs(2021, 7, 8),
    email: "austingilbert656@gmail.com",
    position: "Associate",
  },
  {
    firstName: "Tony",
    lastName: "Kifer",
    location: "AR Otter Creek",
    hireDate: hireDate(2021, 6, 24),
    lifetimePTO: lifetimePTO(2021, 6, 24),
    remainingPTO: remainingPTO(2021, 6, 24, 0, 0),
    daysUntil10Hrs: daysUntil10Hrs(2021, 6, 24),
    email: "tkifer0329@gmail.com",
    position: "Assist Mngr",
  },
  {
    firstName: "Cody",
    lastName: "Morrison",
    location: "VW HS Albert Pike",
    hireDate: hireDate(2021, 6, 8),
    lifetimePTO: lifetimePTO(2021, 6, 8),
    remainingPTO: remainingPTO(2021, 6, 8, 0, 0),
    daysUntil10Hrs: daysUntil10Hrs(2021, 6, 8),
    email: "cmorrison815@gmail.com",
    position: "Associate",
  },
  {
    firstName: "Brett",
    lastName: "Hula",
    location: "AR Jacksonville",
    hireDate: hireDate(2021, 6, 5),
    lifetimePTO: lifetimePTO(2021, 6, 5),
    remainingPTO: remainingPTO(2021, 6, 5, 0, 0),
    daysUntil10Hrs: daysUntil10Hrs(2021, 6, 5),
    email: "brett.hula0@gmail.com",
    position: "Manager",
  },
  {
    firstName: "Kelcye",
    lastName: "Fry",
    location: "VW Arkadelphia",
    hireDate: hireDate(2021, 5, 29),
    lifetimePTO: lifetimePTO(2021, 5, 29),
    remainingPTO: remainingPTO(2021, 5, 29, 0, 0),
    daysUntil10Hrs: daysUntil10Hrs(2021, 5, 29),
    email: "kelcye.sfry@gmail.com",
    position: "Assist Mngr",
  },
  {
    firstName: "Colten",
    lastName: "Eastworth",
    location: "VW Rodney Parham",
    hireDate: hireDate(2021, 5, 11),
    lifetimePTO: lifetimePTO(2021, 5, 11),
    remainingPTO: remainingPTO(2021, 5, 11, 0, 0),
    daysUntil10Hrs: daysUntil10Hrs(2021, 5, 11),
    email: "ceastworth@gmail.com",
    position: "Associate",
  },
  {
    firstName: "Colton",
    lastName: "Childers",
    location: "VW Benton",
    hireDate: hireDate(2021, 5, 11),
    lifetimePTO: lifetimePTO(2021, 5, 11),
    remainingPTO: remainingPTO(2021, 5, 11, 4, 0),
    daysUntil10Hrs: daysUntil10Hrs(2021, 5, 11),
    email: "cocochilders@gmail.com",
    position: "Associate",
    accepted: [
      {
        dates: ["Sometime between 11/15/21 & 11/28/21"],
        hours: 4,
      },
    ],
  },
  {
    firstName: "John",
    lastName: "Brewster",
    location: "VW North LR",
    hireDate: hireDate(2021, 5, 10),
    lifetimePTO: lifetimePTO(2021, 5, 10),
    remainingPTO: remainingPTO(2021, 5, 10, 0, 0),
    daysUntil10Hrs: daysUntil10Hrs(2021, 5, 10),
    email: "john_brewster22@yahoo.com",
    position: "Associate",
  },
  {
    firstName: "Trevor",
    lastName: "Torgerson",
    location: "AR Texarkana",
    hireDate: hireDate(2021, 5, 5),
    lifetimePTO: lifetimePTO(2021, 5, 5),
    remainingPTO: remainingPTO(2021, 5, 5, 0, 0),
    daysUntil10Hrs: daysUntil10Hrs(2021, 5, 5),
    email: "ttorgerson23@gmail.com",
    position: "Manager",
  },
  {
    firstName: "Josh",
    lastName: "Jones",
    location: "VW HS Central Ave",
    hireDate: hireDate(2021, 5, 3),
    lifetimePTO: lifetimePTO(2021, 5, 3),
    remainingPTO: remainingPTO(2021, 5, 3, 0, 0),
    daysUntil10Hrs: daysUntil10Hrs(2021, 5, 3),
    email: "Josh.jones105@yahoo.com",
    position: "Associate",
  },
  {
    firstName: "Myles",
    lastName: "Clark",
    location: "Warehouse",
    hireDate: hireDate(2021, 4, 19),
    lifetimePTO: lifetimePTO(2021, 4, 19),
    remainingPTO: remainingPTO(2021, 4, 19, 16, 0),
    daysUntil10Hrs: daysUntil10Hrs(2021, 4, 19),
    email: "xclusive828@gmail.com",
    position: "Associate",
    accepted: [
      {
        dates: ["12/15/2021", "12/16/2021"],
        hours: 16,
      },
    ],
  },
  // {
  //   firstName: "Thomas",
  //   lastName: "Ward",
  //   location: "VW Rodney Parham",
  //   hireDate: hireDate(2021, 4, 4),
  //   lifetimePTO: lifetimePTO(2021, 4, 4),
  //   remainingPTO: remainingPTO(2021, 4, 4, 0, 0),
  //   daysUntil10Hrs: daysUntil10Hrs(2021, 4, 4),
  //   email: "TAustinW@pm.me",
  //   position: "Associate",
  // },
  {
    firstName: "Reece (Ben)",
    lastName: "Frye",
    location: "VW HS Albert Pike",
    hireDate: hireDate(2021, 3, 29),
    lifetimePTO: lifetimePTO(2021, 3, 29),
    remainingPTO: remainingPTO(2021, 3, 29, 0, 0),
    daysUntil10Hrs: daysUntil10Hrs(2021, 3, 29),
    email: "bfrye553@yahoo.com",
    position: "Associate",
  },
  {
    firstName: "Ethan",
    lastName: "Smith",
    location: "AR University",
    hireDate: hireDate(2021, 3, 8),
    lifetimePTO: lifetimePTO(2021, 3, 8),
    remainingPTO: remainingPTO(2021, 3, 8, 0, 0),
    daysUntil10Hrs: daysUntil10Hrs(2021, 3, 8),
    email: "bootyscooty32@gmail.com",
    position: "Associate",
  },
  {
    firstName: "Levyn",
    lastName: "Lewis",
    location: "AR Otter Creek",
    hireDate: hireDate(2021, 3, 8),
    lifetimePTO: lifetimePTO(2021, 3, 8),
    remainingPTO: remainingPTO(2021, 3, 8, 0, 0),
    daysUntil10Hrs: daysUntil10Hrs(2021, 3, 8),
    email: "lewislevyn@gmail.com",
    position: "Associate",
  },
  {
    firstName: "Jonathon",
    lastName: "Warner",
    location: "AR University",
    hireDate: hireDate(2021, 3, 6),
    lifetimePTO: lifetimePTO(2021, 3, 6),
    remainingPTO: remainingPTO(2021, 3, 6, 0, 0),
    daysUntil10Hrs: daysUntil10Hrs(2021, 3, 6),
    email: "knojyle@gmail.com",
    position: "Assist Mngr",
  },
  {
    firstName: "Paige",
    lastName: "Boozer (Holmes)",
    location: "AR University",
    hireDate: hireDate(2021, 3, 5),
    lifetimePTO: lifetimePTO(2021, 3, 5),
    remainingPTO: remainingPTO(2021, 3, 5, 30, 0),
    daysUntil10Hrs: daysUntil10Hrs(2021, 3, 5),
    email: "vannahpholmes@gmail.com",
    position: "Associate",
    accepted: [
      {
        dates: ["Unknown"],
        hours: 30,
      },
    ],
  },
  {
    firstName: "Joseph",
    lastName: "Mapili",
    location: "Warehouse",
    hireDate: hireDate(2021, 3, 1),
    lifetimePTO: lifetimePTO(2021, 3, 1),
    remainingPTO: remainingPTO(2021, 3, 1, 8, 0),
    daysUntil10Hrs: daysUntil10Hrs(2021, 3, 1),
    email: "joe.mapili@gmail.com",
    position: "Associate",
    accepted: [
      {
        dates: ["12/17/2021"],
        hours: 8,
      },
    ],
  },
  {
    firstName: "Amy",
    lastName: "Ward",
    location: "VW Benton",
    hireDate: hireDate(2021, 2, 19),
    lifetimePTO: lifetimePTO(2021, 2, 19),
    remainingPTO: remainingPTO(2021, 2, 19, 0, 0),
    daysUntil10Hrs: daysUntil10Hrs(2021, 2, 19),
    email: "amywardlivee@gmail.com",
    position: "Associate",
  },
  {
    firstName: "Kevin",
    lastName: "Holmes",
    location: "VW North LR",
    hireDate: hireDate(2021, 1, 6),
    lifetimePTO: lifetimePTO(2021, 1, 6),
    remainingPTO: remainingPTO(2021, 1, 6, 30, 0),
    daysUntil10Hrs: daysUntil10Hrs(2021, 1, 6),
    email: "militaryholmes@gmail.com",
    position: "Associate",
    accepted: [
      {
        dates: ["Unknown"],
        hours: 30,
      },
    ],
  },
  {
    firstName: "Thadeus",
    lastName: "Samuelson",
    location: "Warehouse",
    hireDate: hireDate(2020, 12, 17),
    lifetimePTO: lifetimePTO(2020, 12, 17),
    remainingPTO: remainingPTO(2020, 12, 17, 8, 0),
    daysUntil10Hrs: daysUntil10Hrs(2020, 12, 17),
    email: "tpsamuelson97@gmail.com",
    position: "Associate",
    accepted: [
      {
        dates: ["Unknown"],
        hours: 8,
      },
    ],
  },
  {
    firstName: "Adam",
    lastName: "Reed",
    location: "VW Rodney Parham",
    hireDate: hireDate(2020, 11, 30),
    lifetimePTO: lifetimePTO(2020, 11, 30),
    remainingPTO: remainingPTO(2020, 11, 30, 0, 0),
    daysUntil10Hrs: daysUntil10Hrs(2020, 11, 30),
    email: "drumandbuglemello@gmail.com",
    position: "Assist Mngr",
  },
  {
    firstName: "Alejandro",
    lastName: "Robles",
    location: "Warehouse",
    hireDate: hireDate(2020, 11, 23),
    lifetimePTO: lifetimePTO(2020, 11, 23),
    remainingPTO: remainingPTO(2020, 11, 23, 16, 0),
    daysUntil10Hrs: daysUntil10Hrs(2020, 11, 23),
    email: "alejandro.robles11508@gmail.com",
    position: "Associate",
    accepted: [
      {
        dates: ["12/17/2021"],
        hours: 8,
      },
      {
        dates: ["Unknown"],
        hours: 8,
      },
    ],
  },
  {
    firstName: "Leif",
    lastName: "Gregan",
    location: "Warehouse",
    hireDate: hireDate(2020, 9, 14),
    lifetimePTO: lifetimePTO(2020, 9, 14),
    remainingPTO: remainingPTO(2020, 9, 14, 0, 0),
    daysUntil10Hrs: daysUntil10Hrs(2020, 9, 14),
    email: "leifgregan@gmail.com",
    position: "Associate",
  },
  {
    firstName: "Jay",
    lastName: "Myles",
    location: "VW Benton",
    hireDate: hireDate(2020, 7, 20),
    lifetimePTO: lifetimePTO(2020, 7, 20),
    remainingPTO: remainingPTO(2020, 7, 20, 0, 0),
    daysUntil10Hrs: daysUntil10Hrs(2020, 7, 20),
    email: "jmyles1315@gmail.com",
    position: "Assist Mngr",
  },
  {
    firstName: "Chase",
    lastName: "Cook",
    location: "VW Arkadelphia",
    hireDate: hireDate(2020, 6, 25),
    lifetimePTO: lifetimePTO(2020, 6, 25),
    remainingPTO: remainingPTO(2020, 6, 25, 0, 0),
    daysUntil10Hrs: daysUntil10Hrs(2020, 6, 25),
    email: "chasecook52@gmail.com",
    position: "Manager",
  },
  {
    firstName: "Nick",
    lastName: "Rodriguez",
    location: "AR Sherwood",
    hireDate: hireDate(2020, 6, 8),
    lifetimePTO: lifetimePTO(2020, 6, 8),
    remainingPTO: remainingPTO(2020, 6, 8, 0, 0),
    daysUntil10Hrs: daysUntil10Hrs(2020, 6, 8),
    email: "rodrigueznick95@gmail.com",
    position: "Manager",
  },
  {
    firstName: "Brandon",
    lastName: "Willman",
    location: "VW/AR Chenal",
    hireDate: hireDate(2020, 5, 4),
    lifetimePTO: lifetimePTO(2020, 5, 4),
    remainingPTO: remainingPTO(2020, 5, 4, 0, 0),
    daysUntil10Hrs: daysUntil10Hrs(2020, 5, 4),
    email: "bwillman95@gmail.com",
    position: "Assist Mngr",
  },
  {
    firstName: "Chris",
    lastName: "Kelley",
    location: "VW/AR Chenal",
    hireDate: hireDate(2020, 3, 23),
    lifetimePTO: lifetimePTO(2020, 3, 23),
    remainingPTO: remainingPTO(2020, 3, 23, 0, 0),
    daysUntil10Hrs: daysUntil10Hrs(2020, 3, 23),
    email: "cknmk88@gmail.com",
    position: "Manager",
  },
  {
    firstName: "Ethan",
    lastName: "Holland",
    location: "VW North LR",
    hireDate: hireDate(2020, 3, 17),
    lifetimePTO: lifetimePTO(2020, 3, 17),
    remainingPTO: remainingPTO(2020, 3, 17, 0, 0),
    daysUntil10Hrs: daysUntil10Hrs(2020, 3, 17),
    email: "retailsalesman265@icloud.com",
    position: "Manager",
  },
  {
    firstName: "Simon",
    lastName: "Sharp",
    location: "VW HS Albert Pike",
    hireDate: hireDate(2020, 2, 15),
    lifetimePTO: lifetimePTO(2020, 2, 15),
    remainingPTO: remainingPTO(2020, 2, 15, 0, 0),
    daysUntil10Hrs: daysUntil10Hrs(2020, 2, 15),
    email: "simonsosorry@icloud.com",
    position: "Assist Mngr",
  },
  {
    firstName: "Micheal",
    lastName: "Martin",
    location: "VW North LR",
    hireDate: hireDate(2019, 11, 19),
    lifetimePTO: lifetimePTO(2019, 11, 19),
    remainingPTO: remainingPTO(2019, 11, 19, 0, 0),
    daysUntil10Hrs: daysUntil10Hrs(2019, 11, 19),
    email: "whitewalker93666@gmail.com",
    position: "Associate",
  },
  {
    firstName: "Seth",
    lastName: "Willis",
    location: "AR University",
    hireDate: hireDate(2019, 11, 11),
    lifetimePTO: lifetimePTO(2019, 11, 11),
    remainingPTO: remainingPTO(2019, 11, 11, 0, 0),
    daysUntil10Hrs: daysUntil10Hrs(2019, 11, 11),
    email: "SirSeththeBrave@gmail.com",
    position: "Assist Mngr",
  },
  {
    firstName: "Alex",
    lastName: "Wools",
    location: "AR Jacksonville",
    hireDate: hireDate(2019, 10, 14),
    lifetimePTO: lifetimePTO(2019, 10, 14),
    remainingPTO: remainingPTO(2019, 10, 14, 0, 0),
    daysUntil10Hrs: daysUntil10Hrs(2019, 10, 14),
    email: "alexwools1@gmail.com",
    position: "Manager",
  },
  {
    firstName: "Clayton",
    lastName: "Simpkins",
    location: "VW Bryant",
    hireDate: hireDate(2019, 3, 11),
    lifetimePTO: lifetimePTO(2019, 3, 11),
    remainingPTO: remainingPTO(2019, 3, 11, 40, 0),
    daysUntil10Hrs: daysUntil10Hrs(2019, 3, 11),
    email: "claybank56@gmail.com",
    position: "Assist Mngr",
    accepted: [
      {
        dates: ["Unknown"],
        hours: 40,
      },
    ],
  },
  {
    firstName: "Jaren",
    lastName: "Evans",
    location: "VW Benton",
    hireDate: hireDate(2018, 12, 16),
    lifetimePTO: lifetimePTO(2018, 12, 16),
    remainingPTO: remainingPTO(2018, 12, 16, 124, 0),
    daysUntil10Hrs: daysUntil10Hrs(2018, 12, 16),
    email: "jaren.evans.13@gmail.com",
    position: "Manager",
    accepted: [
      {
        dates: ["12/16/2021"],
        hours: 5,
      },
      {
        dates: ["12/14/2021"],
        hours: 2,
      },
      {
        dates: ["Sometime between 11/15/21 & 11/28/21"],
        hours: 10,
      },
      {
        dates: ["Unknown"],
        hours: 107,
      },
    ],
  },
  {
    firstName: "Terry",
    lastName: "Julian",
    location: "VW Rodney Parham",
    hireDate: hireDate(2018, 10, 8),
    lifetimePTO: lifetimePTO(2018, 10, 8),
    remainingPTO: remainingPTO(2018, 10, 8, 45, 0),
    daysUntil10Hrs: daysUntil10Hrs(2018, 10, 8),
    email: "terryannejulian@gmail.com",
    position: "Manager",
    accepted: [
      {
        dates: ["Unknown"],
        hours: 45,
      },
    ],
  },
  {
    firstName: "Natasha",
    lastName: "Crawford",
    location: "VW HS Albert Pike",
    hireDate: hireDate(2018, 8, 13),
    lifetimePTO: lifetimePTO(2018, 8, 13),
    remainingPTO: remainingPTO(2018, 8, 13, 48, 0),
    daysUntil10Hrs: daysUntil10Hrs(2018, 8, 13),
    email: "natashacrawford72@gmail.com",
    position: "Manager",
    accepted: [
      {
        dates: ["11/27/2021"],
        hours: 8,
      },
      {
        dates: ["Unknown"],
        hours: 40,
      },
    ],
  },
  {
    firstName: "Adam",
    lastName: "Russell",
    location: "VW Bryant",
    hireDate: hireDate(2018, 5, 7),
    lifetimePTO: lifetimePTO(2018, 5, 7),
    remainingPTO: remainingPTO(2018, 5, 7, 48, 0),
    daysUntil10Hrs: daysUntil10Hrs(2018, 5, 7),
    email: "adamr7179@gmail.com",
    position: "Manager",
    accepted: [
      {
        dates: ["Unknown"],
        hours: 48,
      },
    ],
  },
  {
    firstName: "Jack",
    lastName: "Newton",
    location: "AR University",
    hireDate: hireDate(2018, 1, 11),
    lifetimePTO: lifetimePTO(2018, 1, 11),
    remainingPTO: remainingPTO(2018, 1, 11, 0, 0),
    daysUntil10Hrs: daysUntil10Hrs(2018, 1, 11),
    email: "abbyroad@gmail.com",
    position: "Manager",
  },
  {
    firstName: "David",
    lastName: "Lenderman",
    location: "AR Otter Creek",
    hireDate: hireDate(2018, 1, 11),
    lifetimePTO: lifetimePTO(2018, 1, 11),
    remainingPTO: remainingPTO(2018, 1, 11, 0, 0),
    daysUntil10Hrs: daysUntil10Hrs(2018, 1, 11),
    email: "dlenderman8823@gmail.com",
    position: "Manager",
  },
  {
    firstName: "Corbin",
    lastName: "Jenkins",
    location: "AR Maumelle",
    hireDate: hireDate(2018, 1, 11),
    lifetimePTO: lifetimePTO(2018, 1, 11),
    remainingPTO: remainingPTO(2018, 1, 11, 66, 0),
    daysUntil10Hrs: daysUntil10Hrs(2018, 1, 11),
    email: "corbinjenkins35@yahoo.com",
    position: "Manager",
    accepted: [{ dates: ["Unknown"], hours: 66 }],
  },
  {
    firstName: "Isaac",
    lastName: "Rivera",
    location: "Warehouse",
    hireDate: hireDate(2017, 8, 14),
    lifetimePTO: lifetimePTO(2017, 8, 14),
    remainingPTO: remainingPTO(2017, 8, 14, 48, 0),
    daysUntil10Hrs: daysUntil10Hrs(2017, 8, 14),
    email: "irivera9@yahoo.com",
    position: "Associate",
    accepted: [{ dates: ["Unknown"], hours: 48 }],
  },
  {
    firstName: "Greg",
    lastName: "Burton",
    location: "Warehouse",
    hireDate: hireDate(2017, 8, 14),
    lifetimePTO: lifetimePTO(2017, 8, 14),
    remainingPTO: remainingPTO(2017, 8, 14, 0, 0),
    daysUntil10Hrs: daysUntil10Hrs(2017, 8, 14),
    email: "rpggamer1337man@gmail.com",
    position: "Associate",
  },
  {
    firstName: "Nathanael",
    lastName: "Hardister",
    location: "Warehouse",
    hireDate: hireDate(2017, 5, 23),
    lifetimePTO: lifetimePTO(2017, 5, 23),
    remainingPTO: remainingPTO(2017, 5, 23, 80, 0),
    daysUntil10Hrs: daysUntil10Hrs(2017, 5, 23),
    email: "natehardister@gmail.com",
    position: "Associate",
    accepted: [{ dates: ["Unknown"], hours: 80 }],
  },
  {
    firstName: "Tyler",
    lastName: "Oswald",
    location: "Warehouse",
    hireDate: hireDate(2016, 7, 26),
    lifetimePTO: lifetimePTO(2016, 7, 26),
    remainingPTO: remainingPTO(2016, 7, 26, 68, 0),
    daysUntil10Hrs: daysUntil10Hrs(2016, 7, 26),
    email: "teddyoswald@yahoo.com",
    position: "Associate",
    accepted: [
      {
        dates: ["12/13/2021"],
        hours: 4,
      },
      {
        dates: ["Unknown"],
        hours: 60,
      },
    ],
  },
  {
    firstName: "James",
    lastName: "Freeze",
    location: "Warehouse",
    hireDate: hireDate(2016, 6, 15),
    lifetimePTO: lifetimePTO(2016, 6, 15),
    remainingPTO: remainingPTO(2016, 6, 15, 80, 0),
    daysUntil10Hrs: daysUntil10Hrs(2016, 6, 15),
    email: "thedrfreeze@gmail.com",
    position: "Associate",
    accepted: [
      {
        dates: ["Sometime Between 12/13/2021 - 12/26/2021"],
        hours: 16,
      },
      {
        dates: ["11/24/2021"],
        hours: 8,
      },
      {
        dates: ["Unknown"],
        hours: 58,
      },
    ],
  },
  {
    firstName: "Supreet",
    lastName: "Momi",
    location: "Warehouse",
    hireDate: hireDate(2015, 1, 1),
    lifetimePTO: lifetimePTO(2015, 1, 1),
    remainingPTO: remainingPTO(2015, 1, 1, 0, 0),
    daysUntil10Hrs: daysUntil10Hrs(2015, 1, 1),
    email: "supreetmomi@hotmail.com",
    position: "Owner",
  },
  {
    firstName: "Kaylyn",
    lastName: "Ray",
    location: "Warehouse",
    hireDate: hireDate(2015, 1, 1),
    lifetimePTO: lifetimePTO(2015, 1, 1),
    remainingPTO: remainingPTO(2015, 1, 1, 0, 0),
    daysUntil10Hrs: daysUntil10Hrs(2015, 1, 1),
    email: "krayray0365@gmail.com",
    position: "Owner",
  },
]
