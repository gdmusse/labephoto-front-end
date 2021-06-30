import { makeStyles } from "@material-ui/core/styles";
import Pagination from "@material-ui/lab/Pagination";
import React, { useContext } from "react";
import GlobalStateContext from "../global/GlobalStateContext";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      marginTop: theme.spacing(2),
    },
  },
}));

export default function BasicPagination(totalPosts, props) {
  const { currentPage, setCurrentPage, postsPerPage } = useContext(
    GlobalStateContext
  );

  const pageNumbers = Math.floor(totalPosts.totalPosts / postsPerPage);

  const handleChange = (event, value) => {
    setCurrentPage(value);
  };

  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Pagination
        count={pageNumbers}
        page={currentPage}
        onChange={handleChange}
        color="primary"
      />
    </div>
  );
}
