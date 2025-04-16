import Registration from "./Registration"
import Authorization from './Authorization'
import { useState } from "react"
function Authentification(){
    const [page, setPage] = useState('authorization')

    return(
        <>
        <div className={`bg ${page === 'catalogue' ? 'hidden' : ''}`}></div>
        <div className='reg'>
            {page === 'registration' && <Registration onChange={(current) => setPage(current)} />}
            {page === 'authorization' && <Authorization onChange={(current) => setPage(current)} />}
        </div>
        </>
        
    )
}
export default Authentification