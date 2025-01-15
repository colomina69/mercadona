import { PrismaClient } from '@prisma/client'
import React from 'react'

const page = async ({ params }: { params: { Factura: string } }) => {
    const { Factura } = params
    const prisma = new PrismaClient()
    const ticket = await prisma.ticket.findUnique({
        where: {
            Factura: Factura,
        },
    })
    const lineas = await prisma.lineas.findMany({
        where: {
            Factura: Factura,
        },
    })
    const iva=await prisma.iva.findMany({
        where: {
            factura: Factura,
        },
    })
    console.log(ticket)
    console.log(lineas)
    console.log(iva)
    return (
    <div>{Factura}</div>
  )
}

export default page