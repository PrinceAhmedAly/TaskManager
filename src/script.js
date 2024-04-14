function taskManager() {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    return {
      tasks: tasks,
      newTask: {
        title: "",
        description: "",
      },
      filterOption: "all",

      get filteredTasks() {
        if (this.filterOption === "completed") {
          return this.tasks.filter((task) => task.completed);
        } else if (this.filterOption === "notCompleted") {
          return this.tasks.filter((task) => !task.completed);
        } else {
          return this.tasks;
        }
      },

      addTask() {
        if (!this.newTask.title.trim() || !this.newTask.description.trim()) {
            alert('Please enter both task title and description.');
            return;
        }
        this.tasks.push({
            title: this.newTask.title.trim(),
            description: this.newTask.description.trim(),
            completed: false,
        });
        this.saveTasks();
        // reset the inputs fields
        this.newTask.title = "";
        this.newTask.description = "";
    },

      toggleComplete(index) {
        this.tasks[index].completed = !this.tasks[index].completed;
        this.saveTasks();
      },

      editTask(index) {
        const newTitle = prompt(
          "Enter new task title:",
          this.tasks[index].title
        );
        if (newTitle) {
          this.tasks[index].title = newTitle;
          this.saveTasks();
        }
      },

      deleteTask(index) {
        if (confirm("Are you sure you want to delete this task?")) {
          this.tasks.splice(index, 1);
          this.saveTasks();
        }
      },

      saveTasks() {
        localStorage.setItem("tasks", JSON.stringify(this.tasks));
      },
    };
  }