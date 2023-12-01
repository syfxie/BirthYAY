import React from "react"
import routes from "./routes"

import './App.css'
import {Provider} from './providers/index'
import {BrowserRouter as Router, Route, Routes} from "react-router-dom"

function App() {
    return (
        <div className="App">
            <Router>
                <Provider>
                        <Routes>
                            {routes.map((route, index) => (
                                    <Route key={index}
                                           exact path={route.path}
                                           element={route.element}
                                    />
                                )
                            )}
                        </Routes>
                </Provider>
            </Router>
        </div>
    );
}

export default App;
