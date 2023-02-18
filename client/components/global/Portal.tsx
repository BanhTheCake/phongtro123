import { ReactNode, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

interface PortalProps {
    children?: ReactNode;
}

const Portal = ({ children }: PortalProps) => {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);

        return () => setMounted(false);
    }, []);

    return mounted
        ? createPortal(
              children,
              document.querySelector('#__next') as HTMLElement
          )
        : null;
};

export default Portal