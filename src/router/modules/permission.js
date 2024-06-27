import layout from '@/layout'
export default {
  path: '/permission',
  component: layout,
  children: [
    {
      path: '',
      name: 'permission',
      component: () => import('@/views/permission/Permission'),
      meta: {
        title: '权限',
        icon: 'lock'
      }
    }
  ]
}
