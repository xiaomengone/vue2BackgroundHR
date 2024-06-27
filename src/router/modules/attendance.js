import layout from '@/layout'
export default {
  path: '/attendance',
  component: layout,
  children: [
    {
      path: '',
      name: 'attendance',
      component: () => import('@/views/attendance/Attendance'),
      meta: {
        title: '考勤',
        icon: 'excel'
      }
    }
  ]
}
