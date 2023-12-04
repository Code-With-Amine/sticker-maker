import React, { useState } from 'react';
import { ChromePicker } from 'react-color';
import { useDispatch } from 'react-redux';
import { changeImage, changeHeight, changeWidth } from '../features/pageSize';
import { Box } from '@chakra-ui/react';

function Updates() {
    const [color, setColor] = useState('#ffffff'); // Initial color
    const [newWidth, setNewWidth] = useState(null);
    const [newHeight, setNewHeight] = useState(null);

    
    const dispatch = useDispatch();
    const handleColorChange = (newColor) => {
        setColor(newColor.hex);
        dispatch(changeImage(newColor.hex))
    };

    const handelWidthChange = (e) => {
        setNewWidth(e.target.value);
        dispatch(changeWidth(parseInt(e.target.value)));
    }

    const handelHeightChange = (e) => {
        setNewHeight(e.target.value);
        dispatch(changeHeight(parseInt(e.target.value)));

    }

    return (
    <Box display={'flex'} justifyContent={'center'} gap={144} alignItems={'center'} my={10}>
      <Box>
        <ChromePicker color={color} onChange={handleColorChange} />
        <Box style={{ marginTop: '10px' }}>
        </Box>
      </Box>

      <Box>
        <h3>Change the width</h3>
        <input
        type="range"
        id="rangeInput"
        name="rangeInput"
        min={2}
        max={20}
        onChange={handelWidthChange}
      />
      {newWidth && <p>width: {newWidth}</p>  }
      </Box>
      
      <Box>
        <h3>Change the Height</h3>
        <input
        type="range"
        id="rangeInput"
        name="rangeInput"
        min={2}
        max={20}
        onChange={handelHeightChange}
      />
    {newHeight && <p>Height: {newHeight}</p>  }

      </Box>

    </Box>
    );
  };

export default Updates