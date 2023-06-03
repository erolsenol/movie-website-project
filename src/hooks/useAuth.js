import { useContext } from 'react'
import { AuthContext } from 'src/context/AuthContext'
import { MovieContext } from 'src/context/MovieContext'

export const useAuth = () => useContext(AuthContext)

export const useMovie = () => useContext(MovieContext)
