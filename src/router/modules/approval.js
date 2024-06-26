import layout from '@/layout'
export default {
  path: '/approval',
  component: layout,
  children: [
    {
      path: '',
      name: 'approval',
      component: () => import('@/views/approval/Approval'),
      meta: {
        title: '审批',
        icon: 'tree-table'
      },
      children: [
        {
          path: '/test',
          name: 'test',
          component: () => import('@/views/Test'),
          meta: {
            title: '测试',
            icon: 'tree-table'
          }
        }
      ]
    }
  ]
}
