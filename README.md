# Project Setup Instructions

The guide to set up this project on your machine.

## Prerequisites

- Ensure you have the above tools installed on your system:
- **Node.js**: [Download here](https://nodejs.org/).
- **Git**: [Download here](https://git-scm.com/downloads).
- **GitHub CLI (gh)**: [Download here](https://cli.github.com/).

> **Note**: Make sure to check that each tool is successfully installed by running the following commands:
>
> - `node -v`
> - `git --version`
> - `gh --version`

## Step 1: Set Up GitHub Access

1. Open your command line.
2. Authenticate with GitHub by running:

   ```bash
   gh auth login
   ```

   Follow the prompts to complete the login.

3. Clone the project repository:
   ```bash
   git clone https://github.com/EAGLE1309/alumni-connects
   ```
   This will create a local copy of the project in your working environment.

## Step 2: Install Project Dependencies

Navigate to the project folder and install all required dependencies:

```bash
npm install
```

> **Tip**: Ensure you have a stable internet connection during installation, as it may take some time to download all dependencies.

## Step 3: Start the Development Server

Run the following command to start the development server:

```bash
npm run dev
```

Once the server is running, you can preview the webpage in your browser by visiting:

```
http://localhost:3000/
```

### Troubleshooting Common Issues

- **Dependency Errors**: If you encounter errors during `npm install`, try clearing the npm cache with `npm cache clean --force` and rerun `npm install`.
- **Port Conflicts**: If `http://localhost:3000/` is already in use, either stop the conflicting service or change the port in the project's configuration file if applicable.

## Branch Usage Guidelines

Each team member has an assigned branch. **Please do not commit to any branch other than your assigned branch.** This ensures an organized workflow and prevents code conflicts.

| Username  | Assigned Branch |
| --------- | --------------- |
| Eagle     | main            |
| Prasad    | byte-2          |
| Ayush     | byte-3          |
| Sanskruti | byte-4          |
| Anshul    | byte-5          |
| Tanmay    | byte-6          |

> **Important**: Always pull the latest changes from your assigned branch before making new commits. Use the following command to keep your branch up-to-date:
>
> ```bash
> git pull origin <your-branch-name>
> ```

### Branch Etiquette

- **Commit Only to Your Branch**: Avoid making changes in branches other than your own. This helps maintain a clean history for each branch.
- **Commit Messages**: Write clear and concise commit messages that explain the purpose of the changes. For example:
  ```bash
  git commit -m "Fix: Adjust button alignment on homepage"
  ```
- **Push Changes Frequently**: To avoid losing your work, push your changes regularly:
  ```bash
  git push origin <your-branch-name>
  ```

## Additional Tips

- **Stay Updated**: Regularly communicate with the team to stay informed of any updates or changes.
- **Code Reviews**: Coordinate with the team lead if a code review is needed before merging any significant changes.

---

That’s it! You’re ready to start working on the project. Happy coding! 🎉
