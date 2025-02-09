

export default function Factura({ params }: { params: { Factura: string } }) {
  const Factura = params.Factura;


  return (
    <div>
      <h1>Detalles de la Factura: {Factura}</h1>
      {/* Aquí puedes mostrar los detalles del producto */}
    </div>
  );
}