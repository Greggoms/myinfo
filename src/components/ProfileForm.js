import React, { useState, useEffect } from "react"
import { getFirestore, doc, updateDoc } from "firebase/firestore"
import { useForm } from "react-hook-form"
import DatePicker from "react-date-picker"
import { format } from "date-fns"
import { ProfileFormContainer } from "../elements"

export const ProfileForm = props => {
  const db = getFirestore()
  const [formDisabled, setFormDisabled] = useState(false)
  const [toggleEditBtn, setToggleEditBtn] = useState(false)
  const [editBtnDisabled, setEditBtnDisabled] = useState(false)
  const [value, onChange] = useState(new Date())
  const [date, setDate] = useState([])
  const [showHelp, setShowHelp] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  useEffect(() => {
    if (
      props.details &&
      props.details.position &&
      props.details.location &&
      props.details.hireDate
    ) {
      setFormDisabled(true)
      setEditBtnDisabled(true)
    } else {
      setFormDisabled(false)
      setEditBtnDisabled(false)
    }
  }, [props.details])

  useEffect(() => {
    const date = format(value, "yyyy-M-d").split("-")
    setDate(date)
  }, [value])

  const handleShowHelp = event => {
    if (event.key === "Enter") {
      setShowHelp(!showHelp)
    } else if (event.key === "Escape") {
      setShowHelp(false)
    }
  }

  const handleFormEdit = () => {
    if (toggleEditBtn) {
      setFormDisabled(true)
    } else {
      setFormDisabled(false)
    }
    return setToggleEditBtn(!toggleEditBtn)
  }

  const onSubmit = data => {
    try {
      // Update current user's document on Firestore
      async function updateFireDoc() {
        await updateDoc(doc(db, `users/${props.uid}`), {
          position: `${data.position}`,
          location: `${data.location}`,
          hireDate: [date[0], date[1], date[2]],
        })
      }
      if (toggleEditBtn === true) {
        setToggleEditBtn(!toggleEditBtn)
      }
      updateFireDoc()
      props.handleFormSubmitted()
    } catch (err) {
      console.log("Error updating/reading document: ", err)
    }
  }
  return (
    <ProfileFormContainer onSubmit={handleSubmit(onSubmit)}>
      <div className="form-content">
        <h3>Manage your profile</h3>
        <label>
          <p>
            What is your position? <span style={{ color: "#F25C69" }}>*</span>
          </p>
          <select
            {...register("position", {
              required: true,
            })}
            style={{
              cursor: formDisabled ? "not-allowed" : "auto",
            }}
            disabled={formDisabled}
          >
            <option value="">Select an Option</option>
            <option value="Associate">Associate</option>
            <option value="Assist Mngr">Assistant Manager</option>
            <option value="Manager">Manager</option>
          </select>
          <br />
          {errors.position && errors.position.type === "required" && (
            <span>You must choose a position.</span>
          )}
          <br />
        </label>
        <label>
          <div>
            Which location do you work at?{" "}
            <span style={{ color: "#F25C69" }}>*</span>
          </div>
          <select
            {...register("location", {
              required: true,
            })}
            style={{
              cursor: formDisabled ? "not-allowed" : "auto",
            }}
            disabled={formDisabled}
          >
            <option value="">Select an Option</option>
            <option value="AR Cabot">AR Cabot</option>
            <option value="AR Jacksonville">AR Jacksonville</option>
            <option value="AR Maumelle">AR Maumelle</option>
            <option value="AR Otter Creek">AR Otter Creek</option>
            <option value="AR Sherwood">AR Sherwood</option>
            <option value="AR Texarkana">AR Texarkana</option>
            <option value="AR University">AR University</option>
            <option value="VW/AR Chenal Pkwy">VW/AR Chenal Pkwy</option>
            <option value="VW Arkadelphia">VW Arkadelphia</option>
            <option value="VW Benton">VW Benton</option>
            <option value="VW Bryant">VW Bryant</option>
            <option value="VW HS Albert Pike">VW HS Albert Pike</option>
            <option value="VW HS Central Ave">VW HS Central Ave</option>
            <option value="VW Jacksonville">VW Jacksonville</option>
            <option value="VW North Little Rock">VW North Little Rock</option>
            <option value="VW Rodney Parham">VW Rodney Parham</option>
            <option value="Warehouse">Warehouse</option>
          </select>
          <br />
          {errors.location && errors.location.type === "required" && (
            <span>You must choose a location.</span>
          )}
          <br />
        </label>
        <>
          <div className="special-div">
            <p>
              When were you hired? <span style={{ color: "#F25C69" }}>*</span>
            </p>
          </div>
          <div className="hire-date-inputs">
            <DatePicker
              onChange={onChange}
              value={value}
              calendarClassName="date-picker"
              clearIcon={null}
              disabled={formDisabled}
              defaultValue={
                props.details.hireDate
                  ? new Date(
                      props.details.hireDate[0],
                      props.details.hireDate[1],
                      props.details.hireDate[2]
                    )
                  : new Date()
              }
            />
          </div>
        </>
        <div className="buttons">
          <input
            type="submit"
            value="Submit"
            className="submit-btn"
            style={{
              cursor: formDisabled ? "not-allowed" : "pointer",
            }}
            disabled={formDisabled}
          />
          <input
            type="button"
            value={toggleEditBtn ? "Cancel" : "Edit Form"}
            style={{
              cursor: !editBtnDisabled ? "not-allowed" : "pointer",
            }}
            className="edit-btn"
            onClick={handleFormEdit}
            disabled={!editBtnDisabled}
          />
        </div>
        <span
          style={{ borderBottom: "1px dotted #fff", cursor: "pointer" }}
          onClick={() => setShowHelp(!showHelp)}
          onKeyDown={handleShowHelp}
          role="button"
          tabIndex={0}
        >
          {showHelp ? "Close Help" : "Help Me!"}
        </span>
      </div>
      {showHelp && (
        <div className="form-help">
          <div>
            <h2>Position</h2>
            <p>This helps me calculate appropriate eligibility for raises.</p>
          </div>
          <div>
            <h2>Location</h2>
            <p>This is used as a quick reference point on my end.</p>
          </div>
          <div>
            <h2>Hire Date</h2>
            <p>
              This is the most useful information for filling out your profile.
              If you are not sure, just use the default date and I'll adjust it
              on my end.
            </p>
          </div>
          <div>
            <p style={{ marginBottom: "5px" }}>
              **{" "}
              <em>
                The form resets and disables itself after each submission, but
                can be edited anytime. Please avoid editing the form too
                frequently.
              </em>
            </p>
            <p>
              **{" "}
              <em>
                Be aware that some information may not be accurate until I've
                finished your profile on the database end.
              </em>
            </p>
          </div>
        </div>
      )}
    </ProfileFormContainer>
  )
}
