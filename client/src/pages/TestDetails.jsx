import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Layout from "../components/Layout";
import axios from "axios";
import { message } from "antd";
import "../styles/TestInfo.css";
import whatsapp from "../images/whatsapp.png";
import gmail from "../images/icons8-gmail-240.png";
import telegram from "../images/icons8-telegram-512.png";
import copyImg from "../images/icons8-copy-64.png";

const TestDetails = () => {
  const { testId } = useParams();

  const [TestInfo, setTestInfo] = useState({});
  const [institutionDetails, setInstitutionDetails] = useState({});
  const [startDate, setStartDate] = useState("");
  const [startTime, setStartTime] = useState("");

  const getTestDetails = async () => {
    try {
      const res = await axios.get(`/api/v1/test/getTestDetails/${testId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (res.data.success) {
        const test = res.data.test;
        setTestInfo(test);
        setInstitutionDetails(res.data.InstitutionDetails);

        const date= test.startDate;
        const utcDate = new Date(date);
        const options = { timeZone: "Asia/Kolkata", day: "numeric", month: "short", year: "numeric" };
        const localDateString = utcDate.toLocaleDateString("en-US", options);
        setStartDate(localDateString);

        const time = test.startTime;
        const utcTime = new Date(time);
        const optionsTime = { timeZone: "Asia/Kolkata", hour: "numeric", minute: "numeric"};
        const localTimeString = utcTime.toLocaleTimeString("en-US", optionsTime);
        setStartTime(localTimeString);
        
        message.success("Test details fetched successfully");
      } else {
        message.error("Error in fetching test details");
      }
    } catch (error) {
      message.error("Error in fetching test details");
      console.log(error);
    }
  };

  useEffect(() => {
    getTestDetails();
  }, []);

  const copy = (textId) => {
    const inputElement = document.getElementById(textId);
    inputElement.select();
    document.execCommand("copy");
    message.success("Copied to clipboard!");
  };

  const shareOnWhatsApp = () => {
    const url = `whatsapp://send?text=Join the test with Test ID: ${testId}`;
    window.open(url, "_blank");
  };

  const shareOnGmail = () => {
    const subject = encodeURIComponent("Test Invitation");
    const body = encodeURIComponent(`Join the test with Test ID: ${testId}`);
    const url = `mailto:?subject=${subject}&body=${body}`;
    window.location.href = url;
  };

  const shareOnTelegram = () => {
    const url = `https://t.me/share/url?url=Join%20the%20test%20with%20test%20ID:%20${testId}`;
    window.open(url, "_blank");
  };

  return (
    <Layout>
      <div className="copy">
        <h1 className="text-4xl mb-1" style={{ color: "black" }}>
          {institutionDetails.name} | {TestInfo.testName}
        </h1>
        <h5 style={{ color: "black" }}>Share the Test Code with Students</h5>
        <h5>Date : {startDate}</h5>
        <h5>Time : {startTime}</h5>
        <h5>Duration : {TestInfo.duration} Mins</h5>
        <div className="container-copy">
          <input type="text" id="text-1" defaultValue={testId} readOnly />

          <img
            onClick={() => copy("text-1")}
            src={copyImg}
            alt="copy the code"
            style={{ cursor: "pointer", width: "40px", marginLeft: "5px" }}
          />

          <img
            onClick={shareOnWhatsApp}
            src={whatsapp}
            alt="Share on Whatsapp"
            style={{ cursor: "pointer", width: "40px", marginLeft: "5px" }}
          />
          <img
            onClick={shareOnGmail}
            src={gmail}
            alt="Share on gmail"
            style={{ cursor: "pointer", width: "40px", marginLeft: "5px" }}
          />
          <img
            onClick={shareOnTelegram}
            src={telegram}
            alt="Share on telegram"
            style={{ cursor: "pointer", width: "40px", marginLeft: "5px" }}
          />
        </div>
      </div>
    </Layout>
  );
};

export default TestDetails;
