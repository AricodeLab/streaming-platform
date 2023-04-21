// const Container = tw.div`
// flex flex-col items-center justify-center h-full
// text-white font-bold p-6
// `;

import Layout from "../../components/layout";

export default function Web() {
  return (
    <Layout>
      <div className="flex flex-col text-white w-full h-full items-center">
       
        <div className="flex justify-center items-center h-30 bg-blue-800 p-4 rounded-lg " >
          <h1>La lista de lo canales esta en Servicios, para contactar al administrador de la pagina andar a la parte de Contacto</h1>
        </div>
      </div>
    </Layout>
  );
}
