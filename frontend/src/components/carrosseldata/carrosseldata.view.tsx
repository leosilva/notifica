import { AutoCarrossel, CarrosselCard } from '../index'


interface MyInfoProps {
    id: number;
    titulo: string;
    sumario: string;
    imagem: string | null;
}


interface ArrayProps {
    info: MyInfoProps[];
}

export default function CarrosselData({ info = [] }: ArrayProps) {
    const meusItens: React.ReactNode[] =info.map((item) => (
        <CarrosselCard  
            titulo={item.titulo} 
            sumario={item.sumario}
            imagem={item.imagem}
        />));
    return (
        <div style={{ maxWidth: '70vw' }}>
            <AutoCarrossel items={meusItens} interval={2500} />
        </div>
    )
} 