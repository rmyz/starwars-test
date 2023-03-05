# Introduction

This file is purely technical, arguing why I have made some decisions.

## Tools related

### PNPM

A discovery of the last year, we moved our production repo from yarn to pnpm and reduced by 20% the times on CI deployments, fast and easy, but maybe for some specific package you can have troubles as it is not a standard yet.

### NextJS

I don't think this deserves an explanation, as if you're using React you will 99% of the times use NextJS as it has become the standard. If you needed better websites in terms of performance or bundle sizes, I would go for Astro (portfolio, blog, personal website, landings...) or Qwik for full complete apps.

### Tailwind CSS

I chose tailwind as I'm very used to it, used on production and on my side projects.

I used to use styled-components (CSS-in-JS) but even though the DX is kinda great, the performance is awful and you can get the same speed, or even faster, with tailwind.

### Chakra UI

Not a big fan of these UI Frameworks, in fact, it was the first time I used Chakra and the DX is pretty fine, but same problems as styled-components (Chakra uses emotion, which is another CSS-in-JS utility), so if it wasn't because I needed speed, I wouldn't go with Chakra on a production app.
In my last job we created our design system using @radix-ui, which gives you a solid and accessible base for your web components

### GraphQL

Second time I use it, I was very hyped when it came out, but discovered in the end there are not a lot of cases where GraphQL outstand REST API, and very few companies have it implemented.
I love the flexibility it gives for a frontend engineer, as you don't have to depend that much with backend, and are free to do little modifications.

For this case, it was easier GraphQL as we needed the `residents` of each `planet`, with GraphQL this was only 1 query, meanwhile with REST API this would have been 2 queries per planet, which was a no for me.

### Zustand

I tried to create a custom store which was persisted on local storage, but it gave me a lot of headaches for the hydration inconsistencies between client and server-side.
Then I tried Zustand, which I have been wanting for a long time as I think it's really easy and scalable, but without boilerplate.

It has surprised me, I loved working with Zustand and the tier A support it has to Typescript.

### React-hook-form

My favorite library to handle forms, previously I was using Formik but this is much better, lighter and has less boilerplate.
My go-to to get things done without much complication.

### Jest

As this is a NextJS project, it has no sense going with Vitest here, so I just sticked to what is the testing standard.

### Playwright

For the E2E / Integration tests, I have been using Cypress since now, Playwright seems to have more features, integrations, and in general is more powerful.
Also the API is similar to `testing-library`, which made it easy to transition to.

## Code related

### No persist data

As the SWAPI don't expose endpoints to add/modify/delete, I had to create my own implementations, working with local info, which will reset each time we refresh the page.
One alternative could be to implement some backend with Supabase or another free alternative, but I thought it was a bit overkill for a technical test.

### Docker

The container can only be started on production mode, if it was something to be implemented on my company, I would add the feature to start on dev/prod mode depending on a `NODE_ENV` variable. As I said before, for a technical test purpose, this Dockerfile is not for development.

### Use Cases

I tried to separate the definition of the methods (`search, add, remove...`) in use cases as the implementation can always change, in fact if we added a backend implementation, we would need to refactor those, but for the front that consume them would remain the same.

### Images

As SWAPI planets didn't have images, which is really curious, I implemented a function which will get you a random planet image, which is done at the initialization of the store (also when you add a planet), so if you reload the images will change.

### Getting the `residents`

I could just get the residents from the `getAll` call, but as it was info we maybe don't need, I prefer to call `getById` to retrieve each planet we open to see the info and then refresh the store to add the planets on the given planet.

### Search

In order to implement search and avoid calling `getAll` each time we reset the search, I created a `backupPlanets` which are the products without search applied.  

### Single page app

I thought of creating a page for each action you could do (list/view planet/edit planet/create planet). But that would've been a lot of clicks in order to navigate and could aggravate the UX, so decided to go with Modals that can show information, as well as let you modify it.
