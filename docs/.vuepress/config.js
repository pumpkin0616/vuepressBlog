
module.exports = {
  title: 'Pumpkin\'s blog',
  description: '我的个人网站',
  head: [ // 注入到当前页面的 HTML <head> 中的标签
    ['link', { rel: 'icon', href: '/images/Pumpkin.png' }], // 增加一个自定义的 favicon(网页标签的图标)
  ],
  plugins: [
    [
      'cursor-effects',
    ],
    [
      "dynamic-title",
      {
          showIcon: "/favicon.ico",
          showText: "(/≧▽≦/)咦！又好了！",
          hideIcon: "/failure.ico",
          hideText: "(●—●)喔哟，崩溃啦！",
          recoverTime: 2000
      }
    ],
    ['go-top'],
  //   [
  //     "ribbon",
  //     {
  //        size: 90, // 彩带的宽度，默认为 90
  //        opacity: 0.5, // 彩带的不透明度，默认为 0.3
  //        zIndex: -1 // 彩带的 z-index 属性，默认值为 -1
  //     }
  //  ],
   ['vuepress-plugin-awesome-musicplayer']
    // [
    //   "vuepress-plugin-live2d",
    //   {
    //      modelName: ['z16','Epsilon2.1','izumi','koharu','shizuku','miku','hijiki','tororo'], // 模型名称，可传入一个字符串或者数组 
    //      mobileShow: false, // 是否在移动设备上显示
    //      position: "left" // 显示在左下角还是右下角
    //   }
    // ]
  ],
  base: '/', // 这是部署到github相关的配置
  markdown: {
    lineNumbers: false // 代码块显示行号
  },
  themeConfig: {
    nav:[ // 导航栏配置
      {text: '前端基础', link: '/accumulate/' },
      {text:'部署相关',link:'/deployment/'},
      {text: '微博', link: 'https://weibo.com'}      
    ],
    sidebar: 'auto', // 侧边栏配置
    sidebarDepth: 2, // 侧边栏显示2级
  },
  
};