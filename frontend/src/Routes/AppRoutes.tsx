import { Route, Routes } from 'react-router'
export { Routes, Route } from 'react-router-dom'
import { Carrossellayout } from '../layout/Carrossellayout'

export function AppRoutes() {
    return (
        <Routes>
            <Route path='/carrossel' element={<Carrossellayout />} />
        </Routes>
    )
}