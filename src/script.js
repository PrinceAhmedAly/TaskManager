function taskManager() {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    return {
      tasks: tasks,
      newTask: {
        title: "",
        description: "",
        dueDate: null,
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
            // alert('Please enter both task title and description.');
            Swal.fire({
              text: 'please enter task title and description',
              icon: 'warning', 
            });
            return;
        }
        const currentDate = new Date(); // Get the current date and time
        const formattedDate = currentDate.toISOString().split("T")[0]; // Format date as YYYY-MM-DD
        this.tasks.push({
          title: this.newTask.title.trim(),
          description: this.newTask.description.trim(),
          dueDate: formattedDate, // Set due date to current date
          completed: false,
        });
        this.saveTasks();

        // reset the inputs fields
        this.newTask.title = "";
        this.newTask.description = "";
        this.newTask.dueDate = null;
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
        Swal.fire({
          title: 'Are you sure?',
          text: 'You will not be able to recover this task!',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
          if (result.isConfirmed) {
            this.tasks.splice(index, 1);
            this.saveTasks();
            Swal.fire(
              'Deleted!',
              'Your task has been deleted.',
              'success'
            );
          }
        });
      }
      ,

      saveTasks() {
        localStorage.setItem("tasks", JSON.stringify(this.tasks));
      },
    };
  }

  // login page function
  function loginPage() {
    return {
      username: "root",
      password: "123456",

      login() {
        if (this.username === "root" && this.password === "123456") {
          window.location.href = "./taskManager.html";
        } else {
          alert("Invalid username or password. Please try again.");
        }
      },
    };
  }