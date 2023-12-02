import React from 'react'
import {Box, Image} from "@chakra-ui/react"

const InfoCard = ({photo, children}) => {
  return (
    <Box
        backgroundColor={"white"}
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"center"}
        alignItems={"center"}
        textAlign={"center"}
        boxShadow={"sm"}
        rounded={"lg"}
        position={"relative"}
        padding={"2rem"}
        height={"200px"}
        width={"300px"}
        border={"1px solid beige"}
    >
        <Image
            width={"50px"}
            pisition={"absolute"}
            top={"-25px"}
            left={"125px"}
            src={photo}
            alt='info card'
        />
        {children}
    </Box>
  )
}

export default InfoCard