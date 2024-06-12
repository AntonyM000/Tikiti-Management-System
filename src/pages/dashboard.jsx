import React from 'react'
import Loader from '../components/loader'
import MyLineChart from '../components/chart'

function Dashboard({user}) {
  return (
    <div>
        <h1>Dashboard</h1>
        {/* <Loader/> */}
        <MyLineChart/>
    </div>
  )
}

export default Dashboard
