import React, { useState } from 'react';
import Layout from '../components/Layout';
import '../styles/Home.css';

function TestPage() {
  const questions = [
    {
      question: 'What is the capital of France?',
      options: ['Paris', 'London', 'Berlin', 'Madrid'],
    },
    {
      question: 'Which planet is known as the Red Planet?',
      options: ['Mars', 'Venus', 'Jupiter', 'Saturn'],
    },
  ];

  const initialAnswers = questions.map(() => null);
  const [answers, setAnswers] = useState(initialAnswers);

  const handleOptionSelect = (questionIndex, optionIndex) => {
    const newAnswers = [...answers];
    newAnswers[questionIndex] = {
      index: optionIndex + 1,
      answer: questions[questionIndex].options[optionIndex],
    };
    setAnswers(newAnswers);
  };

  const handleClearOption = (questionIndex) => {
    const newAnswers = [...answers];
    newAnswers[questionIndex] = null;
    setAnswers(newAnswers);
  };

  const handleSubmit = () => {
    // Here, you can send 'answers' to the backend for storage.
    // You would typically use a library like axios or fetch to make an API call to your server.
    // The backend will handle storing the answers in a database.
    console.log('Answers:', answers);
  };

  return (
    <Layout>
      <div className="content flex justify-between items-start">
        <div>
          <h1>Questionnaire</h1>
          <form>
            {questions.map((question, index) => (
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
                        answers[index].index === optionIndex + 1
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
      </div>
    </Layout>
  );
}

export default TestPage;
