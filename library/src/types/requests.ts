export interface verifyRequestProps {
    credentials: Array<string | { credential: string, policies: Array<string | object> }>,
    globalVPPolicies?: Array<string | object>,
    globalVCPolicies?: Array<string | object>,
    presentationDefinition?: object,
    verifierAPIParameters?: { successRedirectUri?: string, errorRedirectUri?: string, openId4VPProfile?: string }
}
export interface verifyRequestConfig {
    headers: {
        authorizeBaseUrl: string,
        responseMode: string,
        successRedirectUri?: string,
        errorRedirectUri?: string,
        openId4VPProfile?: string,
    },
}
export interface verifyRequestData {
    request_credentials: Array<string | { credential: string, policies: Array<string | object> }>,
    vp_policies?: Array<string | object>,
    vc_policies?: Array<string | object>,
    presentation_definition?: object,
}