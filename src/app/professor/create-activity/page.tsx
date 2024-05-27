import { DistroNav } from '@/app/layouts/distro-nav'
import { ProfileSettingsButton } from '@/components/profile-settings/profile-settings-button'
import { Main } from '@/components/utils'
import { getUser } from '@/services/supabase/actions/auth'
import { SliderBox } from './components/slider-box'
import { ActivitySection } from './components/activity-section'
import { ActivityHeader } from './components/activity-header'
import { AssignActivityButton } from './components/assign-activity-button'

interface Props {
  searchParams: {
    [key: string]: string
  }
}

export default async function CreateActivityPage ({ searchParams }: Props) {
  const user = await getUser()

  return (
    <DistroNav
      navbar={
        <nav
          className='bg-itesus-tertiary p-2 flex justify-between items-center'
        >
          <img
            className='aspect-[24/9] w-28'
            src='/img/logo-itesus.png' alt='Logo de itesus'
          />

          <ProfileSettingsButton user={user} />
        </nav>
      }
    >
      <Main
        className='w-full flex flex-col max-w-6xl mx-auto px-4'
      >

        <ActivityHeader />

        <ActivitySection />

        <SliderBox />

        {
          searchParams.section === 'deadline' && (
            <section
              className='w-full flex justify-center'
            >
              <AssignActivityButton searchParams={searchParams} />
            </section>
          )
        }

      </Main>
    </DistroNav>
  )
}
