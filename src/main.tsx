import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {
  Outlet,
  RouterProvider,
  createRouter,
  createRoute,
  createRootRoute,
  Link,
} from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import { Theme, Select } from '@radix-ui/themes'
import { Library } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import './i18n'
import '@radix-ui/themes/styles.css'
import './index.css'
import { Rulebook } from './components/Rulebook'
import { HandValidator } from './components/HandValidator'
import { LogoWithText } from './components/Logo'

const RootComponent = () => {
  const { t, i18n } = useTranslation();
  return (
    <Theme appearance="light" accentColor="iris" grayColor="mauve" panelBackground="translucent" radius="large">
      <div aria-hidden="true" className="bg-shapes"><div className="bg-shape-bottom" /></div>
      <div className="min-h-screen font-sans antialiased flex flex-col" style={{ position: 'relative', zIndex: 1 }}>

        {/* Header */}
        <header className="sticky top-0 z-50 w-full backdrop-blur" style={{ borderBottom: '1px solid var(--gray-a5)', background: 'color-mix(in srgb, var(--color-background) 90%, transparent)' }}>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between">

              {/* Logo */}
              <Link to="/" className="flex items-center">
                <LogoWithText />
              </Link>

              {/* Desktop nav */}
              <nav className="hidden md:flex items-center space-x-8 text-sm font-medium">
                <Link
                  to="/"
                  className="nav-link flex items-center gap-2 transition-colors"
                >
                  <Library size={15} />
                  {t('nav.rules')}
                </Link>
              </nav>

              {/* Mobile nav */}
              <nav className="flex md:hidden items-center gap-1">
                <Link
                  to="/"
                  className="nav-link-icon p-2 rounded-md transition-colors"
                >
                  <Library size={18} />
                </Link>
              </nav>

              {/* Controls */}
              <div className="flex items-center gap-3">
                <Select.Root value={i18n.language.split('-')[0]} onValueChange={(lng) => i18n.changeLanguage(lng)}>
                  <Select.Trigger variant="ghost" />
                  <Select.Content>
                    <Select.Item value="en">English</Select.Item>
                    <Select.Item value="pt">Português</Select.Item>
                    <Select.Item value="es">Español</Select.Item>
                  </Select.Content>
                </Select.Root>

              </div>

            </div>
          </div>
        </header>

        {/* Main content */}
        <main className="flex-1">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <Outlet />
          </div>
        </main>

        {/* Footer */}
        <footer style={{ borderTop: '1px solid var(--gray-a5)', background: 'var(--gray-a2)' }}>
          <div className="container mx-auto px-4 py-10 text-center">
            <div className="flex justify-center mb-4">
              <LogoWithText />
            </div>
            <p className="text-sm" style={{ color: 'var(--gray-10)' }}>
              © {new Date().getFullYear()} Shanghai Guide. Built with Radix &amp; TanStack.
            </p>
          </div>
        </footer>

      </div>
      <TanStackRouterDevtools position="bottom-right" />
    </Theme>
  );
};

const rootRoute = createRootRoute({
  component: RootComponent,
})

const indexRoute = createRoute({ getParentRoute: () => rootRoute, path: '/', component: Rulebook })
const validatorRoute = createRoute({ getParentRoute: () => rootRoute, path: '/validator', component: HandValidator })

const routeTree = rootRoute.addChildren([indexRoute, validatorRoute])
const router = createRouter({ routeTree, basepath: '/shanghai' })

declare module '@tanstack/react-router' {
  interface Register { router: typeof router }
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
