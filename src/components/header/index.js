import React from 'react'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import { Button, Box, Avatar, Badge, useMediaQuery } from '@mui/material'
import { styled } from '@mui/material/styles'

const Header = () => {
  const HeaderAppBar = styled(AppBar)`
    background-color: #000000;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.4);
  `

  const HeaderToolbar = styled(Toolbar)`
    display: flex;
    justify-content: space-between;
    padding: 0 20px;
    backdrop-filter: blur(4px);
    background-color: rgba(0, 0, 0, 0.6);
    transition: background-color 0.3s ease-in-out;
    &:hover {
      background-color: rgba(0, 0, 0, 0.8);
    }
  `

  const HeaderButton = styled(Button)`
    font-weight: bold;
    text-transform: capitalize;
    color: white;
    &:hover {
      background-color: #e50914;
    }
  `

  const UserAvatar = styled(Avatar)`
    width: 32px;
    height: 32px;
    transform: scale(1);
    transition: transform 0.3s ease-in-out;
    &:hover {
      transform: scale(1.2);
    }
  `

  const isMobile = useMediaQuery('(max-width: 600px)')
  const isTablet = useMediaQuery('(max-width: 960px)')

  return (
    <HeaderAppBar position='static'>
      <HeaderToolbar>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {isMobile ? (
            <IconButton edge='start' color='inherit' aria-label='menu'>
              <MenuIcon />
            </IconButton>
          ) : (
            <>
              <Typography
                variant='h6'
                component='div'
                sx={{ mr: isTablet ? 1 : 2, fontWeight: 'bold', color: '#e50914' }}
              >
                Netflix
              </Typography>
              {!isTablet && (
                <>
                  <HeaderButton variant='contained'>Home</HeaderButton>
                  <HeaderButton variant='contained'>TV Shows</HeaderButton>
                  <HeaderButton variant='contained'>Movies</HeaderButton>
                  <HeaderButton variant='contained'>Latest</HeaderButton>
                  <HeaderButton variant='contained'>My List</HeaderButton>
                </>
              )}
            </>
          )}
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {isTablet && (
            <>
              <HeaderButton variant='contained'>Home</HeaderButton>
              <HeaderButton variant='contained'>TV Shows</HeaderButton>
              <HeaderButton variant='contained'>Movies</HeaderButton>
              <HeaderButton variant='contained'>Latest</HeaderButton>
              <HeaderButton variant='contained'>My List</HeaderButton>
            </>
          )}
          <IconButton color='inherit'>
            <Badge badgeContent={4} color='error'>
              <UserAvatar alt='User Avatar' src='#' />
            </Badge>
          </IconButton>
        </Box>
      </HeaderToolbar>
    </HeaderAppBar>
  )
}

export default Header
