import {AuthProvider} from '../contexts/AuthContext'

export function Provider({children}){
    return (
        <AuthProvider>
            {children}
        </AuthProvider>
        )
}
