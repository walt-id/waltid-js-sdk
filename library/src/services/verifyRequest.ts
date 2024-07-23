import { verifyRequestProps, verifyRequestData, verifyRequestConfig } from '../types/requests';
import axios from 'axios';

function getStateFromURL(input: string): string {
    const url = new URL(input);
    const params = new URLSearchParams(url.search);
    return params.get('state') || 'No state parameter in the URL';
}

export async function verifyRequest(props: verifyRequestProps): Promise<{ error: boolean, data: any }> {
    const { credentials, globalVPPolicies, globalVCPolicies, presentationDefinition, options } = props;

    const data: verifyRequestData = {
        request_credentials: credentials
    };
    if (globalVPPolicies?.length) {
        data['vp_policies'] = globalVPPolicies;
    }
    if (globalVCPolicies?.length) {
        data['vc_policies'] = globalVCPolicies;
    }
    if (presentationDefinition) {
        data['presentation_definition'] = presentationDefinition;
    }

    const config: verifyRequestConfig = {
        headers: {
            authorizeBaseUrl: 'openid4vp://authorize',
            responseMode: 'direct_post',
        },
    };
    if (options?.vpSuccessWalletRedirectUri) {
        config.headers.successRedirectUri = options?.vpSuccessWalletRedirectUri;
    }
    if (options?.vpFailWalletRedirectUri) {
        config.headers.errorRedirectUri = options?.vpFailWalletRedirectUri;
    }
    if (options?.openId4VPProfile) {
        config.headers.openId4VPProfile = options?.openId4VPProfile;
    }

    try {
        const response = await axios.post(
            'https://verifier.portal.walt.id/openid4vc/verify',
            data,
            config,
        );

        return {
            error: false,
            data: { url: response.data, state: getStateFromURL(response.data) },
        };
    } catch (error) {
        return { error: true, data: error };
    }
}