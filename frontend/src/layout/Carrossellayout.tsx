import { AutoCarrossel, Carrosselcard } from '../components'

export function Carrossellayout() {
    const meusItens: React.ReactNode[] = [
        <Carrosselcard key="1" />,
        <Carrosselcard key="2" />,
        <Carrosselcard key="1" />,
    ];
    return (
        <div style={{ maxWidth: '70vw' }}>
            <AutoCarrossel items={meusItens} interval={2500} />
        </div>
    )
}
