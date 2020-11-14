# Cypress

Cypress is a next generation front end testing tool built for the modern web. We address the key pain points developers 
and QA engineers face when testing modern applications.

## Best Practices

[Follow the documentation](https://docs.cypress.io/guides/references/best-practices.html) to learn how to write code to 
implement easily your end to end tests with Cypress. 

## Configuration files

Before to run test with Cypress, you can check these files in `test/e2e` :
- `cypress.json` contains the global configuration
- `cypress.env.json` contains the environnement variables

## How to use it ?

### Open User Interface
```bash
yarn cy:open
```

### Run all app tests
```bash
> yarn cy:run
```

### Execute a specific app/test in command line
```bash
# Replace the #name# for your test
yarn cy:run "test/e2e/integration/app/#name#.spec.js"
```

## Documentation

[Guide](https://docs.cypress.io/guides/overview/why-cypress.html#In-a-nutshell)
