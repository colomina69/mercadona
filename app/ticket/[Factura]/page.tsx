import prisma from "@/lib/prisma";
import Link from "next/link";


export default async function Factura({ params }: { params: Promise<{ Factura: string } >}) {
  const {Factura} = await params;
  const ticket = await prisma.ticket.findUnique({
    where: {
      Factura: Factura,
    },
  });
  
  const lineas = await prisma.lineas.findMany({
    where: {
      Factura: Factura,
    },
  });

  const iva=await prisma.iva.findMany({
    where: {
      factura: Factura,
    },
  }); 
  

  return (
    <div className="container mx-auto p-4">

    <div className="rounded-lg shadow-md p-6 mb-6">
      <h1 className="text-2xl font-bold mb-2">Ticket {ticket?.Factura}</h1>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p><strong>Razon Social</strong> {ticket?.RazonSocial}</p>
          <p><strong>CIF</strong> {ticket?.CIF}</p>
          <p><strong>Dirección</strong> {ticket?.Direccion}</p>
          <p><strong>CP</strong> {ticket?.CP}</p>
          <p><strong>Población</strong> {ticket?.Poblacion}</p>
          <p><strong>Telefono</strong> {ticket?.Telefono}</p>
          
        </div>
        <div>
          <p><strong>Fecha</strong> {ticket?.Fecha?.toLocaleDateString('es-ES')}</p>
          <p><strong>Hora</strong>{ticket?.Hora}</p>
        {ticket?.DocumentoUrl && (
          <p><Link href={ticket.DocumentoUrl} legacyBehavior>
          <a 
            target="_blank" 
            rel="noopener noreferrer" 
            style={{
              display: 'inline-block',
              padding: '10px 20px',
              backgroundColor: '#0070f3',
              color: 'white',
              textDecoration: 'none',
              borderRadius: '5px',
              border: 'none',
              cursor: 'pointer'
            }}
          >
            Ver Ticket
          </a>
          </Link></p>
        )}

        </div>
      </div>
    </div>
  
    <div className="rounded-lg shadow-md p-6 mb-6">
      <table className="w-full">
        <thead>
          <tr>
            <th >Cantidad</th>
            <th className="text-left">Producto</th>
            <th className="text-right">Precio Unitario</th>
            <th className="text-right">Peso</th>
          </tr>
        </thead>
        <tbody>
          {lineas.map((linea) => (
            <tr key={linea.idlineas}>
              <td className="text-center">{linea.Cantidad}</td>
              <td className="text-left">{linea.Productos}</td>
              <td className="text-right">{linea.Precio?.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' })}</td>
              <td className="text-right">{linea.Peso}</td>
            </tr>
          ))}
          </tbody>
      </table>
    </div>
  
    <div className="rounded-lg shadow-md p-6">
        {iva.map((i) => (
          <div key={i.idiva} className="flex flex-rows gap-4">
            <strong>Base:</strong> {i.imponible?.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' })}
            <strong>IVA:</strong> {i.base}%
            <strong>Cuota:</strong> {i.cuota?.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' })}
          </div>
        ))}
       
        <div className="text-right">
          <p className="text-lg font-bold">Total: {ticket?.Total?.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' })}</p>
        </div>
  
    </div>
  
  </div>
  );
}