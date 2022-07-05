import styled from "styled-components"

export const ProfileContainer = styled.section`
  display: flex;
  flex-direction: column;
  gap: 20px;

  @media ${props => props.theme.breakpoints.tablet} {
    display: grid;
    grid-template-columns: fit-content 1fr;
    grid-template-areas:
      "aside-1 info-pto"
      "aside-2 info-pto"
      "ptoRequestForm ptoRequestForm"
      "requests requests"
      "info-dates info-account";

    .aside-1 {
      grid-area: aside-1;
    }
    .aside-2 {
      grid-area: aside-2;
    }
    .info-pto {
      grid-area: info-pto;
    }
    .requests-container {
      grid-area: requests;
    }
    .info-dates {
      grid-area: info-dates;
    }
    .info-account {
      grid-area: info-account;
    }
  }

  @media ${props => props.theme.breakpoints.desktop} {
    grid-template-columns: 1fr 2fr 2fr;
    grid-template-areas:
      "aside-1 info-pto info-dates"
      "aside-2 info-pto info-account"
      "ptoRequestForm ptoRequestForm ptoRequestForm"
      "requests requests requests";
  }

  svg {
    font-size: 16pt;
    width: 20px;
  }

  aside {
    background: ${props => props.theme.grayscale.dark1};
    padding: 10px;

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
  }

  section {
    span {
      font-size: 9pt;
      color: ${props => props.theme.grayscale.light2};
    }

    &.info-pto {
      display: flex;
      flex-direction: column;
      gap: 5px;

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
    }

    &.requests-container {
      display: flex;
      flex-direction: column;
      gap: 5px;
    }

    &.info-dates,
    &.info-account {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 5px;

      background: ${props => props.theme.grayscale.dark4};
      color: ${props => props.theme.grayscale.light1};
      padding: 10px;

      @media ${props => props.theme.breakpoints.desktop} {
        flex-direction: row;
      }

      .words {
        display: flex;
        flex-direction: column;
        gap: 15px;
      }

      svg {
        align-self: center;
      }
    }
  }

  .request {
    background: ${props => props.theme.grayscale.dark4};
    padding: 10px;

    h2 {
      color: ${props => props.theme.grayscale.light1};
      margin-bottom: 10px;
    }

    ul li {
      margin-left: 20px;
    }
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
