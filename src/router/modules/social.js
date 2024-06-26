import layout from '@/layout'
export default {
  path: '/social',
  component: layout,
  children: [
    {
      path: '',
      name: 'social',
      component: () => import('@/views/social/Social'),
      meta: {
        title: '社保',
        icon: 'table'
      }
    }
  ]
}
