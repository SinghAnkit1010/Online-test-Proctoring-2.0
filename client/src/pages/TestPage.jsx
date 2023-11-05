import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import {message} from 'antd';
import { showLoading, hideLoading } from '../redux/features/alertSlice';
import { useDispatch, useSelector } from 'react-redux';
import '../styles/TestPage.css';

function TestPage() {

  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const userId=user?._id;

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
      const res = await axios.get(`/api/v1/test/getTestDetails/${testId}`, 
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
      );
      if (res.data.success) {
        const test = res.data.test;
        setTestDetails(test);
        message.success("Test details fetched successfully");
      }
      else{
        message.error("Error in fetching test details");
      }
    } catch (error) {
      message.error("Error in fetching test details");
      console.log(error);
    }
  };

  useEffect(() => {
    getTestDetails();
  }
  , []);



  const handleSubmit = async () => {
    try {
      const res = await axios.post(`http://localhost:5000/submit-test`);
      if (res.data.success) {
        message.success("Test submitted successfully");
      } else {
        message.error("Error in submitting test");
      }
    } catch (error) {
      message.error("Error in submitting test");
      console.log(error);      
    }
  };

  return (
    <Layout>
          <h1 className='text-3xl text-center my-3'>{testDetails?.testName}</h1>
      <div className="content flex justify-between items-start">

        <div >
          <form>
            {testDetails?.questionSet?.map((question, index) => (
              <div key={index} className="clear-both">
                <p>
                  <strong>Question {index + 1}:</strong> {question.question}
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
                      className='text-start w-screen p-2 rounded-lg bg-slate-500 my-2 mx-2 flex-shrink-0 max-w-2xl'
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
            <button
              className="text-center w-48 my-3 py-2 bg-teal-400 shadow-lg shadow-teal-500/50 hover:shadow-teal-500/40 text-white font-semibold rounded-lg"
              type="button"
              onClick={handleSubmit}
            >
              Submit
            </button>
          </form>
        </div>
        <div className='stream-area z-99 relative right-3 rounded'>
          <img src={`http://localhost:5000/stream`} alt="Live Streaming" />
        </div>
      </div>
    </Layout>
  );
}

export default TestPage;
