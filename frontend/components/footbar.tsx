import { Link } from "ui";

function FootBar() {
  return (
    <footer className="text-white  inset-x-0 bottom-0 p-4 bg-zinc-800 border-t">
      <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
        © 2023{" "}
       
          <Link className="hover:underline" href="https://chakra-ui.com" isExternal>
            Erwin System
          </Link>
       
        . All Rights Reserved.
      </span>
    </footer>
  );
}

export default FootBar;
