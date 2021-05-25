import React, { useEffect } from "react";
import FollowItem from "./FollowItem";

import { connect } from "react-redux";

import { findPeople } from "../../actions/userAction";

const Follow = ({ findPeople, findPeopleData, isAuthenticated }) => {
  useEffect(() => {
    if (isAuthenticated) {
      findPeople();
    }
  }, [findPeople, isAuthenticated]);

  return findPeopleData ? (
    <div>
      <p className="text-gray-600 text-lg font-semibold m-2">Find People:</p>
      <div className="grid grid-flow-col overflow-x-auto gap-4 ml-2">
        {findPeopleData && findPeopleData.lenght === 0 ? (
          <p>No one is there to follow!</p>
        ) : (
          findPeopleData &&
          findPeopleData.findPeople.map(data => (
            <FollowItem data={data} key={data._id} />
          ))
        )}
      </div>
    </div>
  ) : (
    ""
  );
};

const mapStateToProps = state => ({
  findPeopleData: state.findPeopleData,
  isAuthenticated: state.userData.isAuthenticated
});

export default connect(
  mapStateToProps,
  { findPeople }
)(Follow);
