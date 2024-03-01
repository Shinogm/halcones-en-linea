'use client'
import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import { SideBarMultiItem } from './sidebar-item'

export const SideBarV2 = () => {
  const [option, setOption] = useState(0)

  const handleOption = (value: number) => {
    setOption(prev => prev === value ? 0 : value)
  }

  return (
    <aside
      className='bg-[#cdcccb] h-full w-80'
    >

      <ul>

        <SideBarMultiItem
          isOpen={option === 1}
          onClick={handleOption}
          value={1}
          subItems={[
            {
              title: 'Matemáticas para la mercadotecnia',
              href: '/student/materias/matematicas'
            },
            {
              title: 'Contabilidad I',
              href: '/student/materias/matematicas'
            },
            {
              title: 'Administración Global I',
              href: '/student/materias/matematicas'
            },
            {
              title: 'Computacion I',
              href: '/student/materias/matematicas'
            },
            {
              title: 'Redaccion avanzada en español',
              href: '/student/materias/matematicas'
            },
            {
              title: 'Ingles I',
              href: '/student/materias/matematicas'
            }
          ]}
        >
          Materias
        </SideBarMultiItem>
        <SideBarMultiItem
          isOpen={option === 2}
          onClick={handleOption}
          value={2}
        >
          Calendario
        </SideBarMultiItem>
        <SideBarMultiItem
          isOpen={option === 3}
          onClick={handleOption}
          value={3}
        >
          Cursos
        </SideBarMultiItem>
        <SideBarMultiItem
          isOpen={option === 4}
          onClick={handleOption}
          value={4}
        >
          Cursos
        </SideBarMultiItem>
        <SideBarMultiItem
          isOpen={option === 5}
          onClick={handleOption}
          value={5}
        >
          Serv. Administrativos
        </SideBarMultiItem>
        <SideBarMultiItem
          isOpen={option === 6}
          onClick={handleOption}
          value={6}
        >
          Foros
        </SideBarMultiItem>

      </ul>

    </aside>
  )
}

/**
 *
 * @deprecated
 */
export const SideBar = () => {
  const [option, setOption] = useState(0)
  const handleSetOption = option => () => setOption(prev => prev === option ? 0 : option)

  return (
    <div className='w-full flex flex-col text-white gap-4 h-full overflow-y-auto overflow-x-visible'>
      {/* {carreras.length > 1 && (
        <select className='text-black rounded-md' onChange={handleChangeCareer}>
          {carreras?.map(c => (
            <option value={JSON.stringify(c)} className='text-black rounded-md' key={c.key}>
              {c?.name}
            </option>
          ))}
        </select>
      )} */}
      <div className='flex flex-col gap-2 h-full overflow-x-visible bg-[#cdcbcc]'>
        <div className='flex flex-col gap-1'>
          <div className='flex gap-2 relative overflow-x-visible bg-gradient-to-r from-[#1563a7] to-[#131a2d] '>
            <button onClick={handleSetOption(1)}>
              <div className='flex flex-row gap-2 justify-center items-center px-5'>
                <img src='/arrow.svg' alt='' className={`h-4 w-4 ${option === 1 ? 'rotate-[-90deg]' : ''}`} />
                <p className='text-white text-2xl  ml-3 rounded-2xl'>
                  Materias
                </p>
              </div>
            </button>
          </div>
          <AnimatePresence>
            {option === 1 && (
              <motion.div
                variants={{
                  collapsed: { opacity: 0, height: 0 },
                  open: {
                    opacity: 1,
                    height: 'auto',
                    transition: {
                      duration: 0.4
                    }
                  }
                }}
                initial='collapsed'
                animate='open'
                exit='collapsed'
                className='flex flex-col gap-1 bg-[#808080] overflow-hidden'
              >
                {/* {
                  materias.map(m => (
                    <Link to={`/materias/${m?.id}/actividades`} key={m.key}>
                      <LiAnimate className='bg-itesus-gray-100  pl-6 pr-4 ml-3 rounded-2xl'>
                        {m.name}
                      </LiAnimate>
                    </Link>
                  ))
                } */}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <div className='flex gap-2 relative overflow-x-visible bg-gradient-to-r from-[#1563a7] to-[#131a2d] '>
          <button onClick={handleSetOption(2)}>
            <div className='flex flex-row gap-2 justify-center items-center px-5'>
              <img src='/arrow.svg' alt='' className={`h-4 w-4 ${option === 2 ? 'rotate-[-90deg]' : ''}`} />
              <p className='text-white text-2xl  ml-3 rounded-2xl'>
                Calendario
              </p>
            </div>
          </button>
        </div>
        <div className='flex gap-2 relative overflow-x-visible bg-gradient-to-r from-[#1563a7] to-[#131a2d] '>
          <button onClick={handleSetOption(3)}>
            <div className='flex flex-row gap-2 justify-center items-center px-5'>
              <img src='/arrow.svg' alt='' className={`h-4 w-4 ${option === 3 ? 'rotate-[-90deg]' : ''}`} />
              <p className='text-white text-2xl  ml-3 rounded-2xl'>
                Cursos
              </p>
            </div>
          </button>
        </div>
        <div className='flex flex-col gap-1'>
          <div className='flex gap-2 relative overflow-x-visible bg-gradient-to-r from-[#1563a7] to-[#131a2d] '>
            <button onClick={handleSetOption(4)}>
              <div className='flex flex-row gap-2 justify-center items-center px-5 '>
                <img src='/arrow.svg' alt='' className={`h-4 w-4 ${option === 4 ? 'rotate-[-90deg]' : ''}`} />
                <p className='text-white text-2xl  ml-3 rounded-2xl'>
                  Serv. Administrativos
                </p>
              </div>
            </button>
          </div>
          <AnimatePresence>
            {option === 4 && (
              <motion.div
                variants={{
                  collapsed: { opacity: 0, height: 0 },
                  open: {
                    opacity: 1,
                    height: 'auto',
                    transition: {
                      duration: 0.4
                    }
                  }
                }}
                initial='collapsed'
                animate='open'
                exit='collapsed'
                className='flex flex-col gap-2 py-1 items-start justify-start w-full text-[#808080] overflow-hidden'
              >
                <motion.button className='bg-[#e7e5e6]  px-20 flex w-full  items-center gap-2'>
                  <img src='/square.svg' alt='' className='h-2 w-2 ' />
                  Kárdex
                </motion.button>
                <motion.button className='bg-[#e7e5e6]  px-20 flex w-full  items-center gap-2'>
                  <img src='/square.svg' alt='' className='h-2 w-2 ' />
                  Becas
                </motion.button>
                <motion.button className='bg-[#e7e5e6]  px-20 flex w-full  items-center gap-2'>
                  <img src='/square.svg' alt='' className='h-2 w-2 ' />
                  Metodos de pago
                </motion.button>
                <motion.button className='bg-[#e7e5e6]  px-20 flex w-full  items-center gap-2'>
                  <img src='/square.svg' alt='' className='h-2 w-2 ' />
                  Constancias
                </motion.button>

              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <div className='flex gap-2 relative overflow-x-visible bg-gradient-to-r from-[#1563a7] to-[#131a2d] '>
          <button onClick={handleSetOption(5)}>
            <div className='flex flex-row gap-2 justify-center items-center px-5'>
              <img src='/arrow.svg' alt='' className={`h-4 w-4 ${option === 5 ? 'rotate-[-90deg]' : ''}`} />
              <p className='text-white text-2xl  ml-3 rounded-2xl'>
                Foros
              </p>
            </div>
          </button>
        </div>
      </div>
    </div>
  )
}