import { DistroNavASide } from '../layouts/distro-nav-aside'
import { staticRoutes } from './data'

export default function AdminPage ({ children }) {
  return (
    <DistroNavASide
      navbar={(
        <nav
          className='bg-itesus-tertiary p-2'
        >
          <img
            className='aspect-[24/9] w-28'
            src='/img/logo-itesus.png' alt='Logo de itesus'
          />
        </nav>
      )}
      options={staticRoutes}
    >
      {children}
    </DistroNavASide>
  )
}
