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
        title: 'Create',
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