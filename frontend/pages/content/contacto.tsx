import { Link, VisuallyHidden } from "ui";
import { WhatzapIcon } from "../../components/Icons";
import Layout from "../../components/layout";
//rgb(94, 219, 77)
export default function Web() {
  return (
    <Layout>
      <div className="flex flex-col text-white w-full h-full  my-10 items-center">
        <h1>Formas de contacto con el administrador de la pagina</h1>
      </div>
      <ul className="flex flex-col text-white w-full h-full  my-10 items-center">
        <li className="my-2">
          <Link
            className="flex"
            href="https://web.whatsapp.com/send?phone=573137797778"
            isExternal
          >
            <h1 className="hover:underline mr-5 self-center ">+573 137 797 778</h1>

            <VisuallyHidden>WhatsApp</VisuallyHidden>
            <WhatzapIcon boxSize={16} viewBox="0 -5 24 24" />
          </Link>
        </li>

        <li className="my-2">
          <Link
            className="flex  "
            href="https://web.whatsapp.com/send?phone=573334001289"
            isExternal
          >
            <h1 className="hover:underline mr-5 self-center ">+573 334 001 289</h1>

            <VisuallyHidden>WhatsApp</VisuallyHidden>
            <WhatzapIcon boxSize={16} viewBox="0 -5 24 24" />
          </Link>
        </li>
      </ul>
    </Layout>
  );
}
