# Health History

## My notes

- Using docker-compose
  - Could not access from host until I added

      ```yml
      pb:
         ports:
            - "0.0.0.0:8090:8090"
      ```

- Deploying
  - Decided to not use docker-compose as it's not supported by fly.io
  - Can use a single docker container like:

```bash
docker build . -t hh 
docker run -p 8090:8090 -v ./pb/pb_data:/app/pb/pb_data -dt hh
```

- `fly deploy` to deploy to prod

## Setup

Follow these steps CAREFULLY, or else it won't work. Also read the README files referred above before proceeding.

### With Docker

This method is the most recommended method for setting up this application in most use cases, especially when customizing with Go code.

Make sure your Docker daemon is running then complete the following steps:

1. Copy`.env.example` to `.env` and then edit it to match your environment.
   Also, if you wish, copy `docker-compose.override.yml` to `docker-compose.override.yml`
   and edit it to your taste before proceeding.
   And then just run `docker compose up -d`.
2. Ensure you have the version of go installed as expected in `go.mod`
   - To avoid modifying your local environment, use the VS Code command `Dev Containers: Open Folder in Container....` and reference `Dockerfile.devcontainer` (you may need to modify `devcontainer.json` for this).
3. Open a new terminal and navigate to the `/sk` directory. Install dependencies by
   running `yarn install`
4. Install `modd` with `go install github.com/cortesi/modd/cmd/modd@latest`
   - Add ~/go/bin to your PATH if necessary, e.g. `export PATH="$PATH:/Users/matt/go/bin"`
5. In the same terminal, after the dependencies are installed, run the command `yarn run dev:backend`
   This runs `go build` in the `/pb` directory and runs `modd` for live development on a
   backend server
6. Open a seperate terminal, navigate to the `/sk` directory, and run the command `yarn run dev`.
   This starts the frontend dev server.
7. Both sides are working if you navigate to the "Hello" page on the development server
   and there is an API response that says "Hello World!"
   - <http://0.0.0.0:8090/> should open the /sk page and <http://0.0.0.0:8090/>_ opens the /pb admin interface

## Developing

Visit <http://localhost:5173> (sk) or <http://localhost:8090> (pb)

If you are running `modd`, making changes in the Svelte code (frontend) or Go code (backend) will show
results (almost) immediately.

## Usage

To use the app as a user / tester ...

- visit the frontend URL (e.g. <http://localhost:5173>)
- Navigate around. The Home page is not very interesting.
- The `hello` page shows and example of frontend calling a custom backend API implemented in Go.
- The `posts` page shows all existing posts. If that page is empty, then you might want to create some posts. You must be logged in to be able to create posts.
- Into the `Login` form, you can enter an existing username/password, or check the `register` checkbox to create a new account (it registers the user and log in immediately).

The above are just some sample features. Now go ahead and implement all kinds of new features.

- Create new collections.
- Create new pages that manipulate the above collections.

## Building

See the build process details in the README files for backend and frontend.

## Configurable Hooks

Please read about the "hooks" system in [./pb/README.md](./pb/README.md)
It is a very easy and powerful way to extend your application with minimal
configuration and perhaps no code.

## Feedback

Please provide feedback by
[opening an issue](https://github.com/spinspire/pocketbase-sveltekit-starter/issues/new)
or
[starting a discussion](https://github.com/spinspire/pocketbase-sveltekit-starter/discussions).
