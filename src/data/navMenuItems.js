export const menuItems = [
    {
        title: 'Home',
        url: '/',
    },
    {
        title: 'Create',
        url: '/',
        submenu: [
            {
                title: 'New Flashcard Set',
                url: '/create/set',
            },
            {
                title: 'New Class',
                url: '/create/class',
            },
        ],
    },
    {
        title: 'Sign Out',
        url: '/signout',
    },
];