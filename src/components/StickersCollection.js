import React, { useRef } from "react";
import sun_tornado from "../assets/sun-tornado.svg";
import { Box, Button } from "@chakra-ui/react";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import { useSelector } from "react-redux";
import * as htmlToImage from "html-to-image";
import { toPng, toJpeg, toBlob, toPixelData, toSvg } from "html-to-image";
import { Link } from "react-router-dom";

function Collections() {
  const pageSize = useSelector((state) => state.pageSize.paper);
  const images = useSelector((state) => state.stickersImages.images);
  const {stickerSize} = useSelector(state => state.pageSize);

  const extentions = {
    "png": htmlToImage.toPng,
    "jpeg": htmlToImage.toJpeg,
    "svg": htmlToImage.toSvg,
    "blob": htmlToImage.toBlob,
    "PixelData": htmlToImage.toPixelData,
  };

  const ExsitingExtentions = ['png','jpeg', 'svg', 'blob', 'PixelData'];

  const boxRef = useRef(null);

  const handleDownloadClick = (extentionName) => {
    const choosenExt = extentions[extentionName];
    // Capture the content inside the Box as an image
      choosenExt(boxRef.current).then(function (dataUrl) {
      // Create a temporary anchor element to trigger the download
      const a = document.createElement("a");
      a.href = dataUrl;
      a.download = `sticker_collection.${extentionName}`;
      a.click();
    });
  };

  return (
    <Box
      className="page-container"
      display="flex"
      flexDirection="column"
      alignItems="center"
      style={{ backgroundImage: `url(${sun_tornado})` }}
    >
      <Link className="Link" to="/">
        <Box
          src="https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fclipart-library.com%2Fimages%2FziX5zyxxT.png&f=1&nofb=1&ipt=8bb39b3f66fd92b16b61c795c9e90cccc680db975cef7a314afc517507930663&ipo=images"
          as="img"
          title="Back to home page"
          alt="Back to home page"
          width="50px"
          m="30px"
          display="block"
          alignSelf="start"
        />
      </Link>
      <Box mt="33px auto">
        <Box
          width={`${pageSize.width}cm`}
          height={`${pageSize.height}cm`}
          backgroundColor="gray"
          display="flex"
          justifyContent="center"
          alignItems="center"
          gap="26px"
          pt="8px"
          flexWrap="wrap"
          border="3px solid black"
          overflow="hidden"
          ref={boxRef} // Reference to capture this Box
        >
          {images.map((image, index) => (
            <Box
              as="img"
              src={image}
              key={`image-${index}`}
              width={`${stickerSize}cm`}
              height={`${stickerSize}cm`}
              className="sticker"
            />
          ))}
        </Box>
      </Box>
      <Menu>
        <MenuButton as={Button}
                backgroundColor="blue"
                display="block"
                padding="18px 22px"
                cursor="pointer"
                color="white"
                m="50px"
                fontWeight="bold"
                border="none"
                borderRadius="20px"
        >Download Collection</MenuButton>
        <MenuList
          borderRadius="20px"
          m='-10px 10px'
          display="block"
        >
          {
            ExsitingExtentions.map((extention, index) => (
              <MenuItem key={`${extention}-${index}`}
              backgroundColor="blue"
              opacity={0.9}
              _hover={{ opacity: '0.8' }}
              padding="18px 22px"
              cursor="pointer"
              color="white"
              fontWeight="bold"
              border='none'
              textAlign='center'              
              onClick={()=> handleDownloadClick(extention)}
              >{extention}</MenuItem>

            ))
          }
        </MenuList>
      </Menu>
    </Box>
  );
}

export default Collections;
