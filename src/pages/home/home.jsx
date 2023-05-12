import React from 'react'

import './style.scss';

import HeroBanner from './heroBanner/HeroBanner'
import Trending from './trending/Trending';
import Popular from './popular/popular';

const home = () => {
  return (
    <div className='homePage'>
      <HeroBanner />
      <Trending />
      <Popular />
    </div>
  )
}

export default home