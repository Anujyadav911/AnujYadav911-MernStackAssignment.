import { useEffect, useState } from "react";
import {
  fetchTasks,
  createTask,
  updateTask as updateTaskApi,
  deleteTask as deleteTaskApi
} from "../services/taskApi";

const emptyForm = { title: "", description: "", status: "pending" };

const TasksPage = () => {
  const [tasks, setTasks] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const loadTasks = async () => {
    try {
      const data = await fetchTasks();
      setTasks(data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load tasks");
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      if (editingId) {
        const updated = await updateTaskApi(editingId, form);
        setTasks((prev) =>
          prev.map((t) => (t._id === editingId ? updated : t))
        );
      } else {
        const created = await createTask(form);
        setTasks((prev) => [created, ...prev]);
      }
      setForm(emptyForm);
      setEditingId(null);
    } catch (err) {
      setError(err.response?.data?.message || "Save failed");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (task) => {
    setEditingId(task._id);
    setForm({
      title: task.title,
      description: task.description || "",
      status: task.status
    });
  };

  const handleDelete = async (id) => {
    try {
      await deleteTaskApi(id);
      setTasks((prev) => prev.filter((t) => t._id !== id));
    } catch (err) {
      setError(err.response?.data?.message || "Delete failed");
    }
  };

  const cancelEdit = () => {
    setEditingId(null);
    setForm(emptyForm);
  };

  return (
    <div className="tasks-layout">
      <section className="card">
        <h2>{editingId ? "Edit Task" : "New Task"}</h2>
        <form onSubmit={handleSubmit} className="form">
          <label>
            Title
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Description
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={3}
            />
          </label>
          <label>
            Status
            <select
              name="status"
              value={form.status}
              onChange={handleChange}
            >
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
            </select>
          </label>
          {error && <p className="error">{error}</p>}
          <div className="actions">
            <button type="submit" className="btn" disabled={loading}>
              {loading ? "Saving..." : editingId ? "Update Task" : "Add Task"}
            </button>
            {editingId && (
              <button
                type="button"
                onClick={cancelEdit}
                className="btn btn-outline"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </section>

      <section className="card">
        <h2>Tasks</h2>
        {tasks.length === 0 ? (
          <p className="muted">No tasks yet.</p>
        ) : (
          <ul className="task-list">
            {tasks.map((task) => (
              <li
                key={task._id}
                className={`task-item ${
                  task.status === "completed" ? "completed" : ""
                }`}
              >
                <div className="task-main">
                  <h3>{task.title}</h3>
                  {task.description && (
                    <p className="task-desc">{task.description}</p>
                  )}
                  <span className="badge">{task.status}</span>
                </div>
                <div className="task-actions">
                  <button
                    className="btn btn-small"
                    onClick={() => handleEdit(task)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-small btn-danger"
                    onClick={() => handleDelete(task._id)}
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
};

export default TasksPage;







