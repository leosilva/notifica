import { Route, Routes } from 'react-router'
export { Routes, Route } from 'react-router-dom'
import { Carrossellayout } from '../pages/carrosselpage'

export function AppRoutes() {
    return (
        <Routes>
            <Route path='/carrossel' element={<Carrossellayout />} />
        </Routes>
    )
}