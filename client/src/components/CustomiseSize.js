import React, { useState } from "react";
import { customised} from "../features/pageSize";

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Button,
  useDisclosure,
  ModalCloseButton,
  Box,
  Input,
  Grid,
  GridItem,
} from "@chakra-ui/react";

function CustomiseSize({dispatch, Link}) {
  
  const [sizes, setSizes] = useState({
    height: null,
    width: null
  });

  const { isOpen, onOpen, onClose } = useDisclosure();
  const finalRef = React.useRef(null);

  const handelSizeChange = (e) => {
    const {value, name} = e.target;
    setSizes(prev =>( {...prev, [name]: parseInt(value)} ) );
  }

  return (
    <Box mx={"auto"} w="50%" bg={"blue.200"}>
      <Box
        as="button"
        className="bg-blue"
        border={"none"}
        color={"white"}
        borderRadius={20}
        cursor={"pointer"}
        py={15}
        px={12}
        mt={4}
        onClick={onOpen}
        bg={"blue.200"}
        _hover={{ bg: "blue.300" }}
        mx={"auto"}
        w="50%"
        display={"block"}
        fontWeight={'bold'}
      >
        Set Your Own Size
      </Box>
      <Modal
        mx={"auto"}
        w="50%"
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
        size="md"
        position={"relative"}
      >
        <ModalOverlay />
        <ModalContent borderRadius="md" bg="white">
          <ModalHeader textAlign="center" fontSize="1.5rem" fontWeight="bold" fontFamily={'italic'} >
            Site your size
          </ModalHeader>
          <ModalCloseButton
            position={"absolute"}
            right={0}
            bg={"transparent"}
            border={"none"}
          />
          <ModalBody>
            <Grid templateColumns="repeat(2, 1fr)" placeItems="center" m={10}>
              <GridItem>
                <Box as="label" fontWeight={'bold'}> width : </Box >
              </GridItem>
              <GridItem w={"100%"}>
                <Input name="width" w={"100%"} borderRadius={8} py={8} border={'3px solid blue'} onChange={handelSizeChange} />
              </GridItem>
            </Grid>
            <Grid templateColumns="repeat(2, 1fr)" placeItems="center" m={10}>
              <GridItem>
                <Box as="label" fontWeight={'bold'}> Height : </Box >
              </GridItem>
              <GridItem w={"100%"}>
                <Input name="height" w={"100%"} border={'3px solid blue'} borderRadius={8} py={8} onChange={handelSizeChange}/>
              </GridItem>
            </Grid>
          </ModalBody>
          <ModalFooter justifyContent="center">
            <Button
              bg={"red"}
              border={"none"}
              color={"white"}
              py={10}
              px={20}
              borderRadius={10}
              m={3}
              colorScheme="blue"
              mr={3}
              cursor={'pointer'}
              onClick={onClose}
            >
              Close
            </Button>
            <Link className="Link" to="/UploadImages">
            <Button
              bg={"blue"}
              border={"none"}
              color={"white"}
              py={10}
              px={20}
              borderRadius={10}
              m={3}
              variant="ghost"
              cursor={'pointer'}
              onClick={()=> ( dispatch(customised(sizes)) )}
            >
              Submit
            </Button>
            </Link>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}

export default CustomiseSize;
