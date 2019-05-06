import React from 'react';
import debounce from 'debounce';
import { EventTriggerProps } from './';

const defaultTarget = typeof window !== 'undefined' ? window : null;

function useDebounce(handler, debounceProp) {
  return debounceProp ? debounce(handler, debounceProp) : handler;
}

const defaultTrigger = props => (props.store.current = (props.store.current || 0) + 1);
export default function useEventTrigger(
  props: EventTriggerProps = {},
  deps?: readonly any[],
): [boolean, React.MutableRefObject<any>] {
  const {
    event = 'scroll',
    getTrigger = defaultTrigger,
    debounce,
    target = defaultTarget,
  } = props;
  const store = React.useRef();
  const [trigger, setTrigger] = React.useState(() => getTrigger({ event: null, store, ...deps }));
  React.useEffect(() => {
    const handleEvent = useDebounce(event => {
      setTrigger(getTrigger({ event, store, ...deps }));
    }, debounce);
    target.addEventListener(event, handleEvent);
    return () => {
      target.removeEventListener(event, handleEvent);
      debounce && handleEvent.clear();
    };
  }, [event, debounce, target, getTrigger, ...deps]);
  return [trigger, store];
}
