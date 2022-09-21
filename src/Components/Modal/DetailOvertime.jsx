import React from 'react'

const DetailOvertime = ({...data}) => {
  return (
    <div>
        <table className="  text-sm font-medium text-gray-700">
                            <tr>
                                <td>Name</td>
                                <td>:</td>
                                <td>{data.employeeId ? data.employeeId.name : ""}</td>
                            </tr>
                            <tr>
                                <td>Assigned By</td>
                                <td>:</td>
                                <td>{data.assignedBy ? data.assignedBy.name : ""}</td>
                            </tr>
                            <tr>
                                <td >Start At</td>
                                <td>:</td>
                                <td>{data.startAt  }</td>
                            </tr>
                            <tr>
                                <td>End At</td>
                                <td>:</td>
                                <td>{data.endAt}</td>
                            </tr>
                        </table>
    </div>
  )
}

export default DetailOvertime