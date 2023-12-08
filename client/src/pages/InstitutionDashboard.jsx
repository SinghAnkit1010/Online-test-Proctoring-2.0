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



const InstitutionDashboard = () => {
  const [createdTests, setCreatedTests] = useState([]);

  const getTests = async () => {
    try {
      const res = await axios.get("/api/v1/user/getCreatedTests", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (res.data.success) {
        setCreatedTests(res.data.createdTests);
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
            <TableCaption>List of exams created by you!</TableCaption>
            <Thead>
              <Tr>
                <Th>Test Name</Th>
                <Th>Date</Th>
                <Th>Time</Th>
                <Th>Students Count</Th>
                <Th>Duration</Th>
              </Tr>
            </Thead>
            <Tbody>
                {createdTests.map((test) => (
                    <Tr key={test.testId}>
                    <Td>{test.testName}</Td>
                    <Td>{test.testDate}</Td>
                    <Td>{test.startTime}</Td>
                    <Td>{test.studentsCount}</Td>
                    <Td>{test.duration} Minutes</Td>
                    </Tr>
                ))}
            </Tbody>
          </Table>
        </TableContainer>
      </div>
    </Layout>
  );
};

export default InstitutionDashboard;
