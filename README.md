# UofG Conversational Interfaces (M)

This repository contains the source to the coursework for the course.

Clone the repository using [Git](https://git-scm.com/), or download a [ZIP](https://github.com/ineshbose/UofG_Conversational_Interfaces/archive/master.zip). You should have [Node.js](https://nodejs.dev) installed and have `yarn` available as package manager.

```sh
> npm i -g yarn # if yarn isn't installed
> yarn install
> yarn workspace agent-api stub
```

Also create a `launch.json` using the [instructions](https://developer.amazon.com/en-US/docs/alexa/ask-toolkit/vs-code-testing-simulator.html#prepare).

## 🗺️ Project Layout

- [`.`](#) Root of repository with directories of different concerns
- [`package.json`](/package.json) is the repository module handler using [Yarn Workspaces](https://classic.yarnpkg.com/lang/en/docs/workspaces/)
- [`.env.example.ts`](/.env.example.ts) is an example of a `.env.ts` file that can be used to read environment variables
- [`docs`](/docs) contains the source code for the report and relevant documents
- [`docs/examples`](/docs/examples) includes the provided sample set of dialogues
- [`docs/test-data`](/docs/test-data) includes the test dialogues (and in other formats)
- [`packages`](/packages) contains all the individual utilities that build on each other
- [`skill-package`](/skill-package) contains the model for Alexa Skill and Wit.ai

## Built Using

<a href="https://developer.amazon.com/en-GB/alexa" target="_blank"><img src="https://img.shields.io/badge/-alexa-00CAFF?style=for-the-badge&logo=amazon-alexa&logoColor=white" alt="Nx" /></a>
<a href="https://wit.ai/" target="_blank"><img src="https://img.shields.io/badge/-wit.ai-000?style=for-the-badge&logo=&logoColor=white" alt="wit.ai" /></a>
<a href="https://astro.build/" target="_blank"><img src="https://img.shields.io/badge/-astro-FF5D01?style=for-the-badge&logo=astro&logoColor=white" alt="Nx" /></a>
<a href="https://unjs.io" target="_blank"><img src="https://img.shields.io/badge/UnJS-EFDA4F?style=for-the-badge&logo=data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEYAAABGCAYAAABxLuKEAAAAAXNSR0IArs4c6QAAAz5JREFUeF7tl19IU1EcxzdKYwb7h1m6EA3SQdJGoXuwaX9nCUlP80GjggpCwgrswRAi6dl66iWoiAKFQMWMzIq59rANzKsGbZSKOUcksw1ymcqNc+HK2drd3QFjbnzv09nOufee3+d+fr9zjlKhUPAKXP8QUAJMYisARiJbAAZg2AopjIExMIaNAIxh44UaA2NgDBsBGMPGCzUGxsAYNgIwho0XagyMgTFsBGAMGy/UGBgDY9gIwBg2XqgxMAbGsBGAMWy8UGNgDIxhIwBj2HihxsAYGMNGAMaw8UKNgTEwho0AjGHjhRoDY2AMG4HNZEylWe/vuGEMvhiYVz3pmamSikSryYl0dZpGfywsK2/emailx52zl3guNpf8OX3Wtf9neEXd1lLuunZ5b36eaku5OG4puuZrvzsZTvYOqXenpcY4+4+4Kozqap5XhPXlfRqpyZFg21uN1aTfZnf6vWOhMtImwKa99WrS7n0177Ad3rmLBhL/PDLmQqs3BqycVmkB89V9ktPrtpnI5HRlfZJzfHS/0nHmVJEQUNMVDzf4NijcU3+skHv2oEpo09e3QNQ9OrEYJf+dqC0oylNtFUCS6+Dx4cDU7C+DHBCxPyvA8DwfqWv8EPSOhdbTiAQomknak58jLmvDe8G+VK6sAGOzO33xUMTgQ76GiFKpVJN6YzANxIBLBijjwczORT2mo0OSBTzVtI2HlPFg5AorwEjkBcAATOxyLZdK9MqUbGuwKWpMqpNNZR8jB4Z+xqYHIxVw/Ffj3tk8xbtVwopDB0Vv8LIKTKVZ7xvqsQp7CrK/2FfzupCcd2gwdPBL0VW/wfRyfRebtWAIAHq1WF3j5wbezH/p7g3oCnbk/r7UVLpSYdQcEkFd7+Dcj7tnLOJvFjAZtSqRALWanPCnEdt3+jyTaGF5+Hza0XZ7POYASBsnl0r9T6tHrJb8mvh0lDsWpGWDJ06KwLnXaf7YUFd4gGzb6cmGFpe5q7c4fnA4aE4UBDFBp80tbW7xTkmNIfedbyxxd3WaLBlxVkoU6J7i7XPGMvUC6UsWqNyX3qj+tBqzUUH8j+cAjARVgAEYtoSDMTAGxrARgDFsvFBjJHj9BbkI/BBgmEI9AAAAAElFTkSuQmCC" alt="UnJS"></a>
<a href="https://nx.dev/" target="_blank"><img src="https://img.shields.io/badge/-nx-143055?style=for-the-badge&logo=nx&logoColor=white" alt="Nx" /></a>

## 📟 Contact

If you have questions about this project or want to share feedback, you can send it to:

<table>
<thead>
  <tr>
    <td rowspan="2">Inesh Bose</td>
    <td>2504266@student.gla.ac.uk / Inesh.Bose@glasgow.ac.uk</td>
  </tr>
  <tr>
    <td>(or any platform you can find me on)</td>
  </tr>
</thead>
</table>

Project Link: <https://github.com/ineshbose/UofG_Conversational_Interfaces/>

<div align="right">
<p align="right">
  <a href="#">
    <img alt="GitHub code size in bytes" src="https://img.shields.io/github/languages/code-size/ineshbose/UofG_Conversational_Interfaces?style=flat-square">
    <img alt="GitHub repo size" src="https://img.shields.io/github/repo-size/ineshbose/UofG_Conversational_Interfaces?style=flat-square">
  </a>
</p>
</div>
