import React from 'react'
import { Menu, MenuButton, MenuList, MenuItem, Button } from "@chakra-ui/react";

function DownloadMenu({extentions, handelClick, buttonText, isVector}) {
  return (
    <>
    <Menu>
        <MenuButton
          as={Button}
          backgroundColor="blue"
          display="block"
          padding="18px 22px"
          cursor="pointer"
          color="white"
          m="50px"
          fontWeight="bold"
          border="none"
          borderRadius="20px"
        >
          {buttonText}
        </MenuButton>
        <MenuList borderRadius="20px" m="-10px 10px" display="block">
          {extentions.map((extention, index) => (
            <MenuItem
              key={`${extention}-${index}`}
              backgroundColor="blue"
              opacity={0.9}
              _hover={{ opacity: '0.8' }}
              padding="18px 22px"
              cursor="pointer"
              color="white"
              fontWeight="bold"
              border="none"
              textAlign="center"
              onClick={() =>( handelClick(extention) )}
            >
              {extention}
            </MenuItem>
          ))}
        </MenuList>
      </Menu>
    </>
  )
}

export default DownloadMenu