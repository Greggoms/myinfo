import React, { useEffect } from "react"
import { GatsbySeo } from "gatsby-plugin-next-seo"
import { StaticImage } from "gatsby-plugin-image"
import { FaqContainer } from "../css"

const Faq = () => {
  useEffect(() => {
    if (window !== "undefined") {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      })
    }
  }, [])

  return (
    <>
      <GatsbySeo nofollow={true} noindex={true} title="FAQ | AbbyHQ" />
      <FaqContainer>
        <div>
          <div className="w4">
            <h3>W-4 Forms</h3>
            <p>
              Some breaking changes happened to the w4 form in 2020. The
              following can help you understand how to properly fill a w4 form
              so you can be better prepared for tax return time.
            </p>
          </div>
          <details>
            <summary>Which steps are required for me?</summary>
            <div className="steps">
              <div className="step1and5">
                <p>
                  Steps 1 and 5 are required to be fully completed by every
                  employee no matter what your situation is. I’ve received many
                  w4s with missing SSN step 1(b). These are considered
                  incomplete and unfit for filing.
                </p>
                <>
                  <blockquote>
                    <em>Step 1 - Name, Address, SSN, and filing status</em>
                  </blockquote>
                  <StaticImage
                    src="../images/w4-step1.jpg"
                    alt="Form W-4 Step One"
                    placeholder="blurred"
                    layout="fullWidth"
                  />
                </>
                <>
                  <blockquote style={{ marginTop: "10px" }}>
                    <em>Step 5 - Signature and Date</em>
                  </blockquote>
                  <StaticImage
                    src="../images/w4-step5.jpg"
                    alt="Form W-4 Step Five"
                    placeholder="blurred"
                    layout="fullWidth"
                  />
                </>
              </div>
              <p>
                Steps 2 through 4 are optional depending on your situation. If
                these steps apply to your situation but you don’t fill them out
                either because you never had to before, don’t understand what
                it’s asking, or simply overlooked it, you WILL pay tax at tax
                time.
              </p>
              <div className="step2">
                <h4>Step 2 applies to you if at least one of these is true:</h4>
                <ul>
                  <li>You have multiple jobs.</li>
                  <li>
                    You are married and you and your spouse both have a job.
                  </li>
                  <li>Step 1(c) has “married filing jointly” box checked.</li>
                </ul>
                <>
                  <blockquote>
                    <em>Step 2 - Multiple Jobs or Spouse Works</em>
                  </blockquote>
                  <StaticImage
                    src="../images/w4-step2.jpg"
                    alt="Form W-4 Step Two"
                    placeholder="blurred"
                    layout="fullWidth"
                  />
                </>
              </div>
              <div className="step3and4">
                <h4>Step 3 applies to you if at least one of these is true:</h4>
                <ul>
                  <li>You claim a child(ren) as dependents.</li>
                  <li>You claim an adult(s) as dependents.</li>
                </ul>
                <h4>Step 4 applies to you if at least one of these is true:</h4>
                <ul>
                  <li>You have multiple jobs.</li>
                  <li>
                    You are married and you and your spouse both have a job.
                  </li>
                  <li>
                    Step 1(c) has the “married filing jointly” box checked.
                  </li>
                  <li>
                    You receive income from a job that doesn’t automatically
                    withhold tax. (An income you receive without filing a w4 for
                    it). This isn’t common.
                  </li>
                  <li>
                    If you have deductions to claim (requires an estimate of
                    your 2022 itemized deductions from Schedule A (Form 1040).
                    Includes things like qualifying home mortgage interest,
                    charitable contributions, state and local taxes, and medical
                    expenses). This isn’t common.
                  </li>
                </ul>
                <>
                  <blockquote>
                    <em>
                      Steps 3 & 4 - Claim dependents and Other Adjustments
                    </em>
                  </blockquote>
                  <StaticImage
                    src="../images/w4-step3_4.jpg"
                    alt="Form W-4 Steps Three and Four"
                    placeholder="blurred"
                    layout="fullWidth"
                  />
                </>
              </div>
            </div>
          </details>
          <details>
            <summary>What is withholding?</summary>
            <p>
              On every stub you receive, one of the taxes listed is “Federal
              Withholding”. This is not like the other taxes listed on the stub.
              The federal withholding is an amount you have some control of. The
              other taxes are a mandatory set percentage of your gross pay
              (total amount of your pay before tax).
            </p>
            <p>
              Imagine you have an invisible bank account with the IRS. The
              balance starts at $0 every year. By the end of the year, the IRS
              expects this balance to reach the amount you are expected to owe
              in taxes based on your income(s). If your balance falls short of
              what is owed, you will have a negative balance and have to pay the
              amount necessary to zero it out. If your balance exceeds what is
              owed, you get a refund for the difference.
            </p>
            <p>
              In a simple example, I file as single, have only 1 job, have no
              dependents, have no deductions to claim. The IRS will
              automatically figure the amount needed to be withheld (shown on
              the stub) and it will be deposited into this invisible bank
              account. Each check I receive adds the federal withholdings to
              this bank account. At the end of the year, let’s say I’m expected
              to pay $1,000 in taxes. Lucky for me, I’ve deposited (withheld) X
              amount from each paycheck and it added up to $1,400 (visible on
              stub under YTD column). $1,400 balance - $1,000 owed = $400
              refund!
            </p>
            <p>
              In a complicated example, I’m married and my spouse and I both
              have at least one job. I check the box “married filing jointly” in
              step 1(c). I assume that the federal withholding will work itself
              out like the example above. At the end of the year, let’s say I’m
              expected to pay $1,000 in taxes. Unfortunately, I skipped step 2
              and 4(c) or put 0 for step 4(c). Yes it says it’s optional, but it
              is required for this situation if you want to withhold the right
              amount. My IRS account only withheld $100! $100 balance - $1,000
              owed = $900 OWED. What gives? I filled out the w4, so what went
              wrong?
            </p>
            <p>
              Here’s what went wrong. I filed as married jointly (or as single
              with multiple jobs), so the w4 expects me to account for multiple
              incomes. Oops, I didn’t account for the other income(s) in step 2!
              Because I didn’t do that, I didn’t withhold the right amount to be
              deposited into my invisible bank account and now I owe the
              difference.
            </p>
          </details>
          <details>
            <summary>
              How in the world am I supposed to know how much to withhold?
            </summary>
            <p>
              If you file as single or married filing separately and only have
              one job, you typically won’t have to worry about it. At the end of
              the day, it's a game of trial and error. The amount you're
              expected to pay in taxes can change every year due to various
              circumstances, so there is no definite answer
            </p>
            <p>
              For any other situation (multiple jobs, married and spouse works),
              step 2 offers three different ways to calculate this amount. You
              can only choose ONE of the options.
            </p>
            <ol>
              <li>
                Use the estimator at{" "}
                <a
                  href="https://www.irs.gov/W4App"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  www.irs.gov/W4App
                </a>{" "}
                for the most accurate withholding. Put the result on step 4(c).
              </li>
              <p className="or">OR</p>
              <li>
                Use the multiple jobs worksheet on page 3 step 2(b). This
                approach can be intimidating and offers a roughly accurate
                answer, but I can help you make sense of it. Put the result on
                step 4(c).
              </li>
              <p className="or">OR</p>
              <li>
                If there are 2 jobs maximum and both incomes are relatively the
                same (for example: one job pays $1000 and the other pays $1250),
                you can check the box on step 2(c). This will perform the
                automatic withholdings as though you're filing as single and you
                shouldn’t need to specify an extra amount to be withheld, but it
                could be a smart idea anyway. If I check this box and my first
                job pays $1000 while my second job pays $5000, one of these jobs
                will withhold way more than necessary and will result in a very
                small net pay (total amount of your pay after tax) on the pay
                stub. You most likely wouldn't have to worry about paying in
                though and could receive a refund!
              </li>
            </ol>
            <p>
              Essentially, if there is more than one income to consider, you
              should expect to have an amount specified on step 4(c). If there
              is more than one income to consider but you leave step 4(c) blank
              or input 0, you will not withhold enough and should expect to pay
              in at the end of the year. If the box in step 2(c) is checked,
              it's up to you if you would like to withhold an additional amount,
              but you shouldn't be as affected if you don't specify additional
              withholdings on step 4(c).
            </p>
          </details>
          <details>
            <summary>How can I create/update my w-4?</summary>
            <p>
              Before you get started, please read the above information. Come
              prepared with your hire date and SSN.
            </p>
            <p>
              You can view, complete, then download the official Form W-4{" "}
              <a
                href="https://www.irs.gov/pub/irs-pdf/fw4.pdf"
                target="_blank"
                rel="noopener noreferrer"
              >
                here
              </a>
              . Email it to {`<payroll@vhdistro.net>`} afterwards. Be sure to
              fill out all required fields, and optional fields if they apply to
              you. We can print this for you if needed, though handwritten w-4s
              are least desirable.
            </p>
            <p>
              It is required for all new employees to fill out the Form w-4 from
              2020 or later. It is <em>not</em> required to submit a new w-4 for
              existing employees, though I recommend you consider your situation
              in accordance with the changes made to the form. I{" "}
              <em>strongly</em> recommend married or multi-income individuals to
              fill out a new form to calculate for federal withholdings.
            </p>
          </details>
          <details>
            <summary>Additional Resources</summary>
            <a
              href="https://www.irs.gov/payments/tax-withholding"
              target="_blank"
              rel="noopener noreferrer"
            >
              Tax Withholding
            </a>
          </details>
        </div>
        <hr />
        <div>
          <div className="direct-deposit">
            <h3>Direct Deposit</h3>
            <p>
              You will be issued a paper check if no direct deposit form has
              been submitted between the time you are hired and the moment
              payroll has been processed.
            </p>
          </div>
          <details>
            <summary>How do I get Direct Deposit?</summary>
            <h4>If you DO NOT have a checkbook</h4>
            <p>
              You will need to request a Direct Deposit Authorization form from
              your bank. Some banks allow you to request the form online, but it
              will be faster to visit a physical location. Try to get it
              prefilled with the account and routing numbers.
            </p>
            <h4>If you DO have a checkbook</h4>
            <p>
              You can skip the authorization form (though it would still be nice
              to have on file) if you have a checkbook. Take out one of your
              checks and write VOID across it. Fill out the Millennium Direct
              Deposit form and staple or tape it in the appropriate spot.
            </p>
            <p>
              Once you have the authorization form/VOID check, pick one of the
              following options:
            </p>
            <ul>
              <li>Bring it to the warehouse</li>
              <li>
                Contact your store ops manager and have them come pick it up
              </li>
              <li>
                ONLY IF time is of the essence, you can take a picture of the
                form/check and send it to {`<payroll@vhdistro.net>`}
              </li>
              <ul>
                <li>
                  <em>
                    The form/check WILL have to reach the warehouse eventually
                    so it can be added to your employee file
                  </em>
                </li>
              </ul>
            </ul>
          </details>
          <details>
            <summary>How can I update my Direct Deposit details?</summary>
            <p>
              If your bank account information changes, you will need to request
              a new Direct Deposit Authorization form as soon as possible. If
              you go the VOID check route, make sure the check has the new
              account and routing numbers.
            </p>
            <p>
              If I do not receive it by the time payroll is submitted then you
              will NOT get paid on time.
            </p>
          </details>
        </div>
        <hr />
        <div>
          <h3>Insurance</h3>
          <details>
            <summary>How do I get insurance?</summary>
            <p>
              Our health insurance is provided by{" "}
              <a
                href="https://www.uhc.com/member-resources/new-member-checklist"
                target="_blank"
                rel="noopener noreferrer"
              >
                United Healthcare
              </a>
              .
            </p>
            <p>
              You should have filled out the insurance form when you were hired.
              The last page has two different signature fields. The bottom field
              enrolls you into the insurance and marks you as OPT-IN. The top
              field waives you from insurance and marks you as OPT-OUT.
            </p>
            <p>
              Insurance benefits and check deductions become active once you
              have reached 3 months of employment.
            </p>
          </details>
        </div>
      </FaqContainer>
    </>
  )
}

export default Faq
