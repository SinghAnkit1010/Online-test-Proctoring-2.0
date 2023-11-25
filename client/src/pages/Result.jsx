import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import {message} from 'antd';


// Import statements...

const Result = () => {
  const [score, setScore] = useState(0);
  const [totalScore, setTotalScore] = useState(0); 
  const [activities, setActivities] = useState({});

  const { testId } = useParams();

  const getResults = async () => {
    try {
      const res = await axios.get(`/api/v1/test/getResults?testId=${testId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (res.data.success) {
        setScore(res.data.test.score);
        setTotalScore(res.data.test.totalScore);
        setActivities(res.data.test.activities);
      } else {
        message.error("Error in fetching test details");
      }
    } catch (error) {
      message.error("Error in fetching test details");
      console.log(error);
    }
  };

  useEffect(() => {
    getResults();
  }, [testId]); 

  return (
    <>
      <Layout>
        <div className="content flex justify-center items-center flex-col">
          <div>
            <h1 className="text-4xl font-semibold text-center text-green-600">Congratulations, Your submission is successfully recorded!</h1>
            <h1 className="text-3xl font-semibold text-center mt-3">Score : {score} / {totalScore}</h1>
            </div>

            <div>
            <table className="table-auto border-collapse border border-green-800 mt-3">
              <thead>
                <tr>
                  <th className="border border-green-800 px-4 py-2">Activity</th>
                  <th className="border border-green-800 px-4 py-2">Count</th>
                </tr>
              </thead>
              <tbody>
                  <tr>
                    <td className="border border-green-800 px-4 py-2">Number of times head movement occured</td>
                    <td className="border border-green-800 px-4 py-2">{activities[`number of times head movement occured`]}</td>
                  </tr>
                  <tr>
                    <td className="border border-green-800 px-4 py-2">Number of times multiple person detected</td>
                    <td className="border border-green-800 px-4 py-2">{activities[`number of times many person detected`]}</td>
                  </tr>
                  <tr>
                    <td className="border border-green-800 px-4 py-2">Number of times no person detected</td>
                    <td className="border border-green-800 px-4 py-2">{activities[`number of times no person detected`]}</td>
                  </tr>
                  <tr>
                    <td className="border border-green-800 px-4 py-2">Number of times student talked</td>
                    <td className="border border-green-800 px-4 py-2">{activities[`number of times talked`]}</td>
                  </tr>
                  <tr>
                    <td className="border border-green-800 px-4 py-2">Numbers of times phone detected</td>
                    <td className="border border-green-800 px-4 py-2">{activities[`numbers of time phone detected`]}</td>
                  </tr>
              </tbody>
            </table>
            </div>

        </div>
      </Layout>
    </>
  );
};

export default Result;
