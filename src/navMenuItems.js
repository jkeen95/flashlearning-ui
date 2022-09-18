export const menuItems = [
    {
        title: 'Home',
        url: '/',
    },
    {
        title: 'Login',
        url: '/login',
    },
    {
        title: 'Creates',
        url: '/create',
        submenu: [
            {
                title: 'New Flashcard Set',
                url: 'create/set',
            },
            {
                title: 'New Class',
                url: 'create/class',
            },
        ],
    },
    {
        title: 'Sign Out',
        url: '/signout',
    },
];