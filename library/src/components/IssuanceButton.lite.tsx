import { issueRequest } from "../services/issueRequest";
import { Credential } from "../types/credentials";
import { useStore } from "@builder.io/mitosis";
import Button from "./Button.lite";
import Modal from "./Modal.lite";
import { useState } from "react";

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
    format?: string;
    walletRedirect?: { url?: string, path?: string, oidcUrl?: string, target?: string };
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
            <Modal open={isModalOpen} qrCodeData={qrCodeData} dialogTitle="Scan QR Code" dialogDescription="Scan the QR code with your wallet to issue the credential" walletRedirect={props.walletRedirect} onClose={() => state.closeModal()} />
        </div>
    )
}