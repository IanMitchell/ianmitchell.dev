import { useState } from 'react';

export default function useBoolean(initial) {
  const [value, setValue] = useState(initial);

  return {
    value,
    setValue,
    setTrue: () => setValue(true),
    setFalse: () => setValue(false),
    toggle: () => setValue(!value),
  };
}
