import { IssuanceButton, VerificationButton, CredentialFormats, DIDMethods } from 'waltid-react-components'

function App() {
  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', flexDirection: 'column' }}>
        <p style={{ fontSize: '24px', marginBottom: "10px" }}>Hello, React!</p>
        <div style={{ display: 'flex', gap: '10px' }}>
          <IssuanceButton
            credentials={[
              {
                "type": "eID",
                "didType": DIDMethods.key
              },
              {
                "customCredential": {
                  "credentialData": {
                    "@context": [
                      "https://www.w3.org/2018/credentials/v1"
                    ],
                    "type": [
                      "VerifiableCredential",
                      "BankId"
                    ],
                    "credentialSubject": {
                      "accountId": "1234567890",
                      "IBAN": "DE99123456789012345678",
                      "BIC": "DEUTDEDBBER",
                      "birthDate": "1958-08-17",
                      "familyName": "DOE",
                      "givenName": "JOHN",
                      "id": "did:jwk:eyJrdHkiOiJPS1AiLCJjcnYiOiJFZDI1NTE5Iiwia2lkIjoieDJwcnhvRmFnSUkyS0RnOVFST2lRWTFQMmZNd3V3WUtNM1FSNmZYYzVFOCIsIngiOiJSTklZcDZDaXl2ZGdCMWc2RFR2MUV0ZDllZy16TjNaTEZMOU5kdWhGbEJ3In0"
                    },
                  },
                  "credentialConfigurationId": "BankId_jwt_vc_json"
                },
                "customMapping": {
                  "id": "<uuid>",
                  "issuer": {
                    "id": "<issuerDid>"
                  },
                  "credentialSubject": {
                    "id": "<subjectDid>"
                  },
                  "issuanceDate": "<timestamp>"
                }
              }
            ]}
            format={CredentialFormats.JWT}
            walletRedirect={{}} />
          <VerificationButton
            credentialTypes={[
              "eID",
              {
                "credential": "BankId",
                "policies": ["expired"]
              }
            ]}
            globalVCPolicies={["signature"]}
            walletRedirect={{}} />
        </div>
      </div>
    </>
  )
}

export default App
