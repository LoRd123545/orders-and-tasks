# REQUIREMENTS

- docker installed
- docker compose installed

If you don't have that you can follow this [guide](https://docs.docker.com/get-started/get-docker/)

# HOW TO RUN

In every folder there is .env.template file. In those files there are envoriment variables that are needed by application. Here's what to do:

- in variables where there is asterisk symbol remove it

- remove .template extension from every .env.template file

After you are done with steps above, simply run `docker compose up -d` command in project root directory (where the compose.yaml file is)

# HOW TO USE

There are 3 ports exposed:

- 4000
- 4001
- 80

4000 - app to manage tasks
4001 - app to manage orders
80 - reverse proxy (further documentation in future)

# NEXT STEPS

Do whatevery you want. This project is completly open source, so experiment, play and fork it.
Small note with link to this repository would be appreciated but it isn't necessary.
Enjoy!
