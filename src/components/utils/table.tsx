import React from 'react'

// Before has a text-gray-300 class
export const Th = ({ children, className, ...props }: React.HTMLAttributes<HTMLTableCellElement>) => (
  <th
    className={`py-1 ${className ?? ''}`}
    {...props}
  >
    {children}
  </th>
)

export const ThWhite = ({ className, ...props }: React.HTMLAttributes<HTMLTableCellElement>) => <Th {...props} className={`text-centerpx-4 py-3 font-mediu ${className ?? ''}`} />

// Before has a text-white class
export const Td = ({ children, className, ...props }: React.HTMLAttributes<HTMLTableCellElement>) => (
  <td
    className={`text-center ${className ?? ''}`}
    {...props}
  >
    {children}
  </td>
)
export const TdWhite = ({ className, ...props }: React.HTMLAttributes<HTMLTableCellElement>) => <Td {...props} className={`px-4 py-3 ${className ?? ''}`} />

export const TableContainer = ({ children, className, ...props }: React.HTMLAttributes<HTMLElement>) => (
  <div
    className={`relative overflow-y-auto flex-1 text-center ${className ?? ''}`}
    {...props}
  >
    {children}
  </div>
)

export const Table = ({ children, className, ...props }: React.HTMLAttributes<HTMLTableElement>) => (
  <table
    className={`w-full table-auto shadow-2xl animate-fade-in-up ${className ?? ''}`}
    {...props}
  >
    {children}
  </table>
)

export const THeadSticky = ({ children, className, ...props }: React.HTMLAttributes<HTMLElement>) => (
  <thead
    className='sticky top-0 bg-itesus-primary/50 backdrop-blur-sm'
    {...props}
  >
    {children}
  </thead>
)

export const Tr = ({ children, className, ...props }: React.HTMLAttributes<HTMLTableRowElement>) => (
  <tr
    className={`border-b border-[#cdcccb]/20 ${className ?? ''}`}
    {...props}
  >
    {children}
  </tr>
)

export const Tr2 = ({ children, className, ...props }: React.HTMLAttributes<HTMLTableRowElement>) => (
  <tr
    className={`bg-[#1a63a5] text-[#cdcccb] ${className ?? ''}`}
    {...props}
  >
    {children}
  </tr>
)

export const TBody = ({ children, className, ...props }: React.HTMLAttributes<HTMLElement>) => (
  <tbody
    className={`divide-y divide-[#cdcccb]/20 divide-solid bg-[#1a63a5]/50 text-[#cdcccb] ${className ?? ''}`}
    {...props}
  >
    {children}
  </tbody>
)
