import { useEffect } from 'react';

export function useScroll(ref, dependency) {
  useEffect(() => {
    if (ref.current) {
      ref.current.scrollTop = ref.current.scrollHeight;
    }
  }, [dependency, ref]);
}