import { CheckIcon, X } from "lucide-react";
import { useEffect, useState } from "react";

type Task = {
  id: number;
  task: string;
  completed?: boolean | undefined;
};
export default function TodoForm() {
  const [task, setTask] = useState("");
  const [taskss, setTaskss] = useState<Task[]>([]);
  const [filteredTasks, setFilteredTasks] = useState<Task[]>(taskss);
  const [editingTaskId, setEditingTaskId] = useState<number | null>(null);
  const [activeButton, setActiveButton] = useState(null);

  const handleButtonClick = (buttonName: any) => {
    setActiveButton(buttonName); // Définir le bouton actif
  };

  const addTaskOrUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (task.trim() !== "") {
      if (editingTaskId !== null) {
        // Mise à jour de la tâche existante
        setTaskss(
          taskss.map((t) => (t.id === editingTaskId ? { ...t, task: task } : t))
        );
        setEditingTaskId(null); // Réinitialiser l'ID d'édition après modification
      } else {
        // Ajout d'une nouvelle tâche
        setTaskss([...taskss, { id: taskss.length + 1, task }]);
      }
      setTask(""); // Réinitialiser le champ input
    }
  };

  const handelDelete = (id: number) => {
    setTaskss(taskss.filter((item) => item.id !== id));
  };

  useEffect(() => {
    const savedtaskss = localStorage.getItem("taskss");
    if (savedtaskss) {
      setTaskss(JSON.parse(savedtaskss));
    }
  }, []);

  const toggleCompleted = (id: number) => {
    setTaskss((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };
  useEffect(() => {
    localStorage.setItem("taskss", JSON.stringify(taskss));
    setFilteredTasks(taskss); // Mettre à jour filteredTasks après chaque modification de taskss
  }, [taskss]);

  const handelDeleteCompleted = () => {
    const incompleteTasks = taskss.filter((item) => !item.completed);
    setTaskss(incompleteTasks); // Ou la méthode que vous utilisez pour mettre à jour l'état.
  };

  const completed = () => {
    const Comp = taskss.filter((item) => item.completed);
    setFilteredTasks(Comp);
  };
  const allTasks = () => {
    setFilteredTasks(taskss);
  };

  const active = () => {
    const Activetask = taskss.filter((item) => !item.completed);
    setFilteredTasks(Activetask);
  };

  const editTask = (id: number) => {
    const taskToEdit = taskss.find((task) => task.id === id);
    if (taskToEdit) {
      setTask(taskToEdit.task); // Prend la valeur de la tâche à modifier
      setEditingTaskId(id); // Définit l'ID de la tâche en édition
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <form
        onSubmit={addTaskOrUpdate}
        className=" shadow-md sm:w-[350px] sm:ml-1 "
      >
        <input
          type="text"
          name="task"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Entrez votre tâche"
          className="rounded-md  w-full     dark:bg-[hsl(235,24%,19%)] p-3  border-gray-300 text-black dark:text-white placeholder:-mr-40 placeholder:text-xs placeholder:dark:text-gray-300"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hidden"
        >
          A
        </button>
      </form>{" "}
      {/* Flex container qui prend toute la hauteur */}
      <div className="shadow-2xl  sm:w-[350px] sm:ml-1 dark:bg-[hsl(235,24%,19%)] rounded-md bg-white h-auto  overflow-y-auto flex flex-col">
        <ul className="list-disc  divide-y   dark:divide-gray-700">
          {filteredTasks.length === 0 ? (
            <div className="text-black dark:text-white text-sm text-center py-5">
              Vous n'avez aucune tâche pour le moment
            </div>
          ) : (
            filteredTasks.map((item) => (
              <li
                key={item.id}
                className="text-gray-700 flex justify-between dark:text-gray-300 text-xs items-center p-1 py-3"
                onDoubleClick={() => editTask(item.id)}
              >
                <input
                  type="checkbox"
                  checked={item.completed}
                  onChange={() => toggleCompleted(item.id)}
                  id={`custom-checkbox-${item.id}`}
                  className="hidden" // Cache l'input réel
                />
                <label
                  htmlFor={`custom-checkbox-${item.id}`} // Assurez-vous que le label est lié au bon input
                  className={`w-5 h-5 flex justify-center ml-3 items-center relative rounded-full cursor-pointer 
            ${
              item.completed
                ? "bg-[linear-gradient(hsl(192,100%,67%),hsl(280,87%,65%))]" // Fond dégradé si coché
                : "border-2 border-gray-300 dark:border-gray-700" // Bordure si non coché
            }`}
                >
                  {/* Affichage de la coche */}
                  {item.completed && (
                    <CheckIcon className="w-4 h-4 text-white absolute transition-opacity opacity-100" />
                  )}
                </label>
                <span
                  className={` ${
                    item.completed
                      ? " flex-1 ml-6 line-through text-gray-400"
                      : " ml-6 flex-1 "
                  }`}
                >
                  {item.task}
                </span>
                <button onClick={() => handelDelete(item.id)}>
                  <X size={12} className="mr-4" />
                </button>
              </li>
            ))
          )}
          <div className="text-gray-400 flex gap-5 text-xs p-3">
            <button
              className={`${
                activeButton === "a"
                  ? "text-black dark:text-[hsl(220,98%,61%)]"
                  : "hover:text-black dark:hover:text-[hsl(220,98%,61%)]"
              } ml-2 font-bold sm:text-xs w-28`}
              onClick={() => {
                handleButtonClick("a");
                allTasks();
              }}
            >
              {taskss.length} Items Left
            </button>

            <button
              className={`${
                activeButton === "all"
                  ? "text-black dark:text-[hsl(220,98%,61%)]"
                  : "hover:text-black dark:hover:text-[hsl(220,98%,61%)]"
              } ml-2 font-bold sm:hidden block`}
              onClick={() => {
                handleButtonClick("all");
                allTasks();
              }}
            >
              All
            </button>

            <button
              className={`${
                activeButton === "active"
                  ? "text-black dark:text-[hsl(220,98%,61%)]"
                  : "hover:text-black dark:hover:text-[hsl(220,98%,61%)]"
              } font-bold sm:hidden `}
              onClick={() => {
                handleButtonClick("active");
                active();
              }}
            >
              Active
            </button>

            <button
              className={`${
                activeButton === "completed"
                  ? "text-black dark:text-[hsl(220,98%,61%)]"
                  : "hover:text-black dark:hover:text-[hsl(220,98%,61%)]"
              } font-bold sm:hidden   `}
              onClick={() => {
                handleButtonClick("completed");
                completed();
              }}
            >
              Completed
            </button>

            <button
              className={`${
                activeButton === "clear"
                  ? "text-black dark:text-[hsl(220,98%,61%)]"
                  : "hover:text-black dark:hover:text-[hsl(220,98%,61%)]"
              } ml-8 font-bold sm:ml-28 w-32`}
              onClick={() => {
                handleButtonClick("clear");
                handelDeleteCompleted();
              }}
            >
              Clear Completed
            </button>
          </div>
        </ul>
      </div>
      <div className="shadow-2xl   hidden sm:block sm:w-[350px] sm:ml-1 dark:bg-[hsl(235,24%,19%)] rounded-md bg-white p-2  ">
        <div className="flex gap-8 justify-center text-gray-500 ">
          <button
            className={`${
              activeButton === "all"
                ? "text-b dark:text-[hsl(220,98%,61%)]"
                : "hover:text-black dark:hover:text-[hsl(220,98%,61%)]"
            } ml-2 font-bold  `}
            onClick={() => {
              handleButtonClick("all");
              allTasks();
            }}
          >
            All
          </button>
          <button
            className={`${
              activeButton === "active"
                ? "text-black dark:text-[hsl(220,98%,61%)]"
                : "hover:text-black dark:hover:text-[hsl(220,98%,61%)]"
            } font-bold  `}
            onClick={() => {
              handleButtonClick("active");  
              active();
            }}
          >
            Active
          </button>

          <button
            className={`${
              activeButton === "completed"
                ? "text-black dark:text-[hsl(220,98%,61%)]"
                : "hover:text-black dark:hover:text-[hsl(220,98%,61%)]"
            } font-bold   `}
            onClick={() => {
              handleButtonClick("completed");
              completed();
            }}
          >
            Completed
          </button>
        </div>
      </div>
    </div>
  );
}
