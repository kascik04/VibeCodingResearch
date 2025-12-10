// @ts-nocheck
import React from 'react';
import { ApplyPluginsType } from 'C:/Users/kasick/Desktop/THỰC TẬP/Vibe_Coding/VibeCoding_Login/login-fe/node_modules/umi/node_modules/@umijs/runtime';
import * as umiExports from './umiExports';
import { plugin } from './plugin';

export function getRoutes() {
  const routes = [
  {
    "path": "/login",
    "component": require('@/pages/login/index').default,
    "exact": true
  },
  {
    "path": "/",
    "component": require('@/layouts/index').default,
    "wrappers": [require('@/wrappers/auth').default],
    "routes": [
      {
        "path": "/dashboard",
        "component": require('@/pages/dashboard/index').default,
        "exact": true
      }
    ]
  }
];

  // allow user to extend routes
  plugin.applyPlugins({
    key: 'patchRoutes',
    type: ApplyPluginsType.event,
    args: { routes },
  });

  return routes;
}
