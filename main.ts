import express from 'express';
import { styleText } from 'node:util';

type Task = {
  id: number;
  title: string;
};

const tasks: Task[] = [
 { id: 1, title: 'record a youtube video' },
 { id: 2, title: 'get groceries' },
];

let nextId = 3;

// ==============================================

const app = express();
const PORT = 3000;

// ==============================================

// read JSON bodies
app.use(express.json());

// ==============================================

app.get('/tasks', (req, res) => {
  console.log(styleText(['green', 'bold'], 'GET: /tasks'));
  res.json(tasks);
});

// ==============================================

app.get('/tasks/:id', (req, res) => {
  const id = Number( req.params.id );
  console.log(styleText(['green', 'bold'], `GET: /tasks/${id}`));

  const task = tasks.find((t: Task) => t.id === id);

  if (!task) {
    res.status(404).json({ error: 'Task not found' });
    return;
  }
  res.json(task);
});

// ==============================================

app.post('/tasks', (req, res) => {
  console.log(styleText(['green', 'bold'], 'POST: /tasks'));

  console.log('body: ', req.body);

  const task: Task = { id: nextId, title: req.body?.title };
  nextId++;

  tasks.push(task);
  console.log('tasks: ', tasks);

  res.status(201).json(task);
});

// ==============================================

app.listen(PORT, (error) => {

  if (error) {
    console.error('error: ', error);
    process.exitCode = 1;
    return;
  }

  console.log(`server running at http://localhost:${PORT}`);
});