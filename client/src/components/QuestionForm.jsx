import React, { useState } from "react";
import { Form, Input, Button, Select } from "antd";

const { Option } = Select;

const QuestionForm = ({ onSubmit }) => {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState([]);
  const [correctAnswer, setCorrectAnswer] = useState(null);

  const handleQuestionSubmit = (event) => {
    event.preventDefault();

    // Validate inputs before submitting
    if (!question || options.length < 2 || !correctAnswer) {
      return; // Do not submit incomplete questions
    }

    const questionData = {
      id: Date.now(),
      question: question,
      options: options,
      correctAnswer: correctAnswer,
    };

    onSubmit(questionData);
    
    // Reset form fields after submitting
    setQuestion("");
    setOptions([]);
    setCorrectAnswer(null);
  };

  return (
    <Form layout="vertical" onFinish={handleQuestionSubmit}>
      <Form.Item label="Question" name="question" rules={[{ required: true, message: "Please enter a question!" }]}>
        <Input value={question} onChange={(e) => setQuestion(e.target.value)} />
      </Form.Item>

      <Form.Item label="Options" name="options" rules={[{ required: true, message: "Please enter options!" }]}>
        {options.map((option, index) => (
          <div key={index}>
            <Input
              value={option}
              onChange={(e) => {
                const updatedOptions = [...options];
                updatedOptions[index] = e.target.value;
                setOptions(updatedOptions);
              }}
            />
            {index > 1 && (
              <Button type="link" onClick={() => setOptions(options.filter((_, i) => i !== index))}>
                Remove
              </Button>
            )}
          </div>
        ))}
        <Button type="dashed" onClick={() => setOptions([...options, ""])} style={{ marginTop: "10px" }}>
          Add Option
        </Button>
      </Form.Item>

      <Form.Item label="Correct Answer" name="correctAnswer" rules={[{ required: true, message: "Please select the correct answer!" }]}>
        <Select value={correctAnswer} onChange={(value) => setCorrectAnswer(value)}>
          {options.map((option, index) => (
            <Option key={index} value={index}>
              {`Option ${index + 1}`}
            </Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Add Question
        </Button>
      </Form.Item>
    </Form>
  );
};

export default QuestionForm;
