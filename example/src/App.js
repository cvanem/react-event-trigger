import React from "react";
import useEventTrigger from "react-event-trigger";

const increment = props =>
  (props.store.current = (props.store.current || 0) + 1);
  
export default function Example() {
  const [eventTrigger] = useEventTrigger({
    event: "mousemove",
    getTrigger: increment
  });

  const [debounceTrigger] = useEventTrigger({
    event: "mousemove",
    getTrigger: increment,
    debounce: 166
  });
  return (
    <div>
      React event and debounced example. Move mouse to observe event behavior.
      <br />
      <br />
      Event: {eventTrigger}
      <br />
      Debounce: {debounceTrigger}
      <br />
    </div>
  );
}
