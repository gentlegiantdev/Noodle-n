# Introduction

A Simple ToDo App is built using the MVC Architecture, we have also implemented "authorization" so folx can sign up, customize & personalize the app 

---

> Be sure to add that lovely star 😀 and fork it for your own copy

---

# Objectives

- It's a beginner level app created to understand how MVC concept and logins are added

---

# Who is this for? 

- It's for beginners & intermediates with little more experience, to help understand the various aspects of building a node app with some complex features

---

# Packages/Dependencies used 

bcrypt, connect-mongo, dotenv, ejs, express, express-flash, express-session, mongodb, mongoose, morgan, nodemon, passport, passport-local, validator

---

# Install all the dependencies or node packages used for development via Terminal

`npm install` 

---

# Things to add

- Create a `.env` file and add the following as `key: value` 
  - PORT: 2121 (can be any port example: 3000) 
  - DB_STRING: `your database URI` 
 ---
 
 Have fun testing and improving it! 😎

# Installing Husky
1.) Follow the [Conventional Commits Guidelines](https://www.conventionalcommits.org/en/v1.0.0/).
2.) Install `husky`: `npx husky-init && npm install`
3.) Install `commitlint`: `npm install @commitlint/{cli,config-conventional}`
4.) Tell Husky to run `commitlint`:
```bash
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

npx --no-install commitlint --edit "$1"
```
5.) Create `.commitlintrc.json`:
```bash
{
  "extends": ["@commitlint/config-conventional"]
}
```
6.) Set script `husky install` and prepare to install the husky Git hook: `npm pkg set scripts.scriptname="husky install"`

7.) Test making a bad commit such as `git add . ; git commit -m "this is a bad commit". If it is working properly, npm should reject the commit with reasons.