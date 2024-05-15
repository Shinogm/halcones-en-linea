'use client'

import { addCareerToCoordinator, removeCareerFromCoordinator } from '@/services/supabase/actions/coordinators'
import { ReducedCareer } from '@/services/supabase/types'
import { useState } from 'react'

interface Props {
  career: ReducedCareer
  checked: boolean
  coordinatorId: string
}

export const DisplayCareer = ({ career, checked, coordinatorId }: Props) => {
  const [currentChecked, setCurrentChecked] = useState(checked)

  return (
    <label>
      <span>
        {career.name}
      </span>

      <input
        type='checkbox'
        name='careers'
        checked={currentChecked}
        onChange={(e) => {
          const newValue = e.target.checked
          setCurrentChecked(newValue)

          if (newValue) {
            addCareerToCoordinator(coordinatorId, career.id)
              .catch(console.log)
          } else {
            removeCareerFromCoordinator(coordinatorId, career.id)
              .catch(console.log)
          }
        }}
      />
    </label>
  )
}
