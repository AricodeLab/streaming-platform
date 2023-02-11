// import tw from "twin.macro";
import RegisterForm from "../components/registerForm";

// const Container = tw.div`
// flex flex-col items-center justify-center h-full
// text-white font-bold p-6
// `;

export default function admin() {
  return (
    <div className="flex flex-col text-white w-full h-full items-center">
      <RegisterForm />
    </div>
  );
}
