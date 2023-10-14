# README

## 环境准备
node版本 >= 16
## 启动命令
1. yarn
2. npm start
## 技术栈
umi + antd + react-infinite-scroll-component + typescript
## 代码
/src/pages/Products
## 细节
1. 首次加载时，需要鉴权登录，已实现通过输入email/密码进行授权获取
2. 采用css3媒体查询 + js判断【屏幕宽度 <= 768 为移动端】实现响应式
3. pc端采用分页器进行分页，移动端采用react-infinite-scroll-component进行无限滚动加载
4. 在pc端改变屏幕大小至768以下会自动切换到移动端加载数据模式，考虑实际场景，未对已翻页数据和无限加载联动
5. token过期后会提示错误，自动切换到未授权状态
6. 已实现数据筛选功能，输入关键字后300ms【防抖操作】自动进行搜索

