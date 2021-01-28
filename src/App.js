import React, { useState } from "react";
import data from "./data.json";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles(() => ({
  heading: {
    padding: "20px",
    boxShadow: "0 0 0 0",
    borderRadius: "0px",
    fontSize: "20px",
    fontWeight: "bolder",
  },
  title: {
    textAlign: "center",
    marginTop: "10px",
    borderRadius: "0px",
    boxShadow: "0 0 0 0",
    paddingTop: "15px",
    paddingBottom: "15px",
    backgroundColor: "#ef7e7e",
  },
  listItem: { textAlign: "center", marginTop: "10px" },
  button: { margin: "15px", color: "black", backgroundColor: "#ef7e7e" },
  root: { overflow: "hidden", height: "626px" },
  list: {
    overflow: "auto",
    height: "calc(100vh - 100px - 32px)",
    width: "100%",
  },
}));

function App(props) {
  const classes = useStyles(props);
  const [state, setState] = useState({ filterList: data });
  const { filterList } = state;
  function sortByUpVotes(sortBy = "desc") {
    let list = [];
    if (sortBy === "desc")
      list = data.sort((a, b) => parseFloat(b.upVotes) - parseFloat(a.upVotes));
    else
      list = data.sort((a, b) => parseFloat(a.upVotes) - parseFloat(b.upVotes));
    setState((prevState) => ({ ...prevState, filterList: list }));
  }

  function sortByDate(sortBy = "desc") {
    let list = [];
    if (sortBy === "desc")
      list = data.sort(function (a, b) {
        return new Date(a.date) - new Date(b.date);
      });
    else
      list = data.sort(function (a, b) {
        return new Date(b.date) - new Date(a.date);
      });
    setState((prevState) => ({ ...prevState, filterList: list }));
  }

  return (
    <div className={classes.root}>
      <Grid container>
        <Grid item xs={12}>
          <Paper elevation={4}>
            <Grid container justify="flex-end">
              <Grid item xs={12} sm={8} md={8} lg={10}>
                <Typography className={classes.heading}>
                  Sorting Articles
                </Typography>
              </Grid>
              <Grid item sm={2} xs={6} md={2} lg={1}>
                <Button
                  onClick={() => sortByUpVotes()}
                  variant="contained"
                  className={classes.button}
                >
                  UpVotes
                </Button>
              </Grid>
              <Grid item xs={6} sm={2} md={2} lg={1}>
                <Button
                  onClick={() => sortByDate()}
                  variant="contained"
                  className={classes.button}
                >
                  Date
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        <Grid container>
          <Grid item xs={4}>
            <Paper className={classes.title}>Title</Paper>
          </Grid>
          <Grid item xs={4}>
            <Paper className={classes.title}>UpVotes</Paper>
          </Grid>
          <Grid item xs={4}>
            <Paper className={classes.title}>Date</Paper>
          </Grid>
        </Grid>
        <div className={classes.list}>
          {filterList.map((item, index) => (
            <Grid container key={index}>
              <Grid item xs={4}>
                <Typography className={classes.listItem}>
                  {item.title}
                </Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography className={classes.listItem}>
                  {item.upVotes}
                </Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography className={classes.listItem}>
                  &nbsp; &nbsp; &nbsp; &nbsp;
                  {new Date(item.date).toLocaleDateString()}
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  {new Date(item.date).toLocaleTimeString("en-US", {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true,
                  })}
                </Typography>
              </Grid>
            </Grid>
          ))}
        </div>
      </Grid>
    </div>
  );
}

export default App;
