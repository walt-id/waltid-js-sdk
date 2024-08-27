import { onInit, onUpdate, Show, useStore, useStyle } from '@builder.io/mitosis';
import { toCanvas } from 'qrcode';

interface ModalProps {
    open: boolean;
    qrCodeData: string;
    dialogTitle: string;
    dialogDescription: string;
    walletRedirect?: { url?: string, path: string, offerUrl: string, target?: string };
    onClose: (event: any) => void;
}

export default function Modal(props: ModalProps) {
    const state = useStore({
        walletUrlBuilder(walletUrl: string, path: string, requestUrl: string) {
            let request = requestUrl.replaceAll("\n", "").trim()
            return `${walletUrl}/${path}` + request.substring(request.indexOf('?'));
        },
        redirectToWallet() {
            if (!props.walletRedirect) return
            const { url, path, offerUrl, target } = props.walletRedirect
            window.open(state.walletUrlBuilder(url ?? 'https://wallet.walt.id', path, offerUrl), target ?? '_self')
        }
    });

    onInit(() => {
        // Add keyframe for spin animation
        const style = document.createElement('style');
        style.innerHTML = `
            @keyframes spin {
                0% {
                    transform: rotate(0deg);
                }
                100% {
                    transform: rotate(360deg);
                }
            }
        `;
        document.head.appendChild(style);
    });

    onUpdate(() => {
        if (props.qrCodeData.length > 0) {
            toCanvas(document.getElementById('qrCode'), props.qrCodeData, { width: 200 }, (error) => {
                if (error) {
                    console.error(error);
                }
                console.log('QR Code generated');
            });
        }
    }, [props.qrCodeData]);

    return (
        <Show when={props.open}>
            <div style={{ position: 'fixed', top: '0', left: '0', width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.3)', display: 'flex', justifyContent: 'center', alignItems: 'center', fontFamily: 'ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"' }}>
                <div style={{ position: "relative", backgroundColor: 'white', padding: '1.5rem', borderRadius: '1rem', display: 'flex', flexDirection: 'column', alignItems: 'center', maxWidth: '25rem', width: '100%' }}>
                    <div style={{ position: 'absolute', top: '0', right: '0', paddingTop: '1rem', paddingRight: '1rem' }}>
                        <button onClick={() => props.onClose(event)} style={{ margin: '-0.5rem', padding: '0.5rem', display: 'inline-flex', color: '#9CA3AF', backgroundColor: 'transparent', border: 'none', cursor: 'pointer', fontSize: "1rem" }}>
                            <span>X</span>
                        </button>
                    </div>
                    <div style={{ fontSize: '1.25rem', fontWeight: '500', lineHeight: '1.5', marginTop: '1.25rem', textAlign: 'center' }}>{props.dialogTitle}</div>
                    <div style={{ marginTop: '1rem', fontSize: '0.875rem', color: '#6B7280', textAlign: 'center' }}>{props.dialogDescription}</div>
                    <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'center' }}>
                        <canvas id="qrCode" style={{ width: '0' }} />
                        <Show when={!props.qrCodeData.length}>
                            <div style={{ animation: 'spin 2s linear infinite', display: 'inline-block', width: '1rem', height: '1rem', border: '0.25rem solid #E5E7EB', borderTopColor: '#374151', borderRadius: '50%', margin: '1rem' }} />
                        </Show>
                    </div>
                    <Show when={props.walletRedirect}>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '0.5rem 0rem' }}>
                            <button onClick={() => state.redirectToWallet()} style={{ fontSize: '0.875rem', lineHeight: '1', fontWeight: '500', borderRadius: '9999px', padding: '0.625rem 2rem', color: 'white', backgroundColor: '#2563EB', border: 'none', cursor: 'pointer' }}>
                                Open Web Wallet
                            </button>
                        </div>
                    </Show>
                    <div style={{ display: 'flex', flexDirection: 'row', gap: '0.5rem', alignItems: 'center', justifyContent: 'center', fontSize: '0.875rem', textAlign: 'center', color: '#6B7280' }}>
                        <p>Secured by walt.id</p>
                    </div>
                </div >
            </div >
        </Show >
    );
}