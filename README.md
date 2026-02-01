# TeamTasks | Next-Gen Workflow Engine

**TeamTasks** is an advanced task management application designed to help teams manage their workflows with surgical precision. Built with **Angular 19+**, it leverages cutting-edge reactivity and a sleek, modern UI for a seamless experience.

🔗 **Live Demo:** [https://tasksclient.onrender.com/](https://tasksclient.onrender.com/)
📂 **Backend Repo:** [https://github.com/tamifalk/TasksClient.git](https://github.com/tamifalk/TasksClient.git)

---

## Key Features

- **Signals-Based State Management**: Ultra-fast UI updates using Angular Signals for zero-overhead reactivity.
- **Board & List Views**: Seamlessly switch between a visual Kanban Board and a high-density, precisely aligned List view.
- **Intelligent Task Mapping**: Real-time project and team identification using Computed Signals.
- **Interactive Collaboration**: Built-in commenting system for every task to streamline team communication.
- **Global Loading & Security**: Centralized HTTP Interceptors for JWT authentication and real-time progress tracking.
- **Modern UI/UX**: Professional design featuring Glassmorphism, CSS animations, and Material Design 3.
- **Responsive Design**: Mobile-first architecture optimized for all screen sizes.

---

## Technologies

- **Angular 19+**: Featuring Modern Control Flow (`@if`, `@for`) and Standalone Components.
- **State Management**: **Angular Signals** for reactive and efficient state handling.
- **TypeScript**: Strongly-typed architecture for maximum code reliability.
- **Material Design**: High-fidelity UI components for a polished user experience.
- **RxJS**: Advanced asynchronous stream handling for HTTP and global events.
- **REST API**: Secure communication between the Angular client and the backend.

---

## Installation and Running

### System Requirements
- Node.js (v18+)
- Angular CLI (v17+)

### Steps
1. **Clone & Install:**
   ```bash
   git clone https://github.com/tamifalk/TasksClient.git
   cd TasksClient
   npm install
   ```

2. **Run Development Server:**
   ```bash
   ng serve
   ```

   🚀 Access the app at: [http://localhost:4200](http://localhost:4200)

---

## Project Structure

```
TasksClient/
├── src/app/
│   ├── core/           # Singleton Services, Interceptors, and Guards
│   ├── features/       # Main business logic (Tasks, Teams, Projects)
│   ├── shared/         # Reusable Standalone Components (TaskCard, Header)
├── angular.json        # Angular workspace configuration
└── package.json        # Project dependencies
```

---

## Testing & Deployment

- **Unit Tests:**
  ```bash
  ng test
  ```

- **Build for Production:**
  ```bash
  ng build --configuration production
  ```

- **Deployment:** This project is automated for deployment via Render.

---

## Contribution & License

We welcome contributions! Fork the repo, create a feature branch, and submit a Pull Request.

Licensed under the MIT License.

---

## Project Creator

- **Creator:** Tami Falk
- **Email:** t6795087@gmail.com
- **Live Site:** [TeamTasks Online](https://tasksclient.onrender.com/)