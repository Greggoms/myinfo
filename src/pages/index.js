import React, { useState, useEffect } from "react"
import firebase from "firebase/compat/app"
import "firebase/compat/auth"
import { Link } from "gatsby"
import Seo from "../components/seo"
import { IndexPageContainer, ButtonLinkContainer } from "../elements"

const IndexPage = () => {
  const [user, setUser] = useState([])
  const [firstName, setFirstName] = useState("")

  useEffect(() => {
    try {
      let isMounted = true
      firebase.auth().onAuthStateChanged(user => {
        if (user && isMounted) {
          const str = user.displayName.split(" ")
          setUser(user)
          setFirstName(str[0])
        } else {
          setUser(null)
          setFirstName(null)
        }
      })
      return () => {
        isMounted = false
      }
    } catch (err) {
      console.log("ERROR: ", err)
    }
  }, [user])

  return (
    <IndexPageContainer>
      <Seo title="Home" />
      <div>
        <h1>Hey {user ? firstName : "There"}!</h1>
        {user ? (
          <section className="welcome">
            <h2>
              Now that you're here, check out your{" "}
              <ButtonLinkContainer>
                <Link to="/profile">profile!</Link>
              </ButtonLinkContainer>
            </h2>
            {user.email && (
              <>
                <h3>Things to notify me about</h3>
                <p>
                  Reach me by sending an email to payroll@vhdistro.net. DM me on
                  GroupMe for other inquiries or for something that needs
                  attention ASAP.
                </p>
                <article>
                  <div>
                    <h4>This Website</h4>
                    <hr />
                    <ul>
                      <li className="point">PTO Requests</li>
                      <ul>
                        <li>
                          Send an email with the date(s) and hour amount you'd
                          like to use. If I don't recieve an email, you won't
                          get your PTO usage.
                        </li>
                        <li>
                          "Hey Greggoms I'd like to use 13 hours from 4/20/69 to
                          4/21/69"
                        </li>
                        <li>
                          You should assume I know nothing about your on/off
                          days, length of shifts, or sudden scheduling changes,
                          because I won't.
                        </li>
                      </ul>
                      <li className="point">Promotions</li>
                      <ul>
                        <li>
                          If you are promoted, give me the date of your
                          promotion
                        </li>
                      </ul>
                      <li className="point">Employee Termination</li>
                      <ul>
                        <li>
                          So I can remove them from{" "}
                          <a
                            href="https://firebase.google.com/"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Firebase
                          </a>
                        </li>
                      </ul>
                    </ul>
                  </div>
                  <div>
                    <h4>Payroll</h4>
                    <hr />
                    <ul>
                      <li className="point">Time Clock Modifications</li>
                      <ul>
                        <li>
                          These should be handled by your manager. See{" "}
                          <span>PTO Requests</span> subpoint #3.
                        </li>
                        <li>
                          If you'd like to be extra sure, or if you're a
                          manager, let me know of any changes.
                        </li>
                      </ul>
                      <li className="point">Insurance Opt-In/Out</li>
                      <ul>
                        <li>
                          If you would like insurance once it becomes available
                          (3 months from hire date).
                        </li>
                        <li>
                          If you would like to remove yourself from insurance.
                        </li>
                      </ul>
                      <li className="point">Regarding New Hires</li>
                      <ul>
                        <li>I will notice them during payroll.</li>
                        <li>
                          If they'd like to get paid, I need these things from
                          them:
                        </li>
                        <ul>
                          <li>
                            Direct Deposit Form - Need Account and Routing #'s
                          </li>
                          <li>W-4 Form - Be sure to fill out the SSN</li>
                        </ul>
                      </ul>
                    </ul>
                  </div>
                </article>
              </>
            )}
          </section>
        ) : (
          <div className="intro">
            <p>
              This is the place where you can view some of your employee
              information.
            </p>
            <h4>Updates!</h4>
            <ul>
              <li>
                Introducing{" "}
                <a
                  href="https://firebase.google.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Google Firebase
                </a>
                !
              </li>
              <ul>
                <li>
                  Email doesn't matter anymore! You can now signup/login with
                  any email you want. No need to keep me updated.
                </li>
                <li>
                  Your profile will have a form you should fill out. Watch the
                  magic happen!
                </li>
                <li>
                  Once you sign up, I'll fill in your PTO <em>usage</em>{" "}
                  information (if you have any) on the database end.
                </li>
              </ul>
            </ul>
            <h4 style={{ marginTop: "50px" }}>Coming Next</h4>
            <ul>
              <li>Let me know if there are any features you'd like to see!</li>
            </ul>
          </div>
        )}
      </div>
    </IndexPageContainer>
  )
}

export default IndexPage
