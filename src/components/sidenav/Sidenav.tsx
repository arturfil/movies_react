import SidenavLink from "./SidenavLink";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import ListAltIcon from "@mui/icons-material/ListAlt";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { setLoggedIn } from "../../features/account/accountSlice";
import { toast } from "react-toastify";

export default function Sidenav() {
  const dispatch = useAppDispatch();
  const { loggedIn } = useAppSelector((state) => state.account);

  function logOut() {
    localStorage.removeItem(process.env.REACT_APP_JWT_STRING!);
    dispatch(setLoggedIn(false));
    toast.error("Succesfully Loged Out")
  }

  return (
    <div className="sidenav" style={{ marginTop: 40 }}>
      <SidenavLink link="/" text="Home" Icon={HomeIcon} />
      <SidenavLink link="/genres" text="Genres" Icon={SearchIcon} />
      {loggedIn ? (
        <>
          <SidenavLink link="/addMovie" text="Add Movie" Icon={AddCircleIcon} />
          <SidenavLink link="list" text="Manage Movies" Icon={ListAltIcon} />
          <div className="link" onClick={logOut}>
            <ExitToAppIcon />
            <h2 className="">Log Out</h2>
          </div>
        </>
      ) : (
        <SidenavLink link="/login" text="Login" Icon={AccountCircleIcon} />
      )}
    </div>
  );
}
