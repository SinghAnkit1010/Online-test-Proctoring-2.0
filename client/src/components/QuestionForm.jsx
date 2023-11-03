import React from "react";
import { Form, Input, Button, Select } from "antd";

const { Option } = Select;

const QuestionForm = (props) => {
  return (
    <Form layout="vertical" form={props.form}>
      <Form.Item
        label="Question"
        name="question"
        rules={[{ required: true, message: "Please enter a question!" }]}
      >
        <Input value={props.question} onChange={props.questionChangeTrig} />
      </Form.Item>

      <Form.Item
        label="Options"
        name="options"
        rules={[{ required: true, message: "Please enter options!" }]}
      >
        {props.options.map((option, index) => (
          <div key={index}>
            <input
              value={props.options[index]}
              onChange={(e) => props.optionChangeTrig(index, e)}
            />

            { (
              <Button type="link" onClick={() => props.removeOptionTrig(index)}>
                Remove
              </Button>
            )}
          </div>
        ))}
        <Button
          type="dashed"
          onClick={() => props.addOptionTrig()}
          style={{ marginTop: "10px" }}
        >
          Add Option
        </Button>
      </Form.Item>

      <Form.Item
        label="Correct Answer"
        name="correctAnswer"
        rules={[
          { required: true, message: "Please select the correct answer!" },
        ]}
      >
        <Select
          value={props.correctAnswer}
          onChange={props.changeCorrectAnswerTrig}
        >
          {props.options.map((option, index) => (
            <Option key={index} value={index}>
              {`Option ${index + 1}`}
            </Option>
          ))}
        </Select>
      </Form.Item>

      <Button
        onClick={props.QuestionSubmitTrig}
        className="btn btn-primary text-white bg-blue-700 mt-10"
        type="submit"
      >
        Add Question
      </Button>
    </Form>
  );
};

export default QuestionForm;
