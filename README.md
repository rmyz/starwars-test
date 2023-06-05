# Star wars Test

This is my approach to a Planet-based website using [SWAPI](https://studio.apollographql.com/public/star-wars-swapi/home?variant=current).

**I highly recommend to read [DEV_DECISIONS.md](DEV_DECISIONS.md) in order to know the reasons and choices made for this app.**

## Prerequisites

- [Docker](https://docs.docker.com/install/)
- [Git](https://git-scm.com/book/en/Getting-Started-Installing-Git)
- [Node Version Manager (NVM)](https://github.com/nvm-sh/nvm)
- [pnpm](https://pnpm.io/installation)

## Getting started

To run the server in dev mode:

```sh
  pnpm run dev
```

Or, alternatively, if you want it on Docker/Prod mode:

```sh
  sh start.sh
```

For unit testing, you can run:

```sh
  pnpm run test
```

For e2e testing, you can run:

```sh
  pnpm run test:e2e
```

To build the app:

```sh
  pnpm run build
```

In order to get lint on files run the following command:

```sh
  pnpm run lint
```
