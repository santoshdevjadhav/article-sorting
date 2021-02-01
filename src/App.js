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
  const [state, setState] = useState({
    filterList: null,
    sortUpVotes: "desc",
    sortDate: "desc",
  });
  const { filterList, sortUpVotes, sortDate } = state;

  if (filterList === null) {
    sortByUpVotes();
  }

  function sortByUpVotes(sortUpVotes = "desc") {
    let list = [];
    if (sortUpVotes === "desc")
      list = data.sort((a, b) => parseFloat(b.upVotes) - parseFloat(a.upVotes));
    //sort by upvotes in descending order
    else
      list = data.sort((a, b) => parseFloat(a.upVotes) - parseFloat(b.upVotes)); //sort by upvotes in ascending order
    setState((prevState) => ({ ...prevState, filterList: list }));
  }

  function sortByDate() {
    let list = [];
    if (sortDate === "desc")
      list = data.sort(function (a, b) {
        //sort by date in descending order
        return new Date(b.date) - new Date(a.date);
      });
    else
      list = data.sort(function (a, b) {
        return new Date(a.date) - new Date(b.date); //sort by date in ascending order
      });
    setState((prevState) => ({ ...prevState, filterList: list }));
  }
  function formatDate(date) {
    // function for date format 'yy-mm-dd'
    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();
    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;
    return [year, month, day].join("-");
  }

  return (
    <div className={classes.root}>
      <Grid container>
        <Grid item xs={12}>
          <Paper elevation={4}>
            <Grid container justify="flex-end">
              <Grid item xs={12} sm={8} md={8} lg={8}>
                <Typography className={classes.heading}>
                  Article List
                </Typography>
              </Grid>
              <Grid item sm={2} xs={6} md={2} lg={2}>
                <Button
                  onClick={() => {
                    setState((prevState) => ({
                      ...prevState,
                      sortUpVotes: sortUpVotes === "desc" ? "asc" : "desc",
                    }));
                    sortByUpVotes(sortUpVotes === "desc" ? "asc" : "desc");
                  }}
                  variant="contained"
                  className={classes.button}
                >
                  {`${sortUpVotes === "desc" ? "Least " : "Most "}Upvoted`}
                </Button>
              </Grid>
              <Grid item xs={6} sm={2} md={2} lg={2}>
                <Button
                  onClick={() => {
                    setState((prevState) => ({
                      ...prevState,
                      sortDate: sortDate === "desc" ? "asc" : "desc",
                    }));
                    sortByDate();
                  }}
                  variant="contained"
                  className={classes.button}
                >
                  {`${sortDate === "desc" ? "Most " : "Least "}Recent`}
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
          {filterList &&
            filterList.map((item, index) => (
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
                    {formatDate(item.date)}
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
