export const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: "smooth",
  });
};

export const scrollToListings = () => {
  const listings = document.getElementById("property-listings");

  if (!listings) return;

  const header = document.querySelector(".header");
  const headerHeight = header?.getBoundingClientRect().height || 0;
  const spacing = 24;

  const top =
    listings.getBoundingClientRect().top +
    window.scrollY -
    headerHeight -
    spacing;

  window.scrollTo({
    top: Math.max(0, top),
    behavior: "smooth",
  });
};