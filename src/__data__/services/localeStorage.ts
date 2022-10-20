const events = JSON.parse(localStorage.getItem("events") as string) || [];

export const setIdEvent = (id: string) => {
  const checkLikeEvent = getIdEvent(id);
  console.log("checkLikeEvent", checkLikeEvent);
  if (!checkLikeEvent) {
    events.push(id);
    localStorage.setItem("events", JSON.stringify(events));
  } else {
    const newEvents = events.filter((event: string) => event !== id);
    localStorage.setItem("events", JSON.stringify(newEvents));
  }
};

export const getIdEvent = (id: string) => events.includes(id);
