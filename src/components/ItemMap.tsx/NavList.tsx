import { Edit, Home, Information, Location, Notification, ReceiptEdit, Setting, Star, User } from 'iconsax-react'
import React from 'react'

export const NavList = [
  {
    id:1,
    title:"Home",
    icon: <Home size={17}/>,
    link: '/'
  },
  {
    id:2,
    title:"Profile",
    icon: <User size={17}/>,
    link: '/user'
  },
  {
    id:4,
    title:"Location",
    icon: <Location size={17}/>,
    link: '/location'
  },
  {
    id:3,
    title:"Notification",
    icon: <Notification size={17}/>,
    link:"/notification"
  },
  {
    title:"Settings",
    icon: <Setting size={17}/>,
    link:"settings"
  }
  
]

export const Rate=[
  {
    id:1,
    title:"Help and Support",
    icon:<ReceiptEdit size="16"/>,
    link:'/help'
  },
  {
    id:2,
    title:"Rate us",
    icon:<Star size="16"/>,
    link:'/rate'
  },
  {
    id:3,
    title:"About us",
    icon:<Information size="16"/>,
    link:'/about'
  }
]