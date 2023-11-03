import React, { useState } from "react";
import Layout from "../components/Layout";
import "../styles/CreateTest.css";
import { Form, Input, message } from "antd";
import QuestionForm from "../components/QuestionForm";

const CreateTest = () => {
  const [questions, setQuestions] = useState([]);

  const handleQuestionSubmit = (questionData) => {
    // Update the questions state with the submitted question data
    setQuestions([...questions, questionData]);
  };

  const handleTestSubmit = (testData) => {
    // Handle the overall test submission, including the test data and questions array
    // Send this data to your backend API to store in the database
    console.log('Test Data:', {
      ...testData,
      questions: questions,
    });
    message.success("sumbitted successfully");
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
            

            <QuestionForm onSubmit={handleQuestionSubmit} />

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
