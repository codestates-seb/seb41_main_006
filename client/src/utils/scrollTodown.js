const scrollTodown = (scrollRef) => {
  scrollRef.current.scrollIntoView({
    behavior: 'smooth',
    block: 'end',
    inline: 'nearest',
  });
};

export default scrollTodown;
