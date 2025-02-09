// main.js

// --- 1. Define Your Default Data ---
// You can expand these arrays with more tasks later.
const defaultData = {
    storyMissions: [
      { id: 1, title: "Outlaws from the West", completed: false },
      { id: 2, title: "Enter, Pursued by a Memory", completed: false },
      { id: 3, title: "Old Friends", completed: false }
      // Add more story missions as needed.
    ],
    challenges: [
      { id: 1, type: "Sharpshooter", description: "Kill 3 birds", completed: false },
      { id: 2, type: "Sharpshooter", description: "Kill 5 enemies", completed: false }
      // Add more challenges as needed.
    ]
  };
  
  // --- 2. Load or Initialize Data ---
  let appData = JSON.parse(localStorage.getItem('rdr2Progress')) || defaultData;
  
  // --- 3. Function to Save Data ---
  function saveData() {
    localStorage.setItem('rdr2Progress', JSON.stringify(appData));
  }
  
  // --- 4. Function to Render Overall Progress ---
  function renderProgress() {
    // Count tasks in story missions and challenges.
    const totalTasks = appData.storyMissions.length + appData.challenges.length;
    const completedTasks = 
      appData.storyMissions.filter(task => task.completed).length +
      appData.challenges.filter(task => task.completed).length;
    
    const progressPercent = totalTasks === 0 ? 0 : ((completedTasks / totalTasks) * 100).toFixed(2);
    
    const progressDiv = document.getElementById('progress');
    progressDiv.textContent = `Overall Progress: ${completedTasks}/${totalTasks} tasks completed (${progressPercent}%)`;
  }
  
  // --- 5. Helper Function to Create a Task Element ---
  function createTaskItem(task) {
    const container = document.createElement('div');
    container.className = 'task-item';
  
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = task.completed;
    checkbox.addEventListener('change', function() {
      task.completed = checkbox.checked;
      saveData();         // Save updated data.
      renderProgress();   // Update overall progress.
    });
    container.appendChild(checkbox);
  
    const label = document.createElement('label');
    // Use "title" if available; if not, use "description" (for challenges).
    label.textContent = task.title || task.description;
    container.appendChild(label);
  
    return container;
  }
  
  // --- 6. Function to Render All Tasks ---
  function renderTasks() {
    const appDiv = document.getElementById('app');
    appDiv.innerHTML = ''; // Clear any previous content.
  
    // --- Render Story Missions ---
    const storySection = document.createElement('section');
    const storyHeader = document.createElement('h2');
    storyHeader.textContent = 'Story Missions';
    storySection.appendChild(storyHeader);
    
    appData.storyMissions.forEach(task => {
      const taskElement = createTaskItem(task);
      storySection.appendChild(taskElement);
    });
    appDiv.appendChild(storySection);
  
    // --- Render Challenges ---
    const challengeSection = document.createElement('section');
    const challengeHeader = document.createElement('h2');
    challengeHeader.textContent = 'Challenges';
    challengeSection.appendChild(challengeHeader);
  
    appData.challenges.forEach(task => {
      const taskElement = createTaskItem(task);
      challengeSection.appendChild(taskElement);
    });
    appDiv.appendChild(challengeSection);
  
    // Update overall progress
    renderProgress();
  }
  
  // --- 7. Initialize the App on Page Load ---
  document.addEventListener('DOMContentLoaded', function() {
    renderTasks();
  });
  