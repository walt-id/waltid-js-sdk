import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { DIDMethodsConfig } from '../types/dids';
import type { Credential } from '../types/credentials';

function sdPayload(fields: { [key: string]: any; }) {
    let sdFields: { [key: string]: any; } = {};
    for (const key in fields) {
        if (fields[key] !== null && typeof fields[key] === 'object' && !Array.isArray(fields[key])) {
            sdFields[key] = {
                sd: false,
                children: {
                    fields: sdPayload(fields[key])
                }
            }
        } else {
            sdFields[key] = {
                sd: true
            }
        }
    }
    return sdFields;
}

const issueRequest = async (credentials: Array<Credential>, format?: string, issuerUrl?: string) => {
    if (credentials.length === 0) {
        throw new Error("No credentials provided for issuance");
    }

    format = format ?? "JWT";
    issuerUrl = issuerUrl ?? "https://issuer.portal.walt.id"
    const VC_REPO_URL = "https://credentials.walt.id"

    let credential_configurations_supported;
    try {
        credential_configurations_supported = (await axios(`${issuerUrl}/.well-known/openid-credential-issuer`)).data.credential_configurations_supported;
    } catch (e) {
        throw new Error("Issuer does not support credential configurations");
    }

    const payload = await Promise.all(credentials.map(async (c) => {
        if (!c.type && !c.customCredential) {
            throw new Error("Either input a credential type or a custom credential");
        }
        else if (c.customCredential && !c.customMapping) {
            throw new Error("Custom credential requires custom mapping");
        }
        else if (c.customCredential && !c.customCredential.credentialConfigurationId) {
            throw new Error("Custom credential requires credential configuration id");
        }
        else if (c.customCredential && !c.customCredential.credentialData) {
            throw new Error("Custom credential requires credential data");
        }
        else if (c.customCredential && !c.customCredential.credentialData.credentialSubject) {
            throw new Error("Credential data requires credential subject");
        }

        c = { ...c, didType: c.didType ? c.didType : "did:key" };

        const credential = c.type ? (await axios(`${VC_REPO_URL}/api/vc/${c.type}`)).data : c.customCredential?.credentialData;
        const mapping = c.customMapping ? c.customMapping : (await axios(`${VC_REPO_URL}/api/mapping/${c.type}`)).data;
        const offer = {
            ...credential,
            id: uuidv4(),
        };
        let payload: {
            'issuerDid': string,
            'issuerKey': { "type": string, "jwk": object },
            credentialConfigurationId: string,
            credentialData: any,
            mapping?: any,
            selectiveDisclosure?: any
        } = {
            'issuerDid': c.customIssuer ? c.customIssuer.did : DIDMethodsConfig[c.didType as keyof typeof DIDMethodsConfig].issuerDid,
            'issuerKey': c.customIssuer ? c.customIssuer.key : {
                "type": DIDMethodsConfig[c.didType as keyof typeof DIDMethodsConfig].issuerKey.type,
                "jwk": JSON.parse(DIDMethodsConfig[c.didType as keyof typeof DIDMethodsConfig].issuerKey.jwk)
            },
            credentialConfigurationId: c.type ? Object.keys(credential_configurations_supported).find(key => key === c.type + "_jwt_vc_json") as string : c.customCredential?.credentialConfigurationId as string,
            credentialData: offer
        }

        if (format && format === "SD-JWT") {
            payload.credentialConfigurationId = c.type ? Object.keys(credential_configurations_supported).find(key => key === c.type + "_vc+sd-jwt") as string : c.customCredential?.credentialConfigurationId as string;
            payload.selectiveDisclosure = {
                "fields": {
                    "credentialSubject": {
                        sd: false,
                        children: {
                            fields: {}
                        }
                    }
                }
            }
            payload.selectiveDisclosure.fields.credentialSubject.children.fields = sdPayload(offer.credentialSubject);
        }
        return mapping ? { ...payload, mapping } : payload;
    }));

    const issueUrl = issuerUrl + `/openid4vc/${credentials.length === 1 && format === "SD-JWT" ? "sdjwt" : "jwt"}/${(payload.length > 1 ? 'issueBatch' : 'issue')}`;
    return axios.post(issueUrl, payload.length > 1 ? payload : payload[0]);
}

export { issueRequest };