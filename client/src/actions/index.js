import axios from 'axios'
import { AUTH_USER, UNAUTH_USER, AUTH_ERROR } from '../constants/types'
import history from '../history'
const ROOT_URL = process.env.API_URI || 'http://localhost:8000'
axios.defaults.baseURL = ROOT_URL

if (localStorage.getItem('auth_jwt_token')) {
  axios.defaults.headers.common['Authorization'] = localStorage.getItem(
    'auth_jwt_token'
  )
}
axios.defaults.headers.post['Content-Type'] =
  'application/x-www-form-urlencoded'

export function signUserIn(data) {
  return function(dispatch) {
    dispatch({ type: 'LOADING', payload: true })
    axios
      .post(`/signin`, data)
      .then(res => {
        dispatch({ type: 'LOADING', payload: true })
        dispatch({ type: AUTH_USER })
        localStorage.setItem('auth_jwt_token', res.data.token)
        axios.defaults.headers.common['Authorization'] = localStorage.getItem(
          'auth_jwt_token'
        )
        history.push('/')
        window.location.reload(true)
        dispatch({ type: 'LOADING', payload: false })
      })
      .catch(error => {
        console.log(error)
        dispatch({ type: AUTH_ERROR, payload: true })
        dispatch({ type: 'LOADING', payload: false })
      })
  }
}

export function signUserUp(userObj) {
  return function(dispatch) {
    dispatch({ type: 'LOADING', payload: true })
    // Submit email/password to server
    axios
      .post(`/signup`, userObj)
      .then(res => {
        dispatch({ type: AUTH_USER })
        localStorage.setItem('auth_jwt_token', res.data.token)
        history.push('/account')
        axios.defaults.headers.common['Authorization'] = localStorage.getItem(
          'auth_jwt_token'
        )
        dispatch({ type: 'LOADING', payload: false })
      })
      .catch(error => {
        console.log(error)
        dispatch({ type: AUTH_ERROR, payload: true })
        dispatch({ type: 'LOADING', payload: false })
      })
  }
}

export function signUserOut() {
  return function(dispatch) {
    dispatch({ type: UNAUTH_USER })
    localStorage.removeItem('auth_jwt_token')
  }
}

export function updateUserProfile(inputs) {
  axios.post(`/user/profile`, inputs)
}

export function getProfile() {
  axios
    .get(`/user/profile`)
    .then(r => {
      return r.data
    })
    .catch(error => {
      console.log(error)
    })
}

const request = axios
export { request }
