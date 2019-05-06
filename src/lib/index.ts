import React from 'react';
import useEventTrigger from './useEventTrigger';

export interface DefaultTriggerOptions {
  directional?: boolean;
  threshhold?: number;
}

export type TriggerOptions = DefaultTriggerOptions & any;

export interface OnTriggerProps extends TriggerOptions {
  event?: Event;
  store?: React.MutableRefObject<any>;
}

export interface EventTriggerProps extends TriggerOptions {
  getTrigger?: (props: OnTriggerProps) => any;
  event?: string;
  debounce?: number;
  target?: any;
}

export default useEventTrigger;
