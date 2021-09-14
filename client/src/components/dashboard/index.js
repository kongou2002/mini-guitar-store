import React from 'react'
import DashboardLayout from 'hoc/dashboardLayout'
import HistoryBlock from 'utils/historyBlock'

// thang userDashboard nay nhan prop tu authGuard
const UserDashboard = ({ users }) => {
    return (
        <DashboardLayout title="Overview">
            <div className="user_nfo_panel">
                <div>
                    <span>{users.data.firstName}</span>
                    <span>{users.data.lastName}</span>
                    <span>{users.data.email}</span>
                </div>
                {users.data.history ?
                    <div className="user_nfo_panel">
                        <h1>History purchased</h1>
                        <div className="user_product_block_wrapper">
                        <HistoryBlock 
                            history={users.data.history}
                         />
                        </div>
                    </div>
                    : null}
            </div>
        </DashboardLayout>
    )
}

export default UserDashboard
