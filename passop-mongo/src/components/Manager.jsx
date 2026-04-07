import React from "react";
import { useEffect } from "react";
import { useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";

const Manager = () => {
  const [form, setform] = useState({ site: "", username: "", password: "" });

  const passRef = useRef();
  const [show, setShow] = useState(false);
  const [passwordArray, setpasswordArray] = useState([]);
  const getPasswords = async () => {
    let req = await fetch("http://localhost:3000/");
    let passwords = await req.json();
    console.log(passwords)
    setpasswordArray(passwords);
  };

  useEffect(() => {
    getPasswords();
  }, []);

  const [message, setMessage] = useState("");

  const copyText = async (text) => {
    await navigator.clipboard.writeText(text);
    setMessage("Copied to clipboard!");

    setTimeout(() => setMessage(""), 2000);
  };
  const togglePassword = () => {
    setShow(!show);
  };
 const savePass = async () => {
  if (!form.site.trim() || !form.username.trim() || !form.password.trim()) {
    alert("Please fill the form properly");
    return;
  }

  // 👉 if editing (id exists)
  if (form.id) {
    // delete old from backend
    await fetch("http://localhost:3000/", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: form.id }),
    });
  }

  // 👉 create new (updated or fresh)
  const newEntry = { ...form, id: form.id || uuidv4() };

  await fetch("http://localhost:3000/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newEntry),
  });

  // refresh data
  getPasswords();

  // clear form
  setform({ site: "", username: "", password: "" });
};
  const deletePass = async (id) => {
  const updated = passwordArray.filter((item) => item.id !== id);
  setpasswordArray(updated);

  await fetch("http://localhost:3000/", {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id }),
  });
};
const editPass = (id) => {
  const item = passwordArray.find((item) => item.id === id);

  // fill form
  setform(item);

  // remove from UI
  const updated = passwordArray.filter((i) => i.id !== id);
  setpasswordArray(updated);
};
  const handleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
  };
  return (
    <div className="md:py-0 md:my-container mx-auto m-2  p-3">
      {message && (
        <div className="fixed top-5 right-5 bg-green-500 text-white px-4 py-2 rounded shadow-lg z-50">
          {message}
        </div>
      )}
      <div className="head m-5 p-2 text-center">
        <h1 className=" ">
          <span className="text-emerald-700 font-bold text-3xl">&lt; </span>
          <span className="text-3xl"> Pass</span>
          <span className="text-emerald-700 font-bold text-3xl">Op/&gt;</span>
        </h1>
        <p className="text-emerald-900">Your Own Password Manager</p>
      </div>

      <div className=" w-[80vw] bg-white/10 backdrop-blur-lg rounded-2xl p-6 shadow-lg mx-auto">
        <input
          value={form.site}
          name="site"
          onChange={handleChange}
          placeholder="Enter Website Name..."
          className="w-full bg-white/80 rounded-full p-3 mb-3 outline-none focus:ring-2 focus:ring-emerald-500"
          type="text"
        />

        <div className="flex gap-3">
          <input
            value={form.username}
            name="username"
            onChange={handleChange}
            placeholder="Enter User ID"
            className="w-2/3 bg-white/80 rounded-full p-3 outline-none focus:ring-2 focus:ring-emerald-500"
            type="text"
          />

          <div className="w-1/3 relative">
            <input
              value={form.password}
              name="password"
              onChange={handleChange}
              ref={passRef}
              placeholder="Enter Password"
              className="w-full bg-white/80 rounded-full p-3 pr-10 outline-none focus:ring-2 focus:ring-emerald-500"
              type={show ? "text" : "password"}
            />

            <img
              onClick={togglePassword}
              src={show ? "eye.svg" : "close-eye.svg"}
              alt="toggle"
              className="absolute right-3 top-3 w-5 cursor-pointer"
            />
          </div>
        </div>
        <button
          onClick={savePass}
          className=" w-[15vw] mx-auto mt-5 bg-emerald-600 p-3 text-gray-300 rounded-xl hover:bg-emerald-700  font-bold transition duration-200 flex justify-center gap-4 items-center"
        >
          <lord-icon
            src="https://cdn.lordicon.com/efxgwrkc.json"
            trigger="hover"
          ></lord-icon>{" "}
          Save
        </button>
      </div>
      <div className="passwords ">
        <h2 className="text-center m-5 text-2xl text-emerald-900">
          Your Passwords
        </h2>
        {passwordArray.length === 0 && (
          <div className="text-center">No Password To Show</div>
        )}
        {passwordArray.length != 0 && (
          <table className="rounded-xl overflow-hidden table-auto w-[60vw] mx-auto overflow-x-auto overflow-hidden">
            <thead className="bg-emerald-700 text-white ">
              <tr>
                <th className="py-3 font-bold text-lg">Web-Site</th>
                <th className="py-3 font-bold text-lg">User Name</th>
                <th className="py-3 font-bold text-lg">Password</th>
                <th className="py-3 font-bold text-lg">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-emerald-200">
              {passwordArray.map((item, index) => {
                return (
                  <tr key={item.id}>
                    <td className="text-center w-32 p-2">
                      <div className="flex justify-center items-center gap-4 text-emerald-900">
                        <a href={item.site} target="_blank">
                          {item.site}
                        </a>
                        <img
                          className="cursor-pointer"
                          onClick={() => {
                            copyText(item.site);
                          }}
                          src="copy.svg"
                          alt="copy"
                        />
                      </div>
                    </td>
                    <td className="text-center w-32 p-2">
                      <div className="flex justify-center items-center gap-4 text-emerald-900">
                        {item.username}
                        <img
                          className="cursor-pointer"
                          onClick={() => {
                            copyText(item.username);
                          }}
                          src="copy.svg"
                          alt="copy"
                        />
                      </div>
                    </td>
                    <td className="text-center w-32 p-2">
                      <div className="flex justify-center items-center gap-4 text-emerald-900">
                        {item.password}

                        <img
                          className="cursor-pointer"
                          onClick={() => {
                            copyText(item.password);
                          }}
                          src="copy.svg"
                          alt="copy"
                        />
                      </div>
                    </td>
                    <td className="text-center w-32 p-2">
                      <div className="flex justify-center items-center gap-4">
                        <img
                          className="cursor-pointer"
                          onClick={() => {
                            editPass(item.id);
                          }}
                          src="edit.svg"
                          alt="edit"
                        />
                        <img
                          className="cursor-pointer"
                          onClick={() => {
                            deletePass(item.id);
                          }}
                          src="delete.svg"
                          alt="delete"
                        />
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Manager;
