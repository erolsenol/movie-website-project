import React from 'react'
import { Box, Typography, Link } from '@mui/material'
import { styled } from '@mui/material/styles'

const FooterContainer = styled(Box)`
  background-color: #000000;
  color: #ffffff;
  padding: 20px;
`

const FooterText = styled(Typography)`
  text-align: center;
`

const FooterLink = styled(Link)`
  color: #ffffff;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`

const Footer = () => {
  return (
    <FooterContainer>
      <FooterText variant='body2'>
        &copy; {new Date().getFullYear()} All rights reserved. | Built with Next.js and Material UI
      </FooterText>
      <FooterText variant='body2'>
        Made with ❤️ by <FooterLink href='https://www.example.com'>NYU & EŞ</FooterLink>
      </FooterText>
    </FooterContainer>
  )
}

export default Footer
