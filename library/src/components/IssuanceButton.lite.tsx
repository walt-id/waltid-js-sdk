import { Credential, CredentialFormats } from "../types/credentials";
import { issueRequest } from "../services/issueRequest";
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
 * @param credentials - An array of credentials to issue, each with its own configuration. Please see examples here for
 * more detail: https://github.com/walt-id/waltid-js-sdk/blob/main/test-apps/react/src/App.tsx
 * @param format - credential standard format option, e.g. JWT (W3C JWT) or SD-JWT (W3C SD-JWT)
 * @param walletRedirect - In case you want to use the same-device flow, where the user clicks a button rather than scans a QR code to fulfill the credential presentation request.
 *   This parameter can be used to specify the endpoint of the wallet handling same-device flows. The example below specifies the walt.id web wallet endpoint used to process same-device flow presentations.
 *   Example:
 *   walletRedirect={{
 *   "url": "https://wallet.walt.id",
 *   "path": "api/siop/initiatePresentation"
 *   }}
 */
interface IssuanceButtonProps {
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
    credentials: Credential[];
    format?: CredentialFormats;
    walletRedirect?: { url?: string, path?: string, target?: string };
}

export default function IssuanceButton(props: IssuanceButtonProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [qrCodeData, setQrCodeData] = useState('');

    const state = useStore({
        openModal() {
            setIsModalOpen(true);
            issueRequest(props.credentials, props.format).then((response) => {
                const { data } = response;
                setQrCodeData(data);
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
            <Button onClick={() => state.openModal()} buttonStyles={props.buttonStyles}>{props.title ?? 'Issue Credential'}</Button>
            <Modal open={isModalOpen} qrCodeData={qrCodeData} dialogTitle="Scan QR Code" dialogDescription="Scan the QR code with your wallet to issue the credential" walletRedirect={props.walletRedirect ? { ...props.walletRedirect, path: props.walletRedirect?.path ?? 'api/siop/initiateIssuance', offerUrl: qrCodeData } : undefined} onClose={() => state.closeModal()} />
        </div>
    )
}