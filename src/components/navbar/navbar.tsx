import { ProfileSettingsButton } from '@/components/profile-settings/profile-settings-button'
import { Days } from './days'
import { NavOptions } from './nav-options'
import { NavBarItem } from './types'
import { UserWithRoles } from '@/services/supabase/types'

interface Props {
  options: NavBarItem[]
  user?: UserWithRoles | null
}

export const NavBar = ({ options, user }: Props) => {
  return (
    <nav className=' flex flex-row h-16 select-none px-5 bg-itesus-tertiary justify-between items-center'>
      <Days />
      <NavOptions options={options} />
      <ProfileSettingsButton user={user} />
    </nav>
  )
}
