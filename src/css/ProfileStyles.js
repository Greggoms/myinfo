import styled from "styled-components"

export const ProfileContainer = styled.section`
  display: flex;
  flex-direction: column;
  gap: 20px;

  @media ${props => props.theme.breakpoints.tablet} {
    display: grid;
    grid-template-columns: fit-content 1fr;
    grid-template-areas:
      "aside info-pto"
      "ptoRequestForm ptoRequestForm"
      "requests requests"
      "info-dates info-account";
  }

  @media ${props => props.theme.breakpoints.desktop} {
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-areas:
      "aside info-pto info-dates"
      "ptoRequestForm requests requests"
      ". info-account info-account";
  }
  @media ${props => props.theme.breakpoints.huge} {
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-template-areas:
      "aside info-pto info-dates info-dates"
      "ptoRequestForm requests requests info-account";
  }

  .pto-request-form {
    grid-area: ptoRequestForm;

    display: grid;
    grid-template-columns: minmax(250px, 500px);
    grid-template-rows: min-content;
    justify-content: center;

    /* this is the PtoRequestForm */
    section {
      z-index: 1;
      margin: 0 auto;

      grid-column: 1 / -1;
      grid-row: 1 / -1;
    }

    /* 
    This is if i want a background clip
    .path {
      grid-column: 1 / -1;
      grid-row: 1 / -1;
      width: 100%;
      height: 100%;

      background: ${props => props.theme.colors.linkLight};
      clip-path: polygon(20% 0%, 100% 80%, 100% 100%, 0% 100%, 0% 0%);
    } 
    */
  }

  svg {
    font-size: 16pt;
    width: 20px;
  }

  hr {
    margin: 0;
    margin-bottom: 10px;
    border-top: 1px solid ${props => props.theme.grayscale.light1};

    &.flexed {
      margin: 5px 0 10px;
    }
  }
`

export const EmployeeInfoContainer = styled.section`
  grid-area: aside;
  aside {
    background: ${props => props.theme.grayscale.dark1};
    padding: 10px;
  }

  h2 {
    text-align: center;
  }

  .aside-info {
    &__piece {
      display: flex;
      gap: 10px;

      &:not(:last-child) {
        margin-bottom: 10px;
      }
    }
  }

  .stats {
    h2 {
      text-align: left;
    }
    .stat {
      &:not(:last-child) {
        margin-bottom: 10px;
      }
    }
  }
`
export const RemainingPtoContainer = styled.section`
  grid-area: info-pto;

  display: flex;
  flex-direction: column;
  gap: 5px;

  span {
    font-size: 9pt;
    color: ${props => props.theme.grayscale.light2};
  }

  .badge {
    flex: 1;

    display: flex;
    flex-direction: column;
    justify-content: center;

    background: ${props => props.theme.grayscale.light1};
    color: ${props => props.theme.grayscale.dark4};
    padding: 10px;
    text-align: center;
  }

  .requests-container {
    display: flex;
    flex-direction: column;
    gap: 5px;
  }
`
export const PtoStatusContainer = styled.section`
  grid-area: requests;

  display: flex;
  flex-direction: column;
  gap: 5px;

  .request {
    background: ${props => props.theme.grayscale.dark4};
    padding: 10px;
  }

  h2 {
    color: ${props => props.theme.grayscale.light1};
    margin-bottom: 10px;
  }

  ul li {
    margin-left: 20px;
  }

  span {
    font-size: 9pt;
    color: ${props => props.theme.grayscale.light2};
  }
`

export const EmploymentDatesContainer = styled.section`
  grid-area: info-dates;

  display: flex;
  flex-direction: column;
  gap: 5px;

  background: ${props => props.theme.grayscale.dark4};
  padding: 10px;

  span {
    font-size: 9pt;
    color: ${props => props.theme.grayscale.light2};
  }
  .words {
    display: grid;
    justify-content: space-around;
    gap: 25px;

    /* think this is causing a bug on mobile */
    /* height: 100%; */

    @media ${props => props.theme.breakpoints.huge} {
      grid-template-columns: 1fr 1fr 1fr;
      justify-items: center;
      align-content: center;

      font-size: x-large;
    }
  }
  svg {
    align-self: center;
  }
`
export const AccountInfoContainer = styled.section`
  grid-area: info-account;
  justify-self: flex-end;
  align-self: flex-start;

  display: flex;
  flex-direction: column;
  gap: 5px;

  background: ${props => props.theme.grayscale.dark4};
  padding: 10px;

  @media ${props => props.theme.breakpoints.desktop} {
    align-self: flex-start;
  }

  .account-words {
    display: flex;
    flex-direction: column;
    gap: 15px;
  }
  svg {
    align-self: center;
  }
`
