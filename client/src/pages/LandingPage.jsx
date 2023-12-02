import * as React from "react";
import {
  Box,
  Container,
  Button,
  Flex,
  Heading,
  Image,
  Text,
  Link,
} from "@chakra-ui/react";
import hexagon from "../images/hexagon.jpg";
import TestImg from "../images/test.jpg";

const LandingPage = () => {
  return (
    <>
      <Box
        bgImage={hexagon}
        bgPosition="center"
        bgRepeat="no-repeat"
        bgSize="cover"
        height="100vh"
      >
        <Container maxW={"container.xl"}>
          <Flex
            paddingY={"2rem"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Box>
              <Text color={"brand.500"} fontWeight={"bold"} fontSize={"2xl"}>
                Proctopous
              </Text>
            </Box>

            <Flex columnGap={"1rem"}>
              <Button color={"gray.500"}>
                <Link href="/login">Login</Link>
              </Button>
              <Button 
                colorScheme="white"
                color={"white"}
                backgroundColor={"#2B6CB0"}
              >
                <Link href="/register">Register</Link>
              </Button>
            </Flex>
          </Flex>
        </Container>

        <Container>
          <Flex
          mb={"4rem"}
          justifyContent={"space-evenly"}
          alignItems={"center"}
          >
              <Box>
                <Text mb={"1rem"} mt={"2rem"} fontSize={"48px"}>
                    Seamless AI-Powered <br /> Proctoring
                </Text>

                <Button 
                textColor={"white"}
                backgroundColor={"#2B6CB0"}
                width={"150px"}
                >
                  Learn More
                </Button>
              </Box>

              <Box display={{base:'none', lg:"block"}}>
                  <Image 
                    maxWidth={"450px"}
                    width={"450px"}
                    alt="Proctoring Image"
                    src={TestImg}                  
                    />
              </Box>
          </Flex>

          <Box mb={"4rem"}>
          <Heading mb={"4rem"} textAlign={"center"} color={"#333"} size={"lg"}>
            Steps to Success
          </Heading>

          <Flex
          justifyContent={"space-around"}
          flexWrap={"wrap"}
          columnGap={"1rem"}
          rowGap={"2rem"}
          >
            <Box
            width={{base:'100%', lg:'30%'}}
            >
              <Heading mb={"1rem"} textAlign={"center"} color={"#333"} size={"md"}>
                1. Register
              </Heading>
              <Text textAlign={"center"} color={"#333"} size={"md"}>
                Create an account with Proctopous
              </Text>
            </Box>

            <Box
            width={{base:'100%', lg:'30%'}}
            >
              <Heading mb={"1rem"} textAlign={"center"} color={"#333"} size={"md"}>
                2. Create a Test
              </Heading>
              <Text textAlign={"center"} color={"#333"} size={"md"}>
                Create a test with Proctopous
              </Text>
            </Box>

            <Box
            width={{base:'100%', lg:'30%'}}
            >
              <Heading mb={"1rem"} textAlign={"center"} color={"#333"} size={"md"}>
                3. Take the Test
              </Heading>
              <Text textAlign={"center"} color={"#333"} size={"md"}>
                Take the test with Proctopous
              </Text>
            </Box>

            <Box
            width={{base:'100%', lg:'30%'}}
            >
              <Heading mb={"1rem"} textAlign={"center"} color={"#333"} size={"md"}>
                4. Get Results
              </Heading>
              <Text textAlign={"center"} color={"#333"} size={"md"}>
                Get results with Proctopous
              </Text>
            </Box>
          </Flex>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default LandingPage;
