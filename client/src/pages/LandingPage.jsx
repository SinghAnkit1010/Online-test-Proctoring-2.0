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
import InfoCard from '../components/InfoCard';
import testing from '../images/testing.jpg';
import access from '../images/icons/access.svg';
import integrate from '../images/icons/integrate.svg';
import train from '../images/icons/train.svg';

const LandingPage = () => {
  return (
    <>
      <Box
        backgroundSize={"cover"}
        backgroundRepeat={"no-repeat"}
        backgroundPosition={"center"}
        backgroundImage={`url('${hexagon}')`}
        height={"100vh"}
      >
        <Container maxW={"container.xl"}>
          <Flex
            paddingY={"2rem"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Box>
              <Text color={"#0B1462"} fontWeight={"bold"} fontSize={"2xl"}>
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
                backgroundColor={"#0B1462"}
              >
                <Link href="/register">Register</Link>
              </Button>
            </Flex>
          </Flex>
        </Container>

        <Container maxW={"container.xl"}>
          <Flex
           mb={"4rem"}
           justifyContent={{ base: "start", lg: "space-around" }}
          >
              <Box>
                <Text mb={"1rem"} mt={"2rem"} fontSize={"48px"}>
                    Seamless AI-Powered <br /> Proctoring
                </Text>

                <Button 
                textColor={"white"}
                backgroundColor={"#0B1462"}
                width={"150px"}
                >
                  <Link href="#info-cards">Learn More</Link>
                </Button>
              </Box>

              <Box display={{base:'none', lg:"block"}}>
                  <Image 
                    borderStyle={"solid"} 
                    borderWidth={"3px"}
                    borderColor={"#0B1462"}
                    borderRadius={"10px"}
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
          id={"info-cards"}
          justifyContent={"space-around"}
          flexWrap={"wrap"}
          columnGap={"1rem"}
          rowGap={"2rem"}
          >
           
          <InfoCard photo={train}>
              <Heading size={"md"}>Create a Test</Heading>
              <Flex height={"100%"} alignItems={"center"}>
                <Text>Creat a test and share the link via social apps</Text>
              </Flex>
            </InfoCard>

            <InfoCard photo={integrate}>
              <Heading size={"md"}>Participate in a Test</Heading>
              <Flex height={"100%"} alignItems={"center"}>
                <Text>join the test via link</Text>
              </Flex>
            </InfoCard>

            <InfoCard photo={access}>
              <Heading size={"md"}>Dashboards</Heading>
              <Flex height={"100%"} alignItems={"center"}>
                <Text>Dashboards for Students and Institution</Text>
              </Flex>
            </InfoCard>

          </Flex>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default LandingPage;
