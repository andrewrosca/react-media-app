import { useEffect } from "react";
import { useSelector } from "react-redux";
import { fetchUsers, addUser } from "../store";
import Button from "./Button";
import Skeleton from "./Skeleton";
import { useThunk } from "../hooks/use-thunk";
import UsersListItem from "./UsersListItem";
import { usersReducer } from "../store/slices/UsersSlice";

function UsersList() {
  const [doFetchUsers, isLoadingUsers, loadingUsersError] = useThunk(
    fetchUsers
  );

  const [doCreateUser, isCreatingUser, creatingUserError] = useThunk(addUser);

  const { data } = useSelector((state) => {
    return state.users;
  });

  useEffect(() => {
    doFetchUsers();
  }, []);

  const handleUserAdd = () => {
    doCreateUser();
  };

  let content;

  if (isLoadingUsers) {
    content = <Skeleton times={6} className="h-10 w-full" />;
    //return <p className="text-3xl font-bold underline">Loading...</p>;
  } else if (loadingUsersError) {
    content = <div>Error fetching data...</div>;
  } else {
    content = data.map((users) => {
      return <UsersListItem key={users.id} users={users} />;
    });
  }

  return (
    <div>
      <div className="flex flex-row justify-between items-center m-3">
        <h1 className="m-2 text-xl">Users</h1>

        <Button loading={isCreatingUser} onClick={handleUserAdd}>
          + Add User
        </Button>

        {creatingUserError && "Error Creating user..."}
      </div>
      {content}
    </div>
  );
}

export default UsersList;
