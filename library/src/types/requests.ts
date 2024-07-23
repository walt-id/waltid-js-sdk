export interface verifyRequestProps {
    credentials: Array<string | { credential: string, policies: Array<string | object> }>,
    globalVPPolicies?: Array<string>,
    globalVCPolicies?: Array<string>,
    presentationDefinition?: object,
    options?: { vpSuccessWalletRedirectUri?: string, vpFailWalletRedirectUri?: string, openId4VPProfile?: string }
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
    vp_policies?: string[],
    vc_policies?: string[],
    presentation_definition?: object,
}