import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
export default new Router({
  routes: [
    // {
    //   path: '/',
    //   name: 'HelloWorld',
    //   component: HelloWorld
    // },
    {
      path:'/',
      name:'SignIn',
      component:resolve=>require(["@/components/user/SignIn"],resolve)
    },
    {
      path:'/SignUp',
      name:'SignUp',
      component:resolve=>require(["@/components/user/SignUp"],resolve)
    },
    {
      path:'/home',
      component:resolve=>require(["@/components/project/ProjectNav"],resolve),
      children:[
        {
          path:'jenkins',
          name:'Jenkins',
          component:resolve=>require(["@/components/project/Jenkins"],resolve)
        },
        {
          path:'case',
          name:'Case',
          component:resolve=>require(["@/components/project/Case"],resolve)
        },
        {
          path:'task',
          name:'Task',
          component:resolve=>require(["@/components/project/Task"],resolve)
        }
      ]
    }
  ]
})
