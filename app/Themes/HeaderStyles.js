import React, { Component } from 'react';
import Logout from '../components/Logout/Logout';
//Header navigationOptions

export const headerDashboard = {
        title: 'Dashboard',
        headerStyle: {
            backgroundColor: '#474d56',
        },
		headerTintColor: '#fff',
		headerRight: (
			<Logout />
		),
}

export const headerCart = {
    title: 'Order',
    headerStyle: {
        backgroundColor: '#474d56',
    },
    headerTintColor: '#fff',
}

export const headerCheckout = {
    title: 'Checkout',
    headerStyle: {
        backgroundColor: '#474d56',
    },
    headerTintColor: '#fff',
}

export const headerOrderDetails = {
    title: 'Order Details',
    headerStyle: {
        backgroundColor: '#474d56',
    },
    headerTintColor: '#fff',
}