export type Credential = {
    type?: string;
    didType?: string;
    customIssuer?: {
        did: string;
        key: {
            type: string;
            jwk: string;
        };
    };
    customCredential?: {
        credentialData: {
            credentialSubject: Object;
            [key: string]: any;
        }
        credentialConfigurationId: string;
    };
    customMapping?: Object;
};

export const CredentialFormats = ['JWT', 'SD-JWT'];