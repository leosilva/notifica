import styles from './carrosselcard.module.css'

interface CarrosselcardProps {
    titulo: string;
    sumario: string;
    link: string | null;
    imagem: string | null;
}

export default function Carrosselcard({titulo, sumario}: CarrosselcardProps) {
    return (
        <div className={styles.card}>
            <h3>{titulo}</h3>
            <p>{sumario}</p>

        </div>
    )
}