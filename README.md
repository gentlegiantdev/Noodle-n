# Introduction

Noodle'n is a Full-stack web application designed to aid your individual grocery-related needs!

---

# Mission and Objectives
### Who? What? Where? When? Why?

- Our mission is to create a grocery shopping app that allows users to efficiently track grocery supplies before, during, and after shopping.

- Users will reduce stress related to overpacked schedules and reptile grocery purchases leading to unused products.

---

# Project Overview
### Time

- Estimated Duration: 1 Week

### Team

- Full-Stack Developer
- Front-end Specialist
- Back-end Specialist
- UX Designer and Researcher
- Graphic Designer
- DevOps

---

# Problem Statement
### What problem does this application solve?

- Organizing shared resources for large families.
- Prevent wasting money and food.
- Maximize visual appeal, aesthetics, and accessibility.
- Making healthier dieting choices.
- Fostering ecological sustainability.
- Collaborating with food services in catering, restaurants, parents, and colleges.


# Packages/Dependencies used 

bcrypt, connect-mongo, dotenv, ejs, express, express-flash, express-session, mongodb, mongoose, morgan, nodemon, passport, passport-local, validator, husky, commitlint, standard-version

---

# Install all the dependencies or node packages used for development via Terminal

`npm install` 

---

# Things to add

- Create a `.env` file and add the following as `key: value` 
  - PORT: 2121 (can be any port example: 3000) 
  - DB_STRING: `your database URI` 

 ---

# Configuring Commit Linter to Enforce High Quality Commit Messages
1.) Follow the [Conventional Commits Guidelines](https://www.conventionalcommits.org/en/v1.0.0/).

2.) Install `husky`:
```md
npx husky-init && npm install
```

3.) Install `commitlint`:
```md
npm install @commitlint/{cli,config-conventional}
```

4.) Tell Husky to run `commitlint`:
```bash
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

npx --no-install commitlint --edit "$1"
```

5.) Create `.commitlintrc.json` in the root directory of the project folder:
```bash
{
  "extends": ["@commitlint/config-conventional"]
}
```

6.) Set script `husky install` and prepare to install the husky Git hook: 
```md
npm pkg set scripts.scriptname="husky install"
```

7.) Test making an invalid commit such as `git add . ; git commit -m "this is a bad commit". If it is working properly, npm should reject the commit with reasons.

---

# Configuring Semantic Versioning and Automatic Changelog Generator

1.) Install `standard-version`:
```md
npm i --save-dev standard-version
```

2.) Add the following declarations in the `"scripts"` rule of `package.json`:
```json
  "scripts": {
    "release": "standard-version",
    "release:minor": "standard-version --release-as minor",
    "release:patch": "standard-version --release-as patch",
    "release:major": "standard-version --release-as major"
  },
```

3.) Create a `.versionrc.json` file in the root directory:
```json
{
  "types": [
    {"type": "feat", "section": "Features"},
    {"type": "fix", "section": "Bug Fixes"},
    {"type": "chore", "hidden": true},
    {"type": "docs", "hidden": true},
    {"type": "style", "hidden": true},
    {"type": "refactor", "hidden": true},
    {"type": "perf", "hidden": true},
    {"type": "test", "hidden": true}
  ],
  "commitUrlFormat": "https://github.com/gentlegiantdev/Noodle-n/commits/{{hash}}",
  "compareUrlFormat": "https://github.com/gentlegiantdev/Noodle-n/compare/{{previousTag}}...{{currentTag}}"
}
  
```

4.) Now it's time to release the new patch! There are 4 common situations:

a.) First release: run `npm run release -- --first-release`:
```md
▶ npm run release -- --first-release

> changelog-generator-demo@0.0.0 release /home/mattykyu/Noodle-n
> standard-version "--first-release"

✖ skip version bump on first release
✔ created CHANGELOG.md
✔ outputting changes to CHANGELOG.md
✔ committing CHANGELOG.md
✔ tagging release v0.0.0
ℹ Run `git push --follow-tags origin master` to publish
```

b.) Bug Fix patches after using a `fix:` commit:
```md
▶ npm run release:patch
```

c.) Minor patches after using a `feat:` commit:
```md
▶ npm run release:minor
```

d.) Major patches after using a `BREAKING CHANGE:` commit:
```md
▶ npm run release:major
```

5.) A nicely formatted list full of changes should appear in the root directory called `CHANGELOG.md`!