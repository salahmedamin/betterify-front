import { colors } from "../../../../../colors"

export const File = ({
    onClick,
    selected,
    name
})=>{
    return (
        <div
            onClick={onClick}
            style={{
                minWidth: 60,
                height: 60,
                margin: 10,
                cursor:"pointer",
                borderRadius: 5,
                display:"flex",
                flexDirection:"column",
                alignItems:"center",
                justifyContent:"center",
                border: `${selected ? "4": "1"}px solid ${selected ? colors.whiteBlue : colors.gray}`,
            }}
        >
            <div
                style={{
                    width: 60,
                    height: 41,
                    backgroundPosition:"center center",
                    backgroundRepeat:"no-repeat",
                    backgroundImage: `url(/images/post/content/file.svg)`,
                    backgroundSize: `20px 25px`,
                }}
            />
            <div style={{color: colors.white,fontSize: 9}}>{name}</div>
        </div>
    )
}