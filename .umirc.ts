import { defineConfig } from '@umijs/max';

export default defineConfig({
  antd: {},
  access: {},
  model: {},
  initialState: {},
  request: {},
  layout: {
    title: 'Products Page',
  },
  routes: [
    {
      path: '/',
      redirect: '/products',
    },
    {
      name: 'products',
      path: '/products',
      component: './Products',
    }
  ],
  npmClient: 'yarn',
  theme: {
    'primary-color': '#942ffb'
  },
  proxy: {
    '/api': {
      'target': 'https://services.dev.dropshipzone.com.au/api',
      'changeOrigin': true,
      // 'pathRewrite': { '^/api' : '' },
    },
  },
});

