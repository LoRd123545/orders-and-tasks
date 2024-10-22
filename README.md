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

- 4000 - tasks app
- 4001 - orders app
- 80 - reverse proxy

# DOCUMENTATION

Documentation is in the [docs](./docs/reference.md) folder.

# NEXT STEPS

Do whatever you want. This project is completly open source, so experiment, play and fork it.
Small note with link to this repository would be appreciated but it isn't necessary.
Enjoy!
