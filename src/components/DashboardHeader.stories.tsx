import type {Meta, StoryObj} from '@storybook/react';
import {useMemo} from 'react';
import {
  RouterProvider,
  createRouter,
  createMemoryHistory,
  createRootRoute,
  createRoute,
  Outlet,
} from '@tanstack/react-router';
import {AuthContext} from '../context/AuthContext';
import {DashboardHeader} from './DashboardHeader';
import type {User} from '../types/auth';

const meta: Meta<typeof DashboardHeader> = {
  title: 'Components/DashboardHeader',
  component: DashboardHeader,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;

type Story = StoryObj;

const mockUser: User = {
  id: '1',
  username: 'jane',
  createdAt: new Date().toISOString(),
};

const mockAuthValue = {
  user: mockUser,
  isAuthenticated: true,
  isLoading: false,
  login: async () => {},
  register: async () => {},
  logout: () => {},
  authError: null,
  clearAuthError: () => {},
};

const rootRoute = createRootRoute({
  component: () => (
    <AuthContext.Provider value={mockAuthValue}>
      <Outlet />
    </AuthContext.Provider>
  ),
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: DashboardHeader,
});

const routeTree = rootRoute.addChildren([indexRoute]);

function DashboardHeaderOnly() {
  const router = useMemo(
    () =>
      createRouter({
        routeTree,
        history: createMemoryHistory({initialEntries: ['/']}),
      }),
    []
  );
  return <RouterProvider router={router} />;
}

export const Default: Story = {
  render: () => <DashboardHeaderOnly />,
};
