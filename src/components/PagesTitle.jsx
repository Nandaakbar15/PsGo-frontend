import React from 'react'
import { Helmet } from 'react-helmet';

export default function PagesTitle({title}) {
  return (
    <Helmet>
      <title>{title} | PsGo </title>
    </Helmet>
  )
}
