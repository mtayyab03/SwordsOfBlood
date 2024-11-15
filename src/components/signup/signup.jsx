import React, { useState } from "react";
import styles from "./signup.module.css";
import { importAllImages } from "../../functions/common";

const SignupForm = () => {
  const images = importAllImages();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    fullName: "",
    confirmPassword: "",
    phoneNumber: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Allow only numeric values for phone number
    if (name === "phoneNumber") {
      if (!/^\d*$/.test(value)) {
        return; // Ignore non-numeric input
      }
    }

    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const [isSubmitting, setIsSubmitting] = useState(false);
  const hashPassword = async (password) => {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest("SHA-256", data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map((byte) => byte.toString(16).padStart(2, "0")).join("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match. Please try again.");
      return;
    }
    setIsSubmitting(true); // Start submission
    try {
      const hashedPassword = await hashPassword(formData.password);

      const dataToSend = {
        ...formData,
        password: hashedPassword,
        confirmPassword: hashedPassword,
      };

      await fetch(
        "https://script.google.com/macros/s/AKfycbyqRABLOuaKxwcyWNuvvlKhaEH4s4NPBXTaqLbh-lVCD8dI0iMuJQsszjs5lgsmZwPlDA/exec",
        {
          method: "POST",
          mode: "no-cors",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dataToSend),
        }
      );

      alert("Form submitted successfully!");
      setFormData({
        email: "",
        password: "",
        fullName: "",
        confirmPassword: "",
        phoneNumber: "",
      });
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("There was an error submitting the form");
    } finally {
      setIsSubmitting(false); // End submission
    }
  };

  return (
    <div className={styles.signupContainer}>
      <h1 className={styles.signupTitle}>Beta Sign Up</h1>
      <div className={styles.formCard}>
        <h4 className={styles.formSectionTitle}>Your Details</h4>
        <div className={styles.formContent}>
          <form className={styles.signupForm} onSubmit={handleSubmit}>
            <div className={styles.inputRow}>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                className={styles.inputField}
                required
              />
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Full Name"
                className={styles.inputField}
                required
              />
            </div>
            <div className={styles.inputRow}>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                className={styles.inputField}
                required
              />
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm Password"
                className={styles.inputField}
                required
              />
            </div>
            {/* <div className={styles.telRow}>
              <input
                type="tel"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                placeholder="Phone Number"
                className={styles.inputField}
                inputMode="numeric"
                pattern="[0-9]*"
                required
              />
            </div> */}
            <button
              type="submit"
              className={styles.signupButton}
              disabled={isSubmitting} // Disable button while submitting
            >
              {isSubmitting ? "Submitting..." : "SIGN UP"}
            </button>
          </form>
          <div className={styles.victoryImage}>
            <div style={{ width: "100%" }}>
              <div className={styles.bulletpoint}>
                <img src={images["svg/bullet-point.svg"]} alt="right" />
                <div className={styles.bulletText}>30k USD in token drops</div>
              </div>

              <div style={{ marginTop: "1.8rem" }} />
              <div className={styles.bulletpoint}>
                <img src={images["svg/bullet-point.svg"]} alt="right" />
                <div className={styles.bulletText}>
                  3 beta only items from the XP store
                </div>
              </div>

              <div style={{ marginTop: "1.8rem" }} />
              <div className={styles.bulletpoint}>
                <img src={images["svg/bullet-point.svg"]} alt="right" />
                <div className={styles.bulletText}>Exclusive VIP amas</div>
              </div>

              <div style={{ marginTop: "1.8rem" }} />
              <div className={styles.bulletpoint}>
                <img src={images["svg/bullet-point.svg"]} alt="right" />
                <div className={styles.bulletText}>
                  Instant access to future PVP beta
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;
