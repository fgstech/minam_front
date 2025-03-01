import React from 'react'
import './style.css'

const Page = ({ title, children, ...props }) => {
    return (<>{children}</>)
}

Page.defaultProps = {
    title: "",
    children: null
}


export default Page;