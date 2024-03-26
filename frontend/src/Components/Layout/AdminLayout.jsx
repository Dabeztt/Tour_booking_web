import React, { useState } from 'react'
import Sidebar from '../../admin/Sidebar'
import Routers from '../../router/Routers'

const AdminLayout = () => {
    const [toggle] = useState(true)

    return <>
        <div className='container-fluid'>
            <div className='row'>
                {toggle && <div className='col-4 col-md-2 bg-white vh-100'>
                    <Sidebar />
                </div>}

                <div className='col'>
                    <Routers />
                </div>
            </div>
        </div>
    </>
}

export default AdminLayout