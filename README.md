# walt.id JS SDK

UI components for digital ID use-cases powered by walt.id's Open-Source digital ID and wallet infrastructure.
Issue or verify digital ID credentials by rendering QR codes or links via pre-build model and button components.
Configure credential types to issue or verify, provide redirect URIs for success events, and adjust the
styling to your needs via component props. No need to understand and write complex issuance and verification requests or
custom frontend components. A few minutes, and your ID use case is ready to present.

For more fine-grained customization, the components expose the walt.id's complete issuer and verifier API interfaces to
be able to handle even the most complex use cases.

The components offered are available for React and Vue.

**Note:** At this point, the components are only meant for demo use-cases as secrets like private keys, used for signing
credentials, are stored and handled in the frontend. Later versions will let you configure external credential storage
options.

## Get Started

You can checkout example apps showcasing the usage of the different components, here.

Below are some basic examples in React to help you get started with the Issuance and Credentials buttons. When you click these
buttons, a model will appear showing a QR code and a link. You can scan the QR code or click the link to either receive
and present credentials.

![Showcasing QR code model after button click.](https://github.com/user-attachments/assets/7187e4f9-6797-4944-92be-0e0f4792837a)

## Install Dependency 
Use the command below to install the React version of the SDK in your project. 

```bash
npm i waltid-react-components
```


### Issue Credentials

```React
<IssuanceButton credentials={[{ "type": "eID" }]} />
```


### Verify Credentials

```React
<VerificationButton credentialTypes={["eID"]} />
```


## For Maintainers

The SDK is built using Mitosis, a tool that allows you to build components in a framework-agnostic way.
Any extension of the components therefore must happen in the Mitosis language. You can learn more about it here.

### Project Structure

- [library](./library/): Mitosis project that contains the source code of the Waltid JS SDK.
    - [library/src](./library/src/): source code of the Waltid JS SDK.
    - [library/packages](./library/packages/): output of the Waltid JS SDK for different frontend frameworks.
- [test-apps](./test-apps/): test applications that demonstrate how to use the Waltid JS SDK with different frontend
  frameworks.

### When Developing

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
