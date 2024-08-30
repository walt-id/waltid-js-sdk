# waltid-react-components

UI components for digital ID use-cases powered by [walt.id's Open-Source digital ID and wallet infrastructure](https://walt.id/identity-infrastructure).

* Issue or verify digital ID credentials by rendering QR codes or links via pre-built model and button components.
* Configure credential types to issue or verify, provide redirect URIs for success events, and adjust the styling to your needs via component props. No need to understand and write complex issuance and verification requests or custom frontend components.
* A few minutes, and your ID use case is ready to present.

## Quickstart

In a nutshell, this is how to use it.

### 1. Install the lib

```bash
npm i waltid-react-components
```

### 2. Add the component to a page

```React
<IssuanceButton credentials={[{ "type": "eID" }]} />
```

### 3. Let the magic happen

![Showcasing QR code model after button click](https://github.com/user-attachments/assets/7187e4f9-6797-4944-92be-0e0f4792837a)

To see it working straight away, take a look
at [this example app](https://github.com/walt-id/waltid-js-sdk/tree/main/test-apps/react).

## Components

The library exports multiple helper functions and two main components: the `IssuanceButton` for credential issuance and the `VerificationButton` for credential verification. Both are like black boxes that abstract all the necessary backend details for issuing and verifying credentials from the developer.

#### Issuance

The only parameter you need to specify to create the credential issue button is the credential type. A list of the default supported credential types can be found in our [credential repository](https://credentials.walt.id/).

In the example below, we create a button to issue a [credential of type `eID`](https://credentials.walt.id/credentials/eid).

```React
<IssuanceButton credentials={[{ "type": "eID" }]} />
```

The result will be a button like this:

![Issuance Button](https://github.com/walt-id/waltid-js-sdk/blob/main/imgs/issuanceButton.png)

When clicked, the generated button will call the Issuer API to initialize an OID4VC exchange session. The final result will be a credential offer URL which will be enconded as a QrCode to be scanned by the user with their wallet.

<img src="https://github.com/walt-id/waltid-js-sdk/blob/main/imgs/issuanceQrCode.png" alt="Credential Offer" width="300"/>

#### Verification

The basic usage of the verification button is very similar to the previous one. The only required parameter is the
credential type to be presented.

```React
<VerificationButton credentialTypes={["eID"]} />
```

The resulting button will be like:

![Verification Button](https://github.com/walt-id/waltid-js-sdk/blob/main/imgs/verificationButton.png)

When clicked, the Verifier API will be called to initialize an OID4VP presentation session. Similar to the issuance process, the result of the API call is a presentation request URL which is usually encoded as a QrCode.

<img src="https://github.com/walt-id/waltid-js-sdk/blob/main/imgs/verificationQrCode.png" alt="Presentation Request" width="300"/>

The user then uses their wallet to scan the QrCode and the flow of credential presentation and verification continues.

## Need more?

For more fine-grained customization, the components expose the walt.id's complete
[issuer](https://docs.walt.id/issuer/api/getting-started) and 
[verifier](https://docs.walt.id/verifier/api/getting-started) 
API interfaces to be able to handle even the most complex use cases.

You can also take a look at our [example apps](https://github.com/walt-id/waltid-js-sdk/tree/main/test-apps)
which show different use-cases in more detail.