import { Outlet, Route, Routes } from "react-router-dom";

export const AdminViews = () => {
    return (
        <Routes>
            <Route path="/" element={
                <>
                    <h1>Monsters Only</h1>
                    <div>You don't have to be lonely...</div>

                    <Outlet />
                </>
            }>

                <Route path="UserList" element={< />} / >
                    <Route path="UserList/:daterId" element={< />} / >
                        <Route path="LandingPage" element={< />} / > <Route path="customers" element={<CustomerList />} />
            </Route>
        </Routes>
    )
}