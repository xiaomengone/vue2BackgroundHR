import layout from '@/layout'
export default {
  path: '/employee',
  component: layout,
  children: [
    {
      path: '',
      name: 'employee',
      component: () => import('@/views/employee/Employee'),
      meta: {
        title: '员工',
        icon: 'people'
      }
    },
    {
      path: 'detail/:id',
      name: 'detail',
      component: () => import('@/views/employee/components/Detail'),
      meta: {
        title: '添加员工',
        icon: 'people'
      },
      hidden: true
    }
  ]
}
