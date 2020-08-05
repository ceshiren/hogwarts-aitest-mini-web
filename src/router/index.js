import Vue from 'vue'
import Router from 'vue-router'
import SignIn from '@/components/user/SignIn'
import MapLocal from '@/components/mapLocal/MapLocal'
import SignUp from '@/components/user/SignUp'
import Home from '@/components/project/ProjectNav'
import Jenkins from '@/components/project/Jenkins'
import Case from '@/components/project/Case'
import Task from '@/components/project/Task'
import Report from '@/components/project/Report'

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
      component:SignIn
    },
    {
      path:'/MapLocal',
      name:'MapLocal',
      component:MapLocal
    },
    {
      path:'/SignUp',
      name:'SignUp',
      component:SignUp
    },
    {
      path:'/home',
      component:Home,
      children:[
        {
          path:'jenkins',
          name:'Jenkins',
          component:Jenkins
        },
        {
          path:'case',
          name:'Case',
          component:Case
        },
        {
          path:'task',
          name:'Task',
          component:Task
        },
        {
          path:'report',
          name:'Report',
          component:Report
        }
      ]
    }
  ]
})
