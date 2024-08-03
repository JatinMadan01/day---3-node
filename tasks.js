const fs = require('fs');
const path = require('path');
const readline = require('readline');

const filePath = path.join(__dirname, 'tasks.json');

const readTasks = () => {
  if (!fs.existsSync(filePath)) {
    return [];
  }
  const data = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(data);
};

const writeTasks = (tasks) => {
  fs.writeFileSync(filePath, JSON.stringify(tasks, null, 2));
};

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const addTask = () => {
  rl.question('Enter the new task: ', (task) => {
    const tasks = readTasks();
    tasks.push({ task, completed: false });
    writeTasks(tasks);
    console.log('Task added.');
    mainMenu();
  });
};

const viewTasks = () => {
  const tasks = readTasks();
  if (tasks.length === 0) {
    console.log('No tasks available.');
  } else {
    tasks.forEach((task, index) => {
      console.log(`${index + 1}. ${task.task} [${task.completed ? 'Completed' : 'Incomplete'}]`);
    });
  }
  mainMenu();
};

const markTaskComplete = () => {
  const tasks = readTasks();
  viewTasks();
  rl.question('Enter the task number to mark as complete: ', (num) => {
    const index = parseInt(num) - 1;
    if (index >= 0 && index < tasks.length) {
      tasks[index].completed = true;
      writeTasks(tasks);
      console.log('Task marked as complete.');
    } else {
      console.log('Invalid task number.');
    }
    mainMenu();
  });
};

const removeTask = () => {
  const tasks = readTasks();
  viewTasks();
  rl.question('Enter the task number to remove: ', (num) => {
    const index = parseInt(num) - 1;
    if (index >= 0 && index < tasks.length) {
      tasks.splice(index, 1);
      writeTasks(tasks);
      console.log('Task removed.');
    } else {
      console.log('Invalid task number.');
    }
    mainMenu();
  });
};

const mainMenu = () => {
  console.log('\n1. Add a new task');
  console.log('2. View a list of tasks');
  console.log('3. Mark a task as complete');
  console.log('4. Remove a task');
  console.log('5. Exit');

  rl.question('Choose an option: ', (option) => {
    switch (option) {
      case '1':
        addTask();
        break;
      case '2':
        viewTasks();
        break;
      case '3':
        markTaskComplete();
        break;
      case '4':
        removeTask();
        break;
      case '5':
        rl.close();
        break;
      default:
        console.log('Invalid option.');
        mainMenu();
        break;
    }
  });
};

mainMenu();
