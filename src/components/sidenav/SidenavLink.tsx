import { SvgIconTypeMap } from '@mui/material';
import { OverridableComponent } from '@mui/material/OverridableComponent';
import { Link } from 'react-router-dom';
import './sidenavLink.css';

interface Props {
    text: string;
    Icon: OverridableComponent<SvgIconTypeMap<{}, "svg">>;
    link: string;
}

export default function SidenavLink({text, Icon, link}: Props) {
  return (
    <Link to={link} style={{color: 'black', textDecoration: 'none'}}> 
      <div className="link" >
        <Icon/>
          <h2>{text}</h2>
      </div>
    </Link>
  )
}
