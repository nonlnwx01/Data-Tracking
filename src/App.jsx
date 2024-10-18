import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import EmployeeData from './components/EmployeeData';
import ProductionData from './components/ProductionData';
import MedicationData from './components/MedicationData';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/employee-data" element={<EmployeeData />} />
                <Route path="/production-data" element={<ProductionData/>} />
                <Route path="/medication-data" element={<MedicationData/>} />
            </Routes>
        </Router>
    );
};

export default App;
