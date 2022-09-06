# Configuring Commit Linter to Enforce High Quality Commit Messages
1.) Follow the [Conventional Commits Guidelines](https://www.conventionalcommits.org/en/v1.0.0/).

2.) Install `husky`:
```md
npm install husky -D
```

3.) Install `commitlint`:
```md
npm install @commitlint/{cli,config-conventional}
```

4.) In the `.husky` folder, paste this in to a file "commit-msg" tell Husky to run `commitlint`:
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

6.) Give `commit-msg` execute permissions:
```md
chmod ug+x .husky/*
```

7.) Set script `husky install` and prepare to install the husky Git hook: 
```md
npm pkg set scripts.prepare="husky install"
npm run prepare
```

8.) Test making an invalid commit such as `git add . ; git commit -m "this is a bad commit"`. If it is working properly, npm should reject the commit with reasons.

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

---

# Auto-generate Conventional Commit Formatted Messages
1.) Install `commitizen`:
```md
npm install -g commitizen
```

2.) Initialize `cz-conventional-changelog`:
```md
commitizen init cz-conventional-changelog --save-dev --save-exact
```

3.) Run `cz`:
```md
npx cz
```

4.) Select type of change that you're committing (Up and Down arrow to move between choices and ENTER to select)

5.) Select scope of change

6.) Write a short, imperative tense description of the change

7.) If needed, provide a longer description

8.) Are there any Breaking Changes? (Y/N)

9.) Does it affect any open issues? (Y/N)

10.) `cz` will then automatically build a conventional commit for you!