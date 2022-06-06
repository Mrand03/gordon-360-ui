import {
  Grid,
  Checkbox,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@material-ui/core/';

const ProfileUpdateField = ({ label, name, type, value, menuItems, onChange }) => {
  let field;
  // eslint-disable-next-line default-case
  switch (type) {
    case 'textfield':
      field = (
        <TextField
          className="disable_select"
          style={{ width: 252 }}
          label={label}
          name={name}
          value={value}
          onChange={onChange}
        />
      );
      break;
    case 'checkbox':
      field = (
        <FormControlLabel
          control={<Checkbox checked={value} onChange={onChange} />}
          label={label}
          name={name}
        />
      );
      break;
    case 'select':
      field = (
        <FormControl style={{ width: 252 }}>
          <InputLabel>{label}</InputLabel>
          <Select label={label} name={name} value={value} onChange={onChange}>
            {menuItems.map((info) => (
              <MenuItem value={info.value}>{info.value}</MenuItem>
            ))}
          </Select>
        </FormControl>
      );
      break;
  }
  return (
    <Grid item xs={9} md={3} lg={3}>
      {field}
    </Grid>
  );
};

export { ProfileUpdateField };
