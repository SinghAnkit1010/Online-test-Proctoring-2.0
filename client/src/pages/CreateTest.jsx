import React, { useState } from "react";
import Layout from "../components/Layout";
import "../styles/CreateTest.css";
import { Form, Input, message } from "antd";
import QuestionForm from "../components/QuestionForm";
import { useDispatch } from 'react-redux';
import { showLoading, hideLoading } from '../redux/features/alertSlice';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const CreateTest = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const [questionSet, setQuestionSet] = useState([]);

  // *********************************************
  const [question, setQuestion] = useState("");

  const handleQuestionChange = (e) => {
    setQuestion(e.target.value);
  };



  const [options, setOptions] = useState([]);

 const handleOptionChange = (index, e) => {
  const updatedOptions = [...options];
  updatedOptions[index] = e.target.value;
  setOptions(updatedOptions);
};


  const handleRemoveOptions = (index) =>
    setOptions(options.filter((_, i) => i !== index));

  const handleAddOption = () => setOptions([...options, ""]);



  const [correctAnswer, setCorrectAnswer] = useState(null);
  const handleChangeCorrectAnswer = (value) => setCorrectAnswer(value);



  const handleQuestionSubmit = (event) => {
    event.preventDefault();

    const questionData = {
      id: Date.now(),
      question: question,
      options: options,
      correctAnswer: correctAnswer,
    };

    setQuestionSet([...questionSet, questionData]);

    setQuestion("");
    setOptions([]);
    setCorrectAnswer(null);

    form.resetFields();
  };

  // ************************************************

  const handleTestSubmit = async (testData) => {
    try {
      dispatch(showLoading());
      const res= await axios.post('/api/v1/test/create-test', 
      {...testData, questionSet},
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      if(res.data.success){
        message.success('Test Created Successfully');
        navigate('/');
      }else{
        message.error(res.data.message);
      }
      dispatch(hideLoading());
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
    }
  };

  return (
    <Layout>
      <div className="root">
        <div className="form-createTest">
          <Form
            layout="vertical"
            onFinish={handleTestSubmit}
            className="form-create"
          >
            <Form.Item label="Test Name" name="testName">
              <Input type="text" required />
            </Form.Item>
            <Form.Item label='Start Date' name='startDate'>
            <Input
              type='date' required
            />
          </Form.Item>
          <Form.Item label='Start Time' name='startTime'>
            <Input
              type='time' required
            />
          </Form.Item>
          <Form.Item label='Duration (mins)' name='duration'>
            <Input
              type='number' required
            />
          </Form.Item>
          <Form.Item label='Number of Questions' name='numQuestions'>
            <Input
              type='number' required
            />
          </Form.Item>

            {questionSet.length > 0 && (
              <div className="questions-container">
                <h2>Questions:</h2>
                <ul>
                  {questionSet.map((question, index) => (
                    <li key={index}>
                      <strong>Question {index + 1}:</strong> {question.question}
                      <br />
                      <strong>Options:</strong> {question.options.join(", ")}
                      <br />
                      <strong>Correct Answer:</strong> Option{" "}
                      {question.correctAnswer + 1}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <QuestionForm
              questionChangeTrig={handleQuestionChange}
              question={question}
              options={options}
              optionChangeTrig={handleOptionChange}
              removeOptionTrig={handleRemoveOptions}
              addOptionTrig={handleAddOption}
              correctAnswer={correctAnswer}
              changeCorrectAnswerTrig={handleChangeCorrectAnswer}
              QuestionSubmitTrig={handleQuestionSubmit}
              form={form}
            />

            <button
              className="btn btn-primary text-white bg-blue-700 mt-10"
              type="submit"
            >
              Submit
            </button>
          </Form>
        </div>
      </div>
    </Layout>
  );
};

export default CreateTest;
