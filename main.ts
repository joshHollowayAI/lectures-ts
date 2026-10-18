import express from 'express';
import { logStatus, logError } from './logging.ts';
import { isValidTitle } from './validation.ts';

type Task = {
  id: number;
  title: string;
};

const tasks: Task[] = [
 { id: 1, title: 'record a youtube video' },
 { id: 2, title: 'get groceries' },
];


// ==============================================

const app = express();
const PORT = 3000;

// ==============================================

// read JSON bodies
app.use(express.json());

// ==============================================

app.get('/tasks', (req, res) => {
  logStatus('GET: /tasks', 'green');
  res.json(tasks);
});

// ==============================================

app.get('/tasks/:id', (req, res) => {
  const id = Number( req.params.id );
  logStatus(`GET: /tasks/${id}`, 'green')

  const task = tasks.find((t: Task) => t.id === id);

  if (!task) {
    res.status(404).json({ error: 'Task not found' });
    return;
  }
  res.json(task);
});

// ==============================================

app.post('/tasks', (req, res) => {
  logStatus('POST: /tasks', 'green');

  console.log('body: ', req.body);

  const title = req.body?.title;
  if( !isValidTitle(title) ) {
    res.status(400).json({ error: 'Title must be a non-empty string' });
    return;
  }

  const task: Task = { id: tasks.length + 1, title: title.trim() };

  tasks.push(task);
  console.log('tasks: ', tasks);

  res.status(201).json(task);
});

// ==============================================

app.listen(PORT, (error) => {

  if (error) {
    logError('error: ', error);
    process.exitCode = 1;
    return;
  }

  console.log(`server running at http://localhost:${PORT}`);
});