import React from "react";
import moment from "moment";

const DetailPartner = ({ ...data }) => {
  return (
    <>
      <div className="">
        <table className=" text-sm font-medium text-gray-700">
          <tbody>
            <tr>
              <td>Partner Name</td>
              <td>:</td>
              <td>{data.name}</td>
            </tr>
            <tr>
              <td>Description</td>
              <td>:</td>
              <td>{data.description}</td>
            </tr>
            <tr>
              <td className="align-top">Address</td>
              <td className="align-top">:</td>
              <td>{data.address}</td>
            </tr>
            <tr>
              <td className="w-28">Responsible by</td>
              <td className="w-2">:</td>
              <td className="w-48">{data.resposibleBy}</td>
            </tr>
            <tr>
              <td>Phone</td>
              <td>:</td>
              <td>{data.phone}</td>
            </tr>
            <tr>
              <td>Joined At</td>
              <td>:</td>
              <td>{moment(data.joinedAt).format("DD MMMM YYYY")}</td>
            </tr>
            <tr>
              <td>Assigned By</td>
              <td>:</td>
              <td>{data.assignedBy ? data.assignedBy.name : "-"}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default DetailPartner;
