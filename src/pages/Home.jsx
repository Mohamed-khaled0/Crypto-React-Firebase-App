import React from 'react'
import Search from '../components/Search'
import Trending from '../components/Trending'

export default function Home({coines}) {
  return (
    <div>
    <Search coins={coines} />
    <Trending />
    </div>
  )
}
