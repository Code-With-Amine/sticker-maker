import React, { useEffect, useRef } from "react";
import { setImageRef, setExtention } from "../features/printedDiv";
import sun_tornado from "../assets/sun-tornado.svg";
import { Box } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import * as htmlToImage from "html-to-image";
import { toPng, toJpeg, toSvg } from "html-to-image";
import { Link } from "react-router-dom";
import jsPDF from "jspdf"; // Import jsPDF for PDF generation
import Updates from "../components/Updates";
import "jspdf-autotable";
import DownloadMenu from "../components/DownloadMenu";

function Collections() {
  const pageSize = useSelector((state) => state.pageSize.paper);
  const { bgColor } = useSelector((state) => state.pageSize.paper);
  const images = useSelector((state) => state.stickersImages.images);
  const { stickerWidth } = useSelector((state) => state.pageSize);
  const { stickerHeight } = useSelector((state) => state.pageSize);

  const linkRef = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    htmlToImage.toPng(boxRef.current).then(function (dataUrl) {
      dispatch(setImageRef(dataUrl));
    });
  }, []);

  const extentions = {
    png: htmlToImage.toPng,
    jpeg: htmlToImage.toJpeg,
    svg: htmlToImage.toSvg,
  };

  const vectorExtentions = ["svg", "eps", "pdf", "dxf", "png"];

  const existingExtentions = ["png", "jpeg", "svg", "pdf"];

  const boxRef = useRef(null);

  const handelSettingVectorExtention = (chosenExtention) => {
    dispatch(setExtention(chosenExtention));
    linkRef.current.click();
  };

  const handleDownloadClick = (extensionName) => {
    if (extensionName === "pdf") {
      const pdf = new jsPDF(); // Create a new PDF document
      const cmToMm = 10; // Conversion factor from centimeters to millimeters

      // Convert the content inside the Box to an image (PNG)
      htmlToImage.toPng(boxRef.current).then(function (dataUrl) {
        const img = new Image();
        img.src = dataUrl;

        // Adjust the page size in centimeters
        const pageWidthInCm = pageSize.width * cmToMm;
        const pageHeightInCm = pageSize.height * cmToMm;
        const subNumber = pageSize.width === 21 ? 20 : 100;

        // Add the image to the PDF
        pdf.addImage(
          img,
          "PNG",
          10,
          10,
          pageWidthInCm - subNumber,
          pageHeightInCm - subNumber
        ); // Adjust the coordinates and size as needed

        // Save the PDF with a specific name 'sticker_collection.pdf'
        pdf.save("sticker_collection.pdf");
      });
    } else {
      const chosenExt = extentions[extensionName];
      // Capture the content inside the Box as an image
      chosenExt(boxRef.current).then(function (dataUrl) {
        // Create a temporary anchor element to trigger the download
        const a = document.createElement("a");
        a.href = dataUrl;
        a.download = `sticker_collection.${extensionName}`;
        a.click();
      });
    }
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
        <Updates />

        <Box
          width={`${pageSize.width}cm`}
          height={`${pageSize.height}cm`}
          backgroundColor={bgColor}
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
              width={`${stickerWidth}cm`}
              height={`${stickerHeight}cm`}
              className="sticker"
            />
          ))}
        </Box>
      </Box>
      <Box display="flex" gap={5}>
        <DownloadMenu
          extentions={existingExtentions}
          handelClick={handleDownloadClick}
          buttonText={"Download Collection"}
          isVector={false}
        />
        <DownloadMenu
          extentions={vectorExtentions}
          handelClick={handelSettingVectorExtention}
          buttonText={"Download as vectore"}
          isVector={true}
        />
        <Link
          to="/DownloadVector"
          style={{ display: "none" }}
          ref={linkRef}
        ></Link>
      </Box>
    </Box>
  );
}

export default Collections;
