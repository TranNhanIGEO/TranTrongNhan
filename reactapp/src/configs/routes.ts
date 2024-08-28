const routes = {
  auth: {
    login: '/login',
    register: '/register',
    confirmEmail: '/confirm-email',
    forgetPassword: '/forgot-password',
    resetPassword: '/reset-password',
    changePassword: '/change-password/:id',
    changeProfile: '/my-profile/:id',
  },
  customer: {
    home: '/',
    about: '/about',
    contact: '/contact',
    
    news: {
      root: '/news',
      detail: '/news/:id'
    },
    
    product: {
      root: '/product',
      detail: '/product/:id'
    },

    order: {
      root: '/order',
      detail: '/order/:id'
    },

    cart: '/cart',
    checkout: '/checkout',
    payment: '/payment',
  },
  admin: {
    dashboard: '/dashboard',

    category: {
      root: '/dashboard/category',
      add: '/dashboard/category/add',
      detail: '/dashboard/category/:id',
      edit: '/dashboard/category/:id/edit',
    },

    product: {
      root: '/dashboard/product',
      detail: '/dashboard/product/:id',
      add: '/dashboard/product/add',
      edit: '/dashboard/product/:id/edit',
    },

    order: {
      root: '/dashboard/order',
      detail: '/dashboard/order/:id'
    },

    banner: {
      root: '/dashboard/banner',
      add: '/dashboard/banner/add',
      detail: '/dashboard/banner/:id',
      edit: '/dashboard/banner/:id/edit',
    },

    feedback: {
      root: '/dashboard/feedback',
      detail: '/dashboard/feedback/:id'
    },

    news: {
      root: '/dashboard/news',
      add: '/dashboard/news/add',
      detail: '/dashboard/news/:id',
      edit: '/dashboard/news/:id/edit',
    },

    promotion: {
      root: '/dashboard/promotion',
      detail: '/dashboard/promotion/:id',
      add: '/dashboard/promotion/add',
      edit: '/dashboard/promotion/:id/edit',
    },

    user: '/dashboard/user',
    userDetail: '/dashboard/user/:id',
  },
  error: '/*',
};

export default routes;
