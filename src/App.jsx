import { useEffect, useState } from "react";

const STORAGE_KEY = "todos";

function loadTodos() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return Array.isArray(saved) ? saved : [];
  } catch {
    return [];
  }
}

export default function App() {
  const [todos, setTodos] = useState(loadTodos);
  const [text, setText] = useState("");

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  const canAdd = text.trim() !== "";

  function addTodo(e) {
    e.preventDefault();
    if (!canAdd) return;
    setTodos([...todos, { id: crypto.randomUUID(), text: text.trim(), done: false }]);
    setText("");
  }

  function toggleTodo(id) {
    setTodos(todos.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));
  }

  function deleteTodo(id) {
    setTodos(todos.filter((t) => t.id !== id));
  }

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10">
      <div className="mx-auto max-w-xl">
        <h1 className="mb-6 text-3xl font-bold text-slate-800">待办清单</h1>

        <form onSubmit={addTodo} className="mb-6 flex gap-2">
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="有事就记一条…"
            className="min-w-0 flex-1 rounded-lg border border-slate-300 bg-white px-4 py-3 text-base outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          />
          <button
            type="submit"
            disabled={!canAdd}
            className="rounded-lg bg-blue-600 px-5 py-3 text-base font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-300"
          >
            添加
          </button>
        </form>

        {todos.length === 0 ? (
          <p className="py-10 text-center text-slate-400">还没有待办，先记一条吧</p>
        ) : (
          <ul className="space-y-2">
            {todos.map((todo) => (
              <li
                key={todo.id}
                className="flex items-center gap-3 rounded-lg border border-slate-200 bg-white px-4 py-3"
              >
                <input
                  type="checkbox"
                  checked={todo.done}
                  onChange={() => toggleTodo(todo.id)}
                  className="h-5 w-5 shrink-0 accent-blue-600"
                  aria-label={todo.done ? "取消完成" : "标记完成"}
                />
                <span className={`flex-1 break-all ${todo.done ? "text-slate-400 line-through" : "text-slate-800"}`}>
                  {todo.text}
                </span>
                <button
                  onClick={() => deleteTodo(todo.id)}
                  className="shrink-0 rounded-md px-3 py-1 text-sm text-red-600 hover:bg-red-50"
                >
                  删除
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}
