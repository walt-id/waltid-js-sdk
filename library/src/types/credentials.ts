import { DIDMethods } from "./dids";

export type Credential = {
    type?: string;
    didType?: DIDMethods;
    customIssuer?: {
        did: string;
        key: {
            type: string;
            jwk: object;
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

export enum CredentialFormats {
    JWT = 'jwt',
    SD_JWT = 'sdjwt',
}