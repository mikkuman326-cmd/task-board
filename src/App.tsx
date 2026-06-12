import { useEffect, useState, type FormEvent } from 'react'
import type { Task } from './types'
import './App.css'

const STORAGE_KEY = 'task-board.tasks'

function loadTasks(): Task[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? (JSON.parse(raw) as Task[]) : []
  } catch {
    return []
  }
}

function App() {
  const [tasks, setTasks] = useState<Task[]>(loadTasks)
  const [text, setText] = useState('')

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks))
  }, [tasks])

  const addTask = (e: FormEvent) => {
    e.preventDefault()
    const trimmed = text.trim()
    if (!trimmed) return
    setTasks((prev) => [
      ...prev,
      { id: crypto.randomUUID(), text: trimmed, completed: false },
    ])
    setText('')
  }

  const toggleTask = (id: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task,
      ),
    )
  }

  const deleteTask = (id: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== id))
  }

  return (
    <main className="board">
      <h1>Task Board</h1>
      <form className="add-form" onSubmit={addTask}>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="新しいタスクを入力..."
          aria-label="新しいタスク"
        />
        <button type="submit">追加</button>
      </form>
      <ul className="task-list">
        {tasks.map((task) => (
          <li key={task.id} className={task.completed ? 'task completed' : 'task'}>
            <label className="task-label">
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleTask(task.id)}
              />
              <span>{task.text}</span>
            </label>
            <button
              type="button"
              className="delete-button"
              aria-label="削除"
              onClick={() => deleteTask(task.id)}
            >
              削除
            </button>
          </li>
        ))}
        {tasks.length === 0 && <li className="empty">タスクはありません</li>}
      </ul>
    </main>
  )
}

export default App
