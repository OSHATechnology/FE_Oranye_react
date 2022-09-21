import React from 'react'

const DetailAttendance = ({...data}) => {
  return (
    <div>
        <table className="  text-sm font-medium text-gray-700">
                            <tr>
                                <td>Name</td>
                                <td>:</td>
                                <td>{data.employee ? data.employee.name : ""}</td>
                            </tr>
                            <tr>
                                <td>Type</td>
                                <td>:</td>
                                <td>{data.attendanceStatus ? data.attendanceStatus.status : ""}</td>
                            </tr>
                            <tr>
                                <td >Status</td>
                                <td>:</td>
                                <td>{data.typeInOut  }</td>
                            </tr>
                            <tr>
                                <td>Time</td>
                                <td>:</td>
                                <td>{data.timeAttend}</td>
                            </tr>
                        </table>
    </div>
  )
}

export default DetailAttendance