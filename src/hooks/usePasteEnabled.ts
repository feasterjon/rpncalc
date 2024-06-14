import { useEffect, useState } from 'react';

export const usePasteEnabled = () => {
  const [pasteEnabled, setPasteEnabled] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const checkPasteEnabled = async () => {
      try {
        if ('permissions' in navigator) {
          const queryOptions: PermissionDescriptor & { allowWithoutGesture?: boolean } = { 
            name: 'clipboard-read' as PermissionName, 
            allowWithoutGesture: false 
          };
          const permissionStatus = await navigator.permissions.query(queryOptions);
          if ((permissionStatus.state === 'granted' || permissionStatus.state === 'prompt') && isMounted) {
            setPasteEnabled(true);
          }
        }
      } catch (error) {}
    }

    checkPasteEnabled();

    return () => { isMounted = false; };
  }, []);

  return pasteEnabled;
}