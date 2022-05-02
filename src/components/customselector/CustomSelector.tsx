import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

interface Props {
  state: Object;
  keyName: string;
  func: Function;
  title: string;
  values: any[];
}

export default function CustomSelector({ title, values, keyName, func, state}: Props) {
  return (
    <FormControl fullWidth>
      <InputLabel>{title}</InputLabel>
      <Select 
        defaultValue="choose"
        label={title} 
        onChange={e => func({...state, [keyName]: e.target.value}) }
      >
        <MenuItem disabled value="choose">Choose Option</MenuItem>
        {values.map((value) => (
          <MenuItem value={value} key={value}>{value}</MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
