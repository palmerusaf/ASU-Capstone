# Contributing

> [!NOTE]
> This project uses "main" for its primary branch instead of "master". Any guides that reference the "master" branch use "main" instead.

## Setting Up the Project

### Step 1: Fork and Clone the Repo

- [Prerequisites](https://www.freecodecamp.org/news/git-and-github-workflow-for-open-source/#heading-prerequisites)
- [Fork the Repository](https://www.freecodecamp.org/news/git-and-github-workflow-for-open-source/#heading-how-to-fork-a-repository)
- [Clone the Repository](https://www.freecodecamp.org/news/git-and-github-workflow-for-open-source/#heading-how-to-clone-a-repository)

### Step 2: Install NPM

The recommended way to install NPM is via NVM. Click [here](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm#using-a-node-version-manager-to-install-nodejs-and-npm) for install instructions.

### Step 3: Install PNPM

This project uses PNPM instead of NPM to save [disk space and speed up installs](https://pnpm.io/motivation).
Install PNPM as a global NPM package.

```bash
npm install -g pnpm
```

TODO: update

### Step 4: Install Dependencies

Navigate to the project's root folder. This is the folder that contains the README.md. Then install dependencies via PNPM.

```bash
cd path/to/project-root/
pnpm i
pnpm drizzle-kit generate:sqlite
```

## Running the Project

### Running Dev Mode

To start the project in dev mode run the following command in the project root folder.

```bash
npm run dev
```

TODO: update

### Building Locally

To build the project run one of the following commands that match your environment:

```bash
pnpm build:win
pnpm build:mac
pnpm build:linux
```

The final executable will be in the root of the dist/ folder.

### Running Other Scripts

A list of all available project scripts is available in the package.json file in the root folder. Each script can be run with the following convention.

```bash
pnpm <script-name>
```

## Making Changes

- [Create a New Branch](https://www.freecodecamp.org/news/git-and-github-workflow-for-open-source/#heading-how-to-create-a-new-branch)
- [Add Changes to the Staging Area](https://www.freecodecamp.org/news/git-and-github-workflow-for-open-source/#heading-how-to-add-changes-to-the-staging-area)
- [Commit Changes](https://www.freecodecamp.org/news/git-and-github-workflow-for-open-source/#heading-how-to-commit-changes)
- [Synchronize Changes](https://www.freecodecamp.org/news/git-and-github-workflow-for-open-source/#heading-how-to-synchronize-changes)

## Making Pull Requests

- [Resolve Merge Conflicts](https://www.freecodecamp.org/news/git-and-github-workflow-for-open-source/#heading-how-to-resolve-merge-conflicts)
- [Push Changes](https://www.freecodecamp.org/news/git-and-github-workflow-for-open-source/#heading-how-to-push-changes)
- [Create a Pull Request](https://www.freecodecamp.org/news/git-and-github-workflow-for-open-source/#heading-how-to-create-a-pull-request)
