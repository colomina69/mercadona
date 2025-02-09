

export default async function Factura({ params }: { params: Promise<{ Factura: string } >}) {
  const {Factura} = await params;


  return (
    <div>
      <h1>Detalles de la Factura: {Factura}</h1>
      {/* Aquí puedes mostrar los detalles del producto */}
    </div>
  );
}