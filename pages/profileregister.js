import { useState } from "react";
import styles from "../styles/register.module.css";
import { useRouter } from "next/router";

function Register() {
  const [fullName, setFullName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [nationalID, setNationalID] = useState("");
  const [position, setPosition] = useState("");
  const [nationalIdError, setNationalIdError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const router = useRouter();

  function handleInputIDChange(event) {
    const { value } = event.target;
    const regex = /^\d{0,14}$/; // regular expression to allow only numbers and a maximum of 14 digits
    if (regex.test(value)) {
      if (value.length < 14) {
        ("not enough");
      }
      setNationalID(value);
    }
  }
  function handleInputMOBChange(event) {
    const { value } = event.target;
    const regex = /^\d{0,11}$/; // regular expression to allow only numbers and a maximum of 14 digits
    if (regex.test(value)) {
      if (value.length < 11) {
        ("not enough");
      }
      setMobileNumber(value);
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const res = await fetch("/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ fullName, mobileNumber, nationalID, position }),
    });
    const data = await res.json();
    setSuccessMessage(data.message);
    setFullName("");
    setMobileNumber("");
    setNationalID("");
    setPosition("");
    console.log(data);
    router.reload("/profileregister");
  };

  return (
    <div style={{direction: "rtl", marginTop: "20px"}}>
      <h1 style={{textAlign: "center"}}>تسجيل البيانات</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <label className={styles.label}>
         الإسم بالكامل:
          <input
            type="text"
            className={styles.input}
            name="fullName"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />
        </label>
        <label className={styles.label}>
          رقم الموبايل:
          <input
            type="tel"
            className={styles.input}
            name="mobileNumber"
            value={mobileNumber}
            onChange={handleInputMOBChange}
            required
          />
        </label>
        <label className={styles.label}>
          الرقم القومي:
          <input
            type="text"
            className={styles.input}
            name="nationalID"
            value={nationalID}
            onChange={handleInputIDChange}
            required
          />
          {nationalIdError && (
            <span style={{ color: "red" }}>{nationalIdError}</span>
          )}
        </label>
        <label className={styles.label}>
          الوظيفة:
          <input
            type="text"
            className={styles.input}
            name="position"
            value={position}
            onChange={(e) => setPosition(e.target.value)}
            required
          />
        </label>
        <button type="submit" className={styles.button}>
          تسجيل البيانات
        </button>
        <div className={styles.successmessage}>
          {successMessage && (
            <div className="successmessage">{successMessage}</div>
          )}
        </div>
      </form>
    </div>
  );
}
export default Register;
