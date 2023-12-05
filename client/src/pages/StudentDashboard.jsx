import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from "@chakra-ui/react";
import axios from "axios";
import { message } from "antd";



const StudentDashboard = () => {
  const [tests, setTests] = useState([]);

  const getTests = async () => {
    try {
      const res = await axios.get("/api/v1/user/getTests", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (res.data.success) {
        setTests(res.data.tests);
        message.success(res.data.message);
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      message.error("Something went wrong");
    }
  };

    useEffect(() => {
        getTests();
    }, []);

  

  return (
    <Layout>
      <div className="my-4 overflow-hidden rounded-lg bg-gradient-to-r from-green-200 to-white shadow">
        <div className="flex items-center justify-between px-4 sm:p-6">
          <h1 className="text-4xl font-bold">Exam Dashboard</h1>
        </div>
      </div>

      <div>
        <TableContainer>
          <Table variant="striped" colorScheme="teal">
            <TableCaption>List of exams attended by you!</TableCaption>
            <Thead>
              <Tr>
                <Th>Institute</Th>
                <Th>Test Name</Th>
                <Th>Date</Th>
                <Th>Result</Th>
                <Th>Activities</Th>
              </Tr>
            </Thead>
            <Tbody>
                {tests.map((test) => (
                    <Tr key={test.testId}>
                    <Td>{test.testDetails.InstitutionName}</Td>
                    <Td>{test.testDetails.testName}</Td>
                    <Td>{test.testDetails.testDate}</Td>
                    <Td>{(test.score * 100)/test.totalScore}%</Td>
                    <Td>{test.testDetails.ActivityScore}</Td>
                    </Tr>
                ))}
            </Tbody>
          </Table>
        </TableContainer>
      </div>
    </Layout>
  );
};

export default StudentDashboard;
