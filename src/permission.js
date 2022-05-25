import router from './router'
import store from './store'
import storage from 'store'
import NProgress from 'nprogress' // progress bar
import '@/components/NProgress/nprogress.less' // progress bar custom style
import notification from 'ant-design-vue/es/notification'
import { setDocumentTitle, domTitle } from '@/utils/domUtil'
import { ACCESS_TOKEN } from '@/store/mutation-types'
import { i18nRender } from '@/locales'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const allowList = ['login', 'register', 'registerResult'] // no redirect allowList
const loginRoutePath = '/user/login'
const defaultRoutePath = '/dashboard/workplace'

router.beforeEach((to, from, next) => {
  NProgress.start() // start progress bar
  // 代替 if 语句
  to.meta && typeof to.meta.title !== 'undefined' && setDocumentTitle(`${i18nRender(to.meta.title)} - ${domTitle}`)
  /* has token */
  if (storage.get(ACCESS_TOKEN)) {
    if (to.path === loginRoutePath) {
      next({ path: defaultRoutePath })
      NProgress.done()
    } else {
      // check login user.roles is null
      if (store.getters.roles.length === 0) {
        // request login userInfo
        store
          .dispatch('GetInfo')
          .then(res => {
            const roleObj = {
              id: 'admin',
              name: '管理员',
              describe: '拥有所有权限',
              status: 1,
              creatorId: 'system',
              createTime: 1497160610259,
              deleted: 0,
              permissions: [
                {
                  roleId: 'admin',
                  permissionId: 'dashboard',
                  permissionName: '仪表盘',
                  actions:
                    '[{"action":"add","defaultCheck":false,"describe":"新增"},{"action":"query","defaultCheck":false,"describe":"查询"},{"action":"get","defaultCheck":false,"describe":"详情"},{"action":"update","defaultCheck":false,"describe":"修改"},{"action":"delete","defaultCheck":false,"describe":"删除"}]',
                  actionEntitySet: [
                    {
                      action: 'add',
                      describe: '新增',
                      defaultCheck: false
                    },
                    {
                      action: 'query',
                      describe: '查询',
                      defaultCheck: false
                    },
                    {
                      action: 'get',
                      describe: '详情',
                      defaultCheck: false
                    },
                    {
                      action: 'update',
                      describe: '修改',
                      defaultCheck: false
                    },
                    {
                      action: 'delete',
                      describe: '删除',
                      defaultCheck: false
                    }
                  ],
                  actionList: null,
                  dataAccess: null
                },
                {
                  roleId: 'admin',
                  permissionId: 'exception',
                  permissionName: '异常页面权限',
                  actions:
                    '[{"action":"add","defaultCheck":false,"describe":"新增"},{"action":"query","defaultCheck":false,"describe":"查询"},{"action":"get","defaultCheck":false,"describe":"详情"},{"action":"update","defaultCheck":false,"describe":"修改"},{"action":"delete","defaultCheck":false,"describe":"删除"}]',
                  actionEntitySet: [
                    {
                      action: 'add',
                      describe: '新增',
                      defaultCheck: false
                    },
                    {
                      action: 'query',
                      describe: '查询',
                      defaultCheck: false
                    },
                    {
                      action: 'get',
                      describe: '详情',
                      defaultCheck: false
                    },
                    {
                      action: 'update',
                      describe: '修改',
                      defaultCheck: false
                    },
                    {
                      action: 'delete',
                      describe: '删除',
                      defaultCheck: false
                    }
                  ],
                  actionList: null,
                  dataAccess: null
                },
                {
                  roleId: 'admin',
                  permissionId: 'result',
                  permissionName: '结果权限',
                  actions:
                    '[{"action":"add","defaultCheck":false,"describe":"新增"},{"action":"query","defaultCheck":false,"describe":"查询"},{"action":"get","defaultCheck":false,"describe":"详情"},{"action":"update","defaultCheck":false,"describe":"修改"},{"action":"delete","defaultCheck":false,"describe":"删除"}]',
                  actionEntitySet: [
                    {
                      action: 'add',
                      describe: '新增',
                      defaultCheck: false
                    },
                    {
                      action: 'query',
                      describe: '查询',
                      defaultCheck: false
                    },
                    {
                      action: 'get',
                      describe: '详情',
                      defaultCheck: false
                    },
                    {
                      action: 'update',
                      describe: '修改',
                      defaultCheck: false
                    },
                    {
                      action: 'delete',
                      describe: '删除',
                      defaultCheck: false
                    }
                  ],
                  actionList: null,
                  dataAccess: null
                },
                {
                  roleId: 'admin',
                  permissionId: 'profile',
                  permissionName: '详细页权限',
                  actions:
                    '[{"action":"add","defaultCheck":false,"describe":"新增"},{"action":"query","defaultCheck":false,"describe":"查询"},{"action":"get","defaultCheck":false,"describe":"详情"},{"action":"update","defaultCheck":false,"describe":"修改"},{"action":"delete","defaultCheck":false,"describe":"删除"}]',
                  actionEntitySet: [
                    {
                      action: 'add',
                      describe: '新增',
                      defaultCheck: false
                    },
                    {
                      action: 'query',
                      describe: '查询',
                      defaultCheck: false
                    },
                    {
                      action: 'get',
                      describe: '详情',
                      defaultCheck: false
                    },
                    {
                      action: 'update',
                      describe: '修改',
                      defaultCheck: false
                    },
                    {
                      action: 'delete',
                      describe: '删除',
                      defaultCheck: false
                    }
                  ],
                  actionList: null,
                  dataAccess: null
                },
                {
                  roleId: 'admin',
                  permissionId: 'table',
                  permissionName: '表格权限',
                  actions:
                    '[{"action":"add","defaultCheck":false,"describe":"新增"},{"action":"import","defaultCheck":false,"describe":"导入"},{"action":"get","defaultCheck":false,"describe":"详情"},{"action":"update","defaultCheck":false,"describe":"修改"}]',
                  actionEntitySet: [
                    {
                      action: 'add',
                      describe: '新增',
                      defaultCheck: false
                    },
                    {
                      action: 'import',
                      describe: '导入',
                      defaultCheck: false
                    },
                    {
                      action: 'get',
                      describe: '详情',
                      defaultCheck: false
                    },
                    {
                      action: 'update',
                      describe: '修改',
                      defaultCheck: false
                    }
                  ],
                  actionList: null,
                  dataAccess: null
                },
                {
                  roleId: 'admin',
                  permissionId: 'form',
                  permissionName: '表单权限',
                  actions:
                    '[{"action":"add","defaultCheck":false,"describe":"新增"},{"action":"get","defaultCheck":false,"describe":"详情"},{"action":"query","defaultCheck":false,"describe":"查询"},{"action":"update","defaultCheck":false,"describe":"修改"},{"action":"delete","defaultCheck":false,"describe":"删除"}]',
                  actionEntitySet: [
                    {
                      action: 'add',
                      describe: '新增',
                      defaultCheck: false
                    },
                    {
                      action: 'get',
                      describe: '详情',
                      defaultCheck: false
                    },
                    {
                      action: 'query',
                      describe: '查询',
                      defaultCheck: false
                    },
                    {
                      action: 'update',
                      describe: '修改',
                      defaultCheck: false
                    },
                    {
                      action: 'delete',
                      describe: '删除',
                      defaultCheck: false
                    }
                  ],
                  actionList: null,
                  dataAccess: null
                },
                {
                  roleId: 'admin',
                  permissionId: 'order',
                  permissionName: '订单管理',
                  actions:
                    '[{"action":"add","defaultCheck":false,"describe":"新增"},{"action":"query","defaultCheck":false,"describe":"查询"},{"action":"get","defaultCheck":false,"describe":"详情"},{"action":"update","defaultCheck":false,"describe":"修改"},{"action":"delete","defaultCheck":false,"describe":"删除"}]',
                  actionEntitySet: [
                    {
                      action: 'add',
                      describe: '新增',
                      defaultCheck: false
                    },
                    {
                      action: 'query',
                      describe: '查询',
                      defaultCheck: false
                    },
                    {
                      action: 'get',
                      describe: '详情',
                      defaultCheck: false
                    },
                    {
                      action: 'update',
                      describe: '修改',
                      defaultCheck: false
                    },
                    {
                      action: 'delete',
                      describe: '删除',
                      defaultCheck: false
                    }
                  ],
                  actionList: null,
                  dataAccess: null
                },
                {
                  roleId: 'admin',
                  permissionId: 'permission',
                  permissionName: '权限管理',
                  actions:
                    '[{"action":"add","defaultCheck":false,"describe":"新增"},{"action":"get","defaultCheck":false,"describe":"详情"},{"action":"update","defaultCheck":false,"describe":"修改"},{"action":"delete","defaultCheck":false,"describe":"删除"}]',
                  actionEntitySet: [
                    {
                      action: 'add',
                      describe: '新增',
                      defaultCheck: false
                    },
                    {
                      action: 'get',
                      describe: '详情',
                      defaultCheck: false
                    },
                    {
                      action: 'update',
                      describe: '修改',
                      defaultCheck: false
                    },
                    {
                      action: 'delete',
                      describe: '删除',
                      defaultCheck: false
                    }
                  ],
                  actionList: null,
                  dataAccess: null
                },
                {
                  roleId: 'admin',
                  permissionId: 'role',
                  permissionName: '角色管理',
                  actions:
                    '[{"action":"add","defaultCheck":false,"describe":"新增"},{"action":"get","defaultCheck":false,"describe":"详情"},{"action":"update","defaultCheck":false,"describe":"修改"},{"action":"delete","defaultCheck":false,"describe":"删除"}]',
                  actionEntitySet: [
                    {
                      action: 'add',
                      describe: '新增',
                      defaultCheck: false
                    },
                    {
                      action: 'get',
                      describe: '详情',
                      defaultCheck: false
                    },
                    {
                      action: 'update',
                      describe: '修改',
                      defaultCheck: false
                    },
                    {
                      action: 'delete',
                      describe: '删除',
                      defaultCheck: false
                    }
                  ],
                  actionList: null,
                  dataAccess: null
                },
                {
                  roleId: 'admin',
                  permissionId: 'table',
                  permissionName: '桌子管理',
                  actions:
                    '[{"action":"add","defaultCheck":false,"describe":"新增"},{"action":"get","defaultCheck":false,"describe":"详情"},{"action":"query","defaultCheck":false,"describe":"查询"},{"action":"update","defaultCheck":false,"describe":"修改"},{"action":"delete","defaultCheck":false,"describe":"删除"}]',
                  actionEntitySet: [
                    {
                      action: 'add',
                      describe: '新增',
                      defaultCheck: false
                    },
                    {
                      action: 'get',
                      describe: '详情',
                      defaultCheck: false
                    },
                    {
                      action: 'query',
                      describe: '查询',
                      defaultCheck: false
                    },
                    {
                      action: 'update',
                      describe: '修改',
                      defaultCheck: false
                    },
                    {
                      action: 'delete',
                      describe: '删除',
                      defaultCheck: false
                    }
                  ],
                  actionList: null,
                  dataAccess: null
                },
                {
                  roleId: 'admin',
                  permissionId: 'user',
                  permissionName: '用户管理',
                  actions:
                    '[{"action":"add","defaultCheck":false,"describe":"新增"},{"action":"import","defaultCheck":false,"describe":"导入"},{"action":"get","defaultCheck":false,"describe":"详情"},{"action":"update","defaultCheck":false,"describe":"修改"},{"action":"delete","defaultCheck":false,"describe":"删除"},{"action":"export","defaultCheck":false,"describe":"导出"}]',
                  actionEntitySet: [
                    {
                      action: 'add',
                      describe: '新增',
                      defaultCheck: false
                    },
                    {
                      action: 'import',
                      describe: '导入',
                      defaultCheck: false
                    },
                    {
                      action: 'get',
                      describe: '详情',
                      defaultCheck: false
                    },
                    {
                      action: 'update',
                      describe: '修改',
                      defaultCheck: false
                    },
                    {
                      action: 'delete',
                      describe: '删除',
                      defaultCheck: false
                    },
                    {
                      action: 'export',
                      describe: '导出',
                      defaultCheck: false
                    }
                  ],
                  actionList: null,
                  dataAccess: null
                }
              ]
            }

            roleObj.permissions.push({
              roleId: 'admin',
              permissionId: 'support',
              permissionName: '超级模块',
              actions:
                '[{"action":"add","defaultCheck":false,"describe":"新增"},{"action":"import","defaultCheck":false,"describe":"导入"},{"action":"get","defaultCheck":false,"describe":"详情"},{"action":"update","defaultCheck":false,"describe":"修改"},{"action":"delete","defaultCheck":false,"describe":"删除"},{"action":"export","defaultCheck":false,"describe":"导出"}]',
              actionEntitySet: [
                {
                  action: 'add',
                  describe: '新增',
                  defaultCheck: false
                },
                {
                  action: 'import',
                  describe: '导入',
                  defaultCheck: false
                },
                {
                  action: 'get',
                  describe: '详情',
                  defaultCheck: false
                },
                {
                  action: 'update',
                  describe: '修改',
                  defaultCheck: false
                },
                {
                  action: 'delete',
                  describe: '删除',
                  defaultCheck: false
                },
                {
                  action: 'export',
                  describe: '导出',
                  defaultCheck: false
                }
              ],
              actionList: null,
              dataAccess: null
            })

            res.data.role = roleObj
            const roles = res.data && res.data.role
            // generate dynamic router
            store.dispatch('GenerateRoutes', { roles }).then(() => {
              // 根据roles权限生成可访问的路由表
              // 动态添加可访问路由表
              // VueRouter@3.5.0+ New API
              store.getters.addRouters.forEach(r => {
                router.addRoute(r)
              })
              // 请求带有 redirect 重定向时，登录自动重定向到该地址
              const redirect = decodeURIComponent(from.query.redirect || to.path)
              if (to.path === redirect) {
                // set the replace: true so the navigation will not leave a history record
                next({ ...to, replace: true })
              } else {
                // 跳转到目的路由
                next({ path: redirect })
              }
            })
          })
          .catch(() => {
            notification.error({
              message: '错误',
              description: '请求用户信息失败，请重试'
            })
            // 失败时，获取用户信息失败时，调用登出，来清空历史保留信息
            store.dispatch('Logout').then(() => {
              next({ path: loginRoutePath, query: { redirect: to.fullPath } })
            })
          })
      } else {
        next()
      }
    }
  } else {
    if (allowList.includes(to.name)) {
      // 在免登录名单，直接进入
      next()
    } else {
      next({ path: loginRoutePath, query: { redirect: to.fullPath } })
      NProgress.done() // if current page is login will not trigger afterEach hook, so manually handle it
    }
  }
})

router.afterEach(() => {
  NProgress.done() // finish progress bar
})
