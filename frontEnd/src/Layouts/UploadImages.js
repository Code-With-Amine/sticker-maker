import React, { useRef, useState } from "react";
import { deleteImage, addImage } from "../features/images";
import { useSelector, useDispatch } from "react-redux";
import scattered from "../assets/scattered-forcefields.svg";
import trash from "../assets/trashIcon.svg";
import { Box,
  Alert,
  AlertIcon,
  AlertTitle, 
  AlertDescription
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import Buttons from "../components/Buttons";
import SelectedImages from "../components/SelectedImages";

function UploadImages() {
  const [warningMessage, setWarningMessage] = useState('');
  const alertRef = useRef(null);
  const uploaderRef = useRef(null);
  const selectedImages = useSelector((state) => state.stickersImages.images);
  const { limit } = useSelector((state) => state.pageSize);
  const dispatch = useDispatch();

  const handelLinkClik = (e) => {
    const imagesLength = selectedImages.length
    if( imagesLength === 0 || imagesLength > limit){
      e.preventDefault();
      alertRef.current.style.display = 'flex';
      setWarningMessage(imagesLength === 0 ? `Please upload some images` : `the limit that you can upload is ${limit} images`);
    }
  }  

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
<Box  w='100%' m='0 aut0' display='flex' justifyContent='center'>
      <Alert tatus='warning' display='none' ref={alertRef} justifyContent='center' backgroundColor='red' w='50%' color='white' borderRadius='30px' p='22px'>
            <AlertIcon width='30px' />
          <AlertTitle> warning ! </AlertTitle>
          <AlertDescription> {warningMessage}.</AlertDescription>
      </Alert>
</Box>
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
          <SelectedImages
            selectedImages={selectedImages}
            dispatch={dispatch}
            deleteImage={deleteImage}
            trashIcon={trash}
          />
        )}

        <Box display="flex" flexWrap="wrap" gap="100px" mt="50px">
          <Link className="Link" to="/">
            <Buttons background="red" text="Back to page size" />
          </Link>
          <Link className="Link" to="/Collections" onClick={handelLinkClik}>
            <Buttons background="blue" text="build your collection" />
          </Link>
        </Box>
      </Box>
    </div>
  );
}

export default UploadImages;
