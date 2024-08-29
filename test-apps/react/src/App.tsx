import { IssuanceButton, VerificationButton, CredentialFormats, DIDMethods } from 'waltid-react-components'

function App() {
    return (
        <div style={{ fontFamily: "poppins" }}>
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                flexDirection: 'row',
                gap: '40px'
            }}>
                <div style={{ textAlign: "center" }}>
                    <p>Issue Credentials</p>

                    <div style={{
                        border: "1px solid grey",
                        borderRadius: "10px",
                        padding: "10px"
                    }}>

                        {/*BASIC ISSUANCE EXAMPLE*/}
                        <IssuanceButton title="Basic Example" credentials={[{ "type": "eID" }]} />

                        {/*ADVANCED ISSUANCE EXAMPLE*/}
                        <IssuanceButton
                            // Button Text
                            title="Advanced Example"
                            // credential standard format option, e.g. JWT (W3C JWT) or SD-JWT (W3C SD-JWT)
                            format={CredentialFormats.JWT}
                            // An array of credentials to issue, each with its own configuration.
                            credentials={[
                                {
                                    // List of supported credential - https://credentials.walt.id/
                                    "type": "eID",
                                    // DID of issuer and key to sign the credential with.
                                    customIssuer: {
                                        did: "test",
                                        key: {
                                            jwk: {
                                                "kty": "OKP",
                                                "d": "mDhpwaH6JYSrD2Bq7Cs-pzmsjlLj4EOhxyI-9DM1mFI",
                                                "crv": "Ed25519",
                                                "kid": "Vzx7l5fh56F3Pf9aR3DECU5BwfrY6ZJe05aiWYWzan8",
                                                "x": "T3T4-u1Xz3vAV2JwPNxWfs4pik_JLiArz_WTCvrCFUM"
                                            },
                                            type: "jwk"
                                        }
                                    },
                                },
                                {
                                    // Default DID and key of issuer to sign the credential based on supported DID methods.
                                    "didType": DIDMethods.key,
                                    customCredential: {
                                        credentialData: {
                                            "@context": [
                                                "https://www.w3.org/2018/credentials/v1",
                                                "https://purl.imsglobal.org/spec/ob/v3p0/context.json"
                                            ],
                                            "id": "urn:uuid:THIS WILL BE REPLACED WITH DYNAMIC DATA FUNCTION (see below)",
                                            "type": [
                                                "VerifiableCredential",
                                                "OpenBadgeCredential"
                                            ],
                                            "name": "JFF x vc-edu PlugFest 3 Interoperability",
                                            "issuer": {
                                                "type": [
                                                    "Profile"
                                                ],
                                                "name": "Jobs for the Future (JFF)",
                                                "url": "https://www.jff.org/",
                                                "image": "https://w3c-ccg.github.io/vc-ed/plugfest-1-2022/images/JFF_LogoLockup.png"
                                            },
                                            credentialSubject: {
                                                "type": [
                                                    "AchievementSubject"
                                                ],
                                                "achievement": {
                                                    "id": "urn:uuid:ac254bd5-8fad-4bb1-9d29-efd938536926",
                                                    "type": [
                                                        "Achievement"
                                                    ],
                                                    "name": "Test",
                                                    "description": "This wallet supports the use of W3C Verifiable Credentials and has demonstrated interoperability during the presentation request workflow during JFF x VC-EDU PlugFest 3.",
                                                    "criteria": {
                                                        "type": "Criteria",
                                                        "narrative": "Wallet solutions providers earned this badge by demonstrating interoperability during the presentation request workflow. This includes successfully receiving a presentation request, allowing the holder to select at least two types of verifiable credentials to create a verifiable presentation, returning the presentation to the requestor, and passing verification of the presentation and the included credentials."
                                                    },
                                                    "image": {
                                                        "id": "https://w3c-ccg.github.io/vc-ed/plugfest-3-2023/images/JFF-VC-EDU-PLUGFEST3-badge-image.png",
                                                        "type": "Image"
                                                    }
                                                }
                                            }
                                        },
                                        credentialConfigurationId: "OpenBadgeCredential_jwt_vc_json",
                                    },
                                    // The mapping object that allows for dynamic value insertion via data functions, executed
                                    // at the time when the credentials is claimed. This feature enables personalized credentials
                                    // based on real-time data. Learn more about it and see a list of supported data functions
                                    // here: https://docs.walt.id/issuer/api/credential-issuance/data-functions
                                    customMapping: {
                                        "id": "<uuid>",
                                        "issuer": {
                                            "id": "<issuerDid>"
                                        },
                                        "credentialSubject": {
                                            "id": "<subjectDid>"
                                        },
                                        "issuanceDate": "<timestamp>",
                                        "expirationDate": "<timestamp-in:365d>"
                                    }
                                }
                            ]}
                            walletRedirect={{
                                "url": "https://wallet.walt.id",
                                "path": "api/siop/initiatePresentation"
                            }}
                            buttonStyles={{
                                background: "",
                                color: "#fff",
                                margin: "10px",
                                padding: "10px",
                                borderRadius: "10px",
                                fontSize: "16px",
                                fontWeight: "bold",
                                lineHeight: 'normal'
                            }}
                        />

                    </div>
                </div>


                <div style={{ textAlign: "center" }}>
                    <p>Verify Credentials</p>

                    <div style={{
                        border: "1px solid grey",
                        borderRadius: "10px",
                        padding: "10px"
                    }}>

                        {/*BASIC VERIFICATION EXAMPLE*/}
                        <VerificationButton title="Basic Example" credentialTypes={["eID"]} />

                        {/*ADVANCED VERIFICATION EXAMPLES*/}
                        <VerificationButton
                            title="Advanced Example"
                            credentialTypes={[{ credential: "eID", policies: ["schema"] }]}
                            presentationDefinition={{
                                "input_descriptors": [
                                    {
                                        "id": "eID",
                                        "format": {
                                            "jwt_vc_json": {
                                                "alg": [
                                                    "EdDSA"
                                                ]
                                            }
                                        },
                                        "constraints": {
                                            "fields": [
                                                {
                                                    "path": [
                                                        "$.type"
                                                    ],
                                                    "filter": {
                                                        "type": "string",
                                                        "pattern": "eID"
                                                    }
                                                }
                                            ]
                                        }
                                    }
                                ]
                            }}
                            globalVPPolicies={[{
                                "policy": "minimum-credentials",
                                "args": 2
                            }]}
                            globalVCPolicies={[
                                "signature"
                            ]}
                            verifierAPIParameters={{
                                successRedirectUri: "https://example.com/success/$id",
                                errorRedirectUri: "https://example.com/fail/$id",
                            }}
                            successRedirectUri={"/success"}
                            buttonStyles={{
                                background: "",
                                color: "#fff",
                                margin: "10px",
                                padding: "10px",
                                borderRadius: "10px",
                                fontSize: "16px",
                                fontWeight: "bold",
                                lineHeight: 'normal'
                            }}
                            walletRedirect={{
                                "url": "https://wallet.walt.id",
                                "path": "api/siop/initiatePresentation"
                            }}
                        />
                    </div>
                </div>

            </div>
        </div>
    )
}

export default App
