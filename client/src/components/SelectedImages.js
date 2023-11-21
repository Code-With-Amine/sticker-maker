import { Box } from "@chakra-ui/react";

function SelectedImages({selectedImages, dispatch, deleteImage, trashIcon}) {
  return (
    <div>
            <h2>You Selected {selectedImages.length} Images:</h2>
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
                    src={trashIcon}
                    cursor="pointer"
                    onClick={() => dispatch(deleteImage(imageUrl))}
                  />
                </Box>
              ))}
            </Box>
          </div>
  )
}

export default SelectedImages