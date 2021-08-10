import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Typography from "@material-ui/core/Typography";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Select from "@material-ui/core/Select";
import { Link } from "react-router-dom";

import IconButton from "@material-ui/core/IconButton";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import InputBase from "@material-ui/core/InputBase";
import MenuItem from "@material-ui/core/MenuItem";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
const axios = require("axios").default;

const BootstrapInput = withStyles((theme) => ({
  root: {
    "label + &": {
      marginTop: theme.spacing(3),
    },
  },
  input: {
    borderRadius: 4,
    position: "relative",
    backgroundColor: theme.palette.background.paper,
    border: "1px solid #ced4da",
    fontSize: 16,
    padding: "10px 26px 10px 12px",
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
  },
}))(InputBase);

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  margin: {
    marginRight: "12px",
  },
  Checkbox: {
    marginTop: 20,
  },
}));
export default function SignIn() {
  const classes = useStyles();
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => console.log(data);
  const [languagesValue, setLanguagesValue] = useState("");
  const [regionValue, setRegionValue] = useState("");
  const handleChange = (event) => {
    setLanguagesValue(event.target.value);
  };
  const handleChangeRegion = (event) => {
    setRegionValue(event.target.value);
  };
  const [region, setRegion] = useState(null);
  const [languages, setLanguages] = useState(null);
  useEffect(() => {
    const urlRegions =
      "https://api.themoviedb.org/3/watch/providers/regions?api_key=44d74a10460e9a32f8546bed31d47780&language=en-US";
    axios.get(urlRegions).then((r) => setRegion(r.data.results));
    const urlLanguages =
      "https://api.themoviedb.org/3/configuration/languages?api_key=44d74a10460e9a32f8546bed31d47780";
    axios.get(urlLanguages).then((r) => setLanguages(r.data));
  }, []);

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />

      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Search movie
        </Typography>
        <IconButton component={Link} to="/movie-search" aria-label="delete">
          <ArrowBackIosIcon />
        </IconButton>
        <form
          className={classes.form}
          noValidate
          onSubmit={handleSubmit(onSubmit)}
        >
          <TextField
            variant="outlined"
            margin="normal"
            inputRef={{
              ...register("query"),
            }}
            required
            fullWidth
            id="query"
            label="Movie name"
            name="query"
            autoComplete="query"
            autoFocus
          />

          <div>
            <FormControl className={classes.margin}>
              <InputLabel
                name="Year"
                inputRef={{
                  ...register("Year"),
                }}
                type="number"
                color="primary"
                htmlFor="demo-customized-textbox"
              >
                Year
              </InputLabel>
              <BootstrapInput id="demo-customized-textbox" />
            </FormControl>
            <FormControl className={classes.margin}>
              <InputLabel id="demo-customized-select-label">region</InputLabel>
              <Select
                name="Region"
                inputRef={{
                  ...register("Region"),
                }}
                color="primary"
                variant="filled"
                labelId="demo-customized-select-label"
                id="demo-customized-select"
                value={regionValue}
                onChange={handleChangeRegion}
                input={<BootstrapInput />}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {region &&
                  region.map(({ english_name, iso_3166_1 }) => (
                    <MenuItem key={iso_3166_1} value={english_name}>
                      {english_name}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
            <FormControl className={classes.margin}>
              <InputLabel id="demo-customized-select-label">
                languages
              </InputLabel>
              <Select
                inputRef={{
                  ...register("languages"),
                }}
                color="primary"
                variant="filled"
                labelId="demo-customized-select-label"
                id="demo-customized-select"
                value={languagesValue}
                onChange={handleChange}
                input={<BootstrapInput />}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {languages &&
                  languages.map(({ english_name, iso_639_1 }) => (
                    <MenuItem key={iso_639_1} value={english_name}>
                      {english_name}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
            <FormControlLabel
              className={classes.Checkbox}
              control={
                <Checkbox
                  name="18+"
                  // inputRef={{
                  //   ...register("18+"),
                  // }}
                  value="18+"
                  color="primary"
                  defaultValue={false}
                />
              }
              label="18+"
            />
          </div>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Search
          </Button>
        </form>
      </div>
    </Container>
  );
}
