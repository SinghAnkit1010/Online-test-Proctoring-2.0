import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import "../styles/TestPage.css";

function TestPage() {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  const userId = user?._id;

  const [testDetails, setTestDetails] = useState(null);
  const { testId } = useParams();

  // const initialAnswers = testDetails?.questionSet?.map(() => null);
  const initialAnswers = (testDetails?.questionSet ?? []).map(() => null);

  const [answers, setAnswers] = useState(initialAnswers);

  const handleOptionSelect = (questionIndex, optionIndex) => {
    const newAnswers = [...answers];
    newAnswers[questionIndex] = {
      index: optionIndex + 1,
      answer: testDetails?.questionSet[questionIndex]?.options[optionIndex],
    };
    setAnswers(newAnswers);
  };

  const handleClearOption = (questionIndex) => {
    const newAnswers = [...answers];
    newAnswers[questionIndex] = null;
    setAnswers(newAnswers);
  };

  const getTestDetails = async () => {
    try {
      const res = await axios.get(`/api/v1/test/getTestDetails/${testId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (res.data.success) {
        const test = res.data.test;
        setTestDetails(test);
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

    const requestFullScreen = () => {
      const element = document.documentElement;
      if (element.requestFullscreen) {
        element.requestFullscreen();
      } else if (element.mozRequestFullScreen) {
        element.mozRequestFullScreen();
      } else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen();
      } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen();
      }
    };
  
    const handleFullScreenRequest = () => {
      const userConfirmed = window.confirm("Do you want to enter fullscreen mode?");
      if (userConfirmed) {
        requestFullScreen();
        document.removeEventListener("click", handleFullScreenRequest);
      }
      else{
        requestFullScreen();
        document.removeEventListener("click", handleFullScreenRequest);

      }
    };
  
    document.addEventListener("click", handleFullScreenRequest);
  
    return () => {
      document.removeEventListener("click", handleFullScreenRequest);
    };
  }, []);




let tabSwitchCount = parseInt(localStorage.getItem('tabSwitchCount')) || 0;

document.addEventListener("visibilitychange", () => {
  if (document.visibilityState === 'visible') {
    tabSwitchCount++;
    localStorage.setItem('tabSwitchCount', tabSwitchCount);
    console.log("Tab switched. Count: ", tabSwitchCount);
  }
});




  const handleSubmit = async () => {
    try {
      const res = await axios.get(`http://localhost:9000/submit-test`);
      let activities;
      if (res.data) {
        activities = res.data;
      } else {
        message.error("Error in submitting test1");
      }

      const tabCounts = parseInt(localStorage.getItem('tabSwitchCount')) ;
      localStorage.removeItem('tabSwitchCount');



      const res2 = await axios.post(
        `/api/v1/test/submitTest`,
        { userId, answers, testId, activities, tabCounts },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (res2.data.success) {
        message.success("Test submitted successfully");
        navigate(`/result/${testId}`);
      } else {
        message.error("Error in submitting test2");
      }
    } catch (error) {
      message.error("Error in submitting test");
      console.log(error);
    }
  };

  return (
    <>
      <h1 className="text-3xl text-center my-3 font-serif">{testDetails?.testName}</h1>
      <form className=" flex flex-col justify-center items-center min-h-screen border-1 border-black">
        <div className="ml-2 self-start">
          {testDetails?.questionSet?.map((question, index) => (
            <div key={index} className="clear-both">
              <p>
                <strong>Q.{index + 1}.</strong> {question.question}
              </p>
              {question.options.map((option, optionIndex) => (
                <div key={optionIndex} className="flex items-center">
                  <input
                    type="radio"
                    id={`q${index}-option${optionIndex}`}
                    name={`q${index}`}
                    value={optionIndex}
                    checked={
                      answers[index] !== null &&
                      answers[index]?.index === optionIndex + 1
                    }
                    onChange={() => handleOptionSelect(index, optionIndex)}
                    className="w-5 h-5"
                  />

                  <label
                    style={{ cursor: "pointer" }}
                    className="text-start w-screen p-2 rounded-lg bg-white my-2 mx-2 flex-shrink-0 max-w-2xl"
                    htmlFor={`q${index}-option${optionIndex}`}
                  >
                    {option}
                  </label>
                </div>
              ))}
              <button
                className=" flex text-center items-center h-8 w-24 my-3 bg-red-400 text-white font-semibold rounded-md float-right"
                type="button"
                onClick={() => handleClearOption(index)}
              >
                Clear Option
              </button>
            </div>
          ))}
        </div>

        <button
          className="text-center self-end w-48 my-5 py-2 bg-blue-800 shadow-lg shadow-teal-500/50 hover:shadow-teal-500/40 text-white font-semibold rounded-lg"
          type="button"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </form>
      <div className="stream-area z-99 rounded">

        <img src={`http://localhost:9000/stream`} alt="Live Streaming" />
      </div>
    </>
  );
}

export default TestPage;
