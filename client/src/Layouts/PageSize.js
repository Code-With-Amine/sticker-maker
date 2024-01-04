import { a5_page, a4_page } from "../features/pageSize";
import { useDispatch } from "react-redux";
import { Heading, Box, Text } from "@chakra-ui/react";
import swap from "../assets/swap.png";
import sun_tornado from '../assets/sun-tornado.svg';
import { Link } from "react-router-dom";
import CustomiseSize from '../components/CustomiseSize';

function PageSize() {
  const dispatch = useDispatch();
  return (
    <Box
      className="page-container"
      display="felx"
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
      style={{backgroundImage: `url(${sun_tornado})`}}
    >
      <Heading textAlign="center">Chose a Page Size</Heading>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-around"
        flexWrap="wrap"
        mt="35px"
      >
        {
          // A5 size
        }
        <Box onClick={() => dispatch(a5_page())}>
          <Link className="Link" to="/UploadImages">
            <Heading as="h2" textAlign="center">
              A5
            </Heading>
            <Box>
              <Box
                as="section"
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <Box
                  as="span"
                  backgroundColor="white"
                  width="300px"
                  height="180px"
                  display="block"
                ></Box>

                <Box p="0" display="flex" alignItems="center">
                  <img
                    src={swap}
                    alt="double head arrow"
                    display="block"
                    m="0px auto"
                    width="100px"
                  />
                  <Text
                    textAlign="center"
                    transform="rotate(90deg)"
                    ml="-110px"
                  >
                    14.8 cm
                  </Text>
                </Box>
              </Box>
              <Box
                p="0"
                display="flex"
                alignItems="center"
                flexDirection="column"
              >
                <Text textAlign="center">21.0 cm</Text>
                <img
                  src={swap}
                  alt="double head arrow"
                  display="block"
                  m="0px auto"
                  width="100px"
                  className="double-head-arrow"
                />
              </Box>
            </Box>
          </Link>
        </Box>
        {
          // A4 size
        }
        <Box onClick={() => dispatch(a4_page())}>
          <Link className="Link" to="/UploadImages">
            <Heading as="h2" textAlign="center">
              A4
            </Heading>
            <Box>
              <Box
                as="section"
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <Box
                  as="span"
                  backgroundColor="white"
                  width="400px"
                  height="250px"
                  display="block"
                ></Box>

                <Box p="0" display="flex" alignItems="center">
                  <img
                    src={swap}
                    alt="double head arrow"
                    display="block"
                    m="0px auto"
                    width="100px"
                  />
                  <Text
                    textAlign="center"
                    transform="rotate(90deg)"
                    ml="-110px"
                  >
                    21.0 cm
                  </Text>
                </Box>
              </Box>
              <Box
                p="0"
                display="flex"
                alignItems="center"
                flexDirection="column"
              >
                <Text textAlign="center">29.7 cm</Text>
                <img
                  src={swap}
                  alt="double head arrow"
                  display="block"
                  m="0px auto"
                  width="100px"
                  className="double-head-arrow"
                />
              </Box>
            </Box>
          </Link>
        </Box>
      </Box>
            <CustomiseSize dispatch={dispatch} Link={Link} />
    </Box>
  );
}

export default PageSize;
