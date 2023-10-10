# Pocket-Reddit

## Overview

The Pocket-Reddit is a micro version of Reddit to engage and share your views on different discussions.

This web app provides access to the public forum where users can post discussions, share their views on other discussions with additional functionality of deleting and editing their discussions.

---

## Features

. Discussions: Add new discussions or engage in already exiting discussions.

. User Authentication: Create an account and log in to access the discussions and to post discussions and comments.

. Future Enhancements: I have plans to add more features, including functionalities such as edit comments, notifications.

## Getting Started

### Requirement

. Python (version 3.8.13)

. Flask

. React

### Installation

1. Fork and clone this repository:
   https://github.com/hurpreetca/python-p4-project-template
   and change directory into this folder.

2. Create virtual enviroment for this project.

```console
pipenv shell
```

3. Install dependencies:

```console
pip install -r requirements.txt
```

4. Open VSCode:

```console
code .
```

5. Create a .env file in the server directory and set your environment variables:

```console
SQLALCHEMY_DATABASE_URI=sqlite:///app.db
SECRET_KEY = <create your owm secret key>
```

6. Open the terminal in VSCode, seed your database and run the server:

```console
cd server
python seed.py
python app.py
```

Your server is now on [http://localhost:5555](http://localhost:5555`)

7. Open another terminal in VSCode, from root directory, run:

```console
cd client
npm install
npm start
```

Your React app is now on [http://localhost:3000](http://localhost:3000)

## License

This project is licensed under the MIT License.
