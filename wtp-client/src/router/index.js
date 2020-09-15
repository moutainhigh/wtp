import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/* Router Modules */
import componentsRouter from './modules/components'
import chartsRouter from './modules/charts'
import tableRouter from './modules/table'
import nestedRouter from './modules/nested'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    noCache: true                if set true, the page will no be cached(default is false)
    affix: true                  if set true, the tag will affix in the tags-view
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */

export const constantRoutes = [{
  path: '/redirect',
  component: Layout,
  hidden: true,
  children: [{
    path: '/redirect/:path(.*)',
    component: () => import('@/views/redirect/index')
  }]
},
{
  path: '/login',
  component: () => import('@/views/login/index'),
  hidden: true
},
{
  path: '/auth-redirect',
  component: () => import('@/views/login/auth-redirect'),
  hidden: true
},
{
  path: '/404',
  component: () => import('@/views/error-page/404'),
  hidden: true
},
{
  path: '/401',
  component: () => import('@/views/error-page/401'),
  hidden: true
},
{
  path: '/',
  component: Layout,
  redirect: '/dashboard',
  children: [{
    path: 'dashboard',
    component: () => import('@/views/dashboard/index'),
    name: 'Dashboard',
    meta: {
      title: '仪表盘',
      icon: 'dashboard',
      affix: true
    }
  }]
},
{
  path: '/documentation',
  component: Layout,
  children: [{
    path: 'index',
    component: () => import('@/views/documentation/index'),
    name: 'Documentation',
    meta: {
      title: '文档',
      icon: 'documentation',
      affix: true
    }
  }]
},
// {
//   path: '/guide',
//   component: Layout,
//   redirect: '/guide/index',
//   children: [
//     {
//       path: 'index',
//       component: () => import('@/views/guide/index'),
//       name: 'Guide',
//       meta: { title: 'Guide', icon: 'guide', noCache: true }
//     }
//   ]
// },
{
  path: '/profile',
  component: Layout,
  redirect: '/profile/index',
  hidden: true,
  children: [{
    path: 'index',
    component: () => import('@/views/profile/index'),
    name: 'Profile',
    meta: {
      title: 'Profile',
      icon: 'user',
      noCache: true
    }
  }]
}
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [{
  path: '/user',
  component: Layout,
  meta: {
    title: '用户',
    icon: 'user',
    roles: ['SUPPER-ADMIN', 'ADMIN'] // you can set roles in root nav
  },
  children: [{
    path: 'page',
    component: () => import('@/views/user/list'),
    name: '用户管理',
    meta: {
      title: '用户',
      roles: ['SUPPER-ADMIN', 'ADMIN'] // or you can only set roles in sub nav
    }
  },
  {
    path: 'permission',
    component: () => import('@/views/user/permission'),
    name: '用户权限管理',
    hidden: true,
    meta: {
      title: '用户权限管理',
      roles: ['SUPPER-ADMIN', 'ADMIN'] // or you can only set roles in sub nav
    }
  }
  ]
},
{
  path: '/project',
  component: Layout,
  meta: {
    title: '项目',
    icon: 'component',
    roles: ['SUPPER-ADMIN', 'ADMIN'] // you can set roles in root nav
  },
  children: [{
    path: 'page',
    component: () => import('@/views/project/list'),
    name: '项目管理',
    meta: {
      title: '项目',
      roles: ['SUPPER-ADMIN', 'ADMIN'] // or you can only set roles in sub nav
    }
  }]
},
{
  path: '/cluster',
  component: Layout,
  meta: {
    title: '集群',
    icon: 'el-icon-s-platform',
    roles: ['SUPPER-ADMIN', 'ADMIN', 'USER'] // you can set roles in root nav
  },
  children: [{
    path: 'cluster',
    component: () => import('@/views/cluster/list'),
    name: '集群管理',
    meta: {
      title: '集群',
      roles: ['SUPPER-ADMIN', 'ADMIN', 'USER'] // or you can only set roles in sub nav
    }
  }]
},
{
  path: '/wtp',
  component: Layout,
  meta: {
    title: '线程池管理',
    icon: 'tree',
    roles: ['SUPPER-ADMIN', 'ADMIN', 'USER'] // you can set roles in root nav
  },
  children: [{
    path: 'wtp',
    component: () => import('@/views/wtp/list'),
    name: '线程池管理',
    meta: {
      title: '线程池管理',
      roles: ['SUPPER-ADMIN', 'ADMIN', 'USER'] // or you can only set roles in sub nav
    }
  }]
},
// {
//   path: '/permission',
//   component: Layout,
//   redirect: '/permission/page',
//   alwaysShow: true, // will always show the root menu
//   name: 'Permission',
//   meta: {
//     title: 'Permission',
//     icon: 'lock',
//     roles: ['SUPPER-ADMIN', 'ADMIN', 'editor'] // you can set roles in root nav
//   },
//   children: [{
//       path: 'page',
//       component: () => import('@/views/permission/page'),
//       name: 'PagePermission',
//       meta: {
//         title: 'Page Permission',
//         roles: ['SUPPER-ADMIN', 'ADMIN'] // or you can only set roles in sub nav
//       }
//     },
//     {
//       path: 'directive',
//       component: () => import('@/views/permission/directive'),
//       name: 'DirectivePermission',
//       meta: {
//         title: 'Directive Permission'
//         // if do not set roles, means: this page does not require permission
//       }
//     },
//     {
//       path: 'role',
//       component: () => import('@/views/permission/role'),
//       name: 'RolePermission',
//       meta: {
//         title: 'Role Permission',
//         roles: ['SUPPER-ADMIN', 'ADMIN']
//       }
//     }
//   ]
// },

// {
//   path: '/icon',
//   component: Layout,
//   children: [{
//     path: 'index',
//     component: () => import('@/views/icons/index'),
//     name: 'Icons',
//     meta: {
//       title: 'Icons',
//       icon: 'icon',
//       noCache: true
//     }
//   }]
// },

// 404 page must be placed at the end !!!
{
  path: '*',
  redirect: '/404',
  hidden: true
}

]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({
    y: 0
  }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
