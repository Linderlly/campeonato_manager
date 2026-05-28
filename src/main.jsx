import React from 'react'
import ReactDOM from 'react-dom/client'

import App from './App'

import './index.css'

import {
  ToastContainer
} from 'react-toastify'

import 'react-toastify/dist/ReactToastify.css'

import {
  AuthProvider
} from './contexts/AuthContext'

ReactDOM
  .createRoot(
    document.getElementById('root')
  )
  .render(
    <AuthProvider>
      <App />

      <ToastContainer
        position="top-right"
        autoClose={3000}
        theme="dark"
      />
    </AuthProvider>
  )