import React from "react"
import Seo from "../components/seo"
import { FaqContainer } from "../elements"

const faq = () => {
  return (
    <>
      <Seo title="FAQ" />
      <FaqContainer>
        <h3>
          Some breaking changes happened to the w4 form in 2020. The following
          is what you need to understand to help clarify how to properly fill a
          w4 form so you don’t get messed up at tax time.
        </h3>
        <details>
          <summary>Which steps are required for me?</summary>
          <p>
            Steps 1 and 5 are REQUIRED and MUST be fully completed no matter
            what your situation is. I’ve received many w4s with missing SSN step
            1(b). These are considered incomplete and unfit for filing.
          </p>
          <p>
            Steps 2 through 4 are optional depending on your situation. If these
            steps apply to your situation but you don’t fill them out either
            because you never had to before, don’t understand what it’s asking,
            or simply overlooked it, you WILL pay tax at tax time.
          </p>
          <h4>Step 2 applies to you if:</h4>
          <ul>
            <li>Step 1(c) has “married filing jointly” box checked.</li>
            <li className="or">OR IF</li>
            <li>You have multiple jobs.</li>
            <li className="or">OR IF</li>
            <li>
              You are married and share 2+ jobs between you and your spouse.
            </li>
          </ul>

          <h4>Step 3 applies to you if:</h4>
          <ul>
            <li>You claim a child(ren) as dependents.</li>
            <li className="or">AND/OR IF</li>
            <li>You claim an adult(s) as dependents.</li>
          </ul>
          <h4>Step 4 applies to you if:</h4>
          <ul>
            <li>Step 1(c) has “married filing jointly” box checked.</li>
            <li className="or">OR IF</li>
            <li>You have multiple jobs.</li>
            <li className="or">OR IF</li>
            <li>
              You are married and share 2+ jobs between you and your spouse.
            </li>
            <li className="or">OR IF</li>
            <li>
              You receive income from a job that doesn’t automatically withhold
              tax. (An income you receive without filing a w4 for it). This
              isn’t common.
            </li>
            <li className="or">OR IF</li>
            <li>
              If you have deductions to claim (requires an estimate of your 2022
              itemized deductions from Schedule A (Form 1040). Includes things
              like qualifying home mortgage interest, charitable contributions,
              state and local taxes, and medical expenses). This isn’t common.
            </li>
          </ul>
        </details>
        <details>
          <summary>What is withholding?</summary>
          <p>
            On every stub you receive, one of the taxes listed is “Federal
            Withholding”. This is not like the other taxes listed on the stub.
            The federal withholding is an amount you have some control of. The
            other taxes are a mandatory set percentage of your gross pay (total
            amount of your pay before tax).
          </p>
          <p>
            Imagine you have an invisible bank account with the IRS. The balance
            starts at $0 every year. By the end of the year, the IRS expects
            this balance to reach the number you are expected to owe in taxes.
            If it doesn’t, you will have to pay. If the balance exceeds what is
            owed, you get a refund.
          </p>
          <p>
            In a simple example, I file as single, have only 1 job, have no
            dependents, have no deductions to claim. The IRS will automatically
            figure the amount needed to be withheld (shown on the stub) and it
            will be deposited into this invisible bank account. Each check I
            receive adds the federal withholdings to this bank account. At the
            end of the year, let’s say I’m expected to pay $1,000 in taxes.
            Lucky for me, I’ve deposited (withheld) X amount from each paycheck
            and it added up to $1,400. 1400 - 1000 = $400 refund!
          </p>
          <p>
            In a complicated example, I’m married and my spouse and I both have
            at least one job. I check the box “married filing jointly” in step
            1(c). I assume that the federal withholding will work itself out
            like the example above. At the end of the year, let’s say I’m
            expected to pay $1,000 in taxes. Unfortunately, I skipped step 2 and
            4(c) or put 0 for step 4(c). Yes it says it’s optional, but it is
            required for this situation if you want to withhold the right
            amount. My IRS account only withheld $100! 100 - 1000 = $900 OWED.
            What gives? I filled out the w4, so what went wrong?
          </p>
          <p>
            Here’s what went wrong. I filed as married jointly, so the w4
            expects me to account for multiple incomes. Oops, I didn’t account
            for the other income(s) in step 2! Because I didn’t do that, I
            didn’t withhold the right amount to be deposited into my invisible
            bank account and now I owe the difference.
          </p>
        </details>
        <details>
          <summary>
            How in the world am I supposed to know how much to withhold?
          </summary>
          <p>
            If you file as single or married filing separately and only have one
            job, you typically won’t have to worry about it.
          </p>
          <p>
            For any other situation (multiple jobs, married and spouse works),
            step 2 offers three different ways to calculate this amount.
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
            <li className="or">OR</li>
            <li>
              Use the multiple jobs worksheet (step 2 (b)) on page 3. This
              approach can be intimidating and offers a roughly accurate answer,
              but I can help you make sense of it. Put the result on step 4(c).
            </li>
            <li className="or">OR</li>
            <li>
              If there are 2 jobs maximum and both incomes are relatively the
              same (for example: one job pays $1000 and the other pays $1250),
              you can check the box on step 2(c). This will perform the
              automatic withholdings as though you're filing as single and you
              shouldn’t need to specify an extra amount to be withheld, but it
              could be a smart idea to anyway. If I check this box and job 1
              pays $1000 while job 2 pays $5000, one of these jobs will withhold
              way more than necessary and will result in a very small net pay
              (total amount of your pay after tax) on the pay stub. You most
              likely wouldn't have to worry about paying in though and could
              receive a refund!
            </li>
          </ol>
          <p>
            Essentially, if there is more than one income to consider, you
            should expect to have an amount specified on step 4(c). If there is
            more than one income to consider but you leave step 4(c) blank or
            input 0, you will not withhold enough and should expect to pay in at
            the end of the year. If the box in step 2(c) is checked, it's up to
            you if you would like to withhold an additonal amount, but you
            shouldn't be affected as bad if you don't specify additional
            withholdings on step 4(c).
          </p>
        </details>
      </FaqContainer>
    </>
  )
}

export default faq
