import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

function App() {
  const [todo, setTodo] = useState(""); //todo is user input string
  const [todos, setTodos] = useState([]);
  const [showFinished, setShowFinished] = useState(true)
  useEffect(() => {
    let todoString = localStorage.getItem("todos");
    if (todoString) {
      let tod = JSON.parse(localStorage.getItem("todos"))
      setTodos(tod);
    }
  }, []);
  const storeToLS=function(){
    localStorage.setItem("todos", JSON.stringify(todos));
  };
const toggleFinished=(e)=>{
  setShowFinished(!showFinished)
}
  const handleAdd = () => {
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }]);
    setTodo("");
    storeToLS()
  };
  const handleEdit = (e, id) => {
    let t = todos.filter((i) => {
      return i.id === id;
    });
    setTodo(t[0].todo);
    let newTodos = todos.filter((item) => {
      return item.id !== id;
    });
    setTodos(newTodos);
        storeToLS()

  };
  const handleDelete = (e, id) => {
    let a = confirm("You want to Delete");
    if (a) {
      let newTodos = todos.filter((item) => {
        return item.id !== id;
      });
      setTodos(newTodos);
           storeToLS()

    }
  };
  const handleChange = (e) => {
    setTodo(e.target.value);
  };
  const handleCheckbox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex((item) => {
      return item.id === id;
    });
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos);
        storeToLS()

  };
  return (
    <>
      <div className="bg-blue-200">
        <div className="container mx-auto ">
          <div className="bg-blue-400 text-blue-900 text-3xl font-bold p-4 w-full rounded-2xl m-2 text-center ">
            <h1> WELCOME TO MY TODO LIST </h1>
          </div>
          <div className="main bg-red-300 h-auto rounded-2xl mx-auto p-8 m-3 ">
            <h2 className="font-bold text-2xl">Add My Todos</h2>
            <div className="add flex gap-5">
              <input
                onChange={handleChange}
                value={todo}
                type="text"
                className="h-8 w-2/6 border-none border-cyan-50 border-b-black-400 bg-amber-50 hover:bg-amber-100 m-3 rounded-2xl p-3"
              />
              <button
                onClick={handleAdd}
                disabled={todo.length<4}
                className="bg-emerald-800 text-amber-50 w-13 h-11 m-2 rounded-2xl font-bold cursor-pointer"
              >
                SAVE
              </button>
            </div>
          </div>
          <div className="list bg-red-300 h-auto rounded-2xl mx-auto p-8 m-3">
            <input onChange={toggleFinished} type="checkbox" checked={showFinished} />show finished
            <h2 className="font-bold text-2xl">Todo List</h2>
            <div>
              {todos.length == 0 && <div>No Todos To Display</div>}
              {todos.map((item) => {
                return (
                  (showFinished || !item.isCompleted)&&
                  <div key={item.id} className="add flex m-3  justify-between w-[40vw]">
                    <div className="checkBox flex gap-1">
                      <input
                        name={item.id}
                        onChange={handleCheckbox}
                        type="checkbox"
                        checked={item.isCompleted}
                      />
                      <div className={item.isCompleted ? "line-through" : ""}>
                        <h3 className="p-4 text-2xl break-words max-w-xs">
                          {item.todo}
                        </h3>
                      </div>
                    </div>
                    <div className="butt flex ">
                      <button
                        onClick={(e) => {
                          handleEdit(e, item.id);
                        }}
                        className="edit bg-emerald-800 text-amber-50 w-13 h-11 m-2 rounded-2xl font-bold cursor-pointer"
                      >
                        Edit
                      </button>
                      <button
                        onClick={(e) => {
                          handleDelete(e, item.id);
                        }}
                        className=" delete bg-emerald-800 text-amber-50 w-16 h-11 m-2 rounded-2xl font-bold cursor-pointer"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
