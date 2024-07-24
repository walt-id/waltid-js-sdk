# Waltid JS SDK

The Waltid JS SDK is a collection of libraries that allow you to interact with the Waltid API from your web application. The SDK is built using Mitosis, a tool that allows you to build components in a framework-agnostic way. This means that you can use the Waltid JS SDK with any frontend framework of your choice.

## Workspaces

- [library](./library/): Mitosis project that contains the source code of the Waltid JS SDK.
  - [library/src](./library/src/): source code of the Waltid JS SDK.
  - [library/packages](./library/packages/): output of the Waltid JS SDK for different frontend frameworks.
- [test-apps](./test-apps/): test applications that demonstrate how to use the Waltid JS SDK with different frontend frameworks.

## Developing

1. Run Mitosis in watch mode

```bash
npm install
cd library
npm run start
```

2. Build the library for the frontend framework you want to use. For example, to build the library for React:

```bash
cd library/packages/react
npm run build
```

3. Finally, run the test application. For example, to run the test application built with React:

```bash
cd test-apps/react
npm run dev
```
