import React from 'react'
import ShoppingCart from '../components/app/cusFarm/ShoppingCart'
import Layout from '../components/layout/Layout'
import { DrawerNavigation } from './drawer'
import { LoginNavigation } from './stack'

export const WrappedLoginNavigation = (props) => (
  <Layout>
    <LoginNavigation {...props} />
  </Layout>
)

export const WrappedDrawerNavigation = (props) => (
  <Layout>
    <DrawerNavigation {...props} />
  </Layout>
)

export const WrappedShoppingCart = (props) => (
  <Layout>
    <ShoppingCart {...props} />
  </Layout>
)
