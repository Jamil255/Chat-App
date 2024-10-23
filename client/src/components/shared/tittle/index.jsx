import React from 'react'
import {Helmet}from"react-helmet-async"

const Tittle = ({ title = 'Chat', description = 'this is the chat app' }) => {
  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Helmet>
    </>
  )
}

export default Tittle
