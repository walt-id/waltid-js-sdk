interface ButtonProps {
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
    disabled?: boolean;
    onClick: (event: any) => void;
    children: any;
}

export default function Button(props: ButtonProps) {
    return <button disabled={props.disabled} style={{
        background: props.buttonStyles?.background || "linear-gradient(to left, #0573F0, #03449E)",
        color: props.buttonStyles?.color || "white",
        margin: props.buttonStyles?.margin || "0rem",
        padding: props.buttonStyles?.padding || "0.5rem 1rem",
        border: props.buttonStyles?.border || "1px solid",
        borderRadius: props.buttonStyles?.borderRadius || "0.5rem",
        fontSize: props.buttonStyles?.fontSize || "0.875rem",
        fontWeight: props.buttonStyles?.fontWeight || "600",
        lineHeight: props.buttonStyles?.lineHeight || "1.5rem",
        opacity: props.disabled ? "0.5" : "1",
        cursor: props.disabled ? "not-allowed" : "pointer",
    }}
        onClick={() => props.onClick(event)}>
        {props.children}
    </button >
}