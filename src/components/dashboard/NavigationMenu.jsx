const NavigationMenu = ({ linkData }) => {
    return <div>
        <ul>
            {linkData.map((data) => {
                return <li>
                    <button key={data.id} onClick={() => { data.action() }}>{data.title}</button>
                </li>
            })}
        </ul>
    </div>
}

export default NavigationMenu