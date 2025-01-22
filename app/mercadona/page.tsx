

import Link from 'next/link'
import prisma from '../../lib/prisma'

import React from 'react'
export const dynamic = 'force-dynamic'

async function mercadonaPage() {
  const tickets = await prisma.ticket.findMany(
    {
      orderBy: {
        Fecha: 'desc',
      },
    },
  )
  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
    <div className='font-bold text-5xl'>Tickets</div>
    <table className='table-fixed border-collapse border border-slate-200 w-full'>
        <thead>
            <tr>
                <th className='font-bold text-3xl border border-slate-300'>Factura</th>
                <th className='font-bold text-3xl border border-slate-300'>Fecha</th>
                <th className='font-bold text-3xl border border-slate-300'>Total</th>
            </tr>
        </thead>
        <tbody>
      {tickets.map(ticket => (
  
          <tr key={ticket.Factura}>
              <td className='border border-slate-300 text-center'>{ticket.Factura}</td>
              <td className='border border-slate-300 text-center'>{ticket.Fecha?.toLocaleDateString()}</td>
              <td className='border border-slate-300 text-center'>{ticket.Total}</td>
              <td className='border border-slate-300 text-center'>
                <Link href={`/ticket/${ticket.Factura}`}>
                  <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
                    Ver
                  </button>
                </Link>
              </td>
          </tr>
        
      ))}
        </tbody>
    </table>
    </div>
  )
}

export default mercadonaPage
