import { CSSProperties } from "react";

interface StyleProps {
  inputContainer: CSSProperties;
  input: CSSProperties;
  label: CSSProperties;
}

export const styles: StyleProps = {
  inputContainer: {
    position: "relative",
    outline: "none",
    boxSizing: "border-box",
    margin: "0px",
    padding: "0px",
    display: "flex",
    alignContent: "center",
    alignSelf: "flex-start",
    flexDirection: "row",
    borderRadius: 3,
    border: "1px solid #000",
  },
  input: {
    borderRadius: 3,
    zIndex: 1,
    flex: 1,
    display: "flex",
    fontFamily: "Hanalei",
    fontSize: 30,
    margin: "0px",
    outline: "none",
    boxSizing: "border-box",
    border: "none",
  },
  label: {
    zIndex: 2,
    flexGrow: 1,
    fontFamily: "Hanalei",
    display: "flex",
    top: 1,
    left: 2,
    fontSize: 30,
    padding: "0 5px",
    justifyContent: "flex-start",
    position: "absolute",
    borderRadius: 3,
    background: "#fff",
  },
};
