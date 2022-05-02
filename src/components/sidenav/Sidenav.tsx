import SidenavLink from "./SidenavLink";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import ListAltIcon from "@mui/icons-material/ListAlt";

export default function Sidenav() {
  return (
    <div className="sidenav" style={{ marginTop: 40 }}>
      <SidenavLink link="/" text="Home" Icon={HomeIcon} />
      <SidenavLink link="/genres" text="Genres" Icon={SearchIcon} />
      <SidenavLink link="/addMovie" text="Add Movie" Icon={AddCircleIcon} />
      <SidenavLink link="list" text="Manage Movies" Icon={ListAltIcon} />
      <SidenavLink link="mail" text="Messages" Icon={MailOutlineIcon} />
    </div>
  );
}
