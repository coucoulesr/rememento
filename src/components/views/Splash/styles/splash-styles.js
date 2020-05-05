import './splash-styles.css';

export const animationDelay = 0.125;

export const homeStyles = {
  height: "100%",
  width: "100%",
  backgroundColor: "rgb(255,214,161)",
  background:
    "linear-gradient(328deg, rgba(255,214,161,1) 0%, rgba(255,166,155,1) 35%, rgba(246,143,255,1) 100%)",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  overflow: "auto",
};

export const bodyStyles = {
  width: "80%",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
};

export const navStyles = {
  width: "100%",
  height: "5%",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};

export const linkStyles = {
  padding: "15px 20px",
  color: "#3f3f3f",
};

export const logoStyles = {
  fontSize: "1.5rem",
  fontWeight: "300",
  height: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

export const navLinkStyles = {
  height: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

export const pStyles = {
  fontSize: "1.25rem",
  width: "80%",
  margin: "0",
  padding: "7.5px 0",
};

export const quoteStyles = {
  ...pStyles,
  fontSize: "1rem",
  color: "rgba(100,80,80,0.8)",
};

export const buttonContainerStyles = {
  minWidth: "200px",
  width: "30%",
  display: "flex",
  justifyContent: "space-around",
  margin: "10px 0",
};

export const buttonStyles = {
  margin: "20px 0",
};

export const h1Styles = {
  margin: "30px 0 10px 0",
  fontWeight: "400",
  animationName: "fade-in-from-bottom",
  animationDuration: "1.5s",
  animationFillMode: "backwards",
  animationTimingFunction: "ease-out",
};

export const textFieldContainerStyles = {
  width: "70%",
  maxWidth: "700px",
};

export const textFieldStyles = {
  animationName: "fade-in-from-bottom",
  animationDuration: "1.5s",
  animationFillMode: "backwards",
  animationTimingFunction: "ease-out",
};

export const buttonStylesFadeIn = {
  ...buttonStyles,
  ...textFieldStyles,
  animationDelay: `${animationDelay * 8}s`,
};

export function formStyles(idx) {
  if (idx % 2 === 0) {
    return { ...h1Styles, animationDelay: animationDelay * idx + "s" };
  } else {
    return {
      ...textFieldStyles,
      animationDelay: animationDelay * idx + "s",
    };
  }
}
