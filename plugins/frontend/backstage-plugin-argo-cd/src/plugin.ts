import {
  createApiFactory,
  createComponentExtension,
  createPlugin,
  createRoutableExtension,
  createRouteRef,
  discoveryApiRef,
  identityApiRef,
} from '@backstage/core-plugin-api';
import { ArgoCDApiClient, argoCDApiRef } from './api';

export const entityContentRouteRef = createRouteRef({
  title: 'ArgoCD Entity Content',
});

export const argocdPlugin = createPlugin({
  id: 'argocd',
  apis: [
    createApiFactory({
      api: argoCDApiRef,
      deps: { discoveryApi: discoveryApiRef, identityApi: identityApiRef },
      factory: ({ discoveryApi, identityApi }) => new ArgoCDApiClient({ discoveryApi, identityApi }),
    }),
  ],
  routes: {
    entityContent: entityContentRouteRef,
  },
});

export const EntityArgoCDContent = argocdPlugin.provide(
  createRoutableExtension({
    name: 'EntityArgoCDContent',
    component: () => import('./Router').then((m) => m.Router),
    mountPoint: entityContentRouteRef,
  })
);

export const EntityArgoCDOverviewCard = argocdPlugin.provide(
  createComponentExtension({
    name: 'EntityArgoCDOverviewCard',
    component: {
      lazy: () =>
        import('./components/ArgoCDDetailsCard').then(
          (m) => m.ArgoCDDetailsCard
        ),
    },
  })
);

export const EntityArgoCDHistoryCard = argocdPlugin.provide(
  createComponentExtension({
    name: 'EntityArgoCDHistoryCard',
    component: {
      lazy: () =>
        import('./components/ArgoCDHistoryCard').then(
          (m) => m.ArgoCDHistoryCard
        ),
    },
  })
);