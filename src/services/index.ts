import type { Services } from '@/types';
import client from './api-client';
import { METHODS } from '@/utils/constants';

const services: Services = {
  admin: {
    profile: ({ ...configs }: Record<string, unknown>) =>
      client({
        method: METHODS.GET,
        url: '/admin/profile',
        next: {
          cache: 'no-store',
        },
        ...configs,
      }),
    users: {
      getAll: ({ ...configs }: Record<string, unknown>) =>
        client({
          method: METHODS.GET,
          url: '/admin/users',
          ...configs,
        }),
      get: ({ id, ...configs }: Record<string, unknown>) =>
        client({
          method: METHODS.GET,
          url: `/admin/users/${id}`,
          ...configs,
        }),
      create: ({ data, ...configs }: Record<string, unknown>) =>
        client({
          method: METHODS.POST,
          url: '/admin/users',
          data,
          ...configs,
        }),
      update: ({ id, data, ...configs }: Record<string, unknown>) =>
        client({
          method: METHODS.PUT,
          url: `/admin/users/${id}`,
          data,
          ...configs,
        }),
      delete: ({ id, ...configs }: Record<string, unknown>) =>
        client({
          method: METHODS.DELETE,
          url: `/admin/users/${id}`,
          ...configs,
        }),
    },
    products: {
      getAll: ({ ...configs }: Record<string, unknown>) =>
        client({
          method: METHODS.GET,
          url: '/admin/products',
          next: {
            revalidate: 600,
            tags: ['products-list'],
          },
          ...configs,
        }),
      get: ({ id, ...configs }: Record<string, unknown>) =>
        client({
          method: METHODS.GET,
          url: `/admin/products/${id}`,
          ...configs,
        }),
      create: ({ data, ...configs }: Record<string, unknown>) =>
        client({
          method: METHODS.POST,
          url: '/admin/products',
          data,
          ...configs,
        }),
      update: ({ id, data, ...configs }: Record<string, unknown>) =>
        client({
          method: METHODS.PUT,
          url: `/admin/products/${id}`,
          data,
          ...configs,
        }),
      delete: ({ id, ...configs }: Record<string, unknown>) =>
        client({
          method: METHODS.DELETE,
          url: `/admin/products/${id}`,
          ...configs,
        }),
    },
  },
  auth: {
    login: ({ data, ...configs }: Record<string, unknown>) =>
      client({
        method: METHODS.POST,
        url: '/auth/login',
        data,
        ...configs,
      }),

    register: ({ data, ...configs }: Record<string, unknown>) =>
      client({
        method: METHODS.POST,
        url: '/auth/register',
        data,
        ...configs,
      }),

    forgot_password: ({ data, ...configs }: Record<string, unknown>) =>
      client({
        method: METHODS.POST,
        url: '/auth/forgot-password',
        data,
        ...configs,
      }),

    reset_password: ({ data, ...configs }: Record<string, unknown>) =>
      client({
        method: METHODS.POST,
        url: '/auth/reset-password',
        data,
        ...configs,
      }),
  },
  web: {
    privacy_policy: ({ ...configs }: Record<string, unknown>) =>
      client({
        method: METHODS.GET,
        url: '/web/privacy-policy',
        ...configs,
      }),
    terms_of_service: ({ ...configs }: Record<string, unknown>) =>
      client({
        method: METHODS.GET,
        url: '/web/terms-of-service',
        ...configs,
      }),
  },
};

export default services;
