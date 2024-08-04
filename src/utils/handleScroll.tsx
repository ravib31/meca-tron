const handleScroll = (id: string, document: any) => {
  document.getElementById(id).scrollIntoView({ behavior: "smooth" });
};

export default handleScroll;
