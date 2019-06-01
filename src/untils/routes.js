export const siderLink = [{
  label: 'Company Data',
  icon: 'database',
  to: '/⚜️'
}, {
  label: 'Todo List',
  icon: 'calendar',
  to: '/⚜️/todos'
}, {
  label: 'My Profile',
  icon: 'user',
  to: '/⚜️/profiles'
}]

export const rootRoutes = [{
  label: 'home',
  path: '/🔞',
  component: 'Login'
}, {
  label: 'mia',
  path: '/⚜️',
  private: true,
  component: 'App',
  routes: [{
    label: 'data company',
    exact: true,
    path: '/⚜️',
    component: 'company'
  }, {
    label: 'todo list',
    path: '/⚜️/todo',
    component: 'todo'
  }, {
    label: 'my profile',
    path: '/⚜️/profile',
    component: 'profile'
  }]
}]
