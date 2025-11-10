const MenuButton = ({ buttonData }) => {
    return <>
        {buttons.map((data) => {
            return <button onClick={() => { data.onClick() }}>
                {data.title}
            </button>
        })}
    </>
}