import layout from '@/layout'
export default {
  path: '/welfare',
  component: layout,
  redirect: '/welfare/attendance',
  name: 'welfare',
  meta: {
    title: '福利',
    icon: 'tree-table'
  },
  children: [
    {
      // 考勤
      path: 'attendance',
      name: 'attendance',
      component: () => import('@/views/attendance/Attendance'),
      meta: {
        title: '考勤',
        icon: 'excel'
      }
    },
    {
      // 工资
      path: 'salary',
      name: 'salary',
      component: () => import('@/views/salary/Salary'),
      meta: {
        title: '工资',
        icon: 'money'
      }
    },
    {
      path: 'social',
      name: 'social',
      component: () => import('@/views/social/Social'),
      meta: {
        title: '社保',
        icon: 'table'
      }
    }
  ]
}
