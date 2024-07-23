import { waitForSuccess } from "../services/checkVerificationResult";
import { verifyRequest } from "../services/verifyRequest";
import { verifyRequestProps } from "../types/requests";
import { useStore } from "@builder.io/mitosis";
import Button from "./Button.lite";
import Modal from "./Modal.lite";
import { useState } from "react";

interface VerificationButtonProps {
    title: string;
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
    globalVPPolicies: Array<string>,
    globalVCPolicies: Array<string>,
    presentationDefinition: object,
    options: { vpSuccessWalletRedirectUri?: string, vpFailWalletRedirectUri?: string, openId4VPProfile?: string },
    redirectUri: string,
    walletRedirect: { url?: string, path?: string, oidcUrl?: string, target?: string },
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
                    window.location.href = `${props.redirectUri}?data=${encodeURIComponent(JSON.stringify(response))}`
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
            <Modal open={isModalOpen} qrCodeData={qrCodeData} dialogTitle="Scan QR Code" dialogDescription="Scan the QR code to complete the verification process" walletRedirect={props.walletRedirect} onClose={() => state.closeModal()} />
        </div>
    )
}