import React, { useRef } from "react";
import { deleteImage, addImage } from "../features/images";
import { useSelector, useDispatch } from "react-redux";
import scattered from "../assets/scattered-forcefields.svg";
import trash from "../assets/trashIcon.svg";
import { Box } from "@chakra-ui/react";
import { Link } from "react-router-dom";

function UploadImages() {
  const uploaderRef = useRef(null);
  const selectedImages = useSelector((state) => state.stickersImages.images);
  const dispatch = useDispatch();

  const handleImageChange = (e) => {
    const files = e.target.files;
    if (files.length > 0) {
      for (let i = 0; i < files.length; i++) {
        const reader = new FileReader();
        reader.onload = (event) => {
          const imageDataURL = event.target.result;
          dispatch(addImage(imageDataURL));
        };

        reader.readAsDataURL(files[i]);
      }
    }
  };

  return (
    <div
      className="page-container"
      style={{ backgroundImage: `url(${scattered})` }}
    >
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
        width="100vw"
      >
        <Box
          as="input"
          display="none"
          ref={uploaderRef}
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          multiple
        />
        <Box
          className="uploader"
          cursor="pointer"
          onClick={() => uploaderRef.current.click()}
        >
          Selecte your images or drag and drop
        </Box>
        {selectedImages.length > 0 && (
          <div>
            <h2>Selected Images:</h2>
            <Box
              display="flex"
              flexDirection="column"
              className="image-container"
              maxH="400px"
              overflow="auto"
              width="100%"
            >
              {selectedImages.map((imageUrl, index) => (
                <Box key={index} display="flex" gap="35px">
                  <Box
                    as="img"
                    src={imageUrl}
                    alt={`Selected ${index}`}
                    width="100px"
                    height="100px"
                    borderRadius="50%"
                    p="1.5"
                  />
                  <Box
                    as="img"
                    src={trash}
                    cursor="pointer"
                    onClick={() => dispatch(deleteImage(imageUrl))}
                  />
                </Box>
              ))}
            </Box>
          </div>
        )}
        <Box display="flex" flexWrap="wrap" gap="100px" mt="50px">
          <Link className="Link" to="/">
            <Box
              role="button"
              backgroundColor="red"
              borderRadius="30px"
              color="white"
              border="none"
              p="32px"
              fontWeight="bold"
              fontSize="1rem"
              opacity={0.8}
              textAlign="center"
            >
              Back to page size
            </Box>
          </Link>
          <Link className="Link" to="/Collections">
            <Box
              role="button"
              backgroundColor="blue"
              borderRadius="30px"
              color="white"
              border="none"
              p="32px"
              fontWeight="bold"
              fontSize="1rem"
              opacity={0.8}
              textAlign="center"
            >
              build your collection
            </Box>
          </Link>
        </Box>
      </Box>
    </div>
  );
}

export default UploadImages;
