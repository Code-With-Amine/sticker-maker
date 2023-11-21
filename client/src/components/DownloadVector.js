import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Alert, AlertIcon, AlertTitle, AlertDescription, Box, Text } from "@chakra-ui/react";
import { Navigate } from 'react-router-dom';

const DownloadVector = React.memo(() => {
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const imageUrl = useSelector((state) => state.printedDiv.imageRef);
  const pageSize = useSelector((state) => state.pageSize.paper);
  const {extention} = useSelector((state) => state.printedDiv);

  const Download = () => {
    const imageUrl = `/images/result.${extention}`; 
    const link = document.createElement("a");
    link.href = imageUrl;
    link.download = `sticker-collection.${extention}`; 
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  const RedirectToHomePage = () => {
    return <Navigate to="/" />;

  };

  const handelConvertionToVector = async () => {
    try {
      const ApiUrl = "http://localhost:3000/uploadImage";
      const dataSent = {
        imageURL: imageUrl.replace(/^data:image\/\w+;base64,/, ""),
        width: Math.floor(pageSize.width) * 37,
        height: Math.floor(pageSize.height) * 37,
        extention: extention
      };
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataSent),
      };
      const response = await fetch(ApiUrl, requestOptions);
      const data = await response.json();
      setMessage(data.message);
      Download();

    } catch (error) {
      setError("An error occurred during conversion.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
   handelConvertionToVector();
  }, []);

  return (
    <>
      <Box display="flex" justifyContent="center" alignItems={'center'} flexDirection={'column'}>
        {error && (
          <Alert status="error">
            <AlertIcon />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        {loading && !error && (
          <div className="spinner">
            <Text fontWeight={'bold'} fontSize={'2rem'}>This may take a few minutes please be patient</Text>
          <div className="lds-ellipsis">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
          </div>
        )}
        {!loading && !error && (
          <>
          <Alert status="success">
            <AlertIcon />
            <AlertTitle>Success</AlertTitle>
            <AlertDescription>{message}</AlertDescription>
          </Alert>
          { RedirectToHomePage() }
          </>
        )
        }
      </Box>
    </>
  );
});

export default DownloadVector;
