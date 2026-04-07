import { useRef, useState } from "react";

function PasswordInput() {
  const inputRef = useRef(null);
  const [show, setShow] = useState(false);

  const togglePassword = () => {
    setShow(!show);
    inputRef.current.type = show ? "password" : "text";
  };

  return (
    <div className="relative w-64">
      <input
        ref={inputRef}
        type="password"
        placeholder="Enter Password"
        className="w-full p-2 border rounded"
      />

      <img
        onClick={togglePassword}
        src={show ? "close-eye.svg" : "eye.svg"}
        alt="toggle"
        className="absolute right-3 top-2 cursor-pointer w-5"
      />
    </div>
  );
}

export default PasswordInput;