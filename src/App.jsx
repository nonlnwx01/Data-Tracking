import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import EmployeeData from './components/EmployeeData';
import ProductionData from './components/ProductionData';
import MedicationData from './components/MedicationData';
import TrainingHistory from './components/trainingHistory';
import Pages401 from './components/pages401';


const App = () => {


    const [isLogin, setIsLogin] = React.useState(false);

    React.useEffect(() => {
        const loginState = localStorage.getItem('loginState');
        if (loginState === 'true') {
            setIsLogin(true);
        } else {
            setIsLogin(false);
        }
    })
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login setIsLogin={setIsLogin} />} />
                {isLogin && <Route path="/employee-data" element={<EmployeeData setIsLogin={setIsLogin} />} />}
                {/* <Route path="/employee-data" element={<EmployeeData />} />  */}
                {isLogin && <Route path="/production-data" element={<ProductionData setIsLogin={setIsLogin} />} />}
                {/* <Route path="/production-data" element={<ProductionData/>} /> */}
                {isLogin && <Route path="/medication-data" element={<MedicationData setIsLogin={setIsLogin} />} />}
                {/* <Route path="/medication-data" element={<MedicationData/>} /> */}
                {isLogin && <Route path="/trainingHistory" element={<TrainingHistory setIsLogin={setIsLogin} />} />}
                <Route path="*" element={<Pages401 />} />

            </Routes>
        </Router>
    );
};

export default App;
