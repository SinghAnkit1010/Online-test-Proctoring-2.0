import { useState } from "react";
import Layout from "../components/Layout";
import { hideLoading, showLoading } from "../redux/features/alertSlice";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { message } from "antd";
import "../styles/Home.css";
import { useDispatch, useSelector } from "react-redux";

function StartTest() {
  const { user } = useSelector((state) => state.user);
  const userId = user?._id;

  const [testId, setTestId] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleJoinTest = async () => {
    try {
      const timeout = 3000;
      const response = axios.get("http://localhost:6000/start-test");
      navigate(`/test-page/${testId}`);

      const res = await Promise.race([
        response,
        new Promise((resolve) =>
          setTimeout(() => resolve({ timeout: true }), timeout)
        ),
      ]);
      if (res.timeout) {
        navigate(`/test-page/${testId}`);
      } else if (res.data.success) {
        message.success(res.data.message);
        navigate(`/test-page/${testId}`);
      }
    } catch (error) {
      navigate(`/test-page/${testId}`);
      message.error("Error in fetching test details");
    }
  };

  return (
    <Layout>
      <div className="content flex flex-col justify-center items-center">
        <div className="slogan flex flex-col justify-center items-center">
          <h1 className="text-4xl text-center font-semibold">
            Welcome to Proctopous
          </h1>
          <p className="py-3">
            Empowering Learning, Ensuring Trust, Beyond Boundaries, Within
            Integrity.
          </p>
        </div>
        <div>
          <form className="flex justify-between items-center">
            <label className="font-bold whitespace-nowrap" htmlFor="link">
              Paste Your Link:
            </label>
            <input
              id="link"
              className="rounded-lg w-5/6 ml-2 text-black bg-blue-100 p-2 focus:bg-blue-100 focus:outline-none"
              type="text"
              name="link"
              autoComplete="none"
              value={testId}
              onChange={(e) => setTestId(e.target.value)}
              required
            />
            <button
              onClick={handleJoinTest}
              className="ml-2 w-20 my-3 py-2 bg-blue-800 shadow-lg shadow-teal-500/50 hover:shadow-teal-500/40 text-white font-semibold rounded-lg"
            >
              Join
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
}
export default StartTest;
