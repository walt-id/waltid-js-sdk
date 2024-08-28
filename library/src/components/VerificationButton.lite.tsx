import { waitForSuccess } from "../services/checkVerificationResult";
import { verifyRequest } from "../services/verifyRequest";
import { verifyRequestProps } from "../types/requests";
import { useStore } from "@builder.io/mitosis";
import Button from "./Button.lite";
import Modal from "./Modal.lite";
import { useState } from "react";

/**
 * @param title - Button text
 * @param buttonStyles - Customise the button look to your look and feel. You can provide any of the following styles:
 * buttonStyles={
 *         background: "#000";
 *         color: "#fff";
 *         margin: "1px 1px 1px 1px";
 *         padding: "1px 1px 1px 1px";
 *         border: "5px solid red";
 *         borderRadius: "1px";
 *         fontSize: "18px";
 *         fontWeight: "normal";
 *         lineHeight: "normal";
 *     };
 * @param credentialTypes - Lists of objects which specify the credential type to request via the credential key
 * and the policies to apply to the requested credential via the policies key.
 * Example:
 * {credential: "eID", policies: ["schema", {
 *   "policy": "webhook",
 *   "args": "https://example.org/abc/xyz"
 * }]}
 * You can find a list of supported policies here: https://docs.walt.id/verifier/api/credential-verification/policies
 * @param globalVPPolicies -  When requesting W3C credentials, you can apply a list of VP to the VerifiablePresentation
 * that wraps the presented credentials.
 * Example:
 * [{
 *       "policy": "minimum-credentials",
 *       "args": 2
 * }]
 * You can find a list of supported policies here: https://docs.walt.id/verifier/api/credential-verification/policies
 * @param globalVCPolicies - A list of policies to apply to all requested credentials.
 * [
 *     "signature"
 * ]
 * You can find a list of supported policies here: https://docs.walt.id/verifier/api/credential-verification/policies
 * @param presentationDefinition - provide a custom presentation definition
 * @param options -
 * vpSuccessWalletRedirectUri - Redirect URI to return when all policies passed. "$id" will be replaced with the session id.
 * vpFailWalletRedirectUri - Redirect URI to return when a policy failed. "$id" will be replaced with the session id.
 * openId4VPProfile - Optional header to set the profile of the VP request Available Profiles: DEFAULT: For W3C OpenID4VP, ISO_18013_7_MDOC: For MDOC OpenID4VP, EBSIV3: For EBSI V3 Compliant VP. Defaults to DEFAULT
 * @param redirectUri - Redirect the user on successful presentation to a specific URL in your application
 * @param walletRedirect - // TODO example
 */
interface VerificationButtonProps {
    title?: string;
    buttonStyles?: {
        background?: string;
        color?: string;
        margin?: string;
        padding?: string;
        border?: string;
        borderRadius?: string;
        fontSize?: string;
        fontWeight?: string;
        lineHeight?: string;
    };
    credentialTypes: Array<string | { credential: string, policies: Array<string | object> }>;
    // TODO can be of type string or object
    globalVPPolicies?: Array<string>,
    // TODO can be of type string or object
    globalVCPolicies?: Array<string>,
    presentationDefinition?: object,
    // TODO update vpSuccessWalletRedirectUri and vpFailWalletRedirectUri to use the same names as in the API request
    options?: { vpSuccessWalletRedirectUri?: string, vpFailWalletRedirectUri?: string, openId4VPProfile?: string },
    successRedirectUri?: string,
    walletRedirect?: { url?: string, path?: string, target?: string },
}

export default function VerificationButton(props: VerificationButtonProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [qrCodeData, setQrCodeData] = useState('');

    const state = useStore({
        openModal() {
            setIsModalOpen(true);

            const verifyRequestProps: verifyRequestProps = { credentials: props.credentialTypes }
            if (props.presentationDefinition) {
                verifyRequestProps.presentationDefinition = props.presentationDefinition
            }
            if (props.globalVPPolicies && props.globalVPPolicies.length > 0) {
                verifyRequestProps.globalVPPolicies = props.globalVPPolicies
            }
            if (props.globalVCPolicies && props.globalVCPolicies?.length > 0) {
                verifyRequestProps.globalVCPolicies = props.globalVCPolicies
            }
            if (props.options) {
                verifyRequestProps.options = props.options
            }

            verifyRequest(verifyRequestProps).then((response) => {
                const { error, data } = response
                if (error) {
                    console.error("Error occurred:", data);
                }
                setQrCodeData(data.url);
                waitForSuccess(data.state).then(response => {
                    window.location.href = `${props.successRedirectUri ? props.successRedirectUri : "/success"}?data=${encodeURIComponent(JSON.stringify(response))}`
                })
            }).catch(error => {
                console.error('An error occurred:', error);
            })
        },
        closeModal() {
            setQrCodeData('');
            setIsModalOpen(false);
        }
    })

    return (
        <div>
            <Button onClick={() => state.openModal()} buttonStyles={props.buttonStyles}>{props.title ?? 'Verify Credential'}</Button>
            <Modal open={isModalOpen} qrCodeData={qrCodeData} dialogTitle="Scan QR Code" dialogDescription="Scan the QR code to complete the verification process" walletRedirect={props.walletRedirect ? { ...props.walletRedirect, path: props.walletRedirect?.path ?? 'api/siop/initiatePresentation', offerUrl: qrCodeData, target: props.walletRedirect?.target ?? '_blank' } : undefined} onClose={() => state.closeModal()} />
        </div>
    )
}