import { Bank, Edit, Home, Information, Location, Menu, Notification, ReceiptEdit, Setting, Star, User } from 'iconsax-react'
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
    title:"Event Centers",
    icon: <Bank size={17} />,
    link: '/store'
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

export const AdminNavList = [
  {
    id:1,
    title:"Home",
    icon: <Home size={17}/>,
    link: '/'
  },
    {
      id:2,
      title:"Event Centers",
      icon: <Bank size={17} />,
      link: '/store'
    },
  {
    id:3,
    title:"Admin Dashboard",
    icon: <Menu size={17}/>,
    link: '/admin'
  }
]