import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import routes from "./routes"
// import { AuthProvider } from "../contexts/AuthContext";

const AppRouter: React.FC = () => {
    return (
        <Router>
            {/*<AuthProvider>*/}
                <Routes>
                    {routes.map((route, index) => (
                            <Route key={index}
                                   path={route.path}
                                   element={route.element}
                            />
                        )
                    )}
                </Routes>
            {/*</AuthProvider>*/}
        </Router>
    );
};

export default AppRouter;
